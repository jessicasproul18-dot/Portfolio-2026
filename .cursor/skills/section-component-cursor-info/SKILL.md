---
name: section-component-cursor-info
description: Add or update the CURSOR INFO JSDoc block at the top of section components. Use when creating new section components, editing existing ones, or when the user asks for section documentation, component sections, or CURSOR INFO blocks.
---

# Section Component CURSOR INFO

## When to Use

- Creating a new section component (e.g. in `components/Sections/`)
- Editing an existing section and adding or updating its documentation
- User asks for "section docs", "CURSOR INFO", or "component section metadata"

## Placement

Place the block **at the very top of the section component file**, immediately after any `'use client';` (or similar) directive and **before** the first `import` statement.

## Template

Use this exact block structure. Fill each line with values specific to the section:

```ts
/**
 * **CURSOR INFO**
 * SECTION TYPE: [Short description of the section, e.g., "Contact information and form"]
 * BEST FOR: [Which types of pages or content this section works best with, e.g., "Landing pages that want to capture leads"]
 * VISUAL STYLE: [Describe the design style clearly: modern, minimal, luxury, clean, bold, colorful, etc.]
 * LAYOUT: [Describe the layout: split, centered, sidebar form, card grid, hero image, etc.]
 * CONTENT ELEMENTS: [List what's inside: form, map, CTA buttons, testimonials, features, image gallery, etc.]
 * CONVERSION ROLE: [Explain what this section is meant to do: start conversation, capture leads, highlight features, social proof, etc.]
 * IDEAL POSITION: [Where on the page this section is usually placed: top, before hero, middle, before footer, etc.]
 * NOTES / MODIFIERS: [Any extra info: mobile-first friendly, responsive, optional components, animations, etc.]
 */
```

## Field Guidelines

| Field | Purpose |
|-------|---------|
| **SECTION TYPE** | One short phrase: what the section is (e.g. "Contact information and form"). |
| **BEST FOR** | Page or use case: "Landing pages that want to capture leads", "Product pages", "About us". |
| **VISUAL STYLE** | Design adjectives: modern, minimal, luxury, clean, bold, colorful. Comma-separated if multiple. |
| **LAYOUT** | Structure: split, centered, sidebar form, card grid, hero image, full-width, etc. |
| **CONTENT ELEMENTS** | Concrete items: form, map, CTA buttons, testimonials, features, image gallery, address, hours. |
| **CONVERSION ROLE** | Goal: start conversation, capture leads, highlight features, social proof, drive sign-up. |
| **IDEAL POSITION** | Placement on page: top, before hero, middle, before footer, full-page hero. |
| **NOTES / MODIFIERS** | Extras: responsive, parallax, animations, optional sub-components, a11y notes. |

## Example

From a contact section component:

```ts
'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Contact information and form
 * BEST FOR: Landing pages that want to capture leads
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Split layout with contact information on the left and form on the right
 * CONTENT ELEMENTS: Form, address, hours, phone, email, social media links
 * CONVERSION ROLE: Start conversation and capture leads
 * IDEAL POSITION: Before the footer
 * NOTES / MODIFIERS: Background image w/ parallax, animation in view
 */

import { useRef, useState } from 'react';
// ...
```

## Rules

1. **Keep the `**CURSOR INFO**` header** so the block is easy to find.
2. **One line per field**; no extra blank lines between fields inside the block.
3. **Values are short and scannable**—phrases or comma-separated lists, not long paragraphs.
4. When **updating** an existing section, refresh the block to match the current behavior and content.
