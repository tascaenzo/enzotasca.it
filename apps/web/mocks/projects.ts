import type { Project } from "@/types/content";

export const mockProjects: Project[] = [
  {
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

export const projects = [...mockProjects].sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export const featuredProjects = projects.slice(0, 4);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
