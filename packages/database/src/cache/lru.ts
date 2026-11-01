export function createLruCache({ max = 256 }: { max?: number } = {}) {
  if (!Number.isSafeInteger(max) || max < 1) {
    throw new RangeError("max must be a positive integer");
  }
  // Map order runs from least recently used to most recently used.
  const entries = new Map<string, unknown>();

  return {
    remember<T>(key: string, load: () => T): T {
      // has() also recognizes a cached missing row (undefined).
      if (entries.has(key)) {
        const cached = entries.get(key);
        entries.delete(key);
        entries.set(key, cached);
        return structuredClone(cached) as T;
      }
      const value = load();
      // Callers can mutate their result without corrupting cached records.
      entries.set(key, structuredClone(value));
      if (entries.size > max) {
        const oldest = entries.keys().next();
        if (!oldest.done) entries.delete(oldest.value);
      }
      return value;
    },
    clear() {
      entries.clear();
    },
  };
}

export type LruCache = ReturnType<typeof createLruCache>;
