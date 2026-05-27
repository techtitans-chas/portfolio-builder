<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
const panelViews = ref<TabsItem[]>([
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
const currentView = ref('0');

const pages = ref(['Homepage', 'Todo', 'In Progress', 'Done']);
const currentPage = ref('Homepage');
</script>

<template>
  <div class="flex flex-col w-64 shrink-0 border-r border-default">
    <div class="p-3 border-b border-default shrink-0 text-center">
      <div class="flex mb-2">
        <USelect v-model="currentPage" :items="pages" class="flex-1" />
        <UButton
          color="neutral"
          variant="outline"
          aria-label="Settings"
          icon="i-lucide-settings"
          class="ml-2"
        />
      </div>
      <UTabs
        v-model="currentView"
        color="success"
        :content="false"
        :items="panelViews"
        class="w-full"
      />
    </div>
    <div class="flex-1 overflow-y-auto p-4">
      <PagebuilderBlocksView v-if="currentView == '0'" />
      <PagebuilderLayersView v-else-if="currentView == '1'" />
      <PagebuilderThemeView v-else />
    </div>
  </div>
</template>
