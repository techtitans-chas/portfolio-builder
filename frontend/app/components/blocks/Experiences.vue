<script setup lang="ts">
import type { CollectionItem } from '@portfolio-builder/shared/types';
import { portfolioSlugKey } from '~/utils/portfolioSlug';
import { visibleTags } from '~/utils/sanitize';

export interface ExperiencesBlockProps {
  heading?: string;
  showHeading?: boolean;
  filterTag?: string;
}

const props = withDefaults(defineProps<ExperiencesBlockProps>(), {
  heading: 'Experience',
  showHeading: true,
  filterTag: '',
});

const slug = inject(portfolioSlugKey, '');
const config = useRuntimeConfig();
const baseURL = import.meta.server ? (config.apiUrl as string) : (config.public.apiUrl as string);

const { data } = await useAsyncData(
  `portfolio-${slug}-experiences`,
  () =>
    $fetch<{ items: CollectionItem[] }>(`/api/portfolios/${slug}/collections/experiences`, {
      baseURL,
    }),
  { watch: [] },
);

const experiences = computed(() => {
  const all = data.value?.items ?? [];
  return props.filterTag
    ? all.filter(e => (e.data.tags as string[] | undefined)?.includes(props.filterTag!))
    : all;
});
</script>

<template>
  <section v-if="experiences.length" class="px-8 py-16 max-w-3xl mx-auto">
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
    <ul class="space-y-6">
      <li
        v-for="experience in experiences"
        :key="experience.id"
        class="rounded-xl p-6"
        :style="{ backgroundColor: 'var(--bg-surface)' }"
      >
        <p class="font-semibold text-lg">{{ experience.data.title }}</p>
        <p
          v-if="experience.data.place || experience.data.time"
          class="text-sm mt-1"
          :style="{ color: 'var(--text-secondary)' }"
        >
          <span v-if="experience.data.place">{{ experience.data.place }}</span>
          <span v-if="experience.data.place && experience.data.time"> · </span>
          <span v-if="experience.data.time">{{ experience.data.time }}</span>
          <span v-if="experience.data.location"> · {{ experience.data.location }}</span>
        </p>
        <p
          v-if="experience.data.description"
          class="text-sm mt-2"
          :style="{ color: 'var(--text-secondary)' }"
        >
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
              backgroundColor: 'color-mix(in srgb, var(--secondary) 15%, var(--bg-surface))',
              color: 'var(--secondary)',
            }"
            >{{ tag }}</span
          >
        </div>
      </li>
    </ul>
  </section>
</template>
