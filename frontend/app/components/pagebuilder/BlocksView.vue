<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import { blockDefinitions } from '~/config/blocks';
import type { BlockDefinition } from '~/config/blocks';

const { addPendingBlock } = usePageEditor();
const { selectBlock } = useSelectedBlock();
const { activeCollectionTypes } = useCollections();
const emit = defineEmits<{ blockAdded: [] }>();

const availableBlocks = computed(() =>
  blockDefinitions.filter(
    d =>
      !d.allowedCollections ||
      d.allowedCollections.some(type => activeCollectionTypes.value.has(type)),
  ),
);

function addBlock(type: string) {
  const definition = blockDefinitions.find(d => d.type === type);
  const newBlock = addPendingBlock(type, definition?.defaultContent ?? {});
  selectBlock(newBlock);
  emit('blockAdded');
}

// Clone the definition object so the original grid item stays in place
function cloneDefinition(def: BlockDefinition) {
  return { ...def };
}
</script>

<template>
  <VueDraggable
    :model-value="availableBlocks"
    :group="{ name: 'blocks', pull: 'clone', put: false }"
    :clone="cloneDefinition"
    :sort="false"
    class="grid grid-cols-2 gap-px bg-[var(--ui-border)] border border-[var(--ui-border)]"
  >
    <UButton
      v-for="block in availableBlocks"
      :key="block.type"
      color="neutral"
      variant="ghost"
      :aria-label="block.label"
      :label="block.label"
      :icon="block.icon"
      class="flex-col text-xs justify-center aspect-square rounded-none bg-[var(--ui-bg)]"
      :ui="{ leadingIcon: 'size-6' }"
      @click="addBlock(block.type)"
    />
  </VueDraggable>
</template>
