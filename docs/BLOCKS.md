# Creating Blocks

This guide covers everything needed to add a new block to the page builder.

## Overview

A block has two parts:

1. **Definition** — a config file in `frontend/app/config/blocks/` that describes the block's type, icon, sidebar fields, and default content.
2. **Component** — a Vue component in `frontend/app/components/blocks/` that renders the block on the page.

---

## Step 1 — Create the component

Create `frontend/app/components/blocks/MyBlock.vue`.

The component receives its content as props. Every key in `defaultContent` in the definition becomes a prop.

```vue
<script setup lang="ts">
export interface MyBlockProps {
  heading?: string;
  description?: string;
}

const props = withDefaults(defineProps<MyBlockProps>(), {
  heading: '',
  description: '',
});
</script>

<template>
  <section class="px-8 py-16">
    <h2>{{ heading }}</h2>
    <p>{{ description }}</p>
  </section>
</template>
```

### Inline editing

To make a text field editable directly in the live preview (clicking on it), use the inline editor components instead of plain HTML elements. These components automatically show a plain element on the public site and an editable field in the editor.

**Plain text** — single-line, no formatting:

```vue
<EditorInlineTextField field-key="heading" tag="h2">
  {{ heading }}
</EditorInlineTextField>
```

**Rich text** — multi-line with formatting toolbar (bold, headings, lists, etc.):

```vue
<EditorInlineRichField field-key="description" placeholder="Add a description..." html>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-if="description" v-html="description" />
</EditorInlineRichField>
```

The `field-key` must match the prop name exactly. The `html` prop on `EditorInlineRichField` tells it to store and return full HTML instead of plain text — required when rendering with `v-html`.

### Detecting editor context

To show or hide parts of the block only in the editor (e.g. an empty-state placeholder):

```vue
<script setup lang="ts">
import { inlineEditorKey } from '~/utils/inlineEditor';

const inEditor = Boolean(inject(inlineEditorKey, null));
</script>
```

### Theme palette colors

Palette colors are resolved at runtime using the `useActivePalette()` composable. This is the correct approach — do **not** use CSS variables like `var(--palette-<key>)` directly in style bindings, as they don't handle text contrast, primary/secondary overrides, or light/dark mode switching.

```vue
<script setup lang="ts">
const { resolveColor, resolveTextColor, resolvePrimary, resolveSecondary } = useActivePalette();

// Resolve a palette key (e.g. from a theme-color field) to a hex color
const bgHex = computed(() => props.background ? resolveColor(props.background) : null);

// Resolve a contrast-safe text color for a given background palette key
const textColor = computed(() => props.background ? resolveTextColor(props.background) : null);
</script>

<template>
  <section :style="bgHex ? { backgroundColor: bgHex } : {}">
    <p :style="textColor ? { color: textColor } : {}">Content</p>
  </section>
</template>
```

#### Available composable functions

| Function | Returns | Description |
| --- | --- | --- |
| `resolveColor(key)` | `string \| null` | Hex color for the palette key in the current mode |
| `resolveTextColor(key)` | `string \| null` | Contrast-safe text color for the given background key. Uses a palette-defined text color if set, otherwise falls back to WCAG luminance detection |
| `resolvePrimary(key)` | `string` | The primary accent color adjusted for the given background. If the background key defines a `primaryLight`/`primaryDark` override, that is returned instead of the theme's default primary — preventing the primary color from being invisible on a primary-colored background |
| `resolveSecondary(key)` | `string` | Same as `resolvePrimary` but for the secondary accent color |

#### Palette entry structure

Each palette entry in a theme JSON file can define optional override fields:

```json
{
  "key": "primary",
  "label": "Indigo",
  "light": "#5c4bdb",
  "dark": "#7b6ef6",
  "textLight": "#ffffff",
  "textDark": "#ffffff",
  "primaryLight": "#f27224",
  "primaryDark": "#f5883a",
  "secondaryLight": "#f5883a",
  "secondaryDark": "#f27224"
}
```

