# Design System Strategy: The Curated Architect

## 1. Overview & Creative North Star
The "Creative North Star" for this design system is **The Digital Curator**.

A resume is more than a list of jobs; it is a high-stakes editorial document. This system moves away from the "form-heavy" aesthetic of traditional SaaS and toward a sophisticated, gallery-like experience. We achieve this through **Intentional Asymmetry** and **Tonal Depth**. By placing the "A4" canvas as a persistent, high-contrast anchor against a fluid, layered interface, we ensure the user feels like an editor-in-chief, not a data-entry clerk. We prioritize "breathing room" (whitespace) as a functional tool to reduce cognitive load during the intense process of self-branding.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a "Paper & Ink" philosophy, utilizing deep navies and crisp neutrals to evoke a sense of professional authority.

### The "No-Line" Rule
To achieve a premium feel, **1px solid borders are prohibited for sectioning.** Boundaries must be defined through background color shifts. For example, a sidebar navigation should use `surface_container_low` (#f3f4f5) against the `surface` (#f8f9fa) main stage. This creates a "molded" look rather than a "boxed" one.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper.
- **Base Layer:** `surface` (#f8f9fa) for the main application background.
- **Sectioning:** Use `surface_container` (#edeeef) for structural areas like the "Input Panel."
- **Floating Focus:** Use `surface_container_lowest` (#ffffff) for the A4 Preview and active cards. This creates a natural "lift" as the brightest point of the UI.

### The "Glass & Gradient" Rule
Standard flat colors feel static. To inject "soul":
- **Main CTAs:** Use a subtle linear gradient from `primary` (#091426) to `primary_container` (#1e293b) at a 135-degree angle.
- **Floating Overlays:** Use Glassmorphism for AI suggestion popovers. Apply `surface_container_lowest` at 80% opacity with a `20px` backdrop-blur.

---

## 3. Typography: The Editorial Engine
We utilize a dual-font approach to balance utility with high-end character.

* **Display & Headlines (Manrope):** Chosen for its geometric precision and modern "tech-forward" feel. Use `display-md` for landing moments and `headline-sm` for section titles within the app.
* **Body & Utility (Inter):** The workhorse. Inter’s tall x-height ensures that even at `body-sm` (0.75rem), resume metadata remains legible.

**Hierarchy as Identity:**
Always maintain a high contrast between `title-lg` (Inter, Bold) and `body-md` (Inter, Regular). In the resume preview, use `on_primary_fixed_variant` (#3c475a) for secondary details like dates to keep the focus on job titles in `primary` (#091426).

---

## 4. Elevation & Depth: Tonal Layering
Traditional structural lines are replaced by the **Layering Principle.**

* **Ambient Shadows:** For the "A4" preview container, use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(9, 20, 38, 0.05)`. Notice the shadow is a tinted version of our `primary` color, not a neutral grey, creating a more natural light bleed.
* **The "Ghost Border" Fallback:** If a field needs a boundary (e.g., an input field), use the `outline_variant` (#c5c6cd) at **20% opacity**. It should be felt, not seen.
* **AI Highlights:** AI-suggested text should be encapsulated in a subtle `tertiary_fixed` (#eaddff) background with 0px borders, making it look like a highlighter mark on a draft.

---

## 5. Components

### The "A4" Canvas
The centerpiece. It must always be `surface_container_lowest` (#ffffff). Use a `3.5rem` (Spacing 10) margin around the canvas to ensure it feels like a physical object sitting on a desk.

### Buttons
- **Primary:** Gradient from `primary` to `primary_container`. `lg` (0.5rem) roundedness.
- **Secondary:** `surface_container_high` (#e7e8e9) with `on_surface` text. No border.
- **AI Action:** `secondary` (#0051d5) with a subtle pulse animation using `secondary_fixed_dim`.

### Input Fields
Forbid the "boxed" look. Use a "Minimalist Underline" or a very soft `surface_container_highest` fill.
- **State:** On focus, transition the background to `surface_container_lowest` and add a `2px` bottom-border of `secondary` (#0051d5).
- **Spacing:** Use `1.2rem` (3.5) internal padding for a "luxury" touch.

### Cards & Lists
**Forbid divider lines.** Separate resume entries (e.g., Work Experience) using a `2rem` (6) vertical gap from the spacing scale. Use a `0.7rem` (2) left-accent bar in `primary_fixed` (#d8e3fb) to indicate the active editing section.

### AI Suggestion Chips
Use `tertiary` (#1c0048) text on a `tertiary_fixed` (#eaddff) background. Shape should be `full` (9999px) to contrast against the more architectural `md/lg` corners of the rest of the UI.

---

## 6. Do's and Don'ts

### Do
* **Do** use `surface_container_low` for the background of the "Form" side and `surface` for the "Preview" side to create a clear functional split without a line.
* **Do** use `manrope` for numbers and dates in the resume to give it a modern, "designed" look.
* **Do** embrace "Overhanging Headers." Allow `headline-lg` text to slightly bleed into the margin to break the grid.

### Don't
* **Don't** use 100% black (#000000). Always use `primary` (#091426) for "Black" text to maintain the sophisticated navy undertone.
* **Don't** use "Drop Shadows" on buttons. Use a slight color shift or a `surface_tint` glow.
* **Don't** use standard `0.5rem` (8px) spacing for everything. Use the `2rem` (6) and `2.75rem` (8) tokens to create an editorial, airy feel.