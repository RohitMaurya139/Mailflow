# Implementation Prompt for Claude Code

Paste the block below into Claude Code, run from your monorepo root (the
folder that contains `apps/web/`). Make sure `mailflow-redesign/` is also at
that root so Claude Code can read it.

---

## 📋 Copy-paste prompt

````
You are implementing a complete visual redesign of the Mailflow web app.

## 0. Context

This is a Next.js 15 + Tailwind v4 + shadcn/ui ("new-york") monorepo. The web
app lives in `apps/web/`. The current UI is generic indigo-on-slate SaaS. We
are moving it to an editorial-warm operator-tool aesthetic: warm cream
canvas, near-black ink, single clay (terracotta) accent, serif display +
geometric sans body. No glassmorphism. No gradients. No purple. No indigo.

The complete design package is in `mailflow-redesign/` at the repo root.
Read it before writing any code:

1. `mailflow-redesign/README.md` — overview
2. `mailflow-redesign/DESIGN_SPEC.md` — the rules (read cover-to-cover)
3. `mailflow-redesign/globals.css.example` — the new token block
4. `mailflow-redesign/tailwind-notes.md` — Tailwind/shadcn mapping
5. `mailflow-redesign/preview/` — live HTML mockups of every screen, with JSX

The `preview/` folder is the source of truth for visual output. Open
`preview/index.html` locally to see the design canvas with all 11 artboards.
Inside `preview/screens/*.jsx` you'll find pixel-faithful JSX for each
screen — these are not React components you should copy verbatim (they
inline a lot of demo data), but they are the **exact** visual target for
every layout decision, spacing value, and component composition.

## 1. Hard rules — never break these

- Read `DESIGN_SPEC.md` section 11 ("Don'ts") before every page.
- One accent color: clay (`oklch(0.62 0.13 45)` ≈ `#B65A3E`). Used for
  primary CTAs, italic emphasis in serif headlines, active nav state, and
  "hot" metrics. **Never use indigo, violet, purple, system blue.**
- Use Instrument Serif for display, Geist for UI, Geist Mono for data/IDs/
  timestamps. Numbers in tables, mailbox names, timestamps, API keys — all
  mono.
- Status badges use sage/amber/rose **only** as semantic state. They are
  not decoration.
- Hairlines + tonal layering for depth. No drop shadows except: tasteful
  marketing hero shadow, and `--shadow-pop` for popovers/menus.
- 32px default button height, 6px button radius, 12px card radius.
- Never auto-generate decorative SVG illustrations. Use placeholders with
  mono captions if a real asset is missing.
- Keep all current routes, server actions, and data fetches working. This
  is a visual + structural overhaul, not a backend rewrite.

## 2. Execution plan — do these in order

### Phase 1 — Tokens & fonts (foundation)

- [ ] Update `apps/web/app/layout.tsx` to load Instrument Serif + Geist +
      Geist Mono (see `tailwind-notes.md` for the exact font block).
- [ ] Replace `apps/web/app/globals.css` with the contents of
      `mailflow-redesign/globals.css.example`. Preserve any project-specific
      `@layer` rules you may have added (Tailwind plugins, scrollbar styling).
- [ ] Run the app, take a screenshot of the dashboard. The colors should
      already look 60% there: warm cream bg, ink text, hairline borders.

### Phase 2 — shadcn primitives (`apps/web/components/ui/*`)

For each file, audit and adjust so it matches `DESIGN_SPEC.md` §6
("Component primitives"). Do NOT restructure components or change props —
only update class strings and any hardcoded color values.

- [ ] `button.tsx` — add a `clay` variant; ensure heights are 28/32/38px;
      remove any indigo/violet defaults; size icons at 14px with 7px gap.
- [ ] `input.tsx` — `--surface` bg, `--hairline` border, ink focus border
      (no ring), 13.5px text.
- [ ] `card.tsx` — `--surface` bg, hairline border, `--radius-lg`; ensure
      `CardHeader` is 14×18 padding with hairline-bottom and h3 at 13.5px/500.
- [ ] `badge.tsx` — pill (999 radius), 11.5px, optional leading dot. Add
      sage/amber/rose/clay variants per spec.
- [ ] `table.tsx` — mono uppercase 10.5px column heads with `--surface` bg
      hairline-bottom; 12×14 cell padding; row hover at rgba(27,24,20,0.015).
- [ ] `tabs.tsx` — pill group inside `--surface-2` bg with 3px padding;
      active tab gets `--surface` + `--shadow-card`.
- [ ] `dialog.tsx` — `--surface` bg, `--radius-lg`, `--shadow-pop`; backdrop
      `rgba(27,24,20,0.4)`, no backdrop-blur.
- [ ] `dropdown-menu.tsx`, `select.tsx` — `--shadow-pop` menu, 4px padding
      around 7×10 items.
- [ ] `textarea.tsx`, `label.tsx`, `sonner.tsx` — minor token adjustments.

### Phase 3 — Shell

- [ ] `apps/web/app/dashboard/layout.tsx` — rebuild sidebar + topbar per
      `DESIGN_SPEC.md` §7. Sidebar = 232px, canvas bg, hairline right.
      Two nav groups ("WORKSPACE" / "CONFIGURE") with mono 10px labels.
      Active item: surface bg + inset hairline + 2px clay left rail.
      Use Lucide icons at 1.6 stroke, 15px.
- [ ] Brand mark: serif wordmark "Mail*flow*" — italic "flow" in clay.
- [ ] Topbar: 56px, crumbs + 280px search pill + spacer + icon buttons + avatar.
- [ ] Avatar block at sidebar bottom: 26px clay-bg avatar + name + workspace/
      role (mono).

