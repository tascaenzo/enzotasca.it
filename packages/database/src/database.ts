import { createLruCache } from "./cache/lru.ts";
import { createArticleRepository } from "./repositories/articles.ts";
import { createRepositoryContext } from "./repositories/context.ts";
import { createProjectRepository } from "./repositories/projects.ts";
import { createSkillRepository } from "./repositories/skills.ts";
import {
  type DatabaseExecutor,
  openSqliteConnection,
} from "./sqlite/connection.ts";

function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return (
    value !== null &&
    (typeof value === "object" || typeof value === "function") &&
    "then" in value &&
    typeof value.then === "function"
  );
}

export function createDatabaseLayer({
  filename,
  cacheMax = 256,
}: {
  filename?: string;
  cacheMax?: number;
} = {}) {
  const caches = {
    skills: createLruCache({ max: cacheMax }),
    articles: createLruCache({ max: cacheMax }),
    projects: createLruCache({ max: cacheMax }),
  };
  const connection = openSqliteConnection(filename);
  const sqlite = connection.db.$client;

  function assertOpen() {
    if (!sqlite.open) throw new Error("Database layer is closed");
  }

  function buildRepositories(db: DatabaseExecutor, assertActive = assertOpen) {
    const canUseCache = () => !sqlite.inTransaction;
    return {
      skills: createSkillRepository(
        createRepositoryContext(db, caches.skills, canUseCache, assertActive),
      ),
      articles: createArticleRepository(
        createRepositoryContext(db, caches.articles, canUseCache, assertActive),
      ),
      projects: createProjectRepository(
        createRepositoryContext(db, caches.projects, canUseCache, assertActive),
      ),
    };
  }

  const repositories = buildRepositories(connection.db);

  function transaction<Result>(
    work: (
      repositories: Repositories,
    ) => Result & (Result extends PromiseLike<unknown> ? never : unknown),
  ): Result {
    assertOpen();
    return connection.db.transaction((tx) => {
      let active = true;
      const scopedRepositories = buildRepositories(tx, () => {
        assertOpen();
        if (!active)
          throw new Error("Transaction repositories are no longer active");
      });
      try {
        const result = work(scopedRepositories);
        if (isPromiseLike(result))
          throw new TypeError(
            "SQLite transactions require a synchronous callback",
          );
        return result;
      } finally {
        // Prevent accidental writes through repositories retained by the caller.
        active = false;
      }
    });
  }

  return {
    // Raw Drizzle access is reserved for migrations and test tooling.
    db: connection.db,
    repositories,
    transaction,
    close() {
      if (sqlite.inTransaction)
        throw new Error("Cannot close the database during a transaction");
      caches.skills.clear();
      caches.articles.clear();
      caches.projects.clear();
      if (sqlite.open) connection.close();
    },
  };
}

export type DatabaseLayer = ReturnType<typeof createDatabaseLayer>;
export type Repositories = DatabaseLayer["repositories"];
