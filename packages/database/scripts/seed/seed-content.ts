import type { DatabaseLayer } from "../../src/database.ts";
import { articles, projects, skills } from "./data.ts";

// Explicitly seed demo content through the same write and cache policy as the app.
export function seedDemoContent(database: DatabaseLayer): void {
  database.transaction((repositories) => {
    for (const skill of skills) {
      if (!repositories.skills.findBySlug(skill.slug))
        repositories.skills.save(skill);
    }
    for (const article of articles) {
      if (!repositories.articles.findBySlug(article.slug))
        repositories.articles.save(article);
    }
    for (const project of projects) {
      if (!repositories.projects.findBySlug(project.slug))
        repositories.projects.save(project);
    }
  });
}
