import { createDatabaseLayer } from "../src/database.ts";
import { seedDemoContent } from "./seed/seed-content.ts";

const database = createDatabaseLayer();
try {
  seedDemoContent(database);
  console.log("Demo content inserted; existing records preserved.");
} finally {
  database.close();
}
