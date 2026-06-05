<script setup lang="ts">
import { FONT_OPTIONS } from '~/config/fonts';

export interface ThemeColors {
  bgPage: string;
  bgSurface: string;
  bgNav: string;
  bgMobileMenu: string;
  primary: string;
  secondary: string;
  textPrimary: string;
  textSecondary: string;
  border?: string;
}

export interface ThemePaletteColor {
  key: string;
  label: string;
  light: string | null;
  dark: string | null;
}

export interface Theme {
  id: string;
  label: string;
  light: ThemeColors;
  dark: ThemeColors;
  palette?: ThemePaletteColor[];
}

export interface FontSettings {
  heading: string;
  body: string;
}

const selected = defineModel<string | null>('selected', { default: null });
const fonts = defineModel<FontSettings>('fonts', {
  default: () => ({ heading: 'Inter', body: 'Inter' }),
});
const mode = defineModel<'light' | 'dark' | 'both'>('mode', { default: 'light' });

const themes = useThemes();

const themeModeOptions = [
  { label: 'Only light mode', value: 'light' },
  { label: 'Only dark mode', value: 'dark' },
  { label: 'Enable both', value: 'both' },
];

const accordionItems = [
  { label: 'Colors', slot: 'colors' as const },
  { label: 'Typography', slot: 'typography' as const },
];
</script>

<template>
  <UAccordion
    :items="accordionItems"
    multiple
    :default-value="['Colors', 'Typography']"
    class="-mt-4"
  >
    <template #colors>
      <div class="flex flex-col gap-3 pb-3">
        <USelect v-model="mode" :items="themeModeOptions" value-key="value" />
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="theme in themes"
            :key="theme.id"
            type="button"
            :aria-label="theme.label"
            :title="theme.label"
            class="relative overflow-visible aspect-square rounded-md border p-1.5 cursor-pointer transition-colors"
            :class="
              selected === theme.id
                ? 'border border-gray-500 bg-elevated/60'
                : 'border-default bg-transparent hover:bg-elevated/40'
            "
            @click="selected = theme.id"
          >
            <div
              v-if="selected === theme.id"
              class="absolute bottom-1 right-1 z-10 flex items-center justify-center size-4 rounded-full bg-success text-white"
            >
              <UIcon name="i-lucide-check" class="size-2.5" />
            </div>
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
      </div>
    </template>

    <template #typography>
      <div class="flex flex-col gap-3 pb-3">
        <div class="flex flex-col gap-1">
          <label class="text-xs text-muted">Heading font</label>
          <USelect
            :model-value="fonts.heading"
            :items="FONT_OPTIONS"
            value-key="value"
            @update:model-value="fonts = { ...fonts, heading: $event }"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-muted">Body font</label>
          <USelect
            :model-value="fonts.body"
            :items="FONT_OPTIONS"
            value-key="value"
            @update:model-value="fonts = { ...fonts, body: $event }"
          />
        </div>
      </div>
    </template>
  </UAccordion>
</template>
