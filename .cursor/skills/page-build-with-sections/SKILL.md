---
name: page-build-with-sections
description: When generating or modifying pages, prefer existing section components from components/Sections and use each section's CURSOR INFO block to choose sections. Avoid major changes to existing sections; only add new section components when nothing fits, following the same design and CURSOR INFO practices.
---

# Page Build with Section Components

## When to Use

- User asks to create a new page or modify an existing page
- User asks to build a landing page, marketing page, or multi-section layout
- Any task that involves composing or editing full-page layouts

## Workflow

### 1. Scan existing sections first

Before adding or changing page content:

1. List all section components in `components/Sections/` (e.g. `ContactSection`, `HeroSection`, `AboutSection`, `CTASection`, `FeaturedProperties`, `ClientTestimonials`, `ServicesOverview`, `PropertyCategories`, `Navigation`, `Footer`).
2. For each section, read the **CURSOR INFO** JSDoc block at the top of the file (the block starting with `/**` and `* **CURSOR INFO**`).
3. Use these fields to decide fit:
   - **SECTION TYPE** – what the section is
   - **BEST FOR** – which pages or use cases it’s for
   - **LAYOUT** – structure (split, centered, grid, etc.)
   - **CONTENT ELEMENTS** – what’s inside (form, testimonials, CTA, etc.)
   - **CONVERSION ROLE** – lead capture, social proof, CTA, etc.
   - **IDEAL POSITION** – where on the page it usually goes (e.g. before footer)
   - **VISUAL STYLE** – modern, minimal, luxury, etc.
   - **NOTES / MODIFIERS** – parallax, animations, responsive behavior

### 2. Prefer existing sections

- **Choose sections** whose CURSOR INFO matches the page’s purpose, layout, and content needs.
- **Compose the page** by importing and using these section components in an order that matches IDEAL POSITION and narrative flow (e.g. Hero → About → Services → Testimonials → CTA → Contact → Footer).
- **Avoid major modifications** to existing section components. Prefer:
  - Passing props if the component supports them (e.g. title, subtitle, background image).
  - Small, localized tweaks (copy, class names) when necessary.
- Do **not** refactor, restyle, or change layout of an existing section unless the user explicitly asks for that.

### 3. When no section fits

If no existing section’s CURSOR INFO aligns with what the page needs:

1. **Create a new section component** in `components/Sections/` (e.g. `NewSectionName.tsx`).
2. **Follow existing design and dev practices**:
   - Same stack and patterns: `'use client'` where needed, shared UI (e.g. `Button`, `Input`), `framer-motion` for animation, Tailwind, Next.js `Image`/`Link`.
   - Same structural patterns: semantic `<section>`, container/padding conventions, responsive breakpoints (e.g. `md:`, `lg:`), and similar spacing (e.g. `py-8 md:py-16 lg:py-24`).
   - Export a named function component (e.g. `export function NewSectionName() { ... }`).
3. **Add a CURSOR INFO block** at the top of the new file (after `'use client';`, before imports). Use the section-component-cursor-info skill: same template and fields (SECTION TYPE, BEST FOR, VISUAL STYLE, LAYOUT, CONTENT ELEMENTS, CONVERSION ROLE, IDEAL POSITION, NOTES / MODIFIERS) so future page builds can discover and reuse this section.

### 4. Summary rules

| Do | Don’t |
|----|--------|
| Scan `components/Sections/` and use CURSOR INFO to pick sections | Add one-off sections inline on the page instead of reusable components |
| Compose pages from existing section components when they fit | Make major layout or style changes to existing sections |
| Add props or small copy/class tweaks when needed | Refactor existing section internals for a single page |
| Create a new section component when nothing fits | Force an existing section to serve a purpose that doesn’t match its CURSOR INFO |
| Add a full CURSOR INFO block to any new section | Create new sections without CURSOR INFO |

## Reference

- CURSOR INFO format and field meanings: use the **section-component-cursor-info** skill when adding or editing the JSDoc block on a section.
- Example of CURSOR INFO (ContactSection): see `components/Sections/ContactSection.tsx` lines 3–13.
