import { desc, eq } from "drizzle-orm";
import { type NewProject, projects } from "../schema.ts";
import type { RepositoryContext } from "./context.ts";

export function createProjectRepository({
  db,
  read,
  write,
}: RepositoryContext) {
  return {
    list() {
      return read("list", () =>
        db
          .select()
          .from(projects)
          .orderBy(desc(projects.publishedAt), projects.slug)
          .all(),
      );
    },

    findBySlug(slug: string) {
      return read(`slug:${slug}`, () =>
        db.select().from(projects).where(eq(projects.slug, slug)).get(),
      );
    },

    listFeatured(limit = 4) {
      if (!Number.isSafeInteger(limit) || limit < 1)
        throw new RangeError("limit must be a positive integer");
      return read(`featured:${limit}`, () =>
        db
          .select()
          .from(projects)
          .where(eq(projects.featured, true))
          .orderBy(desc(projects.publishedAt), projects.slug)
          .limit(limit)
          .all(),
      );
    },

    save(project: NewProject): void {
      write(() =>
        db
          .insert(projects)
          .values(project)
          .onConflictDoUpdate({ target: projects.slug, set: project })
          .run(),
      );
    },

    deleteBySlug(slug: string): boolean {
      const result = write(() =>
        db.delete(projects).where(eq(projects.slug, slug)).run(),
      );
      return result.changes > 0;
    },
  };
}
