# Database e repository

Il workspace `@enzotasca/database`, in `packages/database`, contiene la persistenza SQLite e non dipende da Next.js.

```text
apps/web/app                 Pagine e presentazione
       ↓
apps/web/lib/server/repositories.ts  Istanza condivisa protetta da server-only
       ↓
packages/database/src/database.ts       Connessione, cache, repository, transazioni
       ↓
packages/database/src/repositories  Query di articoli e progetti
       ↓
packages/database/src/schema.ts     Tabelle Drizzle
       ↓
SQLite                              data/site.sqlite
```

## Struttura

```text
packages/database/
├── src/
│   ├── index.ts              # API pubblica del package
│   ├── database.ts           # Factory, transazioni e ciclo di vita
│   ├── schema.ts             # Tabelle Drizzle e tipi inferiti
│   ├── sqlite/
│   │   ├── connection.ts     # Apertura SQLite e configurazione PRAGMA
│   │   └── config.ts         # Lettura e validazione di SQLITE_PATH
│   ├── cache/
│   │   └── lru.ts            # Cache Map indipendente da SQLite
│   └── repositories/
│       ├── context.ts        # Letture, scritture e invalidazione
│       ├── articles.ts       # Query articoli
│       ├── projects.ts       # Query progetti
│       └── skills.ts         # Query competenze e relativo ordine
├── scripts/                  # Comandi, migrazioni e seed
├── drizzle/                  # Migrazioni SQL e snapshot versionati
└── tests/                    # Test di integrazione e della LRU
```

`index.ts` esporta `createDatabaseLayer`, i tipi del layer e quelli inferiti dallo schema. `database.ts` compone una sola connessione, una cache per entita e i repository. `sqlite/connection.ts` espone internamente `openSqliteConnection()` per aprire la connessione SQLite; la configurazione ambiente e separata per poterla usare anche da Drizzle Kit senza caricare il driver nativo.

I repository e il loro contesto sono raccolti nella stessa directory. La LRU e indipendente dal driver e rimane sotto `cache`. Seed e percorsi delle migrazioni appartengono solo agli script; nessun export applicativo espone fixture o seed.

Le pagine non importano Drizzle, il driver SQLite o lo schema. Importano `getRepositories()` dal modulo protetto da `server-only`. `getDatabaseLayer()` crea l'intera istanza alla prima richiesta e la riutilizza durante l'hot reload. `getRepositories()` restituisce sempre gli stessi repository, senza ricrearli a ogni richiesta. Script e test possiedono la loro istanza e la chiudono esplicitamente.

I repository ricevono esplicitamente un contesto con esecutore Drizzle e funzioni di lettura e scrittura: possono essere usati e testati senza avviare Next.js. Le query usano i parametri di Drizzle, senza concatenare input utente in SQL. Le date `publishedAt` sono stringhe ISO `YYYY-MM-DD`, ordinate dalla piu recente, con slug come criterio secondario.

## Avvio locale

Richiede Node.js 22 o successivo (sviluppo verificato su Node.js 24).

Dalla root del progetto:

```sh
npm ci
export SQLITE_PATH="/percorso/assoluto/enzotasca-it/data/site.sqlite"
npm run db:migrate
npm run db:seed
npm run dev
```

`SQLITE_PATH` e obbligatorio: non esiste un fallback relativo alla posizione dei sorgenti o alla directory di esecuzione. Il file e i sidecar WAL non sono versionati. `db:migrate` applica solo le migrazioni mancanti; `db:seed` inserisce i contenuti dimostrativi assenti senza sovrascrivere record gia presenti. L'app non applica migrazioni e non inserisce dati automaticamente.

Impostare lo stesso percorso assoluto per app, migrazioni e seed:

```sh
export SQLITE_PATH=/percorso/assoluto/site.sqlite
npm run db:migrate
npm run db:seed
npm run dev
```

