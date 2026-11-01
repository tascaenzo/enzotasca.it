import type { Article, Project, Skill } from "../../src/schema.ts";

export const articles: Article[] = [
  {
    featured: true,
    title: "Come progetto una dashboard tecnica prima di scrivere codice",
    description:
      "Dal modello dati alla UI: una checklist pratica per evitare interfacce belle ma inutili.",
    body: "Quando lavoro su una dashboard tecnica parto sempre dalle decisioni che l'utente deve prendere. Solo dopo passo a componenti, layout e gerarchia visiva, per evitare interfacce ordinate ma poco utili.",
    accent: null,
    tag: "Web development",
    image: "/images/cards/web-development.webp",
    imageAlt: "Interfaccia web moderna con dashboard e blocchi di codice.",
    date: "10 maggio 2026",
    href: "/articoli/progettare-dashboard-tecnica",
    publishedAt: "2026-05-10",
    slug: "progettare-dashboard-tecnica",
  },
  {
    featured: true,
    title: "ESP32 e web app: portare un sensore dentro un'interfaccia",
    description:
      "Architettura minima per leggere dati hardware e renderli disponibili sul web.",
    body: "Un sensore diventa davvero utile quando il dato e leggibile, storicizzato e mostrato in modo chiaro. Qui raccolgo un'architettura minima tra firmware, API e interfaccia web.",
    accent: null,
    tag: "Elettronica",
    image: "/images/cards/electronics-lab.webp",
    imageAlt: "Banco elettronico con circuito e componenti digitali.",
    date: "4 maggio 2026",
    href: "/articoli/esp32-web-app-sensore-interfaccia",
    publishedAt: "2026-05-04",
    slug: "esp32-web-app-sensore-interfaccia",
  },
  {
    featured: true,
    title: "Quando un tutorial tecnico diventa un progetto replicabile",
    description:
      "Come trasformo prove, errori e prototipi in contenuti chiari per YouTube e blog.",
    body: "Un contenuto tecnico funziona quando chi lo segue capisce il percorso, non solo il risultato. Per questo documento errori, vincoli e scelte mentre il progetto prende forma.",
    accent: null,
    tag: "YouTube",
    image: "/images/cards/technical-writing.webp",
    imageAlt:
      "Postazione di scrittura tecnica con appunti e contenuti digitali.",
    date: "28 aprile 2026",
    href: "/articoli/tutorial-tecnico-progetto-replicabile",
    publishedAt: "2026-04-28",
    slug: "tutorial-tecnico-progetto-replicabile",
  },
];

export const projects: Project[] = [
  {
    featured: true,
    title: "CPU 8 bit in logica TTL",
    body: "Un progetto in corso per costruire una CPU a 8 bit usando logica TTL: registri, bus, ALU, clock e debugging raccontati passo passo.",
    className: "bg-ds-navy text-ds-white",
    meta: "TTL / CPU 8 bit / Elettronica digitale",
    image: "/images/cards/electronics-lab.webp",
    imageAlt: "Circuito elettronico astratto con componenti e sensori.",
    href: "/#newsletter",
    cta: "Segui lo sviluppo",
    date: "13 maggio 2026",
    slug: "cpu-8-bit-logica-ttl",
    status: "in-progress",
    publishedAt: "2026-05-13",
  },
  {
    featured: true,
    title: "Trinacria",
    body: "Un progetto puramente software pubblicato su GitHub: uno spazio dove raccogliere architettura, codice e scelte tecniche in modo documentabile.",
    className: "bg-ds-green-ink text-ds-white",
    meta: "Software / GitHub / Open source",
    image: "/images/cards/web-development.webp",
    imageAlt: "Dashboard web astratta con grafici e blocchi di codice.",
    href: "https://github.com/tascaenzo/trinacria",
    cta: "Apri GitHub",
    date: "12 maggio 2026",
    slug: "trinacria",
    status: "published",
    publishedAt: "2026-05-12",
  },
];

export const skills: Skill[] = [
  {
    title: "Sviluppo web",
    body: "Costruisco interfacce, dashboard e applicazioni full-stack con attenzione a performance, accessibilita e manutenzione.",
    tags: ["Next.js", "React", "TypeScript", "Node.js"],
    tone: "bg-ds-mint",
    tagVariant: "mint",
    slug: "sviluppo-web",
    sortOrder: 10,
  },
  {
    title: "Elettronica applicata",
    body: "Prototipo circuiti, automazioni e piccoli sistemi embedded, collegando hardware reale a software leggibile.",
    tags: ["Arduino", "ESP32", "PCB", "Sensori"],
    tone: "bg-ds-paper",
    slug: "elettronica-applicata",
    sortOrder: 20,
    tagVariant: "default",
  },
  {
    title: "Divulgazione tecnica",
    body: "Trasformo esperimenti e problemi reali in video, articoli e walkthrough pratici per chi vuole capire come funziona.",
    tags: ["YouTube", "Blog", "Tutorial", "Case study"],
    tone: "bg-ds-paper",
    slug: "divulgazione-tecnica",
    sortOrder: 30,
    tagVariant: "default",
  },
];
