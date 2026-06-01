<script setup lang="ts">
import type { Project, Experience } from '@portfolio-builder/shared/types';

const route = useRoute();
const slug = route.params.slug as string;

definePageMeta({ layout: false });

const {
  portfolio,
  portfolioError,
  portfolioMode,
  cssVars,
  navLinks,
  headerBlock,
  footerBlock,
  baseURL,
} = usePortfolio(slug);

const { contentBlocks } = usePageBlocks(slug, 'home');

const headerContent = computed(
  () => headerBlock.value?.content as Record<string, unknown> | undefined,
);
const footerContent = computed(
  () => footerBlock.value?.content as Record<string, unknown> | undefined,
);

const { data: projectsData } = await useAsyncData(`portfolio-${slug}-projects`, () =>
  $fetch<{ projects: Project[] }>(`/api/portfolios/${slug}/projects`, { baseURL }),
);

const { data: experiencesData } = await useAsyncData(`portfolio-${slug}-experiences`, () =>
  $fetch<{ experiences: Experience[] }>(`/api/portfolios/${slug}/experiences`, { baseURL }),
);

if (portfolioError.value || !portfolio.value) {
  throw createError({ statusCode: 404, statusMessage: 'Portfolio not found' });
}

const projects = computed(() => projectsData.value?.projects ?? []);
const experiences = computed(() => experiencesData.value?.experiences ?? []);

const seoMeta = computed(
  () => portfolio.value?.seoMeta as { seoTitle?: string; seoDescription?: string } | null,
);
const pageTitle = computed(
  () => seoMeta.value?.seoTitle || (portfolio.value?.title as string) || 'Portfolio',
);

const canonicalUrl = `${useRequestURL().origin}/p/${slug}`;

useSeoMeta({
  title: () => pageTitle.value,
  ogTitle: () => pageTitle.value,
  description: () =>
    seoMeta.value?.seoDescription ?? (portfolio.value?.description as string) ?? undefined,
  ogDescription: () =>
    seoMeta.value?.seoDescription ?? (portfolio.value?.description as string) ?? undefined,
  ogImage: () => (portfolio.value?.ogImageUrl as string) ?? undefined,
  ogUrl: canonicalUrl,
});
</script>

<template>
  <PortfolioLayout
    :css-vars="cssVars"
    :portfolio-mode="portfolioMode"
    :site-name="(portfolio?.title as string) || (portfolio?.slug as string) || ''"
    :home-url="`/p/${slug}`"
    :nav-links="navLinks"
    :header-content="headerContent"
    :footer-content="footerContent"
  >
    <!-- Render any non-header/footer content blocks stored in DB -->
    <BlocksRenderer v-for="block in contentBlocks" :key="block.id" :block="block" />

    <!-- Experiences -->
    <section v-if="experiences.length" id="experiences" class="px-8 py-16 max-w-3xl mx-auto">
      <h2 class="text-3xl font-bold mb-8">Experience</h2>
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

    <!-- Projects — rendered directly until a dedicated block type exists -->
    <section v-if="projects.length" id="projects" class="px-8 py-16 max-w-3xl mx-auto">
      <h2 class="text-3xl font-bold mb-8">Projects</h2>
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
  </PortfolioLayout>
</template>
