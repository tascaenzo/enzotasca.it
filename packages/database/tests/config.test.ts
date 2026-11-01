import assert from "node:assert/strict";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { createDatabaseLayer } from "../src/index.ts";
import { getDatabasePath } from "../src/sqlite/config.ts";

test("SQLite path requires an absolute environment value with no implicit fallback", (t) => {
  const previous = process.env.SQLITE_PATH;
  t.after(() => {
    if (previous === undefined) delete process.env.SQLITE_PATH;
    else process.env.SQLITE_PATH = previous;
  });
  delete process.env.SQLITE_PATH;
  assert.throws(() => getDatabasePath(), /SQLITE_PATH is required/);
  assert.throws(() => createDatabaseLayer(), /SQLITE_PATH is required/);
  for (const empty of ["", "   "]) {
    process.env.SQLITE_PATH = empty;
    assert.throws(() => getDatabasePath(), /SQLITE_PATH is required/);
  }
  process.env.SQLITE_PATH = "data/site.sqlite";
  assert.throws(() => getDatabasePath(), /absolute path/);
  const absolute = join(tmpdir(), "site.sqlite");
  process.env.SQLITE_PATH = absolute;
  assert.equal(getDatabasePath(), absolute);
  delete process.env.SQLITE_PATH;
  const database = createDatabaseLayer({ filename: ":memory:" });
  database.close();
});
