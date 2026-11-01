import {
  Card,
  CheckboxField,
  Container,
  Eyebrow,
  Heading,
  PageHeader,
  Section,
  Tag,
  TagList,
  TextField,
} from "@enzotasca/ui";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/cards/article-card";
import { ProjectCard } from "@/components/cards/project-card";
import { SkillCard } from "@/components/cards/skill-card";
import { Button } from "@/components/navigation/button";
import { TextLink } from "@/components/navigation/text-link";
import { getRepositories } from "@/lib/server/repositories";

const colors = [
  ["Ink", "bg-ds-ink", "#000000"],
  ["Charcoal", "bg-ds-charcoal", "#1A1C1D"],
  ["Warm muted", "bg-ds-warm-muted", "#4C4546"],
  ["Zinc 900", "bg-ds-zinc-900", "#18181B"],
  ["White", "bg-ds-white", "#FFFFFF"],
  ["Paper", "bg-ds-paper", "#F9F9FA"],
  ["Surface", "bg-ds-surface", "#F3F3F4"],
  ["Surface strong", "bg-ds-surface-strong", "#EEEEEF"],
  ["Border soft", "bg-ds-border-soft", "#E2E2E3"],
  ["Muted", "bg-ds-muted", "#A1A1AA"],
  ["Muted strong", "bg-ds-muted-strong", "#71717A"],
  ["Slate muted", "bg-ds-slate-muted", "#9CA3AF"],
  ["Blue", "bg-ds-blue", "#2552CA"],
  ["Blue dark", "bg-ds-blue-dark", "#003BAF"],
  ["Navy", "bg-ds-navy", "#00164E"],
  ["Green ink", "bg-ds-green-ink", "#002117"],
  ["Green", "bg-ds-green", "#00513D"],
  ["Mint", "bg-ds-mint", "#7FF8CF"],
  ["Lavender", "bg-ds-lavender", "#DCE1FF"],
];

