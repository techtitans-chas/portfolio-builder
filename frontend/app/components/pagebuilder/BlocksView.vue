<script setup lang="ts">
import { blockDefinitions } from '~/config/blocks';

const { addPendingBlock } = usePageEditor();
const { selectBlock } = useSelectedBlock();
const emit = defineEmits<{ blockAdded: [] }>();

function addBlock(type: string) {
  const definition = blockDefinitions.find(d => d.type === type);
  const newBlock = addPendingBlock(type, definition?.defaultContent ?? {});
  selectBlock(newBlock);
  emit('blockAdded');
}
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <UButton
      v-for="block in blockDefinitions"
      :key="block.type"
      color="neutral"
      variant="outline"
      :aria-label="block.label"
      :label="block.label"
      :icon="block.icon"
      class="flex-col text-xs justify-center aspect-square"
      :ui="{ leadingIcon: 'size-6' }"
      @click="addBlock(block.type)"
    />
  </div>
</template>
