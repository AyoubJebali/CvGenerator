# Design System Specification: The Luminous Authority

## 1. Overview & Creative North Star
The objective of this design system is to evolve a minimalist, high-trust aesthetic into a premium dark-themed editorial experience. We are moving away from the "standard SaaS dashboard" look toward a concept we call **"The Luminous Authority."**

This North Star treats the UI not as a flat screen, but as a curated gallery. The "Luminous Authority" relies on the absence of structural lines, using intentional asymmetry, generous negative space, and deep tonal layering to guide the user’s eye. It is authoritative yet breathing; professional yet soulful. By leveraging high-contrast typography against a deep slate void, we create a sense of focused expertise.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a deep, atmospheric slate. Our goal is to simulate depth through light absorption rather than artificial outlines.

### Palette Highlights
- **Primary Background:** `#0b1326` (surface) — A deep, infinite slate that provides the foundation.
- **Surface Tiers:** Use `surface-container-low` (#131b2e) for large sectioning and `surface-container-highest` (#2d3449) for focused interactive elements.
- **Accents:** The `primary` blue (#adc6ff) should be used sparingly but vibrantly to indicate action and intelligence.

### The "No-Line" Rule
Explicitly prohibited: 1px solid borders used for sectioning or containment. To separate content, you must use **Background Color Shifts**. For example, a card utilizing `surface-container-low` should sit directly on a `surface` background. The change in hex value is the boundary.

### The Glass & Gradient Rule
To prevent the UI from feeling "flat," use semi-transparent surface colors with a `backdrop-blur` (12px–20px) for floating elements like navigation bars or modal overlays. 
- **Signature Gradient:** For primary CTAs and AI-assisted hero sections, apply a subtle linear gradient from `primary` (#adc6ff) to `primary-container` (#4d8eff) at a 135-degree angle. This adds "visual soul" that flat colors cannot replicate.

---

## 3. Typography: Editorial Precision
We use **Manrope** as our sole typeface. Its geometric yet approachable nature supports our high-trust goal. 

- **Display Scale:** Use `display-lg` (3.5rem) with tighter letter-spacing (-0.02em) for hero moments. This creates an editorial "magazine" feel.
- **Hierarchy through Contrast:** Headlines must be `on-surface` (high-contrast white/blue-white), while secondary metadata should utilize `on-surface-variant` (#c2c6d6) at a lower opacity. 
- **Intentional Asymmetry:** Don't feel forced to center-align. Use large `display` type left-aligned with significant right-side padding to create a sophisticated, unbalanced elegance.

---

## 4. Elevation & Depth
In this system, elevation is a product of light and layering, not heavy drop shadows.

- **The Layering Principle:** Depth is achieved by "stacking" surface tiers. Place a `surface-container-highest` element atop a `surface-container-low` background to create a natural, physical lift.
- **Ambient Shadows:** For floating components (Modals, Tooltips), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(6, 14, 32, 0.4)`. The shadow color must be a darkened version of the background, never pure black.
- **The "Ghost Border" Fallback:** If a container requires definition for accessibility (e.g., in complex forms), use a "Ghost Border." This is an `outline-variant` (#424754) set to **15% opacity**. It should be felt, not seen.
- **Glassmorphism:** AI-assisted indicators should utilize a `surface-variant` color at 40% opacity with a heavy background blur to signify a "different state of intelligence" compared to standard UI.

---

## 5. Components

### Buttons
- **Primary:** Full-rounded (`9999px`) or `lg` (1rem). Use the Signature Gradient. Text is `on-primary` (#002e6a) for maximum legibility.
- **Tertiary/Ghost:** No background. Use `primary` text color with a `0.5rem` spacing for the hit area. On hover, introduce a 5% `primary` background tint.

### Input Fields & Forms
- **Structure:** Use `surface-container-low` for the field background.
- **Border:** No border by default. Use a 2px bottom-accent of `primary` only when the field is `:focus`.
- **AI-Assisted Inputs:** For inputs where AI generates content, use a subtle `tertiary-container` (#df7412) glow or a glassmorphic shimmer effect on the container's trailing edge.

### Cards & Lists
- **Prohibition:** Never use divider lines. 
- **Separation:** Separate list items using the Spacing Scale (typically `spacing-4` or `spacing-6`). If items need grouping, wrap them in a `surface-container-lowest` (#060e20) box with a `md` (0.75rem) corner radius.

### AI Indicators (Signature Component)
- **Visual Style:** Use the `tertiary` (#ffb786) accent. It provides a warm, humanistic contrast to the "cool" slate and blue palette.
- **Interaction:** AI chips should have a pulse animation using a 10% opacity `tertiary` shadow to indicate active processing.

---

## 6. Do’s and Don'ts

### Do:
- **Use generous whitespace.** If you think there is enough space, add 25% more. High-end editorial design lives in the "gaps."
- **Layer your surfaces.** Always ask: "Can I define this area with a color shift instead of a line?"
- **Prioritize Type Contrast.** Ensure `body-md` text always meets WCAG AAA standards against its specific `surface-container` background.

### Don't:
- **Don't use pure black.** `#0b1326` is our darkest point. Pure black (#000000) will break the slate-toned immersion.
- **Don't use standard shadows.** Avoid the "fuzzy grey" shadow. Keep them wide, tinted, and extremely subtle.
- **Don't clutter the grid.** Avoid packing multiple cards into a tight row. Use horizontal scrolling or staggered vertical stacks to maintain the "Luminous Authority" aesthetic.