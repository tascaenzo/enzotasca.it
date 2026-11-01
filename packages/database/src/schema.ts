import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const articles = sqliteTable(
  "articles",
  {
    slug: text("slug").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    body: text("body"),
    tag: text("tag").notNull(),
    href: text("href").notNull(),
    image: text("image"),
    imageAlt: text("image_alt"),
    accent: text("accent"),
    date: text("display_date"),
    publishedAt: text("published_at").notNull(),
    featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  },
  (table) => [index("articles_published_at_idx").on(table.publishedAt)],
);

export const projects = sqliteTable(
  "projects",
  {
    slug: text("slug").primaryKey(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    className: text("class_name").notNull(),
    cta: text("cta").notNull(),
    date: text("display_date"),
    href: text("href").notNull(),
    image: text("image").notNull(),
    imageAlt: text("image_alt").notNull(),
    meta: text("meta").notNull(),
    publishedAt: text("published_at").notNull(),
    status: text("status", { enum: ["in-progress", "published"] }).notNull(),
    featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  },
  (table) => [
    index("projects_published_at_idx").on(table.publishedAt),
    check(
      "projects_status_check",
      sql`${table.status} in ('in-progress', 'published')`,
    ),
  ],
);

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type ProjectStatus = Project["status"];

export const skills = sqliteTable(
  "skills",
  {
    slug: text("slug").primaryKey(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    tags: text("tags", { mode: "json" }).$type<string[]>().notNull(),
    tone: text("tone").notNull(),
    tagVariant: text("tag_variant", { enum: ["default", "mint"] })
      .notNull()
      .default("default"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [
    index("skills_sort_order_idx").on(table.sortOrder),
    check(
      "skills_tag_variant_check",
      sql`${table.tagVariant} in ('default', 'mint')`,
    ),
  ],
);

export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
