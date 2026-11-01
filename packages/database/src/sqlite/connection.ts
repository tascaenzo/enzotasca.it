import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import SQLite from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../schema.ts";
import { getDatabasePath } from "./config.ts";

export function openSqliteConnection(filename = getDatabasePath()) {
  if (filename !== ":memory:")
    mkdirSync(dirname(filename), { recursive: true });
  const sqlite = new SQLite(filename);
  try {
    sqlite.pragma("foreign_keys = ON");
    sqlite.pragma("busy_timeout = 5000");
    if (filename !== ":memory:") sqlite.pragma("journal_mode = WAL");
    return { db: drizzle(sqlite, { schema }), close: () => sqlite.close() };
  } catch (error) {
    sqlite.close();
    throw error;
  }
}

export type Database = ReturnType<typeof openSqliteConnection>["db"];

export type DatabaseTransaction = Parameters<
  Parameters<Database["transaction"]>[0]
>[0];
export type DatabaseExecutor = Database | DatabaseTransaction;
