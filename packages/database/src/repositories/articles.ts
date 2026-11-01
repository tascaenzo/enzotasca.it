import { desc, eq } from "drizzle-orm";
import { articles, type NewArticle } from "../schema.ts";
import type { RepositoryContext } from "./context.ts";

export function createArticleRepository({
  db,
  read,
  write,
}: RepositoryContext) {
  return {
    list() {
      return read("list", () =>
        db
          .select()
          .from(articles)
          .orderBy(desc(articles.publishedAt), articles.slug)
          .all(),
      );
    },

    findBySlug(slug: string) {
      return read(`slug:${slug}`, () =>
        db.select().from(articles).where(eq(articles.slug, slug)).get(),
      );
    },

    listFeatured(limit = 3) {
      if (!Number.isSafeInteger(limit) || limit < 1)
        throw new RangeError("limit must be a positive integer");
      return read(`featured:${limit}`, () =>
        db
          .select()
          .from(articles)
          .where(eq(articles.featured, true))
          .orderBy(desc(articles.publishedAt), articles.slug)
          .limit(limit)
          .all(),
      );
    },

    save(article: NewArticle): void {
      write(() =>
        db
          .insert(articles)
          .values(article)
          .onConflictDoUpdate({ target: articles.slug, set: article })
          .run(),
      );
    },

    deleteBySlug(slug: string): boolean {
      const result = write(() =>
        db.delete(articles).where(eq(articles.slug, slug)).run(),
      );
      return result.changes > 0;
    },
  };
}
