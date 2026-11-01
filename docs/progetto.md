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

Il sito e in costruzione. Articoli, progetti e competenze sono persistiti in **SQLite con Drizzle**, in un workspace separato con repository. Il seed iniziale conserva i precedenti contenuti dimostrativi. I mock applicativi sono stati rimossi dopo averne verificato la presenza nel seed e nel database; manca ancora un pannello editoriale. Vedi `docs/database.md`.

Funziona gia:
- Navigazione completa tra tutte le pagine
- Consenso cookie con salvataggio in localStorage
- Design system responsive con palette, tipografia e componenti custom
- Dati strutturati JSON-LD per SEO
- Accessibilita base (screen reader, focus, motion reduce)
- Pagine 404, errore e loading

Manca:
- Inserimento dei contenuti editoriali definitivi e pannello di gestione
- Invio effettivo della newsletter
- Analytics e tracking (consenso pronto, codice no)
- Test end-to-end dell'app web (i repository database hanno test di integrazione)
- CI/CD

## Tecnologia in breve

Framework **Next.js** con **React 19** e **TypeScript 7**. Stili con **Tailwind CSS v4** e design system completamente custom (zero librerie UI esterne). Monorepo con npm workspaces.

Per i dettagli tecnici completi: `docs/stack.md`
Per il design system: `docs/design-system.md`
