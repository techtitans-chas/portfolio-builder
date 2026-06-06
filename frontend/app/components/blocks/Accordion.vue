<script setup lang="ts">
import { inlineEditorKey } from '~/utils/inlineEditor';
import { sanitizeHtml } from '~/utils/sanitize';
import type { BlockStyleWithSurfaceProps } from '~/config/blocks/types';
import { styleDefaults } from '~/config/blocks/presets';
import { useLayoutSettings, MAX_CONTENT_WIDTH_CLASS } from '~/composables/useLayoutSettings';

export interface AccordionItem {
  id?: string;
  question: string;
  answer: string;
}

export interface AccordionBlockProps extends BlockStyleWithSurfaceProps {
  heading?: string;
  showHeading?: boolean;
  items?: AccordionItem[];
}

const props = withDefaults(defineProps<AccordionBlockProps>(), {
  heading: 'FAQ',
  showHeading: true,
  items: () => [],
  ...styleDefaults,
});

const { maxContentWidth } = useLayoutSettings();
const maxWidthClass = computed(() => MAX_CONTENT_WIDTH_CLASS[maxContentWidth.value]);

const { autoTextColor, textPrimaryStyle, textMutedStyle } = useBlockBackground(
  () => props.background,
);

const borderColorStyle = computed(() => ({
  borderColor: autoTextColor.value
    ? `color-mix(in srgb, ${autoTextColor.value} 15%, transparent)`
    : 'color-mix(in srgb, var(--text-primary) 12%, transparent)',
}));

const inEditor = Boolean(inject(inlineEditorKey, null));
const openSet = ref<Set<number>>(new Set([0]));

function toggle(index: number) {
  if (inEditor) return;
  if (openSet.value.has(index)) {
    openSet.value.delete(index);
  } else {
    openSet.value.add(index);
  }
}

function isOpen(index: number) {
  return inEditor || openSet.value.has(index);
}
</script>

<template>
  <BlocksBlockWrapper
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
    <div class="mx-auto" :class="[maxWidthClass]">
      <EditorInlineTextField
        v-if="showHeading"
        field-key="heading"
        tag="h2"
        class="text-3xl font-bold mb-8"
        :style="textPrimaryStyle"
      >
        <h2
          class="text-3xl font-bold mb-8"
          :style="{ ...textPrimaryStyle, fontFamily: 'var(--font-heading)' }"
        >
          {{ heading }}
        </h2>
      </EditorInlineTextField>

      <div class="divide-y" :style="borderColorStyle">
        <div v-for="(item, index) in items" :key="item.id ?? index" :style="borderColorStyle">
          <component
            :is="inEditor ? 'div' : 'button'"
            class="w-full flex items-center justify-between py-4 text-left gap-4"
            :class="inEditor ? 'cursor-default' : 'cursor-pointer'"
            @click="toggle(index)"
          >
            <EditorInlineTextField
              :field-key="`items.${index}.question`"
              tag="span"
              class="font-semibold flex-1 text-base"
              :style="textPrimaryStyle"
            >
              {{ item.question }}
            </EditorInlineTextField>
            <UIcon
              name="i-lucide-chevron-down"
              class="w-5 h-5 shrink-0 transition-transform duration-200"
              :class="{ 'rotate-180': isOpen(index) }"
              :style="textMutedStyle"
            />
          </component>

          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div v-if="isOpen(index)" class="pb-5">
              <EditorInlineRichField
                :field-key="`items.${index}.answer`"
                placeholder="Write your answer..."
                class="rich-text"
                :style="textMutedStyle"
                html
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div v-if="item.answer" v-html="sanitizeHtml(item.answer)" />
              </EditorInlineRichField>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </BlocksBlockWrapper>
</template>
