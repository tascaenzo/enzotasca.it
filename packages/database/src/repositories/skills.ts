import { asc, eq } from "drizzle-orm";
import { type NewSkill, skills } from "../schema.ts";
import type { RepositoryContext } from "./context.ts";

export function createSkillRepository({ db, read, write }: RepositoryContext) {
  return {
    list() {
      return read("list", () =>
        db
          .select()
          .from(skills)
          .orderBy(asc(skills.sortOrder), skills.slug)
          .all(),
      );
    },
    findBySlug(slug: string) {
      return read(`slug:${slug}`, () =>
        db.select().from(skills).where(eq(skills.slug, slug)).get(),
      );
    },
    save(skill: NewSkill): void {
      write(() =>
        db
          .insert(skills)
          .values(skill)
          .onConflictDoUpdate({ target: skills.slug, set: skill })
          .run(),
      );
    },
    deleteBySlug(slug: string): boolean {
      return (
        write(() => db.delete(skills).where(eq(skills.slug, slug)).run())
          .changes > 0
      );
    },
  };
}
