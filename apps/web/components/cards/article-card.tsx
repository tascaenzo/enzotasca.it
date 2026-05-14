import Image from "next/image";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import type { Article } from "@/types/content";

type ArticleCardProps = Article;

export function ArticleCard({
  accent,
  date,
  description,
  href = "#newsletter",
  image,
  imageAlt,
  publishedAt,
  tag,
  title,
}: ArticleCardProps) {
  const titleId = `article-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const isExternal = href.startsWith("http");
  const cardClassName = cn(
    "group flex min-h-105 cursor-pointer flex-col overflow-hidden rounded-ds-lg transition-shadow duration-300 hover:shadow-xl focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ds-blue",
    accent ?? "bg-ds-white",
  );

  return (
    <article aria-labelledby={titleId} className="min-h-105">
      {isExternal ? (
        <a className={cardClassName} href={href} rel="noreferrer" target="_blank">
          {image ? (
            <div className="relative aspect-16/10 overflow-hidden bg-ds-surface">
              <Image
                alt={imageAlt ?? ""}
                className={cn(
                  "object-cover transition-transform duration-500",
                  "group-hover:scale-[1.03]",
                )}
                fill
                sizes="(min-width: 1024px) 389px, 100vw"
                src={image}
              />
            </div>
          ) : null}
          <div className="flex flex-1 flex-col justify-between p-8">
            <div className="flex flex-col gap-4">
              <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-mono-sm uppercase", accent ? "text-ds-green-ink" : "text-ds-blue")}>
                <p>{tag}</p>
                {date ? <time dateTime={publishedAt}>{date}</time> : null}
              </div>
              <h3 className="text-title-md text-ds-ink" id={titleId}>
                {title}
              </h3>
              <p className="text-body-sm text-ds-warm-muted">{description}</p>
            </div>
          </div>
        </a>
      ) : (
        <Link className={cardClassName} href={href}>
          {image ? (
            <div className="relative aspect-16/10 overflow-hidden bg-ds-surface">
              <Image
                alt={imageAlt ?? ""}
                className={cn(
                  "object-cover transition-transform duration-500",
                  "group-hover:scale-[1.03]",
                )}
                fill
                sizes="(min-width: 1024px) 389px, 100vw"
                src={image}
              />
            </div>
          ) : null}
          <div className="flex flex-1 flex-col justify-between p-8">
            <div className="flex flex-col gap-4">
              <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-mono-sm uppercase", accent ? "text-ds-green-ink" : "text-ds-blue")}>
                <p>{tag}</p>
                {date ? <time dateTime={publishedAt}>{date}</time> : null}
              </div>
              <h3 className="text-title-md text-ds-ink" id={titleId}>
                {title}
              </h3>
              <p className="text-body-sm text-ds-warm-muted">{description}</p>
            </div>
          </div>
        </Link>
      )}
    </article>
  );
}
