import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { type TestContext, test } from "node:test";
import { migrateDatabase } from "../scripts/migrations.ts";
import { articles, projects } from "../scripts/seed/data.ts";
import { seedDemoContent } from "../scripts/seed/seed-content.ts";
import { createDatabaseLayer } from "../src/index.ts";

function setup(t: TestContext) {
  const connection = createDatabaseLayer({ filename: ":memory:" });
  t.after(() => connection.close());
  migrateDatabase(connection.db);
  return connection;
}

test("article queries sort dates, filter featured records and safely look up slugs", (t) => {
  const { repositories } = setup(t);
  const repository = repositories.articles;
  for (const [index, article] of [...articles].reverse().entries())
    repository.save({ ...article, featured: index !== 1 });
  assert.deepEqual(
    repository.list().map((row) => row.slug),
    articles.map((row) => row.slug),
  );
  assert.equal(repository.listFeatured(1)[0]?.slug, articles[0].slug);
  assert.equal(repository.listFeatured(10).length, 2);
  assert.equal(repository.findBySlug("missing"), undefined);
  assert.equal(repository.findBySlug("' OR 1=1 --"), undefined);
  assert.throws(() => repository.listFeatured(-1), RangeError);
  assert.throws(() => repository.listFeatured(1.5), RangeError);
});

test("saving updates one article and clears optional fields, deleting reports existence", (t) => {
  const repository = setup(t).repositories.articles;
  repository.save(articles[0]);
  const updated = {
    ...articles[0],
    title: "Updated",
    body: null,
    image: null,
    featured: false,
  };
  repository.save(updated);
  assert.equal(repository.list().length, 1);
  assert.deepEqual(repository.findBySlug(updated.slug), updated);
  assert.equal(repository.listFeatured().length, 0);
  assert.equal(repository.deleteBySlug(updated.slug), true);
  assert.equal(repository.deleteBySlug(updated.slug), false);
});

test("project repository supports upserts, featured queries and SQLite status constraints", (t) => {
  const repository = setup(t).repositories.projects;
  for (const project of [...projects].reverse()) repository.save(project);
  assert.deepEqual(
    repository.list().map((row) => row.slug),
    projects.map((row) => row.slug),
  );
  assert.equal(repository.listFeatured(1).length, 1);
  repository.save({
    ...projects[0],
    title: "Changed",
    date: null,
    featured: false,
  });
  assert.equal(repository.findBySlug(projects[0].slug)?.title, "Changed");
  assert.equal(repository.findBySlug(projects[0].slug)?.date, null);
  assert.equal(repository.listFeatured()[0]?.slug, projects[1].slug);
  assert.throws(() =>
    repository.save({ ...projects[0], status: "invalid" as "published" }),
  );
  assert.equal(repository.findBySlug("missing"), undefined);
  assert.throws(() => repository.listFeatured(0), RangeError);
  assert.equal(repository.deleteBySlug(projects[1].slug), true);
  assert.equal(repository.deleteBySlug(projects[1].slug), false);
});

test("migrations and seed can be repeated without erasing edited records", (t) => {
  const database = setup(t);
  const { db, repositories } = database;
  seedDemoContent(database);
  repositories.articles.save({ ...articles[0], title: "Editorial change" });
  repositories.projects.save({ ...projects[0], title: "Project change" });
  migrateDatabase(db);
  seedDemoContent(database);
  assert.equal(repositories.articles.list().length, articles.length);
  assert.equal(repositories.projects.list().length, projects.length);
  assert.equal(
    repositories.articles.findBySlug(articles[0].slug)?.title,
    "Editorial change",
  );
  assert.equal(
    repositories.projects.findBySlug(projects[0].slug)?.title,
    "Project change",
  );
});

test("file-backed SQLite persists data after the connection is closed", () => {
  const directory = mkdtempSync(join(tmpdir(), "enzotasca-db-"));
  try {
    const file = join(directory, "site.sqlite");
    const first = createDatabaseLayer({ filename: file });
    try {
      migrateDatabase(first.db);
      first.repositories.articles.save(articles[0]);
    } finally {
      first.close();
    }
    const second = createDatabaseLayer({ filename: file });
    try {
      assert.equal(
        second.repositories.articles.findBySlug(articles[0].slug)?.title,
        articles[0].title,
      );
    } finally {
      second.close();
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("Drizzle applies insert defaults and upserts preserve omitted fields while null clears them", (t) => {
  const { articles: repository } = setup(t).repositories;
  const input = {
    slug: "minimal-article",
    title: "Minimal",
    description: "Description",
    tag: "Web",
    href: "/articoli/minimal-article",
    publishedAt: "2026-11-01",
  };
  repository.save(input);
  assert.equal(repository.findBySlug(input.slug)?.featured, false);
  assert.equal(repository.findBySlug(input.slug)?.body, null);
  repository.save({ ...input, body: "Full body", featured: true });
  repository.save({ ...input, title: "Updated title" });
  const updated = repository.findBySlug(input.slug);
  assert.equal(updated?.title, "Updated title");
  assert.equal(updated?.body, "Full body");
  assert.equal(updated?.featured, true);
  repository.save({ ...input, body: null });
  assert.equal(repository.findBySlug(input.slug)?.body, null);
});
