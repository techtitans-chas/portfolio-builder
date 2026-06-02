<script setup lang="ts">
export interface ThemeColors {
  bgPage: string;
  bgSurface: string;
  bgNav: string;
  primary: string;
  secondary: string;
  textPrimary: string;
  textSecondary: string;
}

export interface Theme {
  id: string;
  label: string;
  light: ThemeColors;
  dark: ThemeColors;
}

const selected = defineModel<string | null>({ default: null });

const themes = useThemes();
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <button
      v-for="theme in themes"
      :key="theme.id"
      type="button"
      :aria-label="theme.label"
      :title="theme.label"
      class="relative aspect-square rounded-md border p-1.5 cursor-pointer transition-colors"
      :class="
        selected === theme.id
          ? 'border border-gray-500 bg-elevated/60'
          : 'border-default bg-transparent hover:bg-elevated/40'
      "
      @click="selected = theme.id"
    >
      <!-- Selected badge -->
      <div
        v-if="selected === theme.id"
        class="absolute -top-1.5 -right-1.5 z-10 flex items-center justify-center size-4 rounded-full bg-success text-white"
      >
        <UIcon name="i-lucide-check" class="size-2.5" />
      </div>

      <!-- Primary + secondary color swatches (light mode) -->
      <div class="flex w-full h-full gap-1.5">
        <div
          class="h-full w-full rounded"
          :style="{
            backgroundColor: theme.light.primary,
            outline: `1px solid color-mix(in srgb, ${theme.light.primary} 80%, black)`,
          }"
        />
        <div
          class="h-full w-full rounded"
          :style="{
            backgroundColor: theme.light.secondary,
            outline: `1px solid color-mix(in srgb, ${theme.light.secondary} 80%, black)`,
          }"
        />
      </div>
    </button>
  </div>
</template>
