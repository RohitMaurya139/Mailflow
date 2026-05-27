# Mailflow — Design Specification

This document is the source of truth for the Mailflow redesign. Read it cover-
to-cover before touching `globals.css`. The `preview/` folder is the visual
reference; this doc is the rules.

---

## 1. Design philosophy

The current UI is **generic indigo-on-slate SaaS**. The redesign moves the
product into an **editorial-warm operator tool** register — closer to a
well-designed dashboard a senior operator would actually keep open all day:

- **Warm, not cold.** Cream canvas, ink text, hairline borders. No bright
  whites, no cool blues, no purple gradients.
- **Serif headlines, geometric sans body.** Display serif (Instrument Serif)
  creates a publication-like authority. Italic clay accents in headlines do
  the work that colored gradients used to do.
- **One accent, used like punctuation.** Clay (`#B65A3E`) appears on primary
  CTAs, active states, hot metrics, and italic emphasis. Sage / amber / rose
  appear *only* on state badges (Interested / Maybe later / Bounce).
- **Density without clutter.** Generous whitespace, but data-dense tables
  with `mono` for numbers, IDs, and emails. Type does the hierarchy work; we
  almost never use borders+backgrounds together.
- **No glassmorphism, no big shadows.** Depth via tonal layering (`surface`
  over `canvas`), hairlines, and serif/sans contrast.

---

## 2. Color tokens

All colors use OKLCH where possible. Hex provided as fallback.

### Neutrals (warm cream scale)

| Token         | Value         | Use                                   |
|---------------|---------------|---------------------------------------|
| `--canvas`    | `#F4F1E9`     | page bg, sidebar bg                   |
| `--surface`   | `#FBF9F2`     | cards, inputs, raised panels          |
| `--surface-2` | `#EFEBDE`     | hover, secondary chip bg, table head  |
| `--ink`       | `#1B1814`     | primary text, primary button bg       |
| `--ink-2`     | `#3A332A`     | body text                             |
| `--muted`     | `#6E665B`     | secondary text, labels                |
| `--muted-2`   | `#9A9082`     | tertiary text, placeholders           |
| `--hairline`  | `#E2DBCB`     | 1px borders, dividers                 |
| `--hairline-strong` | `#D2C9B6` | dashed borders, slightly stronger    |

### Accent

| Token         | Value                       | Use                                |
|---------------|-----------------------------|------------------------------------|
| `--clay`      | `oklch(0.62 0.13 45)` ≈ `#B65A3E` | primary CTA, active nav, hot metrics |
| `--clay-ink`  | `#7A3520`                   | clay text on light bg              |
| `--clay-soft` | `#EBD9CF`                   | clay chip bg, clay panel bg        |

### State colors (semantics only — never decoration)

| Token         | Value                       | Maps to                            |
|---------------|-----------------------------|------------------------------------|
| `--sage`      | `#5C8A6E`                   | Interested, Healthy, success       |
| `--sage-soft` | `#DCE6DE`                   | sage chip bg                       |
| `--amber`     | `#C28B2A`                   | Maybe later, Throttling, warning   |
| `--amber-soft`| `#F1E6C8`                   | amber chip bg                      |
| `--rose`      | `#B0496B`                   | Unsubscribe, Bounce, error         |
| `--rose-soft` | `#F0D9DF`                   | rose chip bg                       |

### Rules

1. **No saturated indigos, no system blues.** If you have to add a color, pull
   it from this list.
2. **Clay is precious.** Only one clay element should be visually dominant per
   page. CTAs first, then hot-metric numbers, then italic headline accents.
3. **Status badges always pair `--<color>-soft` bg with `--<color>` text.**

---

## 3. Type system

**Load these Google Fonts** in `app/layout.tsx`:

```ts
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal','italic'], variable: '--font-serif' });
const sans = Geist({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-sans' });
const mono = Geist_Mono({ subsets: ['latin'], weight: ['400','500'], variable: '--font-mono' });
```

### Scale