Next.js legge `SQLITE_PATH` anche da `apps/web/.env.local`; usare `apps/web/.env.example` come riferimento. I comandi CLI richiedono la variabile esportata nella shell: non caricano il file dell'app. La configurazione locale esistente punta al database `data/site.sqlite` mediante `.env.local`, escluso da Git. Una variabile assente, vuota o relativa produce un errore esplicito. Test e strumenti possono passare `filename` direttamente, ad esempio `:memory:`, senza leggere l'ambiente.

## Utilizzo dalle pagine server

```ts
import { getRepositories } from "@/lib/server/repositories";

const { articles, projects } = getRepositories();
const recentArticles = articles.listFeatured(3);
const article = articles.findBySlug("progettare-dashboard-tecnica");
const allProjects = projects.list();
```

`findBySlug` restituisce `undefined` quando il record non esiste. `save(content)` accetta il tipo `$inferInsert` e inserisce o aggiorna per slug; `featured` fa parte dello stesso oggetto. Drizzle applica i default dello schema in inserimento; in aggiornamento i campi omessi restano invariati, mentre `null` cancella esplicitamente un valore nullable. `deleteBySlug` restituisce un booleano.

I repository restituiscono direttamente le righe inferite dalle query, compreso `featured`. I valori nullable restano `null`, senza conversioni in `undefined`. I componenti usano i tipi derivati dallo schema tramite `import type`, senza importare il driver SQLite nel browser.

## Istanza e transazioni

```ts
import { createDatabaseLayer } from "@enzotasca/database";

const database = createDatabaseLayer({
  filename: "/percorso/assoluto/site.sqlite",
  cacheMax: 256,
});

try {
  database.transaction((repositories) => {
    repositories.articles.save(article);
    repositories.projects.save(project);
  });
} finally {
  database.close();
}
```

Nell'app web usare `getDatabaseLayer()` per ottenere l'istanza condivisa, senza chiuderla al termine di ogni richiesta. `getRepositories()` continua a essere disponibile per le query delle pagine.

Le transazioni sono sincrone: il callback non puo restituire una Promise. Il vincolo e verificato sia da TypeScript sia a runtime. Un errore annulla tutte le scritture della transazione. I repository ricevuti nel callback non sono riutilizzabili dopo la sua conclusione; usare `database.repositories` per le operazioni successive. `close()` svuota le cache, chiude la connessione ed e idempotente; letture, scritture e transazioni dopo la chiusura producono un errore. Non e consentito chiudere il layer mentre una transazione e in corso.

## Contenuti iniziali e rimozione dei mock

Il seed contiene tutti i dati iniziali: tre articoli, due progetti e tre skill. Prima di eliminare `apps/web/mocks/skills.ts` e stato verificato che testi, tag, colori e ordine corrispondessero sia ai dati del seed sia alle righe lette da SQLite. Il seed rimane idempotente e non sovrascrive record modificati.

La migrazione `0001_add_skills.sql` aggiunge solo la tabella e l'indice delle competenze, senza modificare articoli e progetti. Su ogni installazione aggiornata eseguire `db:migrate` e `db:seed` con lo stesso `SQLITE_PATH` dell'app. Non ci sono fallback a dati dimostrativi nelle pagine; i dati del seed sono importati solo dagli script e dai test.

Le letture avvengono direttamente nei Server Components tramite `apps/web/lib/server/repositories.ts`, protetto da `server-only`; non servono chiamate HTTP interne dal server verso lo stesso sito.

## Cache delle query

I repository usano una cache LRU interna basata su `Map`, senza dipendenze aggiuntive: massimo **256 risultati per entita e connessione**, senza scadenza temporale. Il limite conta le query memorizzate, non il numero di righe contenute in una lista. Le letture spostano la voce in fondo alla `Map`; quando si supera la capacita viene rimossa la prima voce, cioe quella usata meno recentemente. Il limite deve essere un intero positivo. I risultati restano memorizzati fino all'invalidazione tramite repository, all'espulsione per capacita o al riavvio del processo.

Sono memorizzati `list`, `findBySlug` (anche per slug inesistenti) e `listFeatured`, con una chiave diversa per ogni limite richiesto. Ogni layer possiede una cache per entita e la passa esplicitamente ai repository. Non ci sono `WeakMap` o registri globali nel package; layer diversi hanno connessioni e cache isolate. I valori sono copiati per evitare che il chiamante alteri i dati conservati in cache.

