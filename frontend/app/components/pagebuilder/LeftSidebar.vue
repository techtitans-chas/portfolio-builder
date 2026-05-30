<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';

interface ThemeSettings {
  themeId?: string | null;
  mode?: 'light' | 'dark' | 'both';
}

const props = defineProps<{ initialThemeSettings?: ThemeSettings | null }>();

const panelViews = ref<TabsItem[]>([{ label: 'Blocks' }, { label: 'Layers' }, { label: 'Theme' }]);
const currentView = ref('0');

const pages = ref(['Homepage', 'About', 'Projects', 'Contact']);
const currentPage = ref('Homepage');

const themeModeOptions = [
  { label: 'Only light mode', value: 'light' },
  { label: 'Only dark mode', value: 'dark' },
  { label: 'Enable both', value: 'both' },
];
const currentThemeMode = ref<'light' | 'dark' | 'both'>(
  props.initialThemeSettings?.mode ?? 'light',
);
const selectedThemeId = ref<string | null>(props.initialThemeSettings?.themeId ?? null);

const themeSettings = computed(() => ({
  themeId: selectedThemeId.value,
  mode: currentThemeMode.value,
}));

defineExpose({ themeSettings });
</script>

<template>
  <div class="flex flex-col w-64 shrink-0 border-r border-default">
    <!-- Header -->
    <div class="p-3 border-b border-default shrink-0 text-center">
      <div class="flex mb-2">
        <USelect v-model="currentPage" :items="pages" class="flex-1" />
        <UButton
          color="neutral"
          variant="outline"
          aria-label="Settings"
          icon="i-lucide-settings"
          class="ml-2"
        />
      </div>
      <UTabs
        v-model="currentView"
        color="success"
        :content="false"
        :items="panelViews"
        class="w-full"
      />
    </div>

    <!-- Main content -->
    <div class="flex-1 overflow-y-auto p-4">
      <PagebuilderBlocksView v-if="currentView === '0'" />
      <PagebuilderLayersView v-else-if="currentView === '1'" />
      <PagebuilderThemeView v-else v-model="selectedThemeId" />
    </div>

    <!-- Footer: Theme view -->
    <div
      v-if="currentView === '2'"
      class="p-3 border-t border-default shrink-0 flex flex-col gap-2"
    >
      <USelect
        v-model="currentThemeMode"
        :items="themeModeOptions"
        value-key="value"
        class="w-full"
      />
    </div>
  </div>
</template>
