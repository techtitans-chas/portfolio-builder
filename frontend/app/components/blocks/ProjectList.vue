<script setup lang="ts">
import type { CollectionItem } from '@portfolio-builder/shared/types';
import { getCollectionType } from '@portfolio-builder/shared/types';
import { portfolioSlugKey } from '~/utils/portfolioSlug';
import { visibleTags } from '~/utils/sanitize';

export interface ProjectListBlockProps {
  heading?: string;
  showHeading?: boolean;
  filterTag?: string;
  linkToPage?: boolean;
}

const props = withDefaults(defineProps<ProjectListBlockProps>(), {
  heading: 'Projects',
  showHeading: true,
  filterTag: '',
  linkToPage: true,
});

const slug = inject(portfolioSlugKey, '');
const config = useRuntimeConfig();
const baseURL = import.meta.server ? (config.apiUrl as string) : (config.public.apiUrl as string);

const { data } = await useAsyncData(
  `portfolio-${slug}-projects`,
  () =>
    $fetch<{ items: CollectionItem[] }>(`/api/portfolios/${slug}/collections/projects`, {
      baseURL,
    }),
  { watch: [] },
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
  <section v-if="projects.length" class="py-16 max-w-3xl mx-auto">
    <EditorInlineTextField
      v-if="showHeading"
      field-key="heading"
      tag="h2"
      class="text-3xl font-bold mb-8"
      :style="{ fontFamily: 'var(--font-heading)' }"
    >
      <h2 class="text-3xl font-bold mb-8" :style="{ fontFamily: 'var(--font-heading)' }">
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
        :style="i > 0 ? { borderTop: '1px solid var(--border)' } : {}"
        :href="isLinked ? `/p/${slug}/projects/${project.id}` : undefined"
      >
        <!-- Thumbnail -->
        <div
          class="w-24 h-20 shrink-0 rounded-lg overflow-hidden"
          :style="{ backgroundColor: 'color-mix(in srgb, var(--primary) 15%, var(--bg-surface))' }"
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
            <h3 class="font-semibold text-base leading-snug">{{ project.data.title }}</h3>
            <span
              v-if="project.data.time"
              class="text-xs shrink-0 pt-0.5"
              :style="{ color: 'var(--text-secondary)' }"
            >
              {{ project.data.time }}
            </span>
          </div>
          <p
            v-if="project.data.description"
            class="text-sm line-clamp-2"
            :style="{ color: 'var(--text-secondary)' }"
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
                backgroundColor: 'color-mix(in srgb, var(--primary) 15%, var(--bg-surface))',
                color: 'var(--primary)',
              }"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </component>
    </div>
  </section>
</template>
