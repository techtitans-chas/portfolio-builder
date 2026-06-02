<script setup lang="ts">
import type { Block } from '@portfolio-builder/shared/types';
import { allBlockDefinitions } from '~/config/blocks';

const props = defineProps<{ block: Block }>();

const component = computed(() => {
  const def = allBlockDefinitions.find(d => d.type === props.block.type);
  return def?.component ?? null;
});
</script>

<template>
  <template v-if="block.isVisible !== false">
    <component :is="component" v-if="component" v-bind="block.content as Record<string, unknown>" />
    <div v-else class="px-8 py-4 text-sm opacity-50">Unknown block type: {{ block.type }}</div>
  </template>
</template>
