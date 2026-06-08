<script setup lang="ts">
import type { Block } from '@portfolio-builder/shared/types';
import { allBlockDefinitions } from '~/config/blocks';

const props = defineProps<{ block: Block }>();

const component = computed(() => {
  const def = allBlockDefinitions.find(d => d.type === props.block.type);
  return def?.component ?? null;
});

// Merge pending editor edits so block components reflect unsaved changes immediately
const { pendingContentEdits } = usePageEditor();
const blockProps = computed(() => {
  const pending = pendingContentEdits.value[props.block.id];
  return pending
    ? { ...(props.block.content as Record<string, unknown>), ...pending }
    : (props.block.content as Record<string, unknown>);
});
</script>

<template>
  <template v-if="block.isVisible !== false">
    <component :is="component" v-if="component" v-bind="blockProps" />
    <div v-else class="px-8 py-4 text-sm opacity-50">Unknown block type: {{ block.type }}</div>
  </template>
</template>
