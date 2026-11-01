import "server-only";
import { createDatabaseLayer, type DatabaseLayer } from "@enzotasca/database";

const globalDatabase = globalThis as typeof globalThis & {
  siteDatabaseLayer?: DatabaseLayer;
};

export function getDatabaseLayer() {
  if (!globalDatabase.siteDatabaseLayer) {
    globalDatabase.siteDatabaseLayer = createDatabaseLayer();
  }
  return globalDatabase.siteDatabaseLayer;
}

export function getRepositories() {
  return getDatabaseLayer().repositories;
}
