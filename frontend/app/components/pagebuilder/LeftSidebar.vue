<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
import { VueDraggable } from 'vue-draggable-plus';
import { ref, computed } from 'vue';

interface Page {
  label: string;
  published: boolean;
  showInMenu: boolean;
  active?: boolean;
}

interface ThemeSettings {
  themeId?: string | null;
  mode?: 'light' | 'dark' | 'both';
}

const props = defineProps<{
  initialThemeSettings?: ThemeSettings | null;
  portfolioId?: string | null;
}>();

const panelViews = ref<TabsItem[]>([{ label: 'Blocks' }, { label: 'Layers' }, { label: 'Theme' }]);
const currentView = ref('0');

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

const pages = ref<Page[]>([
  { label: 'Homepage', published: true, showInMenu: true, active: true },
  { label: 'About', published: true, showInMenu: true },
  { label: 'Projects', published: false, showInMenu: false },
]);

const activePage = computed(() => pages.value.find(p => p.active) ?? pages.value[0]);

function selectPage(page: Page) {
  pages.value.forEach(p => (p.active = false));
  page.active = true;
}

function togglePublished(page: Page) {
  page.published = !page.published;
}

function toggleShowInMenu(page: Page) {
  page.showInMenu = !page.showInMenu;
}

function deletePage(page: Page) {
  const idx = pages.value.indexOf(page);
  if (idx > -1) pages.value.splice(idx, 1);
}

// LayersView ref — exposed so index.vue save() can read pending changes
const layersView = useTemplateRef('layersView');

function onBlockAdded() {
  layersView.value?.refresh();
}

defineExpose({ themeSettings, layersView });
</script>

<template>
  <div class="flex flex-col w-64 shrink-0 border-r border-default">
    <!-- Header -->
    <div class="p-3 border-b border-default shrink-0 text-center">
      <div class="relative mb-2">
        <UPopover>
          <UButton
            :label="activePage?.label ?? 'Select page'"
            color="neutral"
            variant="subtle"
            class="w-full"
          />
          <template #content>
            <div class="p-1 min-w-60">
              <VueDraggable v-model="pages" handle=".drag-handle">
                <div
                  v-for="page in pages"
                  :key="page.label"
                  class="group flex items-center gap-1.5 w-full px-2 py-1.5 text-sm rounded-md hover:bg-elevated/50 cursor-pointer"
                  :class="{ 'bg-elevated': page.active }"
                  @click="selectPage(page)"
                >
                  <UIcon
                    name="i-lucide-grip-vertical"
                    class="drag-handle size-4 text-muted shrink-0 -ml-1 cursor-grab active:cursor-grabbing"
                  />
                  <span class="flex-1 truncate">{{ page.label }}</span>
                  <div class="flex -my-0.5 transition-transform">
                    <UButton
                      :icon="page.showInMenu ? 'pepicons-pop-list' : 'pepicons-pop-list-off'"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      :class="page.showInMenu ? 'text-highlighted' : 'text-muted'"
                      class="hover:text-highlighted hover:bg-accented/50"
                      @click.stop="toggleShowInMenu(page)"
                    />
                    <UButton
                      :icon="page.published ? 'i-lucide-globe' : 'i-lucide-globe-off'"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      :class="page.published ? 'text-highlighted' : 'text-muted'"
                      class="hover:text-highlighted hover:bg-accented/50"
                      @click.stop="togglePublished(page)"
                    />
                    <UButton
                      icon="i-lucide-trash"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      class="text-muted hover:text-highlighted hover:bg-accented/50"
                      @click.stop="deletePage(page)"
                    />
                  </div>
                </div>
              </VueDraggable>
            </div>
          </template>
        </UPopover>
        <button
          aria-label="Edit page"
          class="absolute right-0 top-0 h-full px-2 hover:bg-elevated/50 text-muted hover:text-highlighted rounded-md"
        >
          <UIcon name="i-lucide-edit-3" class="size-4" />
        </button>
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
      <PagebuilderBlocksView v-show="currentView === '0'" @block-added="onBlockAdded" />
      <PagebuilderLayersView
        v-show="currentView === '1'"
        ref="layersView"
        :portfolio-id="portfolioId ?? null"
        :page-id="null"
      />
      <PagebuilderThemeView v-show="currentView === '2'" v-model="selectedThemeId" />
    </div>

    <!-- Footer: Blocks and Theme view -->
    <div
      v-if="currentView === '0' || currentView === '2'"
      class="p-3 border-t border-default shrink-0 flex flex-col gap-2"
    >
      <UButton
        v-if="currentView === '0'"
        label="Add page"
        color="primary"
        variant="solid"
        class="w-full"
        icon="i-lucide-plus"
      />
      <USelect
        v-if="currentView === '2'"
        v-model="currentThemeMode"
        :items="themeModeOptions"
        value-key="value"
        class="w-full"
      />
    </div>
  </div>
</template>
