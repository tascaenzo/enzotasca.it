# Progetto

## Cos'e

**enzotasca.dev** e il sito personale e portfolio di Enzo Tasca, sviluppatore web con una passione per l'elettronica e l'informatica. Non e un semplice CV online: e un laboratorio pubblico dove convivono codice, circuiti, articoli tecnici e video YouTube.

L'idea e mostrare non solo *cosa* so fare, ma *come* ci arrivo — errori compresi.

## A chi serve

- **A me** come archivio ordinato di progetti, appunti e contenuti
- **A chi mi assume** come portfolio vivo, aggiornato, tecnico
- **A chi segue i miei contenuti** (YouTube, blog, newsletter) come hub centrale
- **Ad altri sviluppatori** come esempio di progetto Next.js con design system custom

## Cosa contiene

### Sezioni della homepage

| Sezione | Contenuto |
| --- | --- |
| Hero | Presentazione: "Costruisco progetti web e hardware, poi li racconto" |
| Profilo / CV | Competenze chiave e approccio al lavoro |
| Skill | Aree di competenza principali |
| Progetti | Card con progetti in evidenza, link al dettaglio |
| Blog | Articoli tecnici recenti |
| YouTube | Canale video, prossimo video in evidenza |
| Newsletter | Form di iscrizione alla newsletter |

### Altre pagine

| Pagina | Scopo |
| --- | --- |
| `/progetti` | Archivio completo di tutti i progetti |
| `/articoli/[slug]` | Articolo tecnico singolo con dati strutturati |
| `/cookie-policy` | Informativa sui cookie |
| `/preferenze-cookie` | Gestione consenso cookie |
| `/newsletter/cancellazione` | Pagina di disiscrizione newsletter |
| `/design-system` | Sandbox interna dei componenti (solo in development) |

## Stato attuale

Il sito e in costruzione. I contenuti sono attualmente **mockati** (dati finti inseriti direttamente nel codice). La struttura, il design system e i componenti sono pronti per ricevere dati reali da un CMS, API o database.

Funziona gia:
- Navigazione completa tra tutte le pagine
- Consenso cookie con salvataggio in localStorage
- Design system responsive con palette, tipografia e componenti custom
- Dati strutturati JSON-LD per SEO
- Accessibilita base (screen reader, focus, motion reduce)
- Pagine 404, errore e loading

Manca:
- Collegamento a dati reali (CMS / API / database)
- Invio effettivo della newsletter
- Analytics e tracking (consenso pronto, codice no)
- Test automatici
- CI/CD

## Tecnologia in breve

Framework **Next.js** con **React 19** e **TypeScript 6**. Stili con **Tailwind CSS v4** e design system completamente custom (zero librerie UI esterne). Monorepo con npm workspaces.

Per i dettagli tecnici completi: `docs/stack.md`
Per il design system: `docs/design-system.md`
