<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import { blockDefinitions } from '~/config/blocks';
import type { BlockDefinition } from '~/config/blocks';

const { addPendingBlock } = usePageEditor();
const { selectBlock } = useSelectedBlock();
const { activeCollectionTypes } = useCollections();
const emit = defineEmits<{ blockAdded: [] }>();

const addingType = ref<string | null>(null);

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
  addingType.value = type;
  setTimeout(() => (addingType.value = null), 500);
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
    class="grid grid-cols-2 overflow-hidden"
  >
    <UButton
      v-for="block in availableBlocks"
      :key="block.type"
      color="neutral"
      variant="ghost"
      :aria-label="block.label"
      :label="block.label"
      :icon="block.icon"
      class="flex-col text-xs justify-center aspect-square rounded-none border-r border-b border-[var(--ui-border)] [&:nth-child(2n)]:border-r-0"
      :class="{ 'block-added': addingType === block.type }"
      :ui="{ leadingIcon: 'size-6' }"
      @click="addBlock(block.type)"
    />
  </VueDraggable>
</template>

<style scoped>
@keyframes block-pop {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.88);
    background-color: var(--ui-bg-elevated);
  }
  65% {
    transform: scale(1.16);
    background-color: var(--ui-bg-elevated);
  }
  100% {
    transform: scale(1);
  }
}

.block-added {
  animation: block-pop 0.45s ease-out forwards;
}
</style>
