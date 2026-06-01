<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';

definePageMeta({
  layout: 'admin',
});

const viewModes: TabsItem[] = [
  { label: 'Desktop', value: 'desktop' },
  { label: 'Mobile', value: 'mobile' },
];

const { portfolio, fetch: fetchUser } = useCurrentUser();
const { fetcher } = useApi();

await fetchUser();

const leftSidebar = useTemplateRef('leftSidebar');

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
const iframeKey = ref(0);
const portfolioUrl = computed(() => (portfolio.value?.slug ? `/p/${portfolio.value.slug}` : null));

async function save() {
  if (!portfolio.value?.id) return;

  saving.value = true;
  saveError.value = '';

  try {
    await fetcher(`/api/portfolios/${portfolio.value.id}/settings`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({
        themeSettings: leftSidebar.value?.themeSettings ?? null,
      }),
    });

    // Flush layers changes (reorder + visibility toggles)
    const layers = leftSidebar.value?.layersView;
    if (layers) {
      const { visibilityChanges, reorderedIds } = layers.layersChanges;
      const portfolioId = layers.portfolioId;
      const pageId = layers.pageId;

      if (portfolioId && pageId) {
        const visEntries = Object.entries(visibilityChanges);
        await Promise.all([
          reorderedIds
            ? fetcher(`/api/portfolios/${portfolioId}/pages/${pageId}/blocks/reorder`, {
                method: 'PATCH',
                credentials: 'include',
                body: JSON.stringify({ blockIds: reorderedIds }),
              })
            : Promise.resolve(),
          ...visEntries.map(([blockId, isVisible]) =>
            fetcher(`/api/portfolios/${portfolioId}/pages/${pageId}/blocks/${blockId}`, {
              method: 'PATCH',
              credentials: 'include',
              body: JSON.stringify({ isVisible }),
            }),
          ),
        ]);
      }
    }
    saved.value = true;
    iframeKey.value++;
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
      <UTabs :items="viewModes" default-value="desktop" size="sm" class="w-40" :content="false" />
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
        :label="saved ? 'Saved!' : 'Save'"
        :icon="saved ? 'i-lucide-check' : undefined"
        :loading="saving"
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

      <!-- Main content -->
      <div class="flex-1 overflow-hidden">
        <iframe
          v-if="portfolioUrl"
          :key="iframeKey"
          :src="portfolioUrl"
          class="w-full h-full border-0"
        />
        <div v-else class="flex items-center justify-center h-full text-sm text-muted">
          No portfolio found
        </div>
      </div>

      <!-- Right sidebar -->
      <PagebuilderRightSidebar />
    </div>
  </AdminLayoutPageWrapper>
</template>