Dopo una scrittura riuscita (`save` o `deleteBySlug`) viene invalidata l'intera cache della relativa entita. Si eliminano anche liste, risultati vuoti e filtri: cambiare una data o il flag `featured` puo modificare piu query. Le scritture fallite non invalidano i risultati validi. Anche il seed passa dai repository, all'interno di una transazione, inserendo solo gli slug assenti.

Durante una transazione le letture eseguono sempre SQL e non riempiono la cache. Le scritture effettuate tramite repository invalidano comunque la cache: dopo commit o rollback la prima lettura ricarica lo stato effettivo. Usare `database.transaction(callback)`: il layer fornisce repository costruiti con l'esecutore Drizzle della transazione e le stesse cache dell'istanza.

L'invalidazione immediata riguarda le scritture effettuate tramite i repository sulla stessa connessione e nello stesso processo. Tutte le scritture applicative devono passare dai repository sulla stessa connessione. Senza TTL, scritture SQL dirette, Drizzle Studio, altri processi o altre connessioni non invalidano la cache e possono lasciare risultati obsoleti fino all'espulsione o al riavvio. In un deploy con piu istanze servirebbe un meccanismo di invalidazione condiviso per garantire aggiornamenti immediati. Il riavvio del processo svuota la cache.

## Modifiche allo schema

1. Modificare `packages/database/src/schema.ts`.
2. Eseguire `npm run db:generate`.
3. Controllare e versionare il SQL e gli snapshot generati in `drizzle/`.
4. Eseguire `npm run db:migrate` sul database desiderato.

`npm run db:studio` apre il browser del database per lo sviluppo. Eseguire le migrazioni come passaggio di deploy, prima di avviare la nuova versione dell'app.

## Verifiche

```sh
npm run lint
npm run typecheck
npm run test:db
npm run build
```

I test verificano ordinamento, filtro dei contenuti in evidenza, aggiornamenti, cancellazioni, vincoli, persistenza e ripetibilita di migrazioni e seed; coprono inoltre hit reali senza query SQL, isolamento dei risultati, invalidazione esplicita, rollback ed espulsione LRU. Non modificano il database locale.

## Ambito attuale e produzione

Homepage, archivio progetti, dettaglio articolo e preview del design system leggono da SQLite tramite repository lato server. Le fixture rimangono esclusivamente sotto `scripts/seed`, usate dagli script e dai test. Anche la preview del design system legge dai repository e mostra uno stato vuoto se non ci sono contenuti. Anche le skill sono persistite, con tag JSON, variante visuale e ordine di visualizzazione. Si conservano i testi italiani esistenti: le traduzioni dei contenuti editoriali e la persistenza della newsletter non sono ancora implementate.

In produzione impostare sempre `SQLITE_PATH` su un volume persistente e scrivibile. Il file non va inserito nel bundle di deploy. Questa configurazione richiede un runtime Node.js con supporto a moduli nativi; non e adatta a Edge o a filesystem effimeri. Pianificare backup coerenti con SQLite e modalita WAL.

Drizzle ORM e Drizzle Kit sono fissati alle versioni stabili 0.45.4 e 0.31.11. L'audit iniziale rileva quattro segnalazioni moderate nella catena di sviluppo di Drizzle Kit (esbuild), nessuna nelle dipendenze di produzione; non sono stati applicati downgrade o override incompatibili.

## Problema di routing rilevato nella verifica HTTP

Nel server locale di produzione i percorsi con prefisso `/en` restituiscono correttamente homepage, progetti e articoli dal database. Un articolo inesistente mostra la pagina 404; con lo streaming di Next.js lo stato HTTP puo essere 200.

I percorsi italiani senza prefisso (`/`, `/progetti`) entrano invece in un loop di redirect con la configurazione corrente `localePrefix: "as-needed"`. Anche `/it` reindirizza al percorso senza prefisso. La configurazione del routing non e stata modificata in questa implementazione del database; il problema richiede una correzione separata.
