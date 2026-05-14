# Design system

Fonte di verita: Tailwind CSS v4 `@theme` in `apps/web/app/globals.css`.
I componenti usano esclusivamente classi Tailwind basate sui token `ds-*`.
Non esiste una copia TypeScript parallela dei token se non per le eventuali necessita runtime.

## Foundations

### Layout

- Container desktop: `1216px` (`max-w-site`), con gutter `px-6 md:px-8`
- Sezioni verticali: padding `py-20 md:py-32` (`80px` / `128px`)
- Section hero: `pt-20 md:pt-32`
- Griglie ricorrenti: 3 colonne desktop, 2 colonne per layout editoriali (`lg:grid-cols-2`), griglie asimmetriche con `minmax()` per hero/profile/newsletter

### Spacing

Scala Tailwind standard con custom `spacing-18` (`72px`), `spacing-30` (`120px`), `spacing-40` (`160px`).

Valori piu frequenti: `gap-4` (`16px`), `gap-6` (`24px`), `gap-8` (`32px`), `gap-10` (`40px`), `gap-12` (`48px`), `gap-16` (`64px`), `gap-20` (`80px`).

### Radius

| Token | Valore | Uso |
| --- | ---: | --- |
| `rounded-ds-xs` | `2px` | micro badge / dettagli |
| `rounded-ds-sm` | `4px` | piccoli controlli |
| `rounded-ds-md` | `6px` | pill compatte, form inputs |
| `rounded-ds-lg` | `8px` | immagini, card, newsletter block |
| `rounded-ds-xl` | `12px` | bottoni, CTA, logo, nav pill |
| `rounded-ds-2xl` | `16px` | card enfatiche |

## Color

### Neutrals

| Token | Hex | Uso |
| --- | --- | --- |
| `ds-ink` | `#000000` | testo primario, CTA primarie |
| `ds-charcoal` | `#1A1C1D` | sezioni scure, sfondi progetti |
| `ds-warm-muted` | `#4C4546` | testo secondario su chiaro |
| `ds-zinc-900` | `#18181B` | testo scuro alternativo |
| `ds-white` | `#FFFFFF` | testo su scuro, sfondi |
| `ds-paper` | `#F9F9FA` | sfondo chiaro alternativo |
| `ds-surface` | `#F3F3F4` | sezioni tonali chiare |
| `ds-surface-strong` | `#EEEEEF` | card / sezioni chiare enfatiche |
| `ds-border-soft` | `#E2E2E3` | separatori, bordi leggeri |
| `ds-muted` | `#A1A1AA` | testo placeholder/muted |
| `ds-muted-strong` | `#71717A` | testo secondario |
| `ds-slate-muted` | `#9CA3AF` | metadati, descrizioni su scuro |

### Accents

| Token | Hex | Uso |
| --- | --- | --- |
| `ds-blue` | `#2552CA` | accento primario, link, badge |
| `ds-blue-dark` | `#003BAF` | hover stati blu |
| `ds-navy` | `#00164E` | sfondo progetti scuro-blu |
| `ds-green-ink` | `#002117` | sfondo progetti verde scuro |
| `ds-green` | `#00513D` | accento verde |
| `ds-mint` | `#7FF8CF` | highlight tecnico, badge hardware |
| `ds-lavender` | `#DCE1FF` | accento chiaro su blu |

## Typography

Famiglie: `Inter` (sans), `Liberation Mono` (mono).

| Classe | Size / Line-height | Tracking | Uso |
| --- | --- | ---: | --- |
| `text-display-xl` | `96px / 96px` | `-2.4px` | hero desktop banner |
| `text-display-lg` | `80px / 84px` | `-2.4px` | hero pagine |
| `text-display-md` | `80px / 72px` | `-3.2px` | hero portfolio |
| `text-headline-xl` | `60px / 60px` | `-3px` | headline grandi |
| `text-headline-lg` | `56px / 58.8px` | `-1.4px` | hero mobile, titoli pagina |
| `text-headline-md` | `48px / 48px` | `-2.4px` | titoli sezione |
| `text-headline-sm` | `36px / 40px` | `-0.9px` | titoli card |
| `text-title-lg` | `30px / 36px` | `-0.75px` | titoli card skill |
| `text-title-md` | `24px / 32px` | `0px` | titoli progetto/articolo |
| `text-body-xl` | `24px / 32px` | `0px` | descrizione hero |
| `text-body-lg` | `18px / 28px` | `0px` | introduzioni, CTA text |
| `text-body-md` | `16px / 26px` | `0px` | descrizioni card, form |
| `text-body-sm` | `14px / 20px` | `0px` | testi piccoli |
| `text-nav` | `14px / 20px` | `-0.35px` | navigazione |
| `text-eyebrow` | `14px / 20px` | `1.4px` | label sezione (sans) |
| `text-caption` | `12px / 16px` | `0.3px` | caption, footer |
| `text-mono-sm` | `12px / 16px` | `0px` | tag, metadati progetto |
| `text-mono-eyebrow` | `12px / 16px` | `1.2px` | label sezione (mono) |

## Componenti