| Class           | Size / line-height | Family    | Use                          |
|-----------------|--------------------|-----------|------------------------------|
| `display-xl`    | 96px / 0.95        | serif     | Marketing hero               |
| `display-lg`    | 64px / 1           | serif     | Marketing section heads      |
| `display-md`    | 48px / 1.05        | serif     | Marketing sub-sections       |
| `display-sm`    | 32–40px / 1.1      | serif     | Page h1 ("Welcome, Rohit")   |
| `serif-heading` | 22–26px / 1.2      | serif     | Card titles in dramatic moments (inbox subject, AI summary) |
| `body-lg`       | 16–17px / 1.5      | sans      | Marketing body               |
| `body`          | 14px / 1.45        | sans      | Default UI                   |
| `body-sm`       | 13px / 1.45        | sans      | Table cells, secondary       |
| `label`         | 10–11px / 1, 0.08em tracking, UPPERCASE | mono | Stat labels, column heads |
| `data`          | 11–13px / 1.4      | mono      | IDs, emails, timestamps, counts |

### Rules

1. **Headlines are serif.** Page h1, marketing display, card titles in hero moments.
2. **Italic clay** for emphasis inside serif headlines: `cold outreach, <em>warm enough</em> to reply to`. Use sparingly — once per headline max.
3. **Mono for data.** Numbers in tables, emails, IDs (`mf_live_••••8214`), timestamps (`2m ago`), and ALL-CAPS labels.
4. **No tracking on body.** Letter-spacing only on labels (`0.06–0.10em`) and display headlines (`-0.025em` to `-0.03em`).
5. **Numerals are tabular** in tables — Geist Mono handles this naturally.

---

## 4. Radii & shadows

| Token      | Value | Use                              |
|------------|-------|----------------------------------|
| `--r-sm`   | 6px   | buttons, inputs, chips           |
| `--r-md`   | 8px   | small cards, inner panels        |
| `--r-lg`   | 12px  | top-level cards, stat blocks     |
| `--r-xl`   | 16px  | feature grid, CTA blocks         |

**Shadows** — used very rarely:

- `--shadow-card`: `0 1px 0 rgba(27,24,20,0.04), 0 1px 2px rgba(27,24,20,0.03)` — bare hint
- `--shadow-pop`: `0 4px 14px rgba(27,24,20,0.08), 0 1px 0 rgba(27,24,20,0.04)` — popovers, menus
- Marketing hero product preview gets one tasteful big shadow: `0 20px 60px -20px rgba(27,24,20,0.18)`. Nowhere else.

**No glassmorphism. No big drop shadows. Depth comes from tonal layering.**

---

## 5. Layout

- **Sidebar**: 232px fixed, `--canvas` bg, 1px right hairline. Two nav groups: "Workspace" and "Configure" (mono micro-label). Active item: `--surface` bg + inset hairline + 2px clay rail at the left edge.
- **Topbar**: 56px, hairline bottom, `--canvas` bg. Crumbs (muted) · search pill (min 280px) · spacer · icon buttons · avatar.
- **Main content**: 28–32px page padding, 64px bottom padding.
- **Page header**: large serif h1 (32px) with optional italic clay span, 13.5px muted sub, primary actions right-aligned.
- **Grid gap**: 16px default, 24px between major sections.

---

## 6. Component primitives (shadcn mapping)

Each shadcn primitive in `apps/web/components/ui/` needs a token-level rewrite. Below are the exact specs; class names assume Tailwind v4 + the token block in `globals.css.example`.

### Button

| Variant   | Bg                | Fg            | Border        | Hover         |
|-----------|-------------------|---------------|---------------|---------------|
| `primary` | `--ink`           | `--canvas`    | `--ink`       | `#000`        |
| `clay`    | `--clay`          | `white`       | `--clay`      | `--clay-ink`  |
| `default` | `--surface`       | `--ink`       | `--hairline`  | `--surface-2` |
| `ghost`   | transparent       | `--ink-2`     | transparent   | `--surface`   |
| `outline` | transparent       | `--ink`       | `--hairline-strong` | `--surface` |

