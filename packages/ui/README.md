# @enzotasca/ui

Libreria del design system in React e Tailwind CSS v4. Non dipende da Next.js, next-intl, dal database o da alias dell'applicazione. Il workspace esporta sorgenti TypeScript/TSX: il bundler dell'app che lo usa deve supportarli.

```text
src/
├── index.ts          # Componenti, tipi pubblici e cn
├── styles.css        # Token @theme, stili TextLink e sorgenti Tailwind
├── components/       # Primitivi e composizioni UI generiche
└── utils/cn.ts       # Utility per classi condizionali
```

## Utilizzo

```tsx
import { Button, Card, TextField } from "@enzotasca/ui";

export function Example() {
  return (
    <Card>
      <TextField label="Email" name="email" type="email" />
      <Button type="submit">Salva</Button>
      <Button href="/progetti">Progetti</Button>
    </Card>
  );
}
```

Nel foglio CSS principale dell'app, elaborato con Tailwind v4:

```css
@import "tailwindcss";
@import "@enzotasca/ui/styles.css";
```

Il foglio del package dichiara `@source "./"` per includere le classi dei componenti anche quando il package e installato come dipendenza. Le regole globali dell'app (body, scroll, reset e preferenze di movimento) rimangono sotto `apps/web/app/globals.css`.

## Routing

`Button` con `href` e `TextLink` rendono link HTML standard. Un'app puo passare `linkComponent` per usare il proprio router. Il componente ricevuto deve accettare `href` e gli attributi nativi di un anchor, inoltrando `className`, `children` e le altre proprieta.

L'app Next.js mantiene gli adattatori `apps/web/components/navigation/button.tsx` e `text-link.tsx`, che passano il `Link` di next-intl. La UI non importa alcun router e non necessita di provider Next.js nei test.

Card di articoli, progetti e skill, header/footer del sito e componenti cookie rimangono nell'app: sono composizioni legate ai suoi contenuti, immagini, navigazione o stato. Usano i primitivi del package.

## Controlli

Dalla root:

```sh
npm run typecheck
npm run lint
npm run test:ui
npm run build
```

I test renderizzano i componenti con React DOM Server, senza avviare Next.js, e verificano anche l'iniezione di un router alternativo e il collegamento tra label e input. React e Tailwind sono peer dependencies; il package non aggiunge dipendenze runtime proprie.