export const metadata = {
  title: "Design System",
  description: "Pagina di test per palette e componenti del sito Enzo Tasca.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignSystemPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const repositories = getRepositories();
  const skillExample = repositories.skills.list()[0];
  const articleExample = repositories.articles.listFeatured(1)[0];
  const projectExample = repositories.projects.listFeatured(1)[0];

  return (
    <main id="main-content" className="bg-ds-white">
      <PageHeader
        eyebrow="Design system"
        title="Componenti, palette e stati interattivi."
      >
        <p className="mt-6 max-w-2xl text-body-lg text-ds-warm-muted">
          Pagina di test interna per controllare coerenza visiva, accessibilita,
          hover e varianti dei componenti.
        </p>
      </PageHeader>

      <Section aria-labelledby="palette-heading" className="bg-ds-paper">
        <Container className="flex flex-col gap-10">
          <Heading as="h2" id="palette-heading">
            Palette
          </Heading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {colors.map(([name, className, hex]) => (
              <article
                className="overflow-hidden rounded-ds-lg border border-ds-border-soft bg-ds-white"
                key={name}
              >
                <div className={`h-28 ${className}`} />
                <div className="p-4">
                  <h3 className="text-body-md text-ds-ink">{name}</h3>
                  <p className="font-mono text-mono-sm text-ds-muted-strong">
                    {hex}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="type-heading">
        <Container className="flex flex-col gap-10">
          <Heading as="h2" id="type-heading">
            Tipografia
          </Heading>
          <div className="grid gap-8">
            <p className="text-display-lg text-ds-ink">Display heading</p>
            <p className="text-headline-md text-ds-ink">Headline heading</p>
            <p className="text-title-lg text-ds-ink">Title large</p>
            <p className="text-body-xl text-ds-warm-muted">
              Body XL per introduzioni e descrizioni principali.
            </p>
            <p className="font-mono text-mono-eyebrow uppercase tracking-mono-eyebrow text-ds-blue">
              Mono eyebrow label
            </p>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="buttons-heading" className="bg-ds-surface">
        <Container className="flex flex-col gap-10">
          <Heading as="h2" id="buttons-heading">
            Bottoni e link
          </Heading>
          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap gap-4 rounded-ds-lg bg-ds-charcoal p-6">
            <Button variant="outlineInverse">Outline inverse</Button>
            <Button variant="accent">Accent su scuro</Button>
          </div>
          <div className="flex flex-wrap gap-6 rounded-ds-lg bg-ds-white p-6">
            <TextLink href="#form-heading" tone="ink" underline="always">
              Ink / always
            </TextLink>
            <TextLink href="#form-heading" tone="blue" underline="thick">
              Blue / thick
            </TextLink>
            <TextLink href="#form-heading" tone="muted" underline="subtle">
              Muted / subtle
            </TextLink>
          </div>
          <div className="flex flex-wrap gap-6 rounded-ds-lg bg-ds-white p-6">
            <TextLink href="#form-heading" tone="ink" underline="hover">
              Ink / hover
            </TextLink>
            <TextLink href="#form-heading" tone="muted" underline="none">
              Muted / none
            </TextLink>
          </div>
          <div className="flex flex-wrap gap-6 rounded-ds-lg bg-ds-charcoal p-6">
            <TextLink href="#form-heading" tone="inverse" underline="always">
              Inverse / always
            </TextLink>
            <TextLink href="#form-heading" tone="mint" underline="thick">
              Mint / thick
            </TextLink>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="form-heading">
        <Container className="grid gap-10 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div className="flex flex-col gap-4">
            <Heading as="h2" id="form-heading">
              Form
            </Heading>
            <p className="text-body-lg text-ds-warm-muted">
              Esempio di campi con label, focus, hover e autocomplete.
            </p>
          </div>
          <form
            aria-label="Form di test design system"
            className="grid gap-5 sm:grid-cols-2"
          >
            <TextField
              autoComplete="given-name"
              label="Nome"
              name="firstName"
              placeholder="Enzo"
              type="text"
            />
            <TextField
              autoComplete="family-name"
              label="Cognome"
              name="lastName"
              placeholder="Tasca"
              type="text"
            />
            <div className="sm:col-span-2">
              <TextField
                autoComplete="email"
                label="Email"
                name="email"
                placeholder="nome@email.com"
                type="email"
              />
            </div>
            <CheckboxField
              className="bg-ds-surface sm:col-span-2"
              description="Esempio di consenso esplicito riusabile nei form."
              label="Accetto il trattamento dei dati"
              name="exampleConsent"
            />
            <Button className="sm:col-span-2" type="submit" variant="accent">
              Invia
            </Button>
          </form>
        </Container>
      </Section>

      <Section aria-labelledby="tags-heading" className="bg-ds-surface">
        <Container className="grid gap-10 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div className="flex flex-col gap-4">
            <Heading as="h2" id="tags-heading">
              Tag
            </Heading>
            <p className="text-body-lg text-ds-warm-muted">
              Badge semantici per skill, tecnologie e categorie.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <Tag>Next.js</Tag>
              <Tag>React</Tag>
              <Tag variant="mint">TypeScript</Tag>
            </div>
            <TagList
              items={["Arduino", "ESP32", "PCB", "Sensori"]}
              label="Tag di esempio elettronica"
            />
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="cards-heading" className="bg-ds-paper">
        <Container className="flex flex-col gap-10">
          <Heading as="h2" id="cards-heading">
            Card
          </Heading>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="bg-ds-white">
              <Eyebrow>Base card</Eyebrow>
              <h3 className="mt-6 text-title-md text-ds-ink">Card generica</h3>
              <p className="mt-4 text-body-sm text-ds-warm-muted">
                Wrapper riusabile per contenuti semplici o composizioni custom.
              </p>
            </Card>
            {skillExample ? (
              <SkillCard {...skillExample} />
            ) : (
              <p>Nessuna competenza disponibile.</p>
            )}
            {articleExample ? (
              <ArticleCard {...articleExample} />
            ) : (
              <p>Nessun articolo disponibile.</p>
            )}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="project-card-heading">
        <Container className="flex flex-col gap-10">
          <Heading as="h2" id="project-card-heading">
            Project card
          </Heading>
          <div className="max-w-2xl">
            {projectExample ? (
              <ProjectCard index={0} project={projectExample} />
            ) : (
              <p>Nessun progetto disponibile.</p>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
