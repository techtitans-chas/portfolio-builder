<script setup lang="ts">
import { inlineEditorKey } from '~/utils/inlineEditor';
import { sanitizeHtml } from '~/utils/sanitize';

export interface TextBlockProps {
  content?: string;
  align?: 'left' | 'center' | 'right';
  background?: string | null;
  backgroundImage?: string | null;
}

const props = withDefaults(defineProps<TextBlockProps>(), {
  content: '',
  align: 'left',
  background: null,
  backgroundImage: null,
});

const inEditor = Boolean(inject(inlineEditorKey, null));

const isEmpty = computed(() => {
  const t = props.content?.trim() ?? '';
  return !t || t === '<p></p>';
});

const { resolveColor, resolveTextColor } = useActivePalette();

const bgHex = computed(() => (props.background ? resolveColor(props.background) : null));

const sectionStyle = computed(() => ({
  ...(bgHex.value ? { backgroundColor: bgHex.value } : {}),
  ...(props.backgroundImage
    ? {
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {}),
}));

const autoTextColor = computed(() =>
  props.background ? resolveTextColor(props.background) : null,
);
</script>

<template>
  <section v-if="inEditor || !isEmpty" class="px-8 py-12" :style="sectionStyle">
    <div
      class="max-w-3xl mx-auto rich-text"
      :class="{
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right',
      }"
      :style="autoTextColor ? { color: autoTextColor } : {}"
    >
      <EditorInlineRichField field-key="content" placeholder="Start typing..." html class="w-full">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-if="content" v-html="sanitizeHtml(content)" />
      </EditorInlineRichField>
    </div>
  </section>
</template>
