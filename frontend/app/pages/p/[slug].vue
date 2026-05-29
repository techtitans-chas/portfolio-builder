<script setup lang="ts">
import type { Project, Experience } from '@portfolio-builder/shared/types';

const route = useRoute();
const config = useRuntimeConfig();

definePageMeta({
  layout: false,
});

const baseURL = import.meta.server ? (config.apiUrl as string) : (config.public.apiUrl as string);
const slug = route.params.slug as string;

const { data: portfolioData, error: portfolioError } = await useAsyncData(
  `portfolio-${slug}`,
  () => $fetch<{ portfolio: Record<string, unknown> }>(`/api/portfolios/${slug}`, { baseURL }),
);

if (portfolioError.value || !portfolioData.value) {
  throw createError({ statusCode: 404, statusMessage: 'Portfolio not found' });
}

const { data: projectsData } = await useAsyncData(
  `portfolio-${slug}-projects`,
  () => $fetch<{ projects: Project[] }>(`/api/portfolios/${slug}/projects`, { baseURL }),
);

const { data: experiencesData } = await useAsyncData(
  `portfolio-${slug}-experiences`,
  () => $fetch<{ experiences: Experience[] }>(`/api/portfolios/${slug}/experiences`, { baseURL }),
);

const portfolio = portfolioData.value.portfolio;
const seoMeta = portfolio.seoMeta as { seoTitle?: string; seoDescription?: string } | null;
const projects = projectsData.value?.projects ?? [];
const experiences = experiencesData.value?.experiences ?? [];

useSeoMeta({
  title: seoMeta?.seoTitle || (portfolio.title as string) || 'Portfolio',
  ogTitle: seoMeta?.seoTitle || (portfolio.title as string) || 'Portfolio',
  description: seoMeta?.seoDescription ?? (portfolio.description as string) ?? undefined,
  ogDescription: seoMeta?.seoDescription ?? (portfolio.description as string) ?? undefined,
  ogImage: (portfolio.ogImageUrl as string) ?? undefined,
});
</script>

<template>
  <div class="min-h-screen p-8 max-w-2xl mx-auto space-y-12">
    <div>
      <h1 class="text-3xl font-bold">{{ portfolio.title || portfolio.slug }}</h1>
      <p v-if="portfolio.description" class="mt-2 text-muted">{{ portfolio.description }}</p>
    </div>

    <section v-if="projects.length">
      <h2 class="text-xl font-semibold mb-4">Projects</h2>
      <ul class="space-y-4">
        <li
          v-for="project in projects"
          :key="project.id"
          class="border border-default rounded-md p-4"
        >
          <p class="font-medium">{{ project.title }}</p>
          <p v-if="project.time" class="text-sm text-muted">{{ project.time }}</p>
          <p v-if="project.description" class="text-sm mt-1">{{ project.description }}</p>
          <div v-if="project.tags.length" class="flex flex-wrap gap-1 mt-2">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
            >{{ tag }}</span>
          </div>
        </li>
      </ul>
    </section>

    <section v-if="experiences.length">
      <h2 class="text-xl font-semibold mb-4">Experiences</h2>
      <ul class="space-y-4">
        <li
          v-for="experience in experiences"
          :key="experience.id"
          class="border border-default rounded-md p-4"
        >
          <p class="font-medium">{{ experience.title }}</p>
          <p v-if="experience.place || experience.time" class="text-sm text-muted">
            <span v-if="experience.place">{{ experience.place }}</span>
            <span v-if="experience.place && experience.time"> · </span>
            <span v-if="experience.time">{{ experience.time }}</span>
            <span v-if="experience.location"> · {{ experience.location }}</span>
          </p>
          <p v-if="experience.description" class="text-sm mt-1">{{ experience.description }}</p>
          <div v-if="experience.tags.length" class="flex flex-wrap gap-1 mt-2">
            <span
              v-for="tag in experience.tags"
              :key="tag"
              class="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
            >{{ tag }}</span>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
