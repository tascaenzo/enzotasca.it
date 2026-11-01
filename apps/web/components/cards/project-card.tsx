import { cn } from "@enzotasca/ui";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  index: number;
  project: Project;
};

export function ProjectCard({ index, project }: ProjectCardProps) {
  const titleId = `project-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const isExternal = project.href.startsWith("http");
  const cardClassName = cn(
    "group block cursor-pointer overflow-hidden rounded-ds-lg transition-shadow duration-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ds-mint",
    project.className,
  );

  return (
    <article aria-labelledby={titleId} className="flex flex-col gap-4">
      {isExternal ? (
        <a
          className={cardClassName}
          href={project.href}
          rel="noreferrer"
          target="_blank"
        >
          <div className="relative aspect-[16/10] bg-ds-ink">
            <Image
              alt={project.imageAlt}
              className="object-cover opacity-85 mix-blend-screen transition-transform duration-500 group-hover:scale-[1.03]"
              fill
              sizes="(min-width: 1024px) 676px, 100vw"
              src={project.image}
            />
          </div>
          <div className="p-8">
            <div className="flex min-h-[220px] flex-col justify-between">
              <div className="flex flex-col gap-3">
                <p className="font-mono text-mono-sm uppercase text-ds-mint">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {project.status === "in-progress" ? "In corso" : "Pubblicato"}
                </p>
                <h3
                  className="max-w-md text-title-md text-ds-white"
                  id={titleId}
                >
                  {project.title}
                </h3>
                {project.date ? (
                  <time
                    className="font-mono text-mono-sm text-ds-mint"
                    dateTime={project.publishedAt}
                  >
                    {project.date}
                  </time>
                ) : null}
                <p className="max-w-sm text-body-sm text-ds-slate-muted">
                  {project.body}
                </p>
                <span className="mt-4 w-fit font-mono text-mono-sm text-ds-white underline underline-offset-4 transition-colors group-hover:text-ds-mint">
                  {project.cta}
                </span>
              </div>
            </div>
          </div>
        </a>
      ) : (
        <Link className={cardClassName} href={project.href}>
          <div className="relative aspect-[16/10] bg-ds-ink">
            <Image
              alt={project.imageAlt}
              className="object-cover opacity-85 mix-blend-screen transition-transform duration-500 group-hover:scale-[1.03]"
              fill
              sizes="(min-width: 1024px) 676px, 100vw"
              src={project.image}
            />
          </div>
          <div className="p-8">
            <div className="flex min-h-[220px] flex-col justify-between">
              <div className="flex flex-col gap-3">
                <p className="font-mono text-mono-sm uppercase text-ds-mint">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {project.status === "in-progress" ? "In corso" : "Pubblicato"}
                </p>
                <h3
                  className="max-w-md text-title-md text-ds-white"
                  id={titleId}
                >
                  {project.title}
                </h3>
                {project.date ? (
                  <time
                    className="font-mono text-mono-sm text-ds-mint"
                    dateTime={project.publishedAt}
                  >
                    {project.date}
                  </time>
                ) : null}
                <p className="max-w-sm text-body-sm text-ds-slate-muted">
                  {project.body}
                </p>
                <span className="mt-4 w-fit font-mono text-mono-sm text-ds-white underline underline-offset-4 transition-colors group-hover:text-ds-mint">
                  {project.cta}
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}
      <p className="font-mono text-mono-sm text-ds-muted-strong">
        {project.meta}
      </p>
    </article>
  );
}