- **`textLight`/`textDark`** — explicit text color to use when this palette color is the block background. If omitted, `resolveTextColor` falls back to WCAG luminance detection (`#ffffff` or `#1a1a1a`).
- **`primaryLight`/`primaryDark`** — replacement primary color to use when this palette color is the block background. Prevents the theme primary from being invisible on itself (e.g. a blue button on a blue background).
- **`secondaryLight`/`secondaryDark`** — same for the secondary accent color.

---

## Step 2 — Create the definition

Create `frontend/app/config/blocks/my-block.ts`:

```ts
import type { Component } from 'vue';
import BlocksMyBlock from '~/components/blocks/MyBlock.vue';
import type { BlockDefinition } from './types';

export const myBlockDefinition: BlockDefinition = {
  type: 'my-block',
  label: 'My Block',
  icon: 'i-lucide-layout',
  component: BlocksMyBlock as Component,
  defaultContent: {
    heading: 'Hello',
    description: '',
  },
  sections: [
    {
      label: 'Content',
      fields: [
        { key: 'heading', label: 'Heading', type: 'inline-text' },
        { key: 'description', label: 'Description', type: 'inline-rich' },
      ],
    },
  ],
};
```

### Reusable config presets

Common tab and default configurations are available from `frontend/app/config/blocks/presets.ts` to avoid repetition across blocks.

#### `styleTab` and `styleDefaults`

Adds a **Style** tab with background color, surface color, and background image fields — the standard set of appearance controls used by most content blocks.

```ts
import { styleTab, styleDefaults } from './presets';

export const myBlockDefinition: BlockDefinition = {
  // ...
  defaultContent: {
    heading: 'Hello',
    ...styleDefaults, // adds: background: null, surfaceColor: null, backgroundImage: null
  },
  tabs: [
    {
      label: 'Content',
      icon: 'i-lucide-text',
      sections: [ /* ... */ ],
    },
    styleTab, // adds the full Style tab as the last tab
  ],
};
```

The component then reads these via `useActivePalette()`:

```ts
const { resolveColor, resolveTextColor } = useActivePalette();
const bgHex = computed(() => props.background ? resolveColor(props.background) : null);
const autoTextColor = computed(() => props.background ? resolveTextColor(props.background) : null);
```

---

## Step 3 — Register the block

In `frontend/app/config/blocks/index.ts`, import the definition and add it to the arrays:

```ts
import { myBlockDefinition } from './my-block';

// Shown in the Blocks picker in the editor:
export const blockDefinitions = [
  heroDefinition,
  textDefinition,
  myBlockDefinition, // ← add here
  // ...
];

// Used by the renderer and right sidebar (must include all blocks):
export const allBlockDefinitions = [
  headerDefinition,
  footerDefinition,
  heroDefinition,
  textDefinition,
  myBlockDefinition, // ← and here
  // ...
];
```

---

## BlockDefinition reference

```ts
interface BlockDefinition {
  type: string; // Unique identifier stored in the database, e.g. 'hero'
  label: string; // Human-readable name shown in the Blocks picker
  icon: string; // Iconify icon name, e.g. 'i-lucide-layout'
  component: Component; // The Vue component that renders this block
  defaultContent: Record<string, unknown>; // Initial values when a new block is added
  sections?: BlockSection[]; // Sidebar fields, flat layout
  tabs?: BlockTab[]; // Sidebar fields grouped into tabs
  allowedCollections?: string[]; // If set, block only appears in picker when these collection types exist
}
```

Use `sections` for simple blocks. Use `tabs` when the block has many fields that benefit from being grouped (see the Header block for an example).

### Tabs

Tabs split the sidebar into named panels, each with an optional icon and its own sections:

```ts
tabs: [
  {
    label: 'Layout',
    icon: 'i-lucide-layout-panel-left',
    sections: [
      {
        label: 'Spacing',
        fields: [
          { key: 'padding', label: 'Padding', type: 'slider', min: 0, max: 64, step: 2 },
        ],
      },
    ],
  },
  {
    label: 'Branding',
    icon: 'i-lucide-building-2',
    sections: [
      {
        fields: [
          { key: 'siteName', label: 'Site name', type: 'text' },
          { key: 'showLogo', label: 'Show logo', type: 'switch' },
        ],
      },
    ],
  },
],
```

