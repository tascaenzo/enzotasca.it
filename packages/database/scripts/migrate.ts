import { openSqliteConnection } from "../src/sqlite/connection.ts";
import { migrateDatabase } from "./migrations.ts";

const connection = openSqliteConnection();
try {
  migrateDatabase(connection.db);
  console.log("Database migrations applied.");
} finally {
  connection.close();
}
