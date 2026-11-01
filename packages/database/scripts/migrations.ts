import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import type { Database } from "../src/sqlite/connection.ts";

const migrationsDirectory = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../drizzle",
);

export function migrateDatabase(db: Database): void {
  migrate(db, { migrationsFolder: migrationsDirectory });
}
