import assert from "node:assert/strict";
import { type TestContext, test } from "node:test";
import { migrateDatabase } from "../scripts/migrations.ts";
import { articles, projects } from "../scripts/seed/data.ts";
import { seedDemoContent } from "../scripts/seed/seed-content.ts";
import { createLruCache } from "../src/cache/lru.ts";
import { createDatabaseLayer } from "../src/index.ts";

function setup(t: TestContext) {
  const connection = createDatabaseLayer({ filename: ":memory:" });
  t.after(() => connection.close());
  migrateDatabase(connection.db);
  seedDemoContent(connection);
  return connection;
}

test("LRU evicts the least recently read key when capacity is exceeded", () => {
  const cache = createLruCache({ max: 2 });
  let loads = 0;
  const read = (key: string) => cache.remember(key, () => ++loads);
  assert.equal(read("a"), 1);
  assert.equal(read("b"), 2);
  assert.equal(read("a"), 1);
  assert.equal(read("c"), 3);
  assert.equal(read("a"), 1);
  assert.equal(read("b"), 4);
});

test("missing rows stay cached until explicit invalidation", () => {
  const cache = createLruCache();
  let loads = 0;
  const read = () =>
    cache.remember("missing", () => {
      loads++;
      return undefined;
    });
  read();
  read();
  assert.equal(loads, 1);
  cache.clear();
  read();
  assert.equal(loads, 2);
});

test("layer repositories share cached queries and returned values cannot corrupt the cache", (t) => {
  const { db, repositories } = setup(t);
  const prepare = t.mock.method(db.$client, "prepare");
  const first = repositories.articles.list();
  assert.equal(prepare.mock.callCount(), 1);
  first[0].title = "Caller mutation";
  first.length = 1;
  const second = repositories.articles.list();
  assert.equal(prepare.mock.callCount(), 1);
  assert.equal(second.length, articles.length);
  assert.equal(second[0].title, articles[0].title);
  second[0].title = "Another mutation";
  assert.equal(repositories.articles.list()[0].title, articles[0].title);
  assert.equal(prepare.mock.callCount(), 1);
});

test("saving invalidates lookups, lists and featured queries in the layer", (t) => {
  const { db, repositories } = setup(t);
  const reader = repositories.articles;
  reader.list();
  reader.listFeatured(1);
  reader.listFeatured(2);
  assert.equal(reader.findBySlug("new"), undefined);
  reader.findBySlug(articles[0].slug);
  repositories.projects.list();
  repositories.articles.save({
    ...articles[0],
    title: "Updated",
    featured: false,
  });
  assert.equal(reader.findBySlug(articles[0].slug)?.title, "Updated");
  assert.equal(reader.list()[0].title, "Updated");
  assert.equal(reader.listFeatured(1)[0]?.slug, articles[1].slug);
  assert.equal(reader.listFeatured(2).length, 2);
  repositories.articles.save({
    ...articles[0],
    slug: "new",
    publishedAt: "2030-01-01",
  });
  assert.equal(reader.findBySlug("new")?.slug, "new");
  assert.equal(reader.list()[0].slug, "new");
  // Article writes do not evict unrelated project queries.
  const prepare = t.mock.method(db.$client, "prepare");
  repositories.projects.list();
  assert.equal(prepare.mock.callCount(), 0);
});

test("deleting invalidates cached rows and lists for both entities", (t) => {
  const { repositories } = setup(t);
  for (const [repository, slug] of [
    [repositories.articles, articles[0].slug],
    [repositories.projects, projects[0].slug],
  ] as const) {
    repository.findBySlug(slug);
    const before = repository.list().length;
    repository.listFeatured();
    assert.equal(repository.deleteBySlug(slug), true);
    assert.equal(repository.findBySlug(slug), undefined);
    assert.equal(repository.list().length, before - 1);
    assert.ok(repository.listFeatured().every((row) => row.slug !== slug));
  }
});

test("transaction reads bypass cache and rollback never leaks uncommitted results", (t) => {
  const { db, repositories } = setup(t);
  const repository = repositories.articles;
  repository.findBySlug(articles[0].slug);
  assert.throws(
    () =>
      db.transaction(() => {
        repository.save({ ...articles[0], title: "Rolled back" });
        assert.equal(
          repository.findBySlug(articles[0].slug)?.title,
          "Rolled back",
        );
        throw new Error("rollback");
      }),
    /rollback/,
  );
  assert.equal(
    repository.findBySlug(articles[0].slug)?.title,
    articles[0].title,
  );
  db.transaction(() => {
    repository.save({ ...articles[0], title: "Committed" });
    assert.equal(repository.findBySlug(articles[0].slug)?.title, "Committed");
  });
  assert.equal(repository.findBySlug(articles[0].slug)?.title, "Committed");
});

test("connections have separate caches and project writes invalidate cached project queries", (t) => {
  const first = setup(t);
  const second = setup(t);
  const repository = first.repositories.projects;
  repository.findBySlug(projects[0].slug);
  repository.list();
  repository.listFeatured();
  repository.save({
    ...projects[0],
    title: "Changed project",
    featured: false,
  });
  assert.equal(
    repository.findBySlug(projects[0].slug)?.title,
    "Changed project",
  );
  assert.equal(repository.list()[0].title, "Changed project");
  assert.ok(
    repository.listFeatured().every((row) => row.slug !== projects[0].slug),
  );
  assert.equal(
    second.repositories.projects.findBySlug(projects[0].slug)?.title,
    projects[0].title,
  );
});

test("cache capacity must be a positive integer", () => {
  for (const max of [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.throws(() => createLruCache({ max }), RangeError);
  }
  const cache = createLruCache({ max: 1 });
  cache.remember("first", () => 1);
  cache.remember("second", () => 2);
  assert.equal(
    cache.remember("first", () => 3),
    3,
  );
});

test("failed loads do not replace valid cache entries or cache errors", () => {
  const cache = createLruCache({ max: 1 });
  cache.remember("valid", () => "original");
  assert.throws(
    () =>
      cache.remember("failure", () => {
        throw new Error("query failed");
      }),
    /query failed/,
  );
  assert.equal(
    cache.remember("valid", () => "reloaded"),
    "original",
  );
  assert.equal(
    cache.remember("failure", () => "recovered"),
    "recovered",
  );
});
