<script setup lang="ts">
import type { Block } from '@portfolio-builder/shared/types';
import { inlineEditorKey } from '~/utils/inlineEditor';

const props = defineProps<{ block: Block }>();

const { setBlockField } = usePageEditor();

provide(inlineEditorKey, {
  get blockId() {
    return props.block.id;
  },
  get blockContent() {
    return props.block.content as Record<string, unknown>;
  },
  setField(path, value) {
    setBlockField(props.block.id, path, value, props.block.content as Record<string, unknown>);
  },
});
</script>

<template>
  <slot />
</template>