Sections within a tab are optional — a section with no `label` renders without a heading.

---

## Field types

Fields defined in `sections` or `tabs` appear in the right sidebar when the block is selected.

| `type`         | UI control                    | Notes                                                                              |
| -------------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| `text`         | Single-line text input        |                                                                                    |
| `textarea`     | Multi-line text input         |                                                                                    |
| `select`       | Dropdown                      | Requires `options: [{ label, value }]`                                             |
| `switch`       | Toggle switch (USwitch)       | Stores a boolean; label left, toggle right. Preferred over `checkbox` for booleans |
| `checkbox`     | Checkbox                      | Stores a boolean                                                                   |
| `slider`       | Range slider                  | Stores a number; requires `min`, `max`, and `step`                                 |
| `url`          | URL input                     | Validated as a URL                                                                 |
| `color`        | Native color picker           | Stores a raw hex string                                                            |
| `theme-color`  | Palette swatch picker         | Stores a palette key string (e.g. `'primary'`); resolve with `useActivePalette()`  |
| `button-style` | Button style editor (modal)   | Stores a `ButtonStyleValue` object; opens a full editor modal with live preview    |
| `font`         | Font select                   | Populated from the project's font list                                             |
| `image`        | Media picker (images only)    | Stores a URL string                                                                |
| `file`         | Media picker (any file)       | Stores a URL string                                                                |
| `list`         | Reorderable list of sub-items | Requires `itemFields`, `itemLabel`, and `defaultItem`                              |
| `inline-text`  | Editable directly in preview  | Hidden from sidebar; use `EditorInlineTextField` in the component                  |
| `inline-rich`  | Editable directly in preview  | Hidden from sidebar; use `EditorInlineRichField` in the component                  |

### Common field properties

```ts
interface BlockField {
  key: string; // Must match the prop/content key exactly
  label: string; // Shown as a label in the sidebar
  type: FieldType;
  placeholder?: string; // Placeholder text for text inputs
  options?: { label: string; value: string }[]; // Required for 'select'
  min?: number; // Required for 'slider'
  max?: number; // Required for 'slider'
  step?: number; // Required for 'slider'
  showIf?: { key: string; value: unknown }; // Conditionally show this field
}
```

### Slider field

```ts
{
  key: 'padding',
  label: 'Padding',
  type: 'slider',
  min: 0,
  max: 64,
  step: 2,
}
```

### Switch field

Use `switch` for boolean toggles — it renders as a labelled `USwitch` with the label on the left and the toggle on the right.

```ts
{ key: 'showLogo', label: 'Show logo', type: 'switch' }
```

### Theme color field

Use `theme-color` to let the user pick a color from the active theme's palette. The stored value is the palette key string (e.g. `'primary'`, `'surface'`).

```ts
{ key: 'background', label: 'Background', type: 'theme-color' }
```

In the component, resolve it with `useActivePalette()` rather than using it as a CSS variable directly:

```ts
const { resolveColor, resolveTextColor } = useActivePalette();
const bgHex = computed(() => resolveColor(props.background));
const textColor = computed(() => resolveTextColor(props.background));
```

### Button style field

Use `button-style` to give users a full button appearance editor for a group of buttons (e.g. nav links or CTA buttons). The stored value is a `ButtonStyleValue` object.

```ts
{ key: 'navStyle', label: 'Nav links', type: 'button-style', showIf: { key: 'showNav', value: true } }
```

Clicking the field in the sidebar opens a modal with controls for variant, corner radius, size, spacing, letter spacing, and uppercase — plus a live preview showing primary and secondary colored buttons.

The stored `ButtonStyleValue` shape:

```ts
interface ButtonStyleValue {
  variant: 'ghost' | 'soft' | 'solid' | 'outline' | 'link';
  radius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  size: 'xs' | 'sm' | 'md' | 'lg';
  spacing: number; // gap between buttons in px
  uppercase: boolean;
  letterSpacing: number; // in px, converted to em on render (0–8)
}
```

Import the type from `~/config/blocks/types` or `~/components/pagebuilder/ButtonStyleModal.vue`:

```ts
import type { ButtonStyleValue } from '~/config/blocks/types';

// In defaultContent:
navStyle: { variant: 'ghost', radius: 'md', size: 'sm', spacing: 4, uppercase: false, letterSpacing: 0 }
```

### Conditional field visibility (`showIf`)

Any field can be conditionally hidden based on the value of another field in the same block using `showIf`:

```ts
{
  key: 'logoSize',
  label: 'Logo size',
  type: 'select',
  showIf: { key: 'showLogo', value: true }, // only shown when showLogo === true
  options: [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
  ],
}
```

`showIf.key` must match a `key` in the same block's content. The field is hidden unless the referenced key equals `showIf.value` (strict equality).

### List field

The `list` type renders a reorderable list of items, each with their own sub-fields.

```ts
{
  key: 'ctaButtons',
  label: 'Buttons',
  type: 'list',
  itemLabel: 'Button',
  defaultItem: () => ({ id: crypto.randomUUID(), label: 'Click here', url: '#' }),
  itemFields: [
    { key: 'label', label: 'Label', placeholder: 'Click here', inline: true },
    { key: 'url',   label: 'URL',   placeholder: '#', type: 'url' },
  ],
}
```

`inline: true` on an item field renders it as an editable label directly in the list row (no separate input shown).

Each item should include a unique `id` field (use `crypto.randomUUID()` in `defaultItem`) so Vue can key the list correctly.

---

## Layout blocks vs content blocks

- **Content blocks** (hero, text, projects, etc.) are added to individual pages by the user and appear in the Blocks picker.
- **Layout blocks** (header, footer) are mandatory, exist on the home page only, and are not shown in the Blocks picker. Register them only in `allBlockDefinitions`.

To make a block a layout block, set `isMandatory: true` in the database seed — this prevents users from deleting it.

---

## Collection-locked blocks

Some blocks only make sense when a matching collection exists (e.g. a Projects block requires a Projects collection). These blocks are hidden from the Blocks picker until the user adds the relevant collection.

### How it works

1. **Collection types** are defined in `shared/types/collectionTypes.ts`. Each type declares its `type` slug, display label, icon, field schema, and which block types it unlocks via `allowedBlocks`.

2. **Block definitions** opt into this by setting `allowedCollections` — an array of collection type slugs that must be present for the block to appear in the picker:

```ts
export const projectsDefinition: BlockDefinition = {
  type: 'projects',
  allowedCollections: ['projects'], // hidden until a Projects collection exists
  // ...
};
```

3. The **Blocks picker** (`BlocksView.vue`) filters the available blocks using `useCollections().activeCollectionTypes` — a reactive `Set` of the collection types the portfolio currently has.

### Adding a new collection-locked block

1. Add a new entry to `collectionTypes` in `shared/types/collectionTypes.ts`:

```ts
{
  type: 'testimonials',
  label: 'Testimonials',
  icon: 'i-lucide-quote',
  fields: [
    { key: 'author', label: 'Author', type: 'text', required: true },
    { key: 'quote',  label: 'Quote',  type: 'textarea' },
  ],
  allowedBlocks: ['testimonials'],
}
```

2. Create the block component (`Testimonials.vue`) and definition file (`testimonials.ts`) following the normal block guide above. In the definition, set `allowedCollections: ['testimonials']`.

3. Register the block in `config/blocks/index.ts` as normal.

4. The block component fetches its data from the public collection endpoint:

```ts
const { data } = await useAsyncData(
  `portfolio-${slug}-testimonials`,
  () =>
    $fetch<{ items: CollectionItem[] }>(`/api/portfolios/${slug}/collections/testimonials`, {
      baseURL,
    }),
  { watch: [] },
);
```

Each item's fields are accessed via `item.data.author`, `item.data.quote`, etc. — matching the keys defined in `collectionTypes`.

### Data model

Collections are stored in two tables:

- **`collections`** — one row per collection (`id`, `portfolioId`, `type`, `name`, `sortOrder`)
- **`collection_items`** — one row per item (`id`, `collectionId`, `data` JSONB, `isPublished`, `sortOrder`)

Item fields live entirely in the `data` JSONB column. Validation against the field schema defined in `collectionTypes` happens at the API layer. Each portfolio can have at most one collection of each type.