Sizes: `sm` 28px, `default` 32px, `lg` 38px. Border-radius `--r-sm`. Font-weight 500. Icon size 14px, 7px gap.

### Input

`--surface` bg, `--hairline` border, `--r-sm`, 13.5px text. Focus → border becomes `--ink` (no ring). Placeholder `--muted-2`.

### Card

`--surface` bg, 1px `--hairline`, `--r-lg`. Internal header row: 14px×18px padding, hairline bottom, h3 (13.5px / 500). Body: 18px padding.

### Badge

```
.mf-badge { display:inline-flex; gap:4px; padding:2px 8px; border-radius:999px; font-size:11.5px; font-weight:500; line-height:1.4; border:1px solid var(--hairline); background:var(--surface-2); color:var(--ink-2); }
```

Variants apply `--<state>-soft` bg + `--<state>` text + transparent border. Small dot (6×6, `background:currentColor`) prefixes status badges.

### Table

- `border-collapse: separate; border-spacing: 0;`
- `th`: mono, 10.5px, uppercase, 0.06em tracking, muted color, hairline-bottom, `--surface` bg.
- `td`: 12px×14px padding, hairline-bottom, 13px.
- Row hover: `rgba(27,24,20,0.015)` — almost invisible. Never a colored hover.
- Numbers right-aligned, mono.

### Tabs

Pill group inside `--surface-2` bg with 3px padding. Active tab: `--surface` bg with `--shadow-card`. Inactive: transparent.

### Dialog / Modal

`--surface` bg, `--r-lg`, 1px `--hairline`, `--shadow-pop`. Max-width 520px default. No backdrop blur; backdrop is `rgba(27,24,20,0.4)`.

### Dropdown / Select

Button styled like default Button + chev-down icon (mf-chev). Menu uses `--shadow-pop` and 4px padding around 7px×10px menu items.

### Toast (sonner)

`--ink` bg, `--canvas` text, 8px radius. Status toasts: replace bg with `--<state>` and keep `--canvas` text.

---

## 7. Sidebar nav spec

```
Mark + wordmark (serif italic "flow" in clay)
[Cmd-K quickfind — dashed border button]

— WORKSPACE —
Inbox      [12]
Campaigns  [4]
Contacts
Templates
Workflows
Rewards

— CONFIGURE —
Accounts   [8]
Analytics
Settings

(bottom) Avatar · Name · Workspace · Role (mono)
```

- Group labels: 10px mono uppercase `0.08em` tracking, `--muted-2`, 14px top padding.
- Active item: 2px left clay rail (sits in -14px gutter), `--surface` bg, inset hairline.
- Icon size 15px, opacity 0.7 → 1.0 active. Active icon picks up `--clay`.
- Badges: small pills, `--surface-2` bg + muted text. Inbox badge in non-active state → `--clay` bg + white text (drives attention).

---

## 8. Iconography

Use **Lucide** at 1.6 stroke-width, `currentColor`. Icons are 15px in nav, 14px in buttons, 16–18px in card headers. Never decorative — only functional or status-bearing.

| Concept     | Lucide icon          |
|-------------|----------------------|
| Inbox       | `inbox`              |
| Campaigns   | `send`               |
| Contacts    | `users-round`        |
| Templates   | `file-text`          |
| Workflows   | `git-branch` or custom 3-node |
| Rewards     | `gift`               |
| Accounts    | `mail`               |
| Analytics   | `bar-chart-3`        |
| Settings    | `settings`           |
| AI / suggestion | `sparkles`       |

**Never auto-generate decorative SVG illustrations.** If a visual is needed, use a striped placeholder (see `.mf-slot` in `styles.css`).

---

## 9. Per-screen specs

Refer to `preview/screens/*.jsx` for live HTML. Below: what's new structurally vs. the current UI.

### 9.1 Marketing (`app/page.tsx`)

