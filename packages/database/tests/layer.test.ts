import assert from "node:assert/strict";
import { type TestContext, test } from "node:test";
import { migrateDatabase } from "../scripts/migrations.ts";
import { articles, projects } from "../scripts/seed/data.ts";
import { seedDemoContent } from "../scripts/seed/seed-content.ts";
import { createDatabaseLayer, type Repositories } from "../src/index.ts";

function setup(t: TestContext) {
  const database = createDatabaseLayer({ filename: ":memory:" });
  t.after(() => database.close());
  migrateDatabase(database.db);
  seedDemoContent(database);
  return database;
}

test("transaction commits both entities, returns a result and invalidates their cached lists", (t) => {
  const database = setup(t);
  const { repositories } = database;
  repositories.articles.list();
  repositories.articles.listFeatured();
  repositories.projects.list();
  repositories.projects.listFeatured();
  const result = database.transaction((scoped) => {
    scoped.articles.save({
      ...articles[0],
      title: "Committed article",
      featured: false,
    });
    scoped.projects.save({
      ...projects[0],
      title: "Committed project",
      featured: false,
    });
    assert.equal(
      scoped.articles.findBySlug(articles[0].slug)?.title,
      "Committed article",
    );
    assert.equal(
      scoped.projects.findBySlug(projects[0].slug)?.title,
      "Committed project",
    );
    // Repositories obtained before the transaction must also see its writes.
    assert.equal(
      repositories.articles.findBySlug(articles[0].slug)?.title,
      "Committed article",
    );
    return "committed";
  });
  assert.equal(result, "committed");
  assert.equal(repositories.articles.list()[0].title, "Committed article");
  assert.equal(repositories.projects.list()[0].title, "Committed project");
  assert.ok(
    repositories.articles
      .listFeatured()
      .every((row) => row.slug !== articles[0].slug),
  );
  assert.ok(
    repositories.projects
      .listFeatured()
      .every((row) => row.slug !== projects[0].slug),
  );
});

test("a failed write rolls back both entities without leaking transaction results into cache", (t) => {
  const database = setup(t);
  const { repositories } = database;
  const originalArticles = repositories.articles.list();
  const originalProjects = repositories.projects.list();
  assert.throws(
    () =>
      database.transaction((scoped) => {
        scoped.articles.save({ ...articles[0], title: "Uncommitted article" });
        scoped.projects.save({
          ...projects[0],
          title: "Uncommitted project",
        });
        assert.equal(scoped.articles.list()[0].title, "Uncommitted article");
        assert.equal(scoped.projects.list()[0].title, "Uncommitted project");
        scoped.projects.save({
          ...projects[0],
          status: "invalid" as "published",
        });
      }),
    /CHECK constraint/,
  );
  assert.deepEqual(repositories.articles.list(), originalArticles);
  assert.deepEqual(repositories.projects.list(), originalProjects);
});

test("repositories scoped to a transaction cannot be reused after commit or rollback", (t) => {
  const database = setup(t);
  let committed: Repositories | undefined;
  database.transaction((scoped) => {
    committed = scoped;
  });
  assert.throws(() => committed?.articles.list(), /no longer active/);
  assert.throws(
    () => committed?.projects.save(projects[0]),
    /no longer active/,
  );
  let rolledBack: Repositories | undefined;
  assert.throws(
    () =>
      database.transaction((scoped) => {
        rolledBack = scoped;
        throw new Error("cancel");
      }),
    /cancel/,
  );
  assert.throws(
    () => rolledBack?.articles.save(articles[0]),
    /no longer active/,
  );
});

test("async transaction results are rejected and synchronous writes are rolled back", (t) => {
  const database = setup(t);
  assert.throws(() => {
    // @ts-expect-error SQLite transaction callbacks must be synchronous.
    database.transaction((scoped) => {
      scoped.articles.save({ ...articles[0], title: "Must roll back" });
      return Promise.resolve("not allowed");
    });
  }, /synchronous callback/);
  assert.equal(
    database.repositories.articles.findBySlug(articles[0].slug)?.title,
    articles[0].title,
  );
});

test("closing the layer clears caches, is idempotent, and prevents reads and writes", (t) => {
  const database = setup(t);
  database.repositories.articles.list();
  database.close();
  database.close();
  assert.throws(() => database.repositories.articles.list(), /closed/);
  assert.throws(
    () => database.repositories.projects.save(projects[0]),
    /closed/,
  );
  assert.throws(() => database.transaction(() => "result"), /closed/);
});

test("closing during a transaction is rejected and its writes roll back", (t) => {
  const database = setup(t);
  assert.throws(
    () =>
      database.transaction((scoped) => {
        scoped.articles.save({ ...articles[0], title: "Must roll back" });
        database.close();
      }),
    /during a transaction/,
  );
  assert.equal(
    database.repositories.articles.findBySlug(articles[0].slug)?.title,
    articles[0].title,
  );
});
