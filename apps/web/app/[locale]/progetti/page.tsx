import { Container, Eyebrow, Section } from "@enzotasca/ui";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProjectCard } from "@/components/cards/project-card";
import { Button } from "@/components/navigation/button";
import { getRepositories } from "@/lib/server/repositories";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("projects");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/progetti",
    },
  };
}

export default async function ProjectsPage() {
  const projects = getRepositories().projects.list();
  const t = await getTranslations("projects");

  return (
    <main id="main-content" className="bg-ds-white">
      <Section className="bg-ds-charcoal pt-20 text-ds-white md:pt-32">
        <Container className="flex flex-col gap-8">
          <Eyebrow className="text-ds-mint">{t("eyebrow")}</Eyebrow>
          <div className="flex max-w-4xl flex-col gap-6">
            <h1 className="text-headline-lg md:text-display-lg">
              {t("heading")}
            </h1>
            <p className="max-w-2xl text-body-xl text-ds-slate-muted">
              {t("description")}
            </p>
          </div>
          <Button className="w-fit" href="/" variant="outlineInverse">
            {t("backHome")}
          </Button>
        </Container>
      </Section>

      <Section className="bg-ds-charcoal text-ds-white">
        <Container className="grid gap-12 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard index={index} key={project.slug} project={project} />
          ))}
        </Container>
      </Section>
    </main>
  );
}