- Nav: brand left, 5 nav items center-left, sign-in + clay primary CTA right.
- Hero: small pill `"NEW · Intent classifier v3"` → serif 96px headline with italic clay accent on line 2 → body copy max-width 560px → CTA row (primary CTA + ghost demo CTA) → security micro-line.
- **Hero product preview**: real mini Mailflow inbox rendered inside a window-chrome frame. Sidebar 220px · thread list 320px · conversation · AI panel 280px. This is the main "wow" element — make it pixel-tight, not a screenshot.
- Logo bar: 6 made-up "team" wordmarks in serif at 60% opacity. Replace with real logos when available.
- Features section: 4-up grid inside a single bordered card; cells separated by 1px hairlines (no gaps). Each cell: 36px icon tile (canvas bg + clay icon) + serif 22px title + muted body.
- Workflow strip: 5 stepped cards (`Send → Detect → Classify → Decide → Reward`). Middle "Classify" card highlighted with clay-soft bg. Arrows between cards.
- Metrics + testimonial: 2-col split. Left: 4 huge serif metrics (3.4×, 62%, 9 min, 0.4%). Right: dark ink card with serif pull quote, clay 5-star row.
- CTA: bordered card, big serif headline with italic clay, dual CTAs in column.
- Footer: brand, copyright, link row.

### 9.2 Auth (`app/(auth)/signin/page.tsx` + `signup/page.tsx`)

Split 50/50:
- **Left** (surface bg): brand → serif 56px headline with italic clay → body copy → embedded "overnight activity" log (5 timestamped events, status chips). Bottom: pull-quote line in mono.
- **Right** (canvas bg): sign-in/up form. Google button first → mono "OR EMAIL" divider → email + password fields → clay checkbox → primary CTA → SSO callout. Bottom strip: SOC2 · support · version (mono).

### 9.3 Dashboard home (`app/dashboard/page.tsx`)

- Page header: serif h1 "Good afternoon, *Rohit.*" (clay italic name).
- KPI row: 4 stat cards. Mono label top-left, sparkline top-right, serif 36px value, sage/rose delta pill.
- Onboarding card (2/3 width): 5 numbered rows; done items show sage check + green "Done" badge; pending items show CTA button.
- Sender health card (1/3 width): 5 mailboxes with status dot + name + status + capacity bar (`n / cap today`).
- Replies card + today's schedule (Gantt-style timeline with 8 mailboxes as horizontal bars).

### 9.4 Inbox (`app/dashboard/inbox/page.tsx`)

4-column grid: **mailbox list (220) · thread list (360) · conversation (flex) · AI panel (320)**. All columns scroll independently.

- Mailbox column: serif "All" header + clay unread pill → list of 8 mailboxes with status dots + mono names + badge counts → "Saved views" subsection (Hot leads, Needs reply, etc.).
- Thread column: header with "Replies" + count + sort dropdown. Each row: avatar + name + time → subject → muted snippet → intent badge + mono confidence. Active thread: clay-tinted bg + 2px left clay rail.
- Conversation: header (serif 26px subject + intent + "Hot" badges + mono meta row + action row). Body: outgoing message (surface) → divider for OOO → incoming message (surface-2) → **clay-tinted AI draft panel** with textarea + Send / Schedule / Refine buttons.
- AI panel: 5-row key/value analysis table → workflow status checklist → contact mini-card.

### 9.5 Campaigns (`app/dashboard/campaigns/page.tsx`)

- Table with: status dot, name (+ mono ID/subtitle), status badge, sent/total + inline progress bar, mono open/reply rates (reply > 10% colored clay), inline sparkline, sender pool, last-sent timestamp, kebab.
- Below table: 2-col split. Left: funnel for top campaign (7-stage horizontal bar funnel with mono counts + %). Right: AI intent donut.

### 9.6 Campaign wizard (`app/dashboard/campaigns/new/page.tsx`)

- Top stepper: 5 steps, current step ink-filled circle, completed = sage check, future = dashed circle.
- Left: vertical sequence with timeline gutter. Each step card: mono "DAY +N" + label + template chip + (if sent) inline metrics. Active step gets clay border + 3px clay shadow.
- Right inspector (sticky): rules toggle list (5 toggles, clay when on) → AI personalization variables (chips) → recipient preview block (mono fields) → sticky Back/Continue at bottom.

