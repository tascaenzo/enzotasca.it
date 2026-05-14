import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArticleCard } from "@/components/cards/article-card";
import { ProjectCard } from "@/components/cards/project-card";
import { SkillCard } from "@/components/cards/skill-card";
import { Button } from "@/components/ui/button";
import { CheckboxField } from "@/components/ui/checkbox-field";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TextField } from "@/components/ui/text-field";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { SectionHeader } from "@/components/ui/section-header";
import { featuredArticles } from "@/mocks/articles";
import { featuredProjects } from "@/mocks/projects";
import { skills } from "@/mocks/skills";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Enzo Tasca",
  jobTitle: "Sviluppatore web",
  description:
    "Sviluppatore web che crea e racconta progetti di elettronica e informatica attraverso articoli tecnici e video YouTube.",
  url: "https://enzotasca.dev",
  knowsAbout: [
    "Sviluppo web",
    "Next.js",
    "React",
    "TypeScript",
    "Elettronica",
    "IoT",
    "YouTube",
  ],
};

export default async function Home() {
  const t = await getTranslations("home");
  const timeline = await getTranslations("timeline");

  return (
    <main id="main-content" className="bg-ds-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Section className="pt-20 md:pt-32">
        <Container className="grid gap-16 lg:grid-cols-[minmax(0,760px)_minmax(320px,420px)] lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6">
            <Eyebrow>{t("heroEyebrow")}</Eyebrow>
            <h1 className="max-w-195 text-headline-lg text-ds-ink md:text-display-lg">
              {t.rich("heroTitle", {
                highlight: (chunks) => (
                  <span className="text-ds-blue">{chunks}</span>
                ),
              })}
            </h1>
            <p className="max-w-2xl text-body-xl text-ds-warm-muted">
              {t("heroDescription")}
            </p>
            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <Button href="#progetti" variant="accent">
                {t("heroCtaProjects")}
              </Button>
              <Button href="#profilo" variant="secondary">
                {t("heroCtaProfile")}
              </Button>
            </div>
          </div>

          <figure
            className="flex flex-col gap-4"
            aria-labelledby="lab-visual-title"
          >
            <div
              aria-label="Composizione visuale astratta che rappresenta codice, circuito e contenuti video"
              className="aspect-square overflow-hidden rounded-ds-lg bg-ds-charcoal p-5"
              role="img"
            >
              <div className="grid h-full grid-cols-6 grid-rows-6 gap-2">
                <div className="col-span-4 row-span-3 rounded-ds-md bg-ds-ink p-4">
                  <div className="mb-4 h-2 w-24 rounded-ds-xs bg-ds-mint" />
                  <div className="space-y-2">
                    <div className="h-1.5 w-4/5 bg-ds-white/70" />
                    <div className="h-1.5 w-3/5 bg-ds-white/50" />
                    <div className="h-1.5 w-2/3 bg-ds-white/30" />
                  </div>
                </div>
                <div className="col-span-2 row-span-3 rounded-ds-md bg-ds-blue" />
                <div className="col-span-3 row-span-3 rounded-ds-md bg-ds-mint p-4">
                  <div className="grid h-full grid-cols-3 grid-rows-3 gap-3">
                    <span className="rounded-full bg-ds-green-ink" />
                    <span className="rounded-full bg-ds-green" />
                    <span className="rounded-full bg-ds-green-ink" />
                    <span className="col-span-3 h-px self-center bg-ds-green-ink" />
                    <span className="rounded-full bg-ds-green" />
                    <span className="rounded-full bg-ds-green-ink" />
                    <span className="rounded-full bg-ds-green" />
                  </div>
                </div>
                <div className="col-span-3 row-span-3 rounded-ds-md bg-ds-paper p-4">
                  <div className="flex h-full flex-col justify-between">
                    <div className="h-8 w-12 rounded-ds-sm bg-ds-blue" />
                    <div>
                      <div className="mb-2 h-2 w-24 bg-ds-charcoal" />
                      <div className="h-2 w-16 bg-ds-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <figcaption
              className="font-mono text-mono-sm text-ds-muted-strong"
              id="lab-visual-title"
            >
              {t("figureCaption")}
            </figcaption>
          </figure>
        </Container>
      </Section>

      <Section
        aria-labelledby={t("profiloHeading")}
        className="bg-ds-surface"
        id="profilo"
      >
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,620px)_minmax(320px,420px)] lg:items-start lg:justify-between">
          <div className="flex flex-col gap-6">
            <Eyebrow>{t("profileEyebrow")}</Eyebrow>
            <Heading
              as="h2"
              className="text-headline-md"
              id={t("profiloHeading")}
            >
              {t("profileTitle")}
            </Heading>
            <p className="text-body-lg text-ds-warm-muted">
              {t("profileDescription")}
            </p>
            <div>
              <Button href="#skills" variant="outline">
                {t("profileCta")}
              </Button>
            </div>
          </div>

          <ul className="grid gap-0 border-t border-ds-border-soft">
            {[0, 1, 2, 3].map((index) => (
              <li
                className="grid gap-4 border-b border-ds-border-soft py-5 sm:grid-cols-[72px_minmax(0,1fr)]"
                key={index}
              >
                <p
                  aria-hidden="true"
                  className="font-mono text-title-md text-ds-blue"
                >
                  0{index + 1}
                </p>
                <p className="text-title-md text-ds-ink">
                  {timeline(String(index))}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section
        aria-labelledby={t("skillsHeading")}
        className="bg-ds-white"
        id="skills"
      >
        <Container className="flex flex-col gap-16">
          <SectionHeader
            eyebrow={t("skillsEyebrow")}
            title={t("skillsTitle")}
            id={t("skillsHeading")}
            className="max-w-2xl"
          />

          <div className="grid gap-8 md:grid-cols-3">
            {skills.map((item) => (
              <SkillCard key={item.title} {...item} />
            ))}
          </div>
        </Container>
      </Section>

      <Section
        aria-labelledby={t("projectsHeading")}
        className="bg-ds-charcoal py-24 text-ds-white md:py-32"
        id="progetti"
      >
        <Container className="grid gap-20 lg:grid-cols-[460px_minmax(0,676px)] lg:justify-between">
          <div className="flex flex-col gap-8 lg:sticky lg:top-32 lg:self-start">
            <Eyebrow className="text-ds-mint">{t("projectsEyebrow")}</Eyebrow>
            <Heading
              as="h2"
              className="text-ds-white"
              id={t("projectsHeading")}
            >
              {t("projectsTitle")}
            </Heading>
            <p className="max-w-md text-body-lg text-ds-muted">
              {t("projectsDescription")}
            </p>
            <Button className="w-fit" href="/progetti" variant="outlineInverse">
              {t("projectsCta")}
            </Button>
          </div>

          <div className="flex flex-col gap-20">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                index={index}
                key={project.title}
                project={project}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section
        aria-labelledby={t("articlesHeading")}
        className="bg-ds-paper"
        id="articoli"
      >
        <Container className="flex flex-col gap-16">
          <SectionHeader
            eyebrow={t("articlesEyebrow")}
            title={t("articlesTitle")}
            id={t("articlesHeading")}
            className="md:max-w-3xl"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.title} {...article} />
            ))}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby={t("youtubeHeading")} className="" id="youtube">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow={t("youtubeEyebrow")}
              title={t("youtubeTitle")}
              id={t("youtubeHeading")}
              className="gap-6"
            />
            <p className="max-w-2xl text-body-lg text-ds-warm-muted">
              {t("youtubeDescription")}
            </p>
            <div>
              <Button
                className="hover:border-[#C1121F]! hover:bg-[#C1121F]/10! hover:text-[#C1121F]! focus-visible:outline-[#C1121F]!"
                href="https://www.youtube.com/@EnzoTasca-dev"
                variant="outline"
              >
                {t("youtubeCta")}
              </Button>
            </div>
          </div>

          <div className="rounded-ds-lg bg-ds-ink p-5 text-ds-white">
            <div className="overflow-hidden rounded-ds-md bg-ds-charcoal">
              <div className="relative aspect-video">
                <Image
                  alt="Setup moderno per tutorial YouTube tecnici con camera, microfono e monitor."
                  className="object-cover opacity-90"
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  src="/images/cards/youtube-studio.webp"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ds-ink via-ds-ink/20 to-transparent" />
                <div className="absolute inset-x-6 bottom-6">
                  <p className="mb-2 font-mono text-mono-sm text-ds-mint">
                    {t("youtubeNextLabel")}
                  </p>
                  <h3 className="text-title-md">{t("youtubeNextTitle")}</h3>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        aria-labelledby={t("newsletterHeading")}
        className="bg-ds-surface text-ds-ink"
        id="newsletter"
      >
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_560px] lg:items-start">
          <div className="flex flex-col gap-4">
            <SectionHeader
              eyebrow={t("newsletterEyebrow")}
              title={t("newsletterTitle")}
              id={t("newsletterHeading")}
              eyebrowClassName="text-ds-blue"
            />
            <p className="max-w-2xl text-body-lg text-ds-warm-muted">
              {t("newsletterDescription")}
            </p>
            <p className="text-body-sm text-ds-warm-muted" id="newsletter-help">
              {t("newsletterHelp")}
            </p>
          </div>
          <form
            action="#newsletter"
            aria-label={t("newsletterFormLabel")}
            className="border-t border-ds-border-soft pt-8"
            method="post"
          >
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
              <TextField
                autoComplete="given-name"
                label={t("newsletterNameLabel")}
                name="firstName"
                placeholder="Enzo"
                required
                type="text"
              />
              <TextField
                autoComplete="family-name"
                label={t("newsletterSurnameLabel")}
                name="lastName"
                placeholder="Tasca"
                required
                type="text"
              />
              <div className="sm:col-span-2">
                <TextField
                  autoComplete="email"
                  label={t("newsletterEmailLabel")}
                  name="email"
                  placeholder="nome@email.com"
                  required
                  type="email"
                />
              </div>
              <div className="sm:col-span-2">
                <CheckboxField
                  className="py-4"
                  label={t("newsletterConsentLabel")}
                  name="newsletterConsent"
                  required
                />
              </div>
              <Button
                aria-describedby="newsletter-help"
                className="sm:col-span-2"
                type="submit"
                variant="accent"
              >
                {t("newsletterSubmit")}
              </Button>
            </div>
          </form>
        </Container>
      </Section>
    </main>
  );
}
