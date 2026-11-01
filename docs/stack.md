# Stack

## Panoramica

Sito portfolio / laboratorio pubblico di **Enzo Tasca** — sviluppatore web, elettronica e informatica.
Il sito raccoglie profilo professionale, progetti, articoli tecnici, video YouTube e una newsletter.

## Tech stack

| Categoria | Tecnologia | Versione |
| --- | --- | --- |
| Framework | Next.js (App Router) | 16.4.3 |
| UI | React | 19.3.1 |
| Linguaggio | TypeScript | 7.0.2 |
| Stili | Tailwind CSS v4 | 4.3.3 |
| PostCSS | @tailwindcss/postcss | 4.3.3 |
| Linter e formatter | Biome (regole React e Next.js) | 2.6.4 |
| Package manager | npm workspaces (monorepo) | |
| Node engine | >= 22 | |

### Dipendenze runtime

App web: `next`, `next-intl`, `react`, `react-dom`, `server-only` e i workspace `@enzotasca/database` e `@enzotasca/ui`. Il workspace database usa `drizzle-orm` e `better-sqlite3`. Nessuna libreria UI esterna, nessun state management, nessun client HTTP.

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
│       │   ├── globals.css       # Import Tailwind/UI + stili globali dell'app
│       │   ├── layout.tsx        # Root layout
│       │   ├── page.tsx          # Homepage
│       │   ├── error.tsx         # Error boundary
│       │   ├── loading.tsx       # Loading state
│       │   └── not-found.tsx     # 404
│       ├── components/
│       │   ├── cards/            # Card compositore (skill, project, article)
│       │   ├── cookie/           # Cookie banner + form preferenze
│       │   ├── site/             # Layout shell (header, footer, mobile menu)
│       │   └── navigation/       # Adattatori Button/TextLink per next-intl
│       ├── lib/
│       │   └── cookies/consent.ts # Gestione consenso cookie (localStorage)
│       ├── types/                # TypeScript types (Skill, Article, Project)
│       └── public/images/        # Asset statici
├── packages/
│   ├── ui/                       # Design system React e Tailwind, senza Next.js
│   └── database/                 # SQLite, schema Drizzle e repository
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

1. **Componenti atomici** (`packages/ui/src/components/`): primitivi generici e riusabili (Button, Card, Container, Tag, TextField...)
2. **Card** (`cards/`): composizione di atomi per domini specifici (SkillCard, ProjectCard, ArticleCard)
3. **Layout** (`site/`): elementi di shell della pagina (header, footer, menu mobile)
4. **Feature** (`cookie/`): componente specifico per funzionalita cross-page

### Data layer

Articoli, progetti e skill sono salvati in SQLite con Drizzle nel workspace `packages/database`. Le pagine accedono esclusivamente ai repository attraverso un modulo `server-only`. Nessuna pagina importa mock o dati del seed. Le fixture del seed sono isolate in `packages/database/scripts/seed` e usate anche dai test. La preview del design system legge dai repository. Il percorso SQLite arriva dalla variabile d'ambiente obbligatoria `SQLITE_PATH`.

Schema, migrazioni, repository e comandi: vedi `docs/database.md`.

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
Il tema e definito in `packages/ui/src/styles.css` via `@theme` di Tailwind v4 e importato dal CSS dell'app.
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
- **Classi condizionali**: usare `cn()` esportata da `@enzotasca/ui` (wrapper minimal su `filter(Boolean).join(" ")`)
- **Stili**: solo Tailwind utility classes, zero CSS modules, zero CSS-in-JS
- **Form**: label con `htmlFor` + `id` generato via `useId()` di React
- **Link esterni**: `rel="noreferrer"` + `target="_blank"` di default

## Controlli e formattazione

La configurazione condivisa e in `biome.json`, con regole raccomandate React e Next.js e supporto alla sintassi Tailwind CSS v4. File generati, cache e lockfile sono esclusi.

Dalla root del monorepo:

- `npm run lint`: verifica di lint, formattazione e ordine degli import con Biome.
- `npm run lint:fix`: correzioni automatiche sicure, formattazione e organizzazione degli import.
- `npm run format`: formattazione dei sorgenti.
- `npm run format:check`: verifica della formattazione senza modifiche.
- `npm run typecheck`: controllo dei tipi con TypeScript 7.
- `npm run build`: build di produzione Next.js.

## Testing

Test di integrazione dei repository SQLite con il test runner Node.js: `npm run test:db`. Restano da introdurre test end-to-end per l'app web.

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
