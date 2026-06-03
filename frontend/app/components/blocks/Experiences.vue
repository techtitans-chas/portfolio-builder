<script setup lang="ts">
import type { Experience } from '@portfolio-builder/shared/types';
import { portfolioSlugKey } from '~/utils/portfolioSlug';

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
  () => $fetch<{ experiences: Experience[] }>(`/api/portfolios/${slug}/experiences`, { baseURL }),
  { watch: [] },
);

const experiences = computed(() => {
  const all = data.value?.experiences ?? [];
  return props.filterTag ? all.filter(e => e.tags.includes(props.filterTag!)) : all;
});
</script>

<template>
  <section v-if="experiences.length" class="px-8 py-16 max-w-3xl mx-auto">
    <h2
      v-if="showHeading"
      class="text-3xl font-bold mb-8"
      :style="{ fontFamily: 'var(--font-heading)' }"
    >
      {{ heading }}
    </h2>
    <ul class="space-y-6">
      <li
        v-for="experience in experiences"
        :key="experience.id"
        class="rounded-xl p-6"
        :style="{ backgroundColor: 'var(--bg-surface)' }"
      >
        <p class="font-semibold text-lg">{{ experience.title }}</p>
        <p
          v-if="experience.place || experience.time"
          class="text-sm mt-1"
          :style="{ color: 'var(--text-secondary)' }"
        >
          <span v-if="experience.place">{{ experience.place }}</span>
          <span v-if="experience.place && experience.time"> · </span>
          <span v-if="experience.time">{{ experience.time }}</span>
          <span v-if="experience.location"> · {{ experience.location }}</span>
        </p>
        <p
          v-if="experience.description"
          class="text-sm mt-2"
          :style="{ color: 'var(--text-secondary)' }"
        >
          {{ experience.description }}
        </p>
        <div v-if="experience.tags.length" class="flex flex-wrap gap-1 mt-3">
          <span
            v-for="tag in experience.tags"
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
