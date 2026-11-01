import { isAbsolute } from "node:path";

export function getDatabasePath(): string {
  const filename = process.env.SQLITE_PATH;
  if (!filename?.trim()) {
    throw new Error(
      "SQLITE_PATH is required: set an absolute path to the SQLite database file",
    );
  }
  if (!isAbsolute(filename)) {
    throw new Error(
      "SQLITE_PATH must be an absolute path to the SQLite database file",
    );
  }
  return filename;
}
