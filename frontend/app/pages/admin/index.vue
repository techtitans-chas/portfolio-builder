<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';

definePageMeta({
  layout: 'admin',
});

const items: TabsItem[] = [
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
  <UDashboardPanel resizable :ui="{ body: '!p-0' }">
    <template #header>
      <UDashboardNavbar title="Page Builder">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <UTabs :items="items" default-value="desktop" size="sm" class="w-40" :content="false" />
        <template #right>
          <UButton color="neutral" variant="outline" aria-label="Activate" label="Activate" />
          <UButton color="neutral" variant="solid" aria-label="Save" label="Save" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex h-full">
        <div class="w-64 shrink-0 overflow-y-auto border-r border-default p-4">
          <p class="text-sm text-muted">Left sidebar</p>
        </div>

        <div class="flex-1 overflow-y-auto">
          <p class="text-sm text-muted">Main content</p>
        </div>

        <div class="w-64 shrink-0 overflow-y-auto border-l border-default p-4">
          <p class="text-sm text-muted">Right sidebar</p>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
