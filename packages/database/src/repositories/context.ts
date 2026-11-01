import type { LruCache } from "../cache/lru.ts";
import type { DatabaseExecutor } from "../sqlite/connection.ts";

// Explicit dependencies for queries; SQLite policy lives in the owning layer.
export function createRepositoryContext(
  db: DatabaseExecutor,
  cache: LruCache,
  canUseCache: () => boolean,
  assertActive: () => void,
) {
  return {
    db,
    read<T>(key: string, load: () => T): T {
      assertActive();
      return canUseCache() ? cache.remember(key, load) : load();
    },
    write<T>(execute: () => T): T {
      assertActive();
      const result = execute();
      // Clear immediately, also inside transactions. A rollback leaves a cold
      // cache, never a cache containing uncommitted values.
      cache.clear();
      return result;
    },
  };
}

export type RepositoryContext = ReturnType<typeof createRepositoryContext>;
