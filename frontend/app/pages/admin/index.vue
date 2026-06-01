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
const saveError = ref('');

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
        color="neutral"
        variant="solid"
        aria-label="Save"
        label="Save"
        :loading="saving"
        @click="save"
      />
    </template>

    <div class="flex h-full w-full min-h-0">
      <!-- Left sidebar -->
      <PagebuilderLeftSidebar ref="leftSidebar" :initial-theme-settings="initialThemeSettings" />

      <!-- Main content -->
      <div class="flex-1 overflow-y-auto">
        <p class="text-sm text-muted">Main content</p>
      </div>

      <!-- Right sidebar -->
      <PagebuilderRightSidebar />
    </div>
  </AdminLayoutPageWrapper>
</template>
