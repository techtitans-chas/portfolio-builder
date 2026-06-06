<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
import { useActivePalette } from '~/composables/useActivePalette';
import { useActivePage } from '~/composables/useActivePage';
import { useLayoutSettings, type MaxContentWidth } from '~/composables/useLayoutSettings';

interface FontSettings {
  heading: string;
  body: string;
}

interface ThemeSettings {
  themeId?: string | null;
  mode?: 'light' | 'dark' | 'both';
  fonts?: FontSettings | null;
  logoLight?: string | null;
  logoDark?: string | null;
  maxContentWidth?: MaxContentWidth | null;
}

const props = defineProps<{
  initialThemeSettings?: ThemeSettings | null;
  portfolioId?: string | null;
}>();

const panelViews = ref<TabsItem[]>([{ label: 'Blocks' }, { label: 'Layers' }, { label: 'Theme' }]);
const currentView = ref('0');

const currentThemeMode = ref<'light' | 'dark' | 'both'>(
  props.initialThemeSettings?.mode ?? 'light',
);
const selectedThemeId = ref<string | null>(props.initialThemeSettings?.themeId ?? null);
const selectedFonts = ref<FontSettings>(
  props.initialThemeSettings?.fonts ?? { heading: 'Inter', body: 'Inter' },
);
const selectedMaxContentWidth = ref<MaxContentWidth>(
  props.initialThemeSettings?.maxContentWidth ?? 'sm',
);

const themeSettings = computed(() => ({
  themeId: selectedThemeId.value,
  mode: currentThemeMode.value,
  fonts: selectedFonts.value,
  logoLight: props.initialThemeSettings?.logoLight ?? null,
  logoDark: props.initialThemeSettings?.logoDark ?? null,
  maxContentWidth: selectedMaxContentWidth.value,
}));

watch(
  () => props.initialThemeSettings,
  settings => {
    if (!settings) return;
    selectedThemeId.value = settings.themeId ?? null;
    currentThemeMode.value = settings.mode ?? 'light';
    selectedFonts.value = settings.fonts ?? { heading: 'Inter', body: 'Inter' };
    selectedMaxContentWidth.value = settings.maxContentWidth ?? 'sm';
  },
);

const isThemeDirty = computed(
  () =>
    selectedThemeId.value !== (props.initialThemeSettings?.themeId ?? null) ||
    currentThemeMode.value !== (props.initialThemeSettings?.mode ?? 'light') ||
    selectedFonts.value.heading !== (props.initialThemeSettings?.fonts?.heading ?? 'Inter') ||
    selectedFonts.value.body !== (props.initialThemeSettings?.fonts?.body ?? 'Inter') ||
    selectedMaxContentWidth.value !== (props.initialThemeSettings?.maxContentWidth ?? 'sm'),
);

const { activePageId } = useActivePage();

// Keep shared active-theme state in sync so palette is available to block components
const { activeThemeId, activeThemeMode } = useActivePalette();
watch(
  selectedThemeId,
  id => {
    activeThemeId.value = id;
  },
  { immediate: true },
);
watch(
  currentThemeMode,
  mode => {
    activeThemeMode.value = mode;
  },
  { immediate: true },
);

// Keep shared layout state in sync so blocks can read maxContentWidth
const { maxContentWidth: activeMaxContentWidth } = useLayoutSettings();
watch(
  selectedMaxContentWidth,
  w => {
    activeMaxContentWidth.value = w;
  },
  { immediate: true },
);

// LayersView ref — exposed so index.vue save() can read pending changes
const layersView = useTemplateRef('layersView');

function onBlockAdded() {
  layersView.value?.refresh();
}

defineExpose({ themeSettings, isThemeDirty, layersView });
</script>

<template>
  <div class="flex flex-col w-64 shrink-0 border-r border-default">
    <!-- Tab switcher -->
    <div class="p-3 border-b border-default shrink-0">
      <UTabs
        v-model="currentView"
        color="success"
        :content="false"
        :items="panelViews"
        class="w-full"
      />
    </div>

    <!-- Main content -->
    <div class="flex-1 overflow-y-auto">
      <PagebuilderBlocksView v-show="currentView === '0'" @block-added="onBlockAdded" />
      <PagebuilderLayersView
        v-show="currentView === '1'"
        ref="layersView"
        :portfolio-id="portfolioId ?? null"
        :page-id="activePageId"
      />
      <div v-show="currentView === '2'" class="p-3">
        <PagebuilderThemeView
          v-model:selected="selectedThemeId"
          v-model:fonts="selectedFonts"
          v-model:mode="currentThemeMode"
          v-model:max-content-width="selectedMaxContentWidth"
        />
      </div>
    </div>
  </div>
</template>
