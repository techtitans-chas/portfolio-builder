<script setup lang="ts">
import { inlineEditorKey } from '~/utils/inlineEditor';
import { getPath } from '~/utils/dotPath';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  fieldKey: string;
  tag?: string;
}>();

const ctx = inject(inlineEditorKey, null);

const value = computed(() => (ctx ? String(getPath(ctx.blockContent, props.fieldKey) ?? '') : ''));

const elRef = useTemplateRef<HTMLElement>('el');

onMounted(() => {
  if (elRef.value) elRef.value.innerText = value.value;
});

// Sync external changes (e.g. sidebar edit) without clobbering an active edit
watch(value, v => {
  if (elRef.value && document.activeElement !== elRef.value) {
    elRef.value.innerText = v;
  }
});

function onBlur(e: FocusEvent) {
  ctx?.setField(props.fieldKey, (e.target as HTMLElement).innerText);
}
</script>

<template>
  <component
    :is="tag ?? 'span'"
    v-if="ctx"
    ref="el"
    contenteditable="true"
    v-bind="$attrs"
    class="outline-none cursor-text empty:before:content-[attr(data-placeholder)] empty:before:opacity-40"
    @blur="onBlur"
    @keydown.enter.prevent="(elRef as HTMLElement)?.blur()"
  />
  <slot v-else />
</template>
