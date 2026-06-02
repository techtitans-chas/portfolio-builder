<script setup lang="ts">
export interface TextBlockProps {
  content?: string;
  align?: 'left' | 'center' | 'right';
}

withDefaults(defineProps<TextBlockProps>(), {
  content: '',
  align: 'left',
});
</script>

<template>
  <section class="px-8 py-12">
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