### 9.7 Contacts (`app/dashboard/contacts/page.tsx`)

- Left sidebar (220): lists + counts (Active item highlighted). Below rule: tag chips with counts.
- Right: filter bar (search + 3 dropdowns + active-filter badge) → table (checkbox · contact w/ avatar + email · company · status badge · last touched · 80px engagement bar + mono score · tag chips · kebab) → pagination row.

### 9.8 Templates (`app/dashboard/templates/page.tsx`)

3-col: **template list (260) · editor (flex) · meta panel (320)**.

- Template list: each card has mono slug, description, status badge, mono reply rate, optional status dot. Active template gets clay border + tinted bg.
- Editor: card header with mono slug + status + Edit/Preview/Variants/History tab pills (active = surface card pop). Subject input → toolbar (B/I/U/S + Attach/Variable/AI rewrite + mono spam score) → body container with clay-chip merge vars inline → AI suggestion panel (clay-tinted) with "Apply both" CTA.
- Meta panel: Performance card (4 mini-stats grid + sparkline), Variables card (mono chip + coverage %), A/B variant card with promote CTA.

### 9.9 Workflows (`app/dashboard/workflows/page.tsx`)

- Left list (260): 5 workflow cards with name + trigger summary + on/off toggle + mono runs/7d. Active = clay border + tint.
- Center canvas: dotted-grid bg. Vertical flowchart: clay-outlined **Trigger** ("Reply received") → amber-labeled **Condition** ("intent IS Interested AND confidence ≥ 0.85") → branch into TRUE column (4 action cards: Tag, Slack, Move to list, Draft reply) and FALSE column (single fallback). Each branch terminates in a sage check circle / muted dot. Connectors are 2px hairline lines with chevron arrowheads.
- Right inspector (300): action-editor card + recent-runs list + AI tips card.

### 9.10 Analytics (`app/dashboard/analytics/page.tsx`)

- KPI row: 4 stats with sparklines (Sent, Open rate, Reply rate, Booked meetings).
- 2-col: **Engagement funnel** big chart (3-line area chart over 30 days with hover marker + ink tooltip) · **AI intent breakdown** donut + legend.
- 2-col: **Send-time heatmap** (7 days × 8 hours, clay-saturation by reply rate, mono % in cell) · **Sender health** table.

### 9.11 Settings (`app/dashboard/settings/page.tsx`)

- 2-col: section nav (sticky) + content (max 760).
- Workspace card: 64px clay tile + 2×2 field grid (Name, Slug mono, Plan w/ clay badge, Role w/ sage badge).
- API keys: table with label, masked mono key, scope chip, last used.
- Queue health: 3-col grid of 9 mini-cards. Each: status dot + mono queue name + ACT/PEND/FAIL counters in mono (FAIL > 0 → rose).
- Audit log: 4-col rows (actor, action, mono object, time).

---

## 10. Accessibility

- **Contrast**: Ink on canvas = 14.2:1. Clay on white = 4.6:1 (use bold/medium weight for clay text under 14px). Muted on canvas = 4.5:1. Validate all state colors at WCAG AA.
- **Focus rings**: 2px clay outline at `outline-offset: 2px`, never custom inner shadows. Do NOT remove default focus rings without replacement.
- **Hit targets**: 32px min for default buttons, 28px for `sm`, 38px for `lg`. Icon-only buttons: 30px square minimum.
- **Motion**: respect `prefers-reduced-motion`. Default transitions ≤ 150ms.

---

## 11. Don'ts

- ❌ Don't reintroduce indigo, purple, system blue, or any gradient backgrounds.
- ❌ Don't use emoji as iconography (the preview has 1–2 only as data labels — replace with Lucide).
- ❌ Don't put borders + colored backgrounds + drop shadows on the same element. Pick one.
- ❌ Don't auto-generate decorative SVG illustrations. Use the striped placeholder + mono caption.
- ❌ Don't shrink type below 11px outside mono labels.
- ❌ Don't ship a hero with an inert mockup screenshot — render the real product chrome (see marketing hero).
