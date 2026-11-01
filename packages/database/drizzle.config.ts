import { defineConfig } from "drizzle-kit";
import { getDatabasePath } from "./src/sqlite/config.ts";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/schema.ts",
  out: "./drizzle",
  dbCredentials: { url: getDatabasePath() },
});
