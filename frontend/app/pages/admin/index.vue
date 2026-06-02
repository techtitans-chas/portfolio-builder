<script setup lang="ts">
import type PagebuilderLeftSidebar from '~/components/pagebuilder/LeftSidebar.vue';
import type PagebuilderLayersView from '~/components/pagebuilder/LayersView.vue';
import { VIEWPORT_MODES } from '~/composables/usePreviewScale';

definePageMeta({
  layout: 'admin',
});

const { activeViewMode, wrapperStyle, scaleStyle } = usePreviewScale();

const { portfolio, fetch: fetchUser, clear: clearUser } = useCurrentUser();
const { fetcher } = useApi();
const { fetchPages } = usePages();
const {
  pendingNewBlocks,
  pendingContentEdits,
  pendingNameEdits,
  pendingDeletions,
  hasPendingChanges,
  resetPending,
} = usePageEditor();

await fetchUser();
await fetchPages();

type LeftSidebarInstance = InstanceType<typeof PagebuilderLeftSidebar>;
type LayersViewInstance = InstanceType<typeof PagebuilderLayersView>;

const leftSidebar = useTemplateRef<LeftSidebarInstance>('leftSidebar');

const initialThemeSettings = computed(() => {
  const s = portfolio.value?.themeSettings as {
    themeId?: string | null;
    mode?: 'light' | 'dark' | 'both';
  } | null;
  return s ?? null;
});

const saving = ref(false);
const saved = ref(false);
const saveError = ref('');

const isDirty = computed<boolean>(() => {
  const layers: LayersViewInstance | null | undefined = leftSidebar.value?.layersView;
  const layersChanges = layers?.layersChanges;
  return (
    hasPendingChanges.value ||
    !!leftSidebar.value?.isThemeDirty ||
    !!layersChanges?.reorderedIds ||
    Object.keys(layersChanges?.visibilityChanges ?? {}).length > 0
  );
});

if (import.meta.client) {
  const handler = (e: BeforeUnloadEvent) => {
    if (isDirty.value) e.preventDefault();
  };
  window.addEventListener('beforeunload', handler);
  onUnmounted(() => window.removeEventListener('beforeunload', handler));
}

onBeforeRouteLeave(() => {
  if (isDirty.value) return confirm('You have unsaved changes. Leave anyway?');
});

async function save() {
  if (!portfolio.value?.id) return;

  saving.value = true;
  saveError.value = '';

  try {
    const portfolioId = portfolio.value.id;
    const layers = leftSidebar.value?.layersView;
    const pageId = layers?.pageId ?? null;

    // Theme settings
    await fetcher(`/api/portfolios/${portfolioId}/settings`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({
        themeSettings: leftSidebar.value?.themeSettings ?? null,
      }),
    });

    if (pageId) {
      const { visibilityChanges, reorderedIds } = layers!.layersChanges;

      await Promise.all([
        // Reorder
        reorderedIds
          ? fetcher(`/api/portfolios/${portfolioId}/pages/${pageId}/blocks/reorder`, {
              method: 'PATCH',
              credentials: 'include',
              body: JSON.stringify({ blockIds: reorderedIds }),
            })
          : Promise.resolve(),
        // Visibility toggles
        ...Object.entries(visibilityChanges).map(([blockId, isVisible]) =>
          fetcher(`/api/portfolios/${portfolioId}/pages/${pageId}/blocks/${blockId}`, {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify({ isVisible }),
          }),
        ),
        // New blocks (pending IDs are temporary — only type and content are sent)
        ...pendingNewBlocks.value.map(b =>
          fetcher(`/api/portfolios/${portfolioId}/pages/${pageId}/blocks`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ type: b.type, content: b.content }),
          }),
        ),
        // Content edits
        ...Object.entries(pendingContentEdits.value).map(([blockId, content]) =>
          fetcher(`/api/portfolios/${portfolioId}/pages/${pageId}/blocks/${blockId}`, {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify({ content }),
          }),
        ),
        // Name edits
        ...Object.entries(pendingNameEdits.value).map(([blockId, name]) =>
          fetcher(`/api/portfolios/${portfolioId}/pages/${pageId}/blocks/${blockId}`, {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify({ name }),
          }),
        ),
        // Deletions
        ...[...pendingDeletions.value].map(blockId =>
          fetcher(`/api/portfolios/${portfolioId}/pages/${pageId}/blocks/${blockId}`, {
            method: 'DELETE',
            credentials: 'include',
          }),
        ),
      ]);
    }

    resetPending();
    // Re-fetch user so initialThemeSettings reflects the saved state
    clearUser();
    await fetchUser();
    // Refresh layers so pending blocks are replaced with real DB records
    leftSidebar.value?.layersView?.refresh();
    saved.value = true;
    setTimeout(() => (saved.value = false), 2000);
  } catch (e: unknown) {
    saveError.value = e instanceof Error ? e.message : 'Failed to save.';
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <AdminLayoutPageWrapper title="Page Builder">
    <!-- Header middle -->
    <template #middle>
      <UTabs
        v-model="activeViewMode"
        :items="VIEWPORT_MODES"
        default-value="desktop"
        size="sm"
        class="w-56"
        :content="false"
      />
    </template>
    <!-- Header right -->
    <template #right>
      <UTooltip v-if="saveError" :text="saveError">
        <UIcon name="i-lucide-alert-circle" class="text-error" />
      </UTooltip>
      <UButton color="neutral" variant="outline" aria-label="Activate" label="Activate" />
      <UButton
        :color="saved ? 'success' : 'neutral'"
        variant="solid"
        aria-label="Save"
        :label="saved ? 'Saved!' : isDirty ? 'Save' : 'No changes'"
        :icon="saved ? 'i-lucide-check' : undefined"
        :loading="saving"
        :disabled="!isDirty && !saving"
        @click="save"
      />
    </template>

    <div class="flex h-full w-full min-h-0">
      <!-- Left sidebar -->
      <PagebuilderLeftSidebar
        ref="leftSidebar"
        :initial-theme-settings="initialThemeSettings"
        :portfolio-id="portfolio?.id ?? null"
      />

      <!-- Main content / live preview -->
      <div ref="previewCanvas" class="flex-1 overflow-auto bg-muted/30">
        <div v-if="portfolio" :style="wrapperStyle">
          <div ref="previewEl" class="@container" :style="scaleStyle">
            <PagebuilderPreview
              :portfolio-slug="portfolio.slug"
              :portfolio-title="portfolio.title"
              :layers-view="leftSidebar?.layersView"
            />
          </div>
        </div>
        <div v-else class="flex items-center justify-center h-full text-sm text-muted">
          No portfolio found
        </div>
      </div>

      <!-- Right sidebar -->
      <PagebuilderRightSidebar />
    </div>
  </AdminLayoutPageWrapper>
</template>
