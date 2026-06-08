<script setup lang="ts">
import type { CollectionItem } from '@portfolio-builder/shared/types';
import { getCollectionType } from '@portfolio-builder/shared/types';
import { portfolioSlugKey } from '~/utils/portfolioSlug';
import { visibleTags } from '~/utils/sanitize';
import { useLayoutSettings, MAX_CONTENT_WIDTH_CLASS } from '~/composables/useLayoutSettings';
import type { BlockStyleProps } from '~/config/blocks/types';
import { styleDefaults } from '~/config/blocks/presets';

export interface ProjectListBlockProps extends BlockStyleProps {
  heading?: string;
  showHeading?: boolean;
  filterTag?: string;
  linkToPage?: boolean;
  collectionId?: string;
}

const props = withDefaults(defineProps<ProjectListBlockProps>(), {
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

const { resolveColor, resolveTextColor, resolvePrimary } = useActivePalette();

const autoTextColor = computed(() =>
  props.background ? resolveTextColor(props.background) : null,
);
const textColorStyle = computed(() => (autoTextColor.value ? { color: autoTextColor.value } : {}));

const surfaceHex = computed(() => (props.surfaceColor ? resolveColor(props.surfaceColor) : null));
const surfaceTextColor = computed(() =>
  props.surfaceColor ? resolveTextColor(props.surfaceColor) : null,
);
const surfaceTextStyle = computed(() =>
  surfaceTextColor.value ? { color: surfaceTextColor.value } : { color: 'var(--text-primary)' },
);
const surfaceTextMutedStyle = computed(() =>
  surfaceTextColor.value
    ? { color: surfaceTextColor.value, opacity: '0.6' }
    : { color: 'var(--text-secondary)' },
);

const surfacePrimary = computed(() => resolvePrimary(props.surfaceColor));
const surfaceHexOrDefault = computed(() => surfaceHex.value ?? 'var(--bg-surface)');

const borderStyle = computed(() => ({
  borderTop: `1px solid ${autoTextColor.value ? `color-mix(in srgb, ${autoTextColor.value} 15%, transparent)` : 'var(--border)'}`,
}));

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
    <div class="mx-auto" :class="maxWidthClass">
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
      <div class="flex flex-col">
        <component
          :is="isLinked ? 'a' : 'div'"
          v-for="(project, i) in projects"
          :key="project.id"
          class="flex gap-4 py-5 transition-opacity hover:opacity-80"
          :class="{ 'cursor-pointer': isLinked }"
          :style="i > 0 ? borderStyle : {}"
          :href="isLinked ? `/p/${slug}/projects/${project.id}` : undefined"
        >
          <!-- Thumbnail -->
          <div
            class="w-24 h-20 shrink-0 rounded-lg overflow-hidden"
            :style="{
              backgroundColor: `color-mix(in srgb, ${surfacePrimary} 15%, ${surfaceHexOrDefault})`,
            }"
          >
            <img
              v-if="project.data.previewImageUrl"
              :src="project.data.previewImageUrl as string"
              :alt="project.data.title as string"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Content -->
          <div class="flex flex-col gap-1 min-w-0 flex-1 justify-center">
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-semibold text-base leading-snug" :style="surfaceTextStyle">
                {{ project.data.title }}
              </h3>
              <span
                v-if="project.data.time"
                class="text-xs shrink-0 pt-0.5"
                :style="surfaceTextMutedStyle"
              >
                {{ project.data.time }}
              </span>
            </div>
            <p
              v-if="project.data.description"
              class="text-sm line-clamp-2"
              :style="surfaceTextMutedStyle"
            >
              {{ project.data.description }}
            </p>
            <div
              v-if="visibleTags((project.data.tags as string[]) ?? []).length"
              class="flex flex-wrap gap-1 mt-1"
            >
              <span
                v-for="tag in visibleTags((project.data.tags as string[]) ?? [])"
                :key="tag"
                class="text-xs px-2 py-0.5 rounded-full"
                :style="{
                  backgroundColor: `color-mix(in srgb, ${surfacePrimary} 15%, ${surfaceHexOrDefault})`,
                  color: surfacePrimary,
                }"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </component>
      </div>
    </div>
  </BlocksBlockWrapper>
</template>
