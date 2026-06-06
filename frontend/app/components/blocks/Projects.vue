<script setup lang="ts">
import type { CollectionItem } from '@portfolio-builder/shared/types';
import { getCollectionType } from '@portfolio-builder/shared/types';
import { portfolioSlugKey } from '~/utils/portfolioSlug';
import { visibleTags } from '~/utils/sanitize';

export interface ProjectsBlockProps {
  heading?: string;
  showHeading?: boolean;
  filterTag?: string;
  linkToPage?: boolean;
  collectionId?: string;
  background?: string | null;
  surfaceColor?: string | null;
  backgroundImage?: string | null;
  backgroundFixed?: boolean;
}

const props = withDefaults(defineProps<ProjectsBlockProps>(), {
  heading: 'Projects',
  showHeading: true,
  filterTag: '',
  linkToPage: true,
  collectionId: '',
  background: null,
  surfaceColor: null,
  backgroundImage: null,
  backgroundFixed: false,
});

const slug = inject(portfolioSlugKey, '');
const config = useRuntimeConfig();
const baseURL = import.meta.server ? (config.apiUrl as string) : (config.public.apiUrl as string);

const { resolveColor, resolveTextColor, resolvePrimary, resolveSecondary } = useActivePalette();

const bgHex = computed(() => (props.background ? resolveColor(props.background) : null));
const surfaceHex = computed(() => (props.surfaceColor ? resolveColor(props.surfaceColor) : null));

const sectionStyle = computed(() => ({
  ...(bgHex.value ? { backgroundColor: bgHex.value } : {}),
  ...(props.backgroundImage
    ? {
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: props.backgroundFixed ? 'fixed' : 'scroll',
      }
    : {}),
}));

const autoTextColor = computed(() =>
  props.background ? resolveTextColor(props.background) : null,
);
const textColorStyle = computed(() => (autoTextColor.value ? { color: autoTextColor.value } : {}));

const surfaceStyle = computed(() =>
  surfaceHex.value
    ? { backgroundColor: surfaceHex.value }
    : { backgroundColor: 'var(--bg-surface)' },
);

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

const bgPrimary = computed(() => resolvePrimary(props.background));
const bgSecondary = computed(() => resolveSecondary(props.background));
const surfacePrimary = computed(() => resolvePrimary(props.surfaceColor));

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
  <section v-if="projects.length" class="py-16" :style="sectionStyle">
    <div class="max-w-3xl mx-auto px-8">
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
  </section>
</template>
