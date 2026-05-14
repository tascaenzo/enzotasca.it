import type { Article } from "@/types/content";

export const articles: Article[] = [
  {
    title: "Come progetto una dashboard tecnica prima di scrivere codice",
    description:
      "Dal modello dati alla UI: una checklist pratica per evitare interfacce belle ma inutili.",
    body: "Quando lavoro su una dashboard tecnica parto sempre dalle decisioni che l'utente deve prendere. Solo dopo passo a componenti, layout e gerarchia visiva, per evitare interfacce ordinate ma poco utili.",
    tag: "Web development",
    image: "/images/cards/web-development.webp",
    imageAlt: "Interfaccia web moderna con dashboard e blocchi di codice.",
    date: "10 maggio 2026",
    href: "/articoli/progettare-dashboard-tecnica",
    publishedAt: "2026-05-10",
    slug: "progettare-dashboard-tecnica",
  },
  {
    title: "ESP32 e web app: portare un sensore dentro un'interfaccia",
    description:
      "Architettura minima per leggere dati hardware e renderli disponibili sul web.",
    body: "Un sensore diventa davvero utile quando il dato e leggibile, storicizzato e mostrato in modo chiaro. Qui raccolgo un'architettura minima tra firmware, API e interfaccia web.",
    tag: "Elettronica",
    image: "/images/cards/electronics-lab.webp",
    imageAlt: "Banco elettronico con circuito e componenti digitali.",
    date: "4 maggio 2026",
    href: "/articoli/esp32-web-app-sensore-interfaccia",
    publishedAt: "2026-05-04",
    slug: "esp32-web-app-sensore-interfaccia",
  },
  {
    title: "Quando un tutorial tecnico diventa un progetto replicabile",
    description:
      "Come trasformo prove, errori e prototipi in contenuti chiari per YouTube e blog.",
    body: "Un contenuto tecnico funziona quando chi lo segue capisce il percorso, non solo il risultato. Per questo documento errori, vincoli e scelte mentre il progetto prende forma.",
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

export const featuredArticles = articles.slice(0, 3);

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
