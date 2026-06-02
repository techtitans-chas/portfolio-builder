<script setup lang="ts">
import { inlineEditorKey } from '~/utils/inlineEditor';

export interface TextBlockProps {
  content?: string;
  align?: 'left' | 'center' | 'right';
}

const props = withDefaults(defineProps<TextBlockProps>(), {
  content: '',
  align: 'left',
});

const inEditor = Boolean(inject(inlineEditorKey, null));

const isEmpty = computed(() => {
  const t = props.content?.trim() ?? '';
  return !t || t === '<p></p>';
});
</script>

<template>
  <section v-if="inEditor || !isEmpty" class="px-8 py-12">
    <div
      class="max-w-3xl mx-auto rich-text"
      :class="{
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right',
      }"
    >
      <EditorInlineRichField field-key="content" placeholder="Start typing..." html class="w-full">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-if="content" v-html="content" />
        <p v-else class="opacity-40">Start typing...</p>
      </EditorInlineRichField>
    </div>
  </section>
</template>