### `Button` (`components/ui/button.tsx`)
- Polymorfico: `<button>` o `<Link>` (Next.js) se riceve `href`
- Varianti: `primary`, `secondary`, `accent`, `ghost`, `outline`, `outlineInverse`
- Dimensioni: `md` (48px), `lg` (60px)
- Accessibilita: `type="button"` di default, focus ring visibile, stato `disabled`
- Transizione: background, colore, bordo e transform con hover translateY(-2px)

### `Container` (`components/ui/container.tsx`)
- Larghezza massima `1216px` (`max-w-site`)
- Gutter responsive `px-6 md:px-8`
- Accetta className per personalizzazione

### `Section` (`components/ui/section.tsx`)
- Padding verticale `py-20 md:py-32`
- Wrapper semantico `<section>`

### `Card` (`components/ui/card.tsx`)
- Elemento configurabile: `article` (default), `div`, `section`
- Background default `bg-ds-surface`, padding default `p-8`
- `focus-within` ring su ds-blue
- Raggio `rounded-ds-lg`

### `Eyebrow` / `Heading` (`components/ui/typography.tsx`)
- Helper tipografici con heading level configurabile (`as` prop)
- `Eyebrow`: font mono uppercase, tracking wide, colore warm-muted
- `Heading`: font sans, `text-headline-md`, colore ink

### `SectionHeader` (`components/ui/section-header.tsx`)
- Combina `Eyebrow` + `Heading` nel pattern standard delle sezioni
- Props: `eyebrow`, `title`, `id`, `as` (heading level), `eyebrowClassName`, `titleClassName`, `className`, `children`

### `PageHeader` (`components/ui/page-header.tsx`)
- Wrapper completo per intestazione pagine contenuto (cookie policy, preferenze, newsletter)
- Include `Section` + `Container` + `Eyebrow` + `<h1>`
- Props: `eyebrow`, `title`, `className`, `containerClassName`, `children`

### `TextField` (`components/ui/text-field.tsx`)
- Input testuale con label obbligatoria
- Auto-generazione `id` via `useId()`
- Placeholder, hover, focus, invalid e disabled state

### `CheckboxField` (`components/ui/checkbox-field.tsx`)
- Checkbox con label e description opzionale
- Auto-generazione `id` via `useId()`

### `TextLink` (`components/ui/text-link.tsx`)
- Link testuale inline con varianti di tono e sottolineatura
- Toni: `muted`, `ink`, `blue`, `inverse`, `mint`
- Sottolineatura: `always`, `hover`, `none`, `subtle`, `thick`
- Link esterni: `noreferrer` + `_blank` di default

### `Tag` / `TagList` (`components/ui/tag.tsx`)
- Badge semantici per skill e tecnologie
- Varianti: `default`, `mint`

### `SiteHeader` (`components/site/site-header.tsx`)
- Navigazione principale, altezza `min-h-20` (80px)
- Logo ET + nome + sottotitolo, nav items, CTA Newsletter
- Mobile: hamburger menu (`MobileMenu`)

### `SiteFooter` (`components/site/site-footer.tsx`)
- Collegamenti social (YouTube, LinkedIn, GitHub, Blog)
- Link legali (cancellazione newsletter, cookie policy, preferenze)
- Client component per apertura pannello preferenze cookie

### `MobileMenu` (`components/site/mobile-menu.tsx`)
- Overlay full-screen su mobile, navigazione verticale
- Blocco scroll body quando aperto

### `CookieBanner` (`components/cookie/cookie-banner.tsx`)
- Banner fisso bottom per consenso cookie
- Tre livelli: necessari (sempre), analytics, marketing
- Stato letto da localStorage con `useSyncExternalStore`
- Supporta apertura da link esterno via evento custom

### `CookiePreferencesForm` (`components/cookie/cookie-preferences-form.tsx`)
- Form completo per gestione preferenze cookie
- Usato nella pagina `/preferenze-cookie`

## Card components

### `SkillCard` (`components/cards/skill-card.tsx`)
- Griglia 3 colonne, padding 40px
- Tag list con varianti, titolo, descrizione

### `ProjectCard` (`components/cards/project-card.tsx`)
- Sfondo scuro configurabile via `project.className`
- Immagine con mix-blend-screen, indicatori stato (in corso / pubblicato)
- CTA link, metadati

### `ArticleCard` (`components/cards/article-card.tsx`)
- Thumbnail 16:10, tag + data, titolo, descrizione
- Hover: ombra + scala immagine

## Structured Data

JSON-LD integrato nelle pagine:
- Homepage: `Person` schema
- Articoli: `Article` schema

## Accessibilita

- Skip-to-content link nel layout
- `aria-labelledby` su sezioni e card
- `aria-label` su elementi navigazionali
- `aria-expanded` su menu mobile
- `focus-visible` su tutti gli elementi interattivi
- `prefers-reduced-motion` supportato
- Contrasto verificato su tutte le varianti colore

## Note implementative

- Server component di default; `"use client"` solo dove serve interattivita (3 componenti)
- Stile editoriale: tanto whitespace, bordi minimi, tipografia forte
- Card solo per contenuti ripetuti (skill, progetti, articoli)
- Il sistema e monocromatico con accenti blu/verdi/mint
- Per classi condizionali: usare `cn()` in `lib/cn.ts`
- Non usare `dangerouslySetInnerHTML` se non per JSON-LD strutturato
