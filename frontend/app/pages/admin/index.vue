<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
const tabItems = ref<TabsItem[]>([
  {
    label: 'Blocks',
  },
  {
    label: 'Layers',
  },
  {
    label: 'Theme',
  },
]);

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
const selectItems = ref(['Homepage', 'Todo', 'In Progress', 'Done']);
const value = ref('Homepage');
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
        <div class="flex flex-col w-64 shrink-0 border-r border-default">
          <div class="p-3 border-b border-default shrink-0 text-center">
            <div class="flex mb-2">
              <USelect v-model="value" :items="selectItems" class="flex-1" />
              <UButton
                color="neutral"
                variant="outline"
                aria-label="Add"
                icon="i-lucide-settings"
                class="ml-2"
              />
            </div>
            <UTabs color="success" :content="false" :items="tabItems" class="w-full" />
          </div>
          <div class="flex-1 overflow-y-auto p-4">
            <div class="grid grid-cols-3 gap-2">
              <UButton
                color="neutral"
                variant="outline"
                aria-label="Text"
                label="Text"
                icon="i-lucide-type-outline"
                class="flex-col text-xs justify-center aspect-square"
                :ui="{ leadingIcon: 'size-6' }"
              />
              <UButton
                color="neutral"
                variant="outline"
                aria-label="Text"
                label="Hero"
                icon="i-lucide-monitor"
                class="flex-col text-xs justify-center aspect-square"
                :ui="{ leadingIcon: 'size-6' }"
              />
              <UButton
                color="neutral"
                variant="outline"
                aria-label="Text"
                label="Card grid"
                icon="i-lucide-grid-2x2"
                class="flex-col text-xs justify-center aspect-square"
                :ui="{ leadingIcon: 'size-6' }"
              />
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto">
          <p class="text-sm text-muted">Main content</p>
        </div>

        <div class="flex flex-col w-64 shrink-0 border-l border-default">
          <div class="p-4 border-b border-default shrink-0">
            <p class="text-sm text-muted">Homepage</p>
          </div>
          <div class="flex-1 overflow-y-auto p-4">
            <p class="text-sm text-muted">Right sidebar</p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
          <div class="p-4 border-t border-default shrink-0 text-center">
            <p class="text-sm text-muted">AI assistant</p>
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
