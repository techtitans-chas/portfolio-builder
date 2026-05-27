<script setup lang="ts">
const blocks = [
  {
    label: 'Text',
    icon: 'i-lucide-type-outline',
  },
  {
    label: 'Hero',
    icon: 'i-lucide-monitor',
  },
  {
    label: 'Card grid',
    icon: 'i-lucide-grid-2x2',
  },
];
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <UButton
      v-for="block in blocks"
      :key="block.label"
      color="neutral"
      variant="outline"
      :aria-label="block.label"
      :label="block.label"
      :icon="block.icon"
      class="flex-col text-xs justify-center aspect-square"
      :ui="{ leadingIcon: 'size-6' }"
    />
  </div>
</template>
