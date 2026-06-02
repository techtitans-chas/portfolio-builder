<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
import type { Page } from '@portfolio-builder/shared/types';
import { VueDraggable } from 'vue-draggable-plus';
import { ref, computed } from 'vue';

interface FontSettings {
  heading: string;
  body: string;
}

interface ThemeSettings {
  themeId?: string | null;
  mode?: 'light' | 'dark' | 'both';
  fonts?: FontSettings | null;
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

const themeSettings = computed(() => ({
  themeId: selectedThemeId.value,
  mode: currentThemeMode.value,
  fonts: selectedFonts.value,
}));

watch(
  () => props.initialThemeSettings,
  settings => {
    if (!settings) return;
    selectedThemeId.value = settings.themeId ?? null;
    currentThemeMode.value = settings.mode ?? 'light';
    selectedFonts.value = settings.fonts ?? { heading: 'Inter', body: 'Inter' };
  },
);

const isThemeDirty = computed(
  () =>
    selectedThemeId.value !== (props.initialThemeSettings?.themeId ?? null) ||
    currentThemeMode.value !== (props.initialThemeSettings?.mode ?? 'light') ||
    selectedFonts.value.heading !== (props.initialThemeSettings?.fonts?.heading ?? 'Inter') ||
    selectedFonts.value.body !== (props.initialThemeSettings?.fonts?.body ?? 'Inter'),
);

const { fetcher } = useApi();
const { pages, pagesLoading, pagesError } = usePages();
const activePageId = ref<string | null>(null);

watch(
  pages,
  newPages => {
    if (!activePageId.value && newPages.length > 0) {
      activePageId.value = newPages[0]?.id ?? null;
    }
  },
  { immediate: true },
);

const activePage = computed<Page | null>(
  () => pages.value.find(p => p.id === activePageId.value) ?? pages.value[0] ?? null,
);

function selectPage(page: Page) {
  activePageId.value = page.id;
}

async function onPagesReorder() {
  if (!props.portfolioId) return;
  await fetcher(`/api/portfolios/${props.portfolioId}/pages/reorder`, {
    method: 'PATCH',
    credentials: 'include',
    body: JSON.stringify({ pageIds: pages.value.map(p => p.id) }),
  });
}

async function toggleVisibility(page: Page) {
  const original = page.isPublished;
  page.isPublished = !original;
  try {
    await fetcher(`/api/portfolios/${props.portfolioId}/pages/${page.id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({ isPublished: page.isPublished }),
    });
  } catch {
    page.isPublished = original;
  }
}

async function toggleShowInMenu(page: Page) {
  const original = page.showInMenu;
  page.showInMenu = !original;
  try {
    await fetcher(`/api/portfolios/${props.portfolioId}/pages/${page.id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({ showInMenu: page.showInMenu }),
    });
  } catch {
    page.showInMenu = original;
  }
}

const deleteModalOpen = ref(false);
const pageToDelete = ref<Page | null>(null);
const deleting = ref(false);
const deleteError = ref('');

function openDeleteModal(page: Page) {
  pageToDelete.value = page;
  deleteError.value = '';
  deleteModalOpen.value = true;
}

async function confirmDelete() {
  if (!pageToDelete.value || !props.portfolioId) return;
  deleting.value = true;
  deleteError.value = '';
  try {
    await fetcher(`/api/portfolios/${props.portfolioId}/pages/${pageToDelete.value.id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const deletedId = pageToDelete.value.id;
    pages.value = pages.value.filter(p => p.id !== deletedId);
    if (activePageId.value === deletedId) {
      activePageId.value = pages.value[0]?.id ?? null;
    }
    deleteModalOpen.value = false;
    pageToDelete.value = null;
  } catch (e: unknown) {
    deleteError.value = e instanceof Error ? e.message : 'Failed to delete page.';
  } finally {
    deleting.value = false;
  }
}

const pageModalOpen = ref(false);
const pageToEdit = ref<Page | null>(null);

function openAddPage() {
  pageToEdit.value = null;
  pageModalOpen.value = true;
}

function openEditPage() {
  pageToEdit.value = activePage.value;
  pageModalOpen.value = true;
}

function onPageSaved(page: Page) {
  const idx = pages.value.findIndex(p => p.id === page.id);
  if (idx !== -1) {
    pages.value = pages.value.map(p => (p.id === page.id ? page : p));
  } else {
    pages.value = [...pages.value, page];
    activePageId.value = page.id;
  }
}

// LayersView ref — exposed so index.vue save() can read pending changes
const layersView = useTemplateRef('layersView');

function onBlockAdded() {
  layersView.value?.refresh();
}

defineExpose({ themeSettings, isThemeDirty, layersView, activePage });
</script>

<template>
  <div class="flex flex-col w-64 shrink-0 border-r border-default">
    <!-- Header -->
    <div class="p-3 border-b border-default shrink-0 text-center">
      <div class="flex items-center justify-between mb-3">
        <span class="text-lg font-medium">Pages</span>
        <UButton
          label="Add page"
          color="primary"
          variant="solid"
          class=""
          icon="i-lucide-plus"
          @click="openAddPage"
        />
      </div>
      <div class="relative mb-2">
        <UPopover>
          <UButton
            :label="activePage?.title ?? 'Select page'"
            color="neutral"
            variant="subtle"
            class="w-full"
          />
          <template #content>
            <div class="p-1 min-w-60">
              <div v-if="pagesLoading" class="flex items-center justify-center py-4">
                <UIcon name="i-lucide-loader-2" class="size-4 animate-spin text-muted" />
              </div>
              <p v-else-if="pagesError" class="px-2 py-2 text-sm text-error">
                {{ pagesError }}
              </p>
              <VueDraggable v-else v-model="pages" handle=".drag-handle" @end="onPagesReorder">
                <div
                  v-for="page in pages"
                  :key="page.id"
                  class="group flex items-center gap-1.5 w-full px-2 py-1.5 text-sm rounded-md hover:bg-elevated/50 cursor-pointer"
                  :class="{ 'bg-elevated': page.id === activePageId }"
                  @click="selectPage(page)"
                >
                  <UIcon
                    name="i-lucide-grip-vertical"
                    class="drag-handle size-4 text-muted shrink-0 -ml-1 cursor-grab active:cursor-grabbing"
                  />
                  <span class="flex-1 truncate">{{ page.title }}</span>
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
                      v-if="!page.isMandatory"
                      :icon="page.isPublished ? 'i-lucide-globe' : 'i-lucide-globe-off'"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      :class="page.isPublished ? 'text-highlighted' : 'text-muted'"
                      class="hover:text-highlighted hover:bg-accented/50"
                      @click.stop="toggleVisibility(page)"
                    />
                    <UButton
                      :icon="page.isMandatory ? 'i-lucide-lock' : 'i-lucide-trash'"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      :disabled="page.isMandatory"
                      class="text-muted hover:text-highlighted hover:bg-accented/50"
                      @click.stop="openDeleteModal(page)"
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
          @click="openEditPage"
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
        :page-id="activePageId"
      />
      <PagebuilderThemeView
        v-show="currentView === '2'"
        v-model:selected="selectedThemeId"
        v-model:fonts="selectedFonts"
        v-model:mode="currentThemeMode"
      />
    </div>

    <PagebuilderPageModal
      v-if="portfolioId"
      v-model:open="pageModalOpen"
      :portfolio-id="portfolioId"
      :page="pageToEdit"
      @saved="onPageSaved"
    />

    <AdminConfirmModal
      v-model:open="deleteModalOpen"
      title="Delete page"
      :description="pageToDelete ? `Are you sure you want to delete '${pageToDelete.title}'?` : ''"
      confirm-label="Delete"
      :loading="deleting"
      :error-message="deleteError"
      @confirm="confirmDelete"
      @cancel="deleteModalOpen = false"
    />
  </div>
</template>
