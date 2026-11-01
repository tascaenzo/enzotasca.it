import assert from "node:assert/strict";
import { test } from "node:test";
import type { ComponentProps } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Button,
  CheckboxField,
  PageHeader,
  TagList,
  TextField,
  TextLink,
} from "../src/index.ts";

function RoutedLink({
  href,
  ...props
}: ComponentProps<"a"> & { href: string }) {
  return <a {...props} data-router="custom" href={`/en${href}`} />;
}

test("UI renders buttons and native links without a Next.js runtime", () => {
  const button = renderToStaticMarkup(<Button disabled>Save</Button>);
  assert.match(button, /<button/);
  assert.match(button, /type="button"/);
  assert.match(button, /disabled=""/);
  const link = renderToStaticMarkup(<Button href="/projects">Projects</Button>);
  assert.match(link, /<a /);
  assert.match(link, /href="\/projects"/);
  const external = renderToStaticMarkup(
    <TextLink href="https://example.com">External</TextLink>,
  );
  assert.match(external, /rel="noreferrer"/);
  assert.match(external, /target="_blank"/);
});

test("applications can inject routing without changing UI components", () => {
  const button = renderToStaticMarkup(
    <Button href="/projects" linkComponent={RoutedLink}>
      Projects
    </Button>,
  );
  const link = renderToStaticMarkup(
    <TextLink href="/articles" linkComponent={RoutedLink}>
      Articles
    </TextLink>,
  );
  assert.match(button, /href="\/en\/projects"/);
  assert.match(link, /href="\/en\/articles"/);
  assert.match(button, /data-router="custom"/);
  assert.match(link, /data-router="custom"/);
});

test("form fields preserve labels, IDs and native input attributes in React", () => {
  const email = renderToStaticMarkup(
    <TextField id="email" label="Email" type="email" required />,
  );
  assert.match(email, /for="email"/);
  assert.match(email, /id="email"/);
  assert.match(email, /type="email"/);
  assert.match(email, /required=""/);
  const generated = renderToStaticMarkup(<TextField label="Name" />);
  const id = /<input[^>]*id="([^"]+)"/.exec(generated)?.[1];
  assert.ok(id);
  assert.ok(generated.includes(`for="${id}"`));
  const checkbox = renderToStaticMarkup(
    <CheckboxField
      id="consent"
      label="Consent"
      description="Optional"
      disabled
    />,
  );
  assert.match(checkbox, /for="consent"/);
  assert.match(checkbox, /type="checkbox"/);
  assert.match(checkbox, /disabled=""/);
});

test("composed UI components render using only the public package entry", () => {
  const html = renderToStaticMarkup(
    <PageHeader eyebrow="Portfolio" title="Projects">
      <TagList items={["React", "SQLite"]} label="Skills" />
    </PageHeader>,
  );
  assert.match(html, /<h1[^>]*>Projects<\/h1>/);
  assert.match(html, /aria-label="Skills"/);
  assert.match(html, /<li>/);
});
