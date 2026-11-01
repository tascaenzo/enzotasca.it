import { Container, Eyebrow, Section } from "@enzotasca/ui";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/navigation/button";
import { getRepositories } from "@/lib/server/repositories";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getRepositories().articles.findBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: article.href,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getRepositories().articles.findBySlug(slug);
  const t = await getTranslations("articles");

  if (!article) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: "Enzo Tasca",
    },
  };

  return (
    <main id="main-content" className="bg-ds-white">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD serialized as JSON with HTML delimiters escaped.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Section className="pt-20 md:pt-32">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,760px)_minmax(280px,360px)] lg:items-start lg:justify-between">
          <article className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <Eyebrow>{article.tag}</Eyebrow>
              <h1 className="text-headline-lg text-ds-ink md:text-display-lg">
                {article.title}
              </h1>
              <p className="max-w-2xl text-body-xl text-ds-warm-muted">
                {article.description}
              </p>
              {article.date ? (
                <time
                  className="font-mono text-mono-sm uppercase text-ds-blue"
                  dateTime={article.publishedAt}
                >
                  {article.date}
                </time>
              ) : null}
            </div>

            {article.image ? (
              <div className="relative aspect-16/10 overflow-hidden rounded-ds-lg bg-ds-surface">
                <Image
                  alt={article.imageAlt ?? ""}
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 1024px) 760px, 100vw"
                  src={article.image}
                />
              </div>
            ) : null}

            <div className="max-w-3xl space-y-6 text-body-lg text-ds-warm-muted">
              <p>{article.body}</p>
            </div>
          </article>

          <aside
            aria-label={t("asideTitle")}
            className="rounded-ds-lg bg-ds-surface p-8"
          >
            <p className="font-mono text-mono-sm uppercase text-ds-blue">
              {t("asideTitle")}
            </p>
            <p className="mt-4 text-body-md text-ds-warm-muted">
              {t("asideDescription")}
            </p>
            <Button className="mt-8 w-full" href="/#articoli" variant="outline">
              {t("backLink")}
            </Button>
          </aside>
        </Container>
      </Section>
    </main>
  );
}
