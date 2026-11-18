---
name: figma-design-system
description: >-
  Enforces the GG Roundtrip (Muchachito) e-commerce Design System when creating
  or editing anything in the Figma file GG-Roundtrip_E-commerce
  (fileKey oO5TfFAXgsNDcNQUL9B53D). Use for ANY Figma design work on this
  project — placing components, drawing UI, adding screens, CTAs, cards, forms,
  or styling — so the agent reuses library components, binds variables, and
  applies text/effect styles instead of hardcoding values.
---

# GG Roundtrip Design System

When creating or editing **anything** in the GG-Roundtrip_E-commerce file, follow this library. Never hardcode a value that a library token or component already expresses. When in doubt, call `search_design_system` / `get_libraries` first and reuse what exists.

## 1. Reuse components before building
Search the library first (`search_design_system`). If a component exists for what you need — **Button, Product Card, Badge, Input, Header, Footer, Toast** — place an instance and set its variant/properties. Do **not** redraw a primitive from raw rectangles/text when a component exists. Only create a new component if there is genuinely no match, and build it from the tokens below.

Component properties (set these, don't rebuild):
- **Button** — `Style` (Primary / Secondary / Ghost), `Size` (Md / Lg), `State` (Default / Hover / Disabled), `Label` (text). Primary = brand red. This is the component reused for the "Buy Now" CTA.
- **Product Card** — `Title` (text), `Price` (text), `Show Sale` (boolean).
- **Badge** — `Count` (text). Used for the cart count in the header.
- **Input** — `State` (Default / Focus), `Label`, `Value`.
- **Header / Footer** — site chrome; use as-is.
- **Toast** — `Message` (text).

## 2. Bind variables — never raw values
Use the library **variables** for every color, spacing, and radius. Do not type raw hex or pixel values when a variable exists.

- **Color (semantic):** `color/brand` `#e2231a`, `color/brand-dark` `#b4160f`, `color/ink` `#121212`, `color/ink-soft` `#3a3a3a`, `color/muted` `#6b6b6b`, `color/line` `#e4ddd0`, `color/page` `#f6f3ec` (page background — warm off-white, NOT pure white), `color/surface` `#ffffff`, `color/surface-alt` `#ece4d5`, `color/success` `#1f9d55`. Use the semantic variables, not literals.
- **Spacing & padding:** scale `space/1`=4, `space/2`=8, `space/3`=12, `space/4`=16, `space/5`=24, `space/6`=32, `space/7`=48, `space/8`=64, `space/9`=96. Apply via auto-layout gap and padding bound to spacing variables — keep rhythm consistent.
- **Radius:** `radius/sm`=4, `radius/md`=8, `radius/pill`=999 (buttons, pills, badges = pill). Use the radius variables.

## 3. Typography
Use the library **text styles** — don't set font/size/weight manually:
**Display/3XL, Display/2XL, Display/XL, Display/LG, Eyebrow, Button/LG, Button/MD, Body/MD, Body/SM, Product/Title.**

- **Display / headings / buttons / eyebrow:** font **Oswald** (uppercase for display & buttons). In Figma the Oswald weight is named **"SemiBold"** (no space) / Bold / Medium.
- **Body / paragraphs / labels:** font **Inter**. In Figma the Inter semibold weight is named **"Semi Bold"** (with a space).
- Secondary text uses `color/muted` or `color/ink-soft`.

## 4. Elevation & surfaces
Cards and raised surfaces sit on `color/surface` with a `color/line` border. Use the **effect styles Shadow/SM** (subtle) and **Shadow/MD** (cards/overlays) rather than ad-hoc drop shadows. The page canvas uses `color/page` (warm off-white), never pure white.

## 5. Layout
Use **auto-layout** for every container with consistent gaps/padding from the spacing scale. Prefer **HUG** sizing for components so they adapt to content; use **FILL** for full-width elements (e.g. a block button). Max content width is 1120px.

## 6. Checklist before finishing
- Did I reuse a library component where one exists (Button, Product Card, Badge, Input, Header, Footer, Toast)?
- Are all colors / spacing / radii bound to variables (no literals)?
- Is text using the library text styles (Oswald display/button, Inter body)?
- Is the layout auto-layout with consistent spacing and correct HUG/FILL sizing?
- Does any new CTA reuse the **Button** component (Primary, correct Size, meaningful Label) so Code Connect returns the real React snippet?
