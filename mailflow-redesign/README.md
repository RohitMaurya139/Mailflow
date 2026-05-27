# Mailflow — Premium Redesign Handoff

This folder is a complete visual + implementation handoff for the Mailflow product
redesign. Drop it at the **root of your monorepo** (so Claude Code can see it
alongside `apps/web/`), then hand `IMPLEMENTATION_PROMPT.md` to Claude Code.

## What's inside

```
mailflow-redesign/
├── README.md                  ← you are here
├── IMPLEMENTATION_PROMPT.md   ← paste this into Claude Code to start
├── DESIGN_SPEC.md             ← full design system: tokens, type, components, screens
├── globals.css.example        ← new token block to replace your current vars
├── tailwind-notes.md          ← Tailwind v4 / shadcn token mapping notes
└── preview/                   ← live, runnable HTML mockups of every screen
    ├── index.html             ← open this in a browser to see the canvas
    ├── styles.css
    ├── design-canvas.jsx
    ├── shell.jsx
    ├── app.jsx
    └── screens/
        ├── marketing.jsx
        ├── auth.jsx
        ├── dashboard.jsx
        ├── inbox.jsx
        ├── campaigns.jsx
        ├── wizard.jsx
        ├── contacts.jsx
        ├── templates.jsx
        ├── workflows.jsx
        ├── analytics.jsx
        └── settings.jsx
```

## How to view the design

1. Open `preview/index.html` in any modern browser (or run `npx serve preview`).
2. You'll get a Figma-style canvas with 11 artboards across 5 sections.
3. Click any artboard's expand icon to view it fullscreen.

## How to ship it

1. Open `IMPLEMENTATION_PROMPT.md` and paste the prompt block into Claude Code.
2. Claude Code will read `DESIGN_SPEC.md` and execute screen-by-screen.
3. Start with tokens (`globals.css`), then primitives (`components/ui/*`),
   then page-level work in this order: marketing → auth → shell → inbox → rest.

## Quick-glance design system

- **Type**: Instrument Serif (display, italic accents) · Geist (UI) · Geist Mono (data)
- **Canvas**: `#F4F1E9` warm cream · **Ink**: `#1B1814` near-black
- **Accent**: clay `oklch(0.62 0.13 45)` ≈ `#B65A3E` — used sparingly
- **Semantics**: sage / amber / rose for state only, never decoration
- **Chrome**: 6px controls, 10px cards, hairline borders, **no** glassmorphism
- **Vibe**: editorial-warm, premium operator tool, serif headlines, generous whitespace
