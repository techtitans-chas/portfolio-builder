<script setup lang="ts">
type Theme = { label: string; primary: string; secondary: string };

const selected = defineModel<string | null>({ default: null });

const themes: Theme[] = [
  // Blues
  { label: 'Sky & Cyan', primary: '#3b82f6', secondary: '#06b6d4' },
  { label: 'Blue & Indigo', primary: '#3b82f6', secondary: '#6366f1' },
  { label: 'Navy & Sky', primary: '#1d4ed8', secondary: '#38bdf8' },
  { label: 'Indigo & Violet', primary: '#6366f1', secondary: '#8b5cf6' },

  // Greens
  { label: 'Teal & Mint', primary: '#14b8a6', secondary: '#34d399' },
  { label: 'Green & Lime', primary: '#16a34a', secondary: '#84cc16' },
  { label: 'Emerald & Teal', primary: '#10b981', secondary: '#0d9488' },
  { label: 'Sage & Stone', primary: '#84cc16', secondary: '#78716c' },

  // Purples & Pinks
  { label: 'Violet & Pink', primary: '#8b5cf6', secondary: '#ec4899' },
  { label: 'Purple & Fuchsia', primary: '#a855f7', secondary: '#d946ef' },
  { label: 'Plum & Rose', primary: '#7c3aed', secondary: '#f43f5e' },
  { label: 'Lavender & Lilac', primary: '#a78bfa', secondary: '#c084fc' },

  // Reds & Oranges
  { label: 'Rose & Orange', primary: '#f43f5e', secondary: '#f97316' },
  { label: 'Coral & Amber', primary: '#fb923c', secondary: '#f59e0b' },
  { label: 'Red & Pink', primary: '#ef4444', secondary: '#ec4899' },
  { label: 'Crimson & Coral', primary: '#e11d48', secondary: '#fb923c' },

  // Warm cross-family
  { label: 'Amber & Rose', primary: '#f59e0b', secondary: '#fb7185' },
  { label: 'Orange & Violet', primary: '#f97316', secondary: '#7c3aed' },
  { label: 'Yellow & Teal', primary: '#eab308', secondary: '#14b8a6' },
  { label: 'Peach & Plum', primary: '#fb923c', secondary: '#9333ea' },

  // Cool cross-family
  { label: 'Blue & Green', primary: '#3b82f6', secondary: '#10b981' },
  { label: 'Cyan & Purple', primary: '#06b6d4', secondary: '#a855f7' },
  { label: 'Teal & Indigo', primary: '#0d9488', secondary: '#6366f1' },
  { label: 'Sky & Lime', primary: '#38bdf8', secondary: '#a3e635' },

  // Monochrome blues
  { label: 'Cobalt & Steel', primary: '#2563eb', secondary: '#64748b' },
  { label: 'Slate & Indigo', primary: '#475569', secondary: '#6366f1' },

  // Monochrome purples
  { label: 'Violet & Indigo', primary: '#7c3aed', secondary: '#6366f1' },
  { label: 'Fuchsia & Purple', primary: '#d946ef', secondary: '#9333ea' },

  // Monochrome reds/pinks
  { label: 'Rose & Crimson', primary: '#fb7185', secondary: '#e11d48' },
  { label: 'Pink & Magenta', primary: '#ec4899', secondary: '#db2777' },

  // Monochrome greens
  { label: 'Mint & Forest', primary: '#34d399', secondary: '#15803d' },
  { label: 'Lime & Emerald', primary: '#a3e635', secondary: '#059669' },

  // Neutrals with accent
  { label: 'Slate & Sky', primary: '#64748b', secondary: '#38bdf8' },
  { label: 'Stone & Amber', primary: '#78716c', secondary: '#f59e0b' },
  { label: 'Gray & Violet', primary: '#9ca3af', secondary: '#8b5cf6' },
  { label: 'Zinc & Rose', primary: '#71717a', secondary: '#fb7185' },
];
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <button
      v-for="theme in themes"
      :key="theme.label"
      type="button"
      :aria-label="theme.label"
      class="relative aspect-square rounded-md border p-1.5 cursor-pointer transition-colors"
      :class="
        selected === theme.label
          ? 'border border-gray-500 bg-elevated/60'
          : 'border-default bg-transparent hover:bg-elevated/40'
      "
      @click="selected = theme.label"
    >
      <!-- Selected badge -->
      <div
        v-if="selected === theme.label"
        class="absolute -top-1.5 -right-1.5 z-10 flex items-center justify-center size-4 rounded-full bg-success text-white"
      >
        <UIcon name="i-lucide-check" class="size-2.5" />
      </div>

      <!-- Color swatches -->
      <div class="flex w-full h-full gap-1.5">
        <div
          class="h-full w-full rounded"
          :style="{
            backgroundColor: theme.primary,
            outline: `1px solid color-mix(in srgb, ${theme.primary} 80%, black)`,
          }"
        />
        <div
          class="h-full w-full rounded"
          :style="{
            backgroundColor: theme.secondary,
            outline: `1px solid color-mix(in srgb, ${theme.secondary} 80%, black)`,
          }"
        />
      </div>
    </button>
  </div>
</template>
