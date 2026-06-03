<script setup lang="ts">
import type { Block } from '@portfolio-builder/shared/types';
import { inlineEditorKey } from '~/utils/inlineEditor';

const props = defineProps<{ block: Block }>();

const { setBlockField } = usePageEditor();
const { selectedBlock } = useSelectedBlock();

const isSelected = computed(() => selectedBlock.value?.id === props.block.id);

provide(inlineEditorKey, {
  get blockId() {
    return props.block.id;
  },
  get blockContent() {
    return props.block.content as Record<string, unknown>;
  },
  // Only allow edits when this block is selected — prevents stale Tiptap instances
  // in non-selected blocks from intercepting clicks
  get isActive() {
    return isSelected.value;
  },
  setField(path, value) {
    setBlockField(props.block.id, path, value, props.block.content as Record<string, unknown>);
  },
});
</script>

<template>
  <slot />
</template>
