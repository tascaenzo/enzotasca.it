# Stack

## Panoramica

Sito portfolio / laboratorio pubblico di **Enzo Tasca** — sviluppatore web, elettronica e informatica.
Il sito raccoglie profilo professionale, progetti, articoli tecnici, video YouTube e una newsletter.

## Tech stack

| Categoria | Tecnologia | Versione |
| --- | --- | --- |
| Framework | Next.js (App Router) | 16.2.6 |
| UI | React | 19.2.6 |
| Linguaggio | TypeScript | 6.0.3 |
| Stili | Tailwind CSS v4 | 4.3.0 |
| PostCSS | @tailwindcss/postcss | 4.3.0 |
| Linter | ESLint 9 flat config + eslint-config-next | ^9.0.0 |
| Package manager | npm workspaces (monorepo) | |
| Node engine | >= 20.9.0 | |

### Dipendenze runtime

Solo 3: `next`, `react`, `react-dom`. Nessuna libreria UI esterna, nessun state management, nessun client HTTP.

## Struttura del progetto

```
enzotasca-it/
├── apps/
│   └── web/                      # Applicazione Next.js
│       ├── app/
│       │   ├── articoli/[slug]/  # Pagina articolo dinamico
│       │   ├── cookie-policy/    # Cookie policy
│       │   ├── design-system/    # Sandbox componenti (dev only)
│       │   ├── newsletter/cancellazione/ # Disiscrizione newsletter
│       │   ├── preferenze-cookie/# Gestione preferenze cookie
│       │   ├── progetti/         # Archivio progetti
│       │   ├── globals.css       # Tailwind v4 @theme + global styles
│       │   ├── layout.tsx        # Root layout
│       │   ├── page.tsx          # Homepage
│       │   ├── error.tsx         # Error boundary
│       │   ├── loading.tsx       # Loading state
│       │   └── not-found.tsx     # 404
│       ├── components/
│       │   ├── cards/            # Card compositore (skill, project, article)
│       │   ├── cookie/           # Cookie banner + form preferenze
│       │   ├── site/             # Layout shell (header, footer, mobile menu)
│       │   └── ui/               # Componenti atomici (button, card, tag, form, typography, section-header, page-header)
│       ├── lib/
│       │   ├── cn.ts             # Utility classi condizionali
│       │   └── cookies/consent.ts # Gestione consenso cookie (localStorage)
│       ├── mocks/                # Dati mock (articles, projects, skills)
│       ├── types/                # TypeScript types (Skill, Article, Project)
│       └── public/images/        # Asset statici
└── docs/                         # Documentazione
```

## Architettura

### Routing (Next.js App Router)

Tutte le 9 route sono server component di default. Solo 3 componenti usano `"use client"`:
- `CookieBanner` — interattivita consenso cookie
- `CookiePreferencesForm` — form preferenze
- `SiteFooter` — apertura pannello cookie (da refactorizzare in wrapper piu piccolo)
- `MobileMenu` — menu hamburger

### Pattern componente

1. **Componenti atomici** (`ui/`): primitivi generici e riusabili (Button, Card, Container, Tag, TextField...)
2. **Card** (`cards/`): composizione di atomi per domini specifici (SkillCard, ProjectCard, ArticleCard)
3. **Layout** (`site/`): elementi di shell della pagina (header, footer, menu mobile)
4. **Feature** (`cookie/`): componente specifico per funzionalita cross-page

### Data layer

Attualmente tutto mockato in `mocks/`. Nessun database, CMS, API esterna o server action.
I mock esportano array, funzioni di lookup (`getArticleBySlug`, `getProjectBySlug`) e varianti filtrate (`featuredArticles`, `featuredProjects`).

### Gestione stato

- Stato locale con `useState` / `useReducer`
- Consenso cookie: `useSyncExternalStore` + `localStorage` con eventi custom
- Nessun context provider globale, nessuna libreria di state management

### Dati strutturati (SEO)

JSON-LD integrato nelle pagine:
- **Homepage**: `Person` schema
- **Articoli**: `Article` schema con headline, description, datePublished, author

## Design system

Vedi `docs/design-system.md` per dettagli completi su token, componenti e pattern.
Il tema e definito in `apps/web/app/globals.css` via `@theme` di Tailwind v4.
Convenzione naming: tutti i token custom usano prefisso `ds-` (es. `ds-blue`, `ds-mint`, `rounded-ds-xl`).

## Accessibilita

- Skip-to-content link
- `aria-labelledby` su sezioni e card
- `aria-label` su elementi navigazionali
- `focus-visible` su tutti gli interattivi
- `prefers-reduced-motion`
- Contrasto verificato su palette

## Convenzioni codice

- **Server component first**: solo 3 file con `"use client"` su ~30 file sorgente
- **Naming**: PascalCase per componenti, camelCase per utility, kebab-case per classi CSS
- **Classi condizionali**: usare `cn()` in `lib/cn.ts` (wrapper minimal su `filter(Boolean).join(" ")`)
- **Stili**: solo Tailwind utility classes, zero CSS modules, zero CSS-in-JS
- **Form**: label con `htmlFor` + `id` generato via `useId()` di React
- **Link esterni**: `rel="noreferrer"` + `target="_blank"` di default

## Testing

Attualmente assente. Nessun framework di test installato, nessun file `*.test.*` o `*.spec.*`.
Da implementare: Vitest per unit test, Playwright per e2e.

## CI / CD

Assente. Da configurare.

## Pagine e metadata

| Route | Titolo | Meta |
| --- | --- | --- |
| `/` | Enzo Tasca | default |
| `/progetti` | Progetti \| Enzo Tasca | index, follow |
| `/articoli/[slug]` | [titolo] \| Enzo Tasca | index, follow |
| `/cookie-policy` | Cookie policy \| Enzo Tasca | index, follow |
| `/preferenze-cookie` | Preferenze cookie \| Enzo Tasca | noindex, nofollow |
| `/newsletter/cancellazione` | Cancellazione newsletter \| Enzo Tasca | noindex, nofollow |
| `/design-system` | Design System \| Enzo Tasca | noindex, nofollow |

## Error handling

- `error.tsx`: error boundary globale con retry + home
- `not-found.tsx`: 404 personalizzata
- `loading.tsx`: stato di caricamento con logo ET animato

## Future miglioramenti

- Collegamento dati reali (API, CMS, database)
- Server actions per form newsletter
- Testing (unit + e2e)
- CI/CD pipeline
- Security headers in `next.config.ts`
- Sitemap e robots.txt
- Refactor `SiteFooter` in server component + piccolo wrapper client
