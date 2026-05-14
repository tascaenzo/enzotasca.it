import type { Skill } from "@/types/content";

export const skills: Skill[] = [
  {
    title: "Sviluppo web",
    body: "Costruisco interfacce, dashboard e applicazioni full-stack con attenzione a performance, accessibilita e manutenzione.",
    tags: ["Next.js", "React", "TypeScript", "Node.js"],
    tone: "bg-ds-mint",
    tagVariant: "mint",
  },
  {
    title: "Elettronica applicata",
    body: "Prototipo circuiti, automazioni e piccoli sistemi embedded, collegando hardware reale a software leggibile.",
    tags: ["Arduino", "ESP32", "PCB", "Sensori"],
    tone: "bg-ds-paper",
  },
  {
    title: "Divulgazione tecnica",
    body: "Trasformo esperimenti e problemi reali in video, articoli e walkthrough pratici per chi vuole capire come funziona.",
    tags: ["YouTube", "Blog", "Tutorial", "Case study"],
    tone: "bg-ds-paper",
  },
];
