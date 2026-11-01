import assert from "node:assert/strict";
import { type TestContext, test } from "node:test";
import { migrateDatabase } from "../scripts/migrations.ts";
import { articles, skills } from "../scripts/seed/data.ts";
import { seedDemoContent } from "../scripts/seed/seed-content.ts";
import { createDatabaseLayer } from "../src/index.ts";

function setup(t: TestContext) {
  const database = createDatabaseLayer({ filename: ":memory:" });
  t.after(() => database.close());
  migrateDatabase(database.db);
  return database;
}

test("seed stores all former skill mock data and preserves edits when repeated", (t) => {
  const database = setup(t);
  const repository = database.repositories.skills;
  assert.deepEqual(repository.list(), []);
  assert.equal(repository.findBySlug(skills[0].slug), undefined);
  seedDemoContent(database);
  assert.deepEqual(repository.list(), skills);
  const edited = { ...skills[0], title: "Edited skill", tags: ["Updated"] };
  repository.save(edited);
  migrateDatabase(database.db);
  seedDemoContent(database);
  assert.equal(repository.list().length, 3);
  assert.deepEqual(repository.findBySlug(edited.slug), edited);
  assert.deepEqual(repository.list().slice(1), skills.slice(1));
});

test("skills query ordering, JSON tags and cached records survive updates and deletion", (t) => {
  const database = setup(t);
  const repository = database.repositories.skills;
  for (const skill of [...skills].reverse()) repository.save(skill);
  assert.deepEqual(
    repository.list().map((skill) => skill.slug),
    skills.map((skill) => skill.slug),
  );
  const prepare = t.mock.method(database.db.$client, "prepare");
  const first = repository.findBySlug(skills[0].slug);
  assert.ok(first);
  first.tags.push("Caller mutation");
  assert.deepEqual(repository.findBySlug(skills[0].slug)?.tags, skills[0].tags);
  assert.equal(prepare.mock.callCount(), 1);
  repository.save({ ...skills[2], sortOrder: 0 });
  assert.equal(repository.list()[0].slug, skills[2].slug);
  repository.save({ ...skills[1], sortOrder: 0 });
  assert.deepEqual(
    repository
      .list()
      .slice(0, 2)
      .map((skill) => skill.slug),
    [skills[2].slug, skills[1].slug].sort(),
  );
  assert.equal(repository.deleteBySlug(skills[0].slug), true);
  assert.equal(repository.findBySlug(skills[0].slug), undefined);
  assert.equal(repository.list().length, 2);
  assert.equal(repository.deleteBySlug(skills[0].slug), false);
  assert.equal(repository.findBySlug("' OR 1=1 --"), undefined);
});

test("skill defaults come from Drizzle and invalid variants roll back all entity writes", (t) => {
  const database = setup(t);
  database.repositories.skills.save({
    slug: "minimal",
    title: "Minimal",
    body: "Body",
    tags: [],
    tone: "bg-ds-paper",
  });
  assert.equal(
    database.repositories.skills.findBySlug("minimal")?.tagVariant,
    "default",
  );
  assert.equal(
    database.repositories.skills.findBySlug("minimal")?.sortOrder,
    0,
  );
  seedDemoContent(database);
  database.repositories.skills.list();
  database.repositories.articles.findBySlug(articles[0].slug);
  assert.throws(
    () =>
      database.transaction((scoped) => {
        scoped.articles.save({ ...articles[0], title: "Must roll back" });
        scoped.skills.save({ ...skills[0], title: "Must roll back" });
        assert.equal(
          scoped.skills.findBySlug(skills[0].slug)?.title,
          "Must roll back",
        );
        scoped.skills.save({
          ...skills[0],
          tagVariant: "invalid" as "default",
        });
      }),
    /CHECK constraint/,
  );
  assert.deepEqual(
    database.repositories.skills.findBySlug(skills[0].slug),
    skills[0],
  );
  assert.equal(
    database.repositories.articles.findBySlug(articles[0].slug)?.title,
    articles[0].title,
  );
});