### Phase 4 — Pages, in this order

Build each one to match `preview/screens/<name>.jsx`. The JSX is illustrative
but the layout, spacing, type sizing, and component composition should be
faithful. Reuse the now-updated shadcn primitives.

1. [ ] `apps/web/app/page.tsx` (marketing) → see
       `preview/screens/marketing.jsx`. Pay extra attention to:
       - 96px serif hero with italic clay accent on line 2
       - Embedded product-preview slab (real Mailflow inbox at scale, not a
         screenshot). Wire it up with mock data; it's a marketing element.
       - 4-up feature grid as a single bordered card with hairline-split cells
       - 5-step workflow strip with the middle step clay-tinted
       - Dark ink testimonial slab
2. [ ] `apps/web/app/(auth)/signin/page.tsx` + `signup/page.tsx` → see
       `preview/screens/auth.jsx`. Split 50/50; left is editorial; right is form.
3. [ ] `apps/web/app/dashboard/page.tsx` → `preview/screens/dashboard.jsx`.
       KPI sparkline row + onboarding checklist + sender-pool health + today's
       schedule (Gantt-ish).
4. [ ] `apps/web/app/dashboard/inbox/page.tsx` → `preview/screens/inbox.jsx`.
       4-column layout. Each column independently scrollable. The AI draft
       panel is clay-tinted with Send/Schedule/Refine; the AI analysis panel
       on the right has the key/value table + workflow checklist + contact mini.
5. [ ] `apps/web/app/dashboard/campaigns/page.tsx` →
       `preview/screens/campaigns.jsx`. Sparklines inline in the table.
       Funnel + intent donut below.
6. [ ] `apps/web/app/dashboard/campaigns/new/page.tsx` →
       `preview/screens/wizard.jsx`. Stepper + vertical sequence builder +
       sticky right inspector.
7. [ ] `apps/web/app/dashboard/contacts/page.tsx` →
       `preview/screens/contacts.jsx`. Lists sidebar + filter bar + table.
8. [ ] `apps/web/app/dashboard/templates/page.tsx` →
       `preview/screens/templates.jsx`. 3-column with template list, editor,
       meta panel. The body editor inlines clay-chip merge variables.
9. [ ] `apps/web/app/dashboard/workflows/page.tsx` →
       `preview/screens/workflows.jsx`. Visual flowchart on a dotted-grid bg.
10. [ ] `apps/web/app/dashboard/analytics/page.tsx` →
        `preview/screens/analytics.jsx`. 30-day line chart with ink tooltip,
        intent donut, send-time heatmap, sender health table. Use Recharts;
        wire the colors via `rgb(var(--chart-N))`.
11. [ ] `apps/web/app/dashboard/settings/page.tsx` →
        `preview/screens/settings.jsx`. Section nav + workspace card + API
        keys table + BullMQ queue health grid + audit log.

### Phase 5 — Cleanup

- [ ] Repo-wide search for: `indigo`, `violet`, `purple`, `bg-slate`,
      `text-slate`, `from-`, `to-`, `via-`, `backdrop-blur`,
      `bg-gradient`. Replace per `tailwind-notes.md`. **Delete any
      decorative gradient utility classes.**
- [ ] Audit every emoji used as iconography. Replace with Lucide.
- [ ] Verify dark mode on inbox + dashboard. The dark palette is warm-dark,
      not slate-dark — check it doesn't slip back to cool.
- [ ] Run `pnpm typecheck` and `pnpm lint`; fix all errors.
- [ ] Run `pnpm test` (vitest + playwright). Fix any visual snapshots that
      legitimately need updating; investigate any that broke unexpectedly.
- [ ] Take screenshots of all 11 surfaces and compare side-by-side with
      `mailflow-redesign/preview/index.html`.

## 3. Acceptance criteria

The redesign is "done" when:

- Opening `localhost:3000` lands on a serif-headlined cream landing page
  with a clay primary CTA and an embedded product preview that *renders the
  real inbox component* (not a screenshot).
- The dashboard sidebar has a serif italic "flow" in the wordmark, two
  uppercased nav groups, a clay-rail active state, and a mono user-meta row
  at the bottom.
- The inbox is a 4-pane layout with a clay-tinted AI draft panel and a
  right-side AI analysis panel that includes a key/value table and a
  workflow checklist.
- No indigo/violet/purple/system-blue exists anywhere in the rendered UI.
- Every table column header is mono uppercase 10.5px with 0.06–0.08em
  tracking.
- Every page header h1 is Instrument Serif at 32px or larger, with optional
  italic clay emphasis spans.
- All numbers in all tables are Geist Mono.
- Dark mode toggles to warm-dark, not slate-dark.
- All existing tests pass (or are updated with clear visual justification).

## 4. Ask before doing

If you encounter any of these, stop and ask before proceeding:

- A page or surface not covered in `preview/screens/*.jsx` (mobile breakpoints,
  rare modals, admin-only views).
- A shadcn primitive whose internal structure would need to change (not just
  styling).
- A backend/data shape change implied by a visual element.
- A feature flag or A/B test where the design package only covers one variant.

Start with Phase 1 (tokens) and report back with a screenshot before
moving on to Phase 2.
````

---

## After Claude Code finishes

A sensible review pass:

1. Visit `/`, `/signin`, `/dashboard`, `/dashboard/inbox` first — those have the most visual variation.
2. Toggle dark mode and re-check inbox + dashboard.
3. Spot-check tables: numbers should be mono, column heads mono uppercase.
4. Open `preview/index.html` in a second tab and compare side-by-side.
5. If anything drifted (especially on inbox or campaigns), ask Claude Code to "match the layout in `preview/screens/<name>.jsx` more precisely" with a specific element name.
