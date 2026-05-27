# Tailwind v4 + shadcn token mapping

The shadcn "new-york" style uses CSS-variable token names. We're keeping those
names so primitives in `apps/web/components/ui/*` don't need any internal
changes — only `globals.css` does. After you swap in `globals.css.example`,
the following Tailwind utility classes will pick up the new palette
automatically:

| Class                   | Resolves to               |
|-------------------------|---------------------------|
| `bg-background`         | canvas (`#F4F1E9`)        |
| `text-foreground`       | ink (`#1B1814`)           |
| `bg-card`               | surface (`#FBF9F2`)       |
| `bg-secondary`          | surface-2 (`#EFEBDE`)     |
| `text-muted-foreground` | muted (`#6E665B`)         |
| `bg-primary`            | ink (`#1B1814`)           |
| `text-primary-foreground` | canvas (`#F4F1E9`)      |
| `bg-accent`             | clay-soft (`#EBD9CF`)     |
| `text-accent-foreground`| clay-ink (`#7A3520`)      |
| `border-border`         | hairline (`#E2DBCB`)      |
| `ring-ring`             | clay (`oklch(0.62 0.13 45)`) |
| `bg-destructive`        | rose (`#B0496B`)          |

## What to *add* beyond shadcn's defaults

These are not in the shadcn token list but are referenced repeatedly in the
design. Add them as utility classes via `@layer components` (already in
`globals.css.example`) or extend `tailwind.config` if you're on v3-style
config.

```css
bg-canvas        → var(--color-canvas)
bg-surface       → var(--color-surface)
bg-clay          → var(--color-clay)
text-clay        → var(--color-clay)
text-clay-ink    → var(--color-clay-ink)
bg-clay-soft     → var(--color-clay-soft)
bg-sage          / text-sage    / bg-sage-soft
bg-amber         / text-amber   / bg-amber-soft
bg-rose          / text-rose    / bg-rose-soft
text-ink-2       → var(--color-ink-2)
text-muted-2     → var(--color-muted-2)
border-hairline-strong
```

In Tailwind v4 with `@theme`, these get generated automatically from the
`--color-*` tokens declared in `globals.css.example`. No config file edit
needed.

## Font setup

In `apps/web/app/layout.tsx`:

```ts
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});
const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

## Removing the old indigo

Once you've swapped tokens, do a repo-wide search for hardcoded indigo /
violet / purple / slate utility classes and replace:

| Old (representative)        | New                                        |
|-----------------------------|--------------------------------------------|
| `bg-indigo-600`, `bg-violet-500` | `bg-primary` or `bg-clay`            |
| `text-indigo-600`           | `text-clay` or `text-foreground`           |
| `border-slate-200`          | `border-border` (now hairline)             |
| `bg-slate-50`               | `bg-card` or `bg-canvas`                   |
| `text-slate-500`            | `text-muted-foreground`                    |
| `ring-indigo-500`           | `ring-ring`                                |
| `from-indigo-500 to-purple-600` (gradients) | drop the gradient; use `bg-clay` |

If you find a gradient, **delete it.** The redesign has no decorative
gradients.

## Charts (Recharts)

Pass the chart tokens directly into Recharts series:

```ts
const seriesColors = [
  'rgb(var(--chart-1))', // clay
  'rgb(var(--chart-2))', // sage
  'rgb(var(--chart-3))', // amber
  'rgb(var(--chart-4))', // rose
  'rgb(var(--chart-5))', // ink
];
```

Axis ticks: `rgb(var(--muted-foreground))`, font-family `var(--font-mono)`,
font-size 10px. Grid lines: `rgb(var(--border))` with `strokeDasharray="2 4"`.
Tooltip: ink bg, canvas text.

## Dark mode trigger

The current implementation toggles `next-themes` `.dark` on `<html>` — keep
that. The `globals.css.example` includes a full dark-mode token map that
shifts the entire palette warmer-dark, not slate-dark. Test the inbox screen
first; it has the most surface variation.
