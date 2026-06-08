<script setup lang="ts">
import { inlineEditorKey } from '~/utils/inlineEditor';
import { sanitizeHtml } from '~/utils/sanitize';
import type { BlockStyleProps } from '~/config/blocks/types';
import { styleDefaults } from '~/config/blocks/presets';
import { useLayoutSettings, MAX_CONTENT_WIDTH_CLASS } from '~/composables/useLayoutSettings';

export interface TextBlockProps extends BlockStyleProps {
  content?: string;
  align?: 'left' | 'center' | 'right';
}

const props = withDefaults(defineProps<TextBlockProps>(), {
  content: '',
  align: 'left',
  ...styleDefaults,
});

const inEditor = Boolean(inject(inlineEditorKey, null));

const isEmpty = computed(() => {
  const t = props.content?.trim() ?? '';
  return !t || t === '<p></p>';
});

const { autoTextColor } = useBlockBackground(() => props.background);

const { maxContentWidth } = useLayoutSettings();
const maxWidthClass = computed(() => MAX_CONTENT_WIDTH_CLASS[maxContentWidth.value]);
</script>

<template>
  <BlocksBlockWrapper
    v-if="inEditor || !isEmpty"
    class="px-8 py-12"
    v-bind="{
      background,
      backgroundImage,
      backgroundOpacity,
      backgroundFixed,
      overlayEnabled,
      overlayType,
      overlayColor,
      overlayColor2,
      overlayDegree,
      overlayOpacity,
    }"
  >
    <div
      class="mx-auto rich-text"
      :class="[
        maxWidthClass,
        {
          'text-left': align === 'left',
          'text-center': align === 'center',
          'text-right': align === 'right',
        },
      ]"
      :style="autoTextColor ? { color: autoTextColor } : {}"
    >
      <EditorInlineRichField field-key="content" placeholder="Start typing..." html class="w-full">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-if="content" v-html="sanitizeHtml(content)" />
      </EditorInlineRichField>
    </div>
  </BlocksBlockWrapper>
</template>
