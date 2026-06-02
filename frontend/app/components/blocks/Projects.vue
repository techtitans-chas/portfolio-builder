<script setup lang="ts">
import type { Project } from '@portfolio-builder/shared/types';
import { portfolioSlugKey } from '~/utils/portfolioSlug';

export interface ProjectsBlockProps {
  heading?: string;
  showHeading?: boolean;
  filterTag?: string;
}

const props = withDefaults(defineProps<ProjectsBlockProps>(), {
  heading: 'Projects',
  showHeading: true,
  filterTag: '',
});

const slug = inject(portfolioSlugKey, '');
const config = useRuntimeConfig();
const baseURL = import.meta.server ? (config.apiUrl as string) : (config.public.apiUrl as string);

const { data } = await useAsyncData(
  `portfolio-${slug}-projects`,
  () => $fetch<{ projects: Project[] }>(`/api/portfolios/${slug}/projects`, { baseURL }),
  { watch: [] },
);

const projects = computed(() => {
  const all = data.value?.projects ?? [];
  return props.filterTag ? all.filter(p => p.tags.includes(props.filterTag!)) : all;
});
</script>

<template>
  <section v-if="projects.length" class="px-8 py-16 max-w-3xl mx-auto">
    <h2
      v-if="showHeading"
      class="text-3xl font-bold mb-8"
      :style="{ fontFamily: 'var(--font-heading)' }"
    >
      {{ heading }}
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(project, i) in projects"
        :key="project.id"
        class="rounded-xl p-6 flex flex-col gap-3"
        :style="{ backgroundColor: 'var(--bg-surface)' }"
      >
        <div
          class="h-32 rounded-lg"
          :style="{
            backgroundColor:
              i % 2 === 0
                ? 'color-mix(in srgb, var(--secondary) 20%, var(--bg-surface))'
                : 'color-mix(in srgb, var(--primary) 20%, var(--bg-surface))',
          }"
        />
        <h3 class="font-semibold text-lg">{{ project.title }}</h3>
        <p v-if="project.time" class="text-sm" :style="{ color: 'var(--text-secondary)' }">
          {{ project.time }}
        </p>
        <p v-if="project.description" class="text-sm" :style="{ color: 'var(--text-secondary)' }">
          {{ project.description }}
        </p>
        <div v-if="project.tags.length" class="flex flex-wrap gap-1 mt-auto">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="text-xs px-2 py-0.5 rounded-full"
            :style="{
              backgroundColor: 'color-mix(in srgb, var(--primary) 15%, var(--bg-surface))',
              color: 'var(--primary)',
            }"
            >{{ tag }}</span
          >
        </div>
      </div>
    </div>
  </section>
</template>
