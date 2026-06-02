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
    fonts?: { heading: string; body: string } | null;
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

      // Build a blockId → pageId map so header/footer edits go to the right page URL
      const blockPageMap = new Map<string, string>();
      for (const b of layers!.contentBlocks ?? []) {
        if (b.pageId) blockPageMap.set(b.id, b.pageId);
      }
      const headerBlock = layers!.headerBlock;
      const footerBlock = layers!.footerBlock;
      if (headerBlock?.pageId) blockPageMap.set(headerBlock.id, headerBlock.pageId);
      if (footerBlock?.pageId) blockPageMap.set(footerBlock.id, footerBlock.pageId);
      // Any block not in the map (e.g. header/footer edited without being in contentBlocks)
      // falls back to homePageId, then to pageId as last resort
      const homePageId = layers!.homePageId ?? pageId;
      const pageIdFor = (blockId: string) => blockPageMap.get(blockId) ?? homePageId;

      await Promise.all([
        // Reorder
        reorderedIds
          ? fetcher(`/api/portfolios/${portfolioId}/pages/${pageId}/blocks/reorder`, {
              method: 'PATCH',
              credentials: 'include',
              body: JSON.stringify({ blockIds: reorderedIds }),
            })
          : Promise.resolve(),
        // Visibility toggles — skip blocks queued for deletion
        ...Object.entries(visibilityChanges)
          .filter(([blockId]) => !pendingDeletions.value.has(blockId))
          .map(([blockId, isVisible]) =>
            fetcher(
              `/api/portfolios/${portfolioId}/pages/${pageIdFor(blockId)}/blocks/${blockId}`,
              {
                method: 'PATCH',
                credentials: 'include',
                body: JSON.stringify({ isVisible }),
              },
            ),
          ),
        // New blocks — merge any sidebar edits made before saving into the content
        ...pendingNewBlocks.value
          .filter(b => b.pageId === pageId)
          .map(b => {
            const content = { ...b.content, ...(pendingContentEdits.value[b.id] ?? {}) };
            return fetcher(`/api/portfolios/${portfolioId}/pages/${pageId}/blocks`, {
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify({ type: b.type, content }),
            });
          }),
        // Content edits — skip pending IDs and blocks queued for deletion
        ...Object.entries(pendingContentEdits.value)
          .filter(
            ([blockId]) => !blockId.startsWith('pending-') && !pendingDeletions.value.has(blockId),
          )
          .map(([blockId, content]) =>
            fetcher(
              `/api/portfolios/${portfolioId}/pages/${pageIdFor(blockId)}/blocks/${blockId}`,
              {
                method: 'PATCH',
                credentials: 'include',
                body: JSON.stringify({ content }),
              },
            ),
          ),
        // Name edits — skip pending IDs and blocks queued for deletion
        ...Object.entries(pendingNameEdits.value)
          .filter(
            ([blockId]) => !blockId.startsWith('pending-') && !pendingDeletions.value.has(blockId),
          )
          .map(([blockId, name]) =>
            fetcher(
              `/api/portfolios/${portfolioId}/pages/${pageIdFor(blockId)}/blocks/${blockId}`,
              {
                method: 'PATCH',
                credentials: 'include',
                body: JSON.stringify({ name }),
              },
            ),
          ),
        // Deletions — skip any pending IDs that were never persisted to the DB
        ...[...pendingDeletions.value]
          .filter(id => !id.startsWith('pending-'))
          .map(blockId =>
            fetcher(
              `/api/portfolios/${portfolioId}/pages/${pageIdFor(blockId)}/blocks/${blockId}`,
              {
                method: 'DELETE',
                credentials: 'include',
              },
            ),
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
              :page-slug="leftSidebar?.activePage?.slug ?? 'home'"
              :layers-view="leftSidebar?.layersView"
              :live-theme-settings="leftSidebar?.themeSettings"
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
