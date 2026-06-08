<script setup lang="ts">
import type { CollectionItem } from '@portfolio-builder/shared/types';
import { getCollectionType } from '@portfolio-builder/shared/types';
import { portfolioSlugKey } from '~/utils/portfolioSlug';
import { visibleTags } from '~/utils/sanitize';
import type { BlockStyleProps } from '~/config/blocks/types';
import { styleDefaults } from '~/config/blocks/presets';
import { useLayoutSettings, MAX_CONTENT_WIDTH_CLASS } from '~/composables/useLayoutSettings';

export interface ProjectsBlockProps extends BlockStyleProps {
  heading?: string;
  showHeading?: boolean;
  filterTag?: string;
  linkToPage?: boolean;
  collectionId?: string;
}

const props = withDefaults(defineProps<ProjectsBlockProps>(), {
  heading: 'Projects',
  showHeading: true,
  filterTag: '',
  linkToPage: true,
  collectionId: '',
  ...styleDefaults,
});

const slug = inject(portfolioSlugKey, '');
const config = useRuntimeConfig();
const baseURL = import.meta.server ? (config.apiUrl as string) : (config.public.apiUrl as string);

const { maxContentWidth } = useLayoutSettings();
const maxWidthClass = computed(() => MAX_CONTENT_WIDTH_CLASS[maxContentWidth.value]);

const { resolvePrimary, resolveSecondary } = useActivePalette();

const bgPrimary = computed(() => resolvePrimary(props.background));
const bgSecondary = computed(() => resolveSecondary(props.background));

const { autoTextColor, textColorStyle } = useBlockBackground(() => props.background);
const { surfaceHex, surfaceStyle, surfaceTextStyle, surfaceTextMutedStyle, surfacePrimary } =
  useBlockSurface(() => props.surfaceColor);

const { data } = await useAsyncData(
  () => `portfolio-${slug}-projects-${props.collectionId || 'default'}`,
  () => {
    const url = props.collectionId
      ? `/api/portfolios/${slug}/collections/by-id/${props.collectionId}`
      : `/api/portfolios/${slug}/collections/projects`;
    return $fetch<{ items: CollectionItem[] }>(url, { baseURL });
  },
);

const projects = computed(() => {
  const all = data.value?.items ?? [];
  return props.filterTag
    ? all.filter(p => (p.data.tags as string[] | undefined)?.includes(props.filterTag!))
    : all;
});

const hasDetailPage = !!getCollectionType('projects')?.pageTemplate;
const isLinked = computed(() => hasDetailPage && props.linkToPage);
</script>

<template>
  <BlocksBlockWrapper
    v-if="projects.length"
    class="px-8 py-16"
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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <component
          :is="isLinked ? 'a' : 'div'"
          v-for="(project, i) in projects"
          :key="project.id"
          class="rounded-xl p-6 flex flex-col gap-3 transition-opacity hover:opacity-80"
          :class="{ 'cursor-pointer': isLinked }"
          :href="isLinked ? `/p/${slug}/projects/${project.id}` : undefined"
          :style="surfaceStyle"
        >
          <div
            class="h-32 rounded-lg overflow-hidden"
            :style="{
              backgroundColor:
                i % 2 === 0
                  ? `color-mix(in srgb, ${bgSecondary} 20%, ${surfaceHex ?? 'var(--bg-surface)'})`
                  : `color-mix(in srgb, ${bgPrimary} 20%, ${surfaceHex ?? 'var(--bg-surface)'})`,
            }"
          >
            <img
              v-if="project.data.previewImageUrl"
              :src="project.data.previewImageUrl as string"
              :alt="project.data.title as string"
              class="w-full h-full object-cover"
            />
          </div>
          <h3 class="font-semibold text-lg" :style="surfaceTextStyle">{{ project.data.title }}</h3>
          <p v-if="project.data.time" class="text-sm" :style="surfaceTextMutedStyle">
            {{ project.data.time }}
          </p>
          <p v-if="project.data.description" class="text-sm" :style="surfaceTextMutedStyle">
            {{ project.data.description }}
          </p>
          <div
            v-if="visibleTags((project.data.tags as string[]) ?? []).length"
            class="flex flex-wrap gap-1 mt-auto"
          >
            <span
              v-for="tag in visibleTags((project.data.tags as string[]) ?? [])"
              :key="tag"
              class="text-xs px-2 py-0.5 rounded-full"
              :style="{
                backgroundColor: `color-mix(in srgb, ${surfacePrimary} 15%, ${surfaceHex ?? 'var(--bg-surface)'})`,
                color: surfacePrimary,
              }"
              >{{ tag }}</span
            >
          </div>
        </component>
      </div>
    </div>
  </BlocksBlockWrapper>
</template>
