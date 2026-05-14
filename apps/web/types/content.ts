export type TagVariant = "default" | "mint";

export type Skill = {
  body: string;
  tagVariant?: TagVariant;
  tags: string[];
  title: string;
  tone: string;
};

export type Article = {
  accent?: string;
  body?: string;
  date?: string;
  description: string;
  href: string;
  image?: string;
  imageAlt?: string;
  publishedAt: string;
  slug: string;
  tag: string;
  title: string;
};

export type ProjectStatus = "in-progress" | "published";

export type Project = {
  body: string;
  className: string;
  cta: string;
  date?: string;
  href: string;
  image: string;
  imageAlt: string;
  meta: string;
  publishedAt: string;
  slug: string;
  status: ProjectStatus;
  title: string;
};
