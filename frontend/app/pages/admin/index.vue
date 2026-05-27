<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';

definePageMeta({
  layout: 'admin',
});

const viewModes: TabsItem[] = [
  {
    label: 'Desktop',
    value: 'desktop',
  },
  {
    label: 'Mobile',
    value: 'mobile',
  },
];
</script>

<template>
  <AdminLayoutPageWrapper title="Page Builder">
    <!-- Header middle -->
    <template #middle>
      <UTabs :items="viewModes" default-value="desktop" size="sm" class="w-40" :content="false" />
    </template>
    <!-- Header right -->
    <template #right>
      <UButton color="neutral" variant="outline" aria-label="Activate" label="Activate" />
      <UButton color="neutral" variant="solid" aria-label="Save" label="Save" />
    </template>

    <div class="flex h-full w-full min-h-0">
      <!-- Left sidebar -->
      <PagebuilderLeftSidebar />

      <!-- Main content -->
      <div class="flex-1 overflow-y-auto">
        <p class="text-sm text-muted">Main content</p>
      </div>

      <!-- Right sidebar -->
      <PagebuilderRightSidebar />
    </div>
  </AdminLayoutPageWrapper>
</template>
