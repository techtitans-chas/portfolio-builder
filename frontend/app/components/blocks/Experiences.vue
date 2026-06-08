<script setup lang="ts">
import type { CollectionItem } from '@portfolio-builder/shared/types';
import { portfolioSlugKey } from '~/utils/portfolioSlug';
import { visibleTags } from '~/utils/sanitize';
import type { BlockStyleWithSurfaceProps } from '~/config/blocks/types';
import { styleDefaults } from '~/config/blocks/presets';
import { useLayoutSettings, MAX_CONTENT_WIDTH_CLASS } from '~/composables/useLayoutSettings';

export interface ExperiencesBlockProps extends BlockStyleWithSurfaceProps {
  heading?: string;
  showHeading?: boolean;
  filterTag?: string;
  collectionId?: string;
}

const props = withDefaults(defineProps<ExperiencesBlockProps>(), {
  heading: 'Experience',
  showHeading: true,
  filterTag: '',
  collectionId: '',
  ...styleDefaults,
});

const slug = inject(portfolioSlugKey, '');
const config = useRuntimeConfig();
const baseURL = import.meta.server ? (config.apiUrl as string) : (config.public.apiUrl as string);

const { maxContentWidth } = useLayoutSettings();
const maxWidthClass = computed(() => MAX_CONTENT_WIDTH_CLASS[maxContentWidth.value]);

const { autoTextColor, textColorStyle } = useBlockBackground(() => props.background);
const {
  surfaceHexOrDefault,
  surfaceStyle,
  surfaceTextStyle,
  surfaceTextMutedStyle,
  surfaceSecondary,
} = useBlockSurface(() => props.surfaceColor);

const { data } = await useAsyncData(
  () => `portfolio-${slug}-experiences-${props.collectionId || 'default'}`,
  () => {
    const url = props.collectionId
      ? `/api/portfolios/${slug}/collections/by-id/${props.collectionId}`
      : `/api/portfolios/${slug}/collections/experiences`;
    return $fetch<{ items: CollectionItem[] }>(url, { baseURL });
  },
);

const experiences = computed(() => {
  const all = data.value?.items ?? [];
  return props.filterTag
    ? all.filter(e => (e.data.tags as string[] | undefined)?.includes(props.filterTag!))
    : all;
});
</script>

<template>
  <BlocksBlockWrapper
    v-if="experiences.length"
    class="py-16"
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
    <div class="px-8 mx-auto" :class="[maxWidthClass]">
      <EditorInlineTextField
        v-if="showHeading"
        field-key="heading"
        tag="h2"
        class="text-3xl font-bold mb-8"
        :style="autoTextColor ? textColorStyle : { color: 'var(--text-primary)' }"
      >
        <h2
          class="text-3xl font-bold mb-8"
          :style="{
            ...(autoTextColor ? textColorStyle : { color: 'var(--text-primary)' }),
            fontFamily: 'var(--font-heading)',
          }"
        >
          {{ heading }}
        </h2>
      </EditorInlineTextField>
      <ul class="space-y-6">
        <li
          v-for="experience in experiences"
          :key="experience.id"
          class="rounded-xl p-6"
          :style="surfaceStyle"
        >
          <p class="font-semibold text-lg" :style="surfaceTextStyle">{{ experience.data.title }}</p>
          <p
            v-if="experience.data.place || experience.data.time"
            class="text-sm mt-1"
            :style="surfaceTextMutedStyle"
          >
            <span v-if="experience.data.place">{{ experience.data.place }}</span>
            <span v-if="experience.data.place && experience.data.time"> · </span>
            <span v-if="experience.data.time">{{ experience.data.time }}</span>
            <span v-if="experience.data.location"> · {{ experience.data.location }}</span>
          </p>
          <p v-if="experience.data.description" class="text-sm mt-2" :style="surfaceTextMutedStyle">
            {{ experience.data.description }}
          </p>
          <div
            v-if="visibleTags((experience.data.tags as string[]) ?? []).length"
            class="flex flex-wrap gap-1 mt-3"
          >
            <span
              v-for="tag in visibleTags((experience.data.tags as string[]) ?? [])"
              :key="tag"
              class="text-xs px-2 py-0.5 rounded-full"
              :style="{
                backgroundColor: `color-mix(in srgb, ${surfaceSecondary} 15%, ${surfaceHexOrDefault})`,
                color: surfaceSecondary,
              }"
              >{{ tag }}</span
            >
          </div>
        </li>
      </ul>
    </div>
  </BlocksBlockWrapper>
</template>
