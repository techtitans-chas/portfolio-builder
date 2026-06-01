<script setup lang="ts">
import type { ThemeColors, Theme } from '~/components/pagebuilder/ThemeView.vue';
import type { Project, Experience } from '@portfolio-builder/shared/types';

const route = useRoute();
const config = useRuntimeConfig();

definePageMeta({
  layout: false,
});

const baseURL = import.meta.server ? (config.apiUrl as string) : (config.public.apiUrl as string);
const slug = route.params.slug as string;

const { data: portfolioData, error: portfolioError } = await useAsyncData(`portfolio-${slug}`, () =>
  $fetch<{ portfolio: Record<string, unknown> }>(`/api/portfolios/${slug}`, { baseURL }),
);

if (portfolioError.value || !portfolioData.value) {
  throw createError({ statusCode: 404, statusMessage: 'Portfolio not found' });
}

const { data: projectsData } = await useAsyncData(`portfolio-${slug}-projects`, () =>
  $fetch<{ projects: Project[] }>(`/api/portfolios/${slug}/projects`, { baseURL }),
);

const { data: experiencesData } = await useAsyncData(`portfolio-${slug}-experiences`, () =>
  $fetch<{ experiences: Experience[] }>(`/api/portfolios/${slug}/experiences`, { baseURL }),
);

const portfolio = portfolioData.value.portfolio;
const seoMeta = portfolio.seoMeta as { seoTitle?: string; seoDescription?: string } | null;
const themeSettings = portfolio.themeSettings as { themeId?: string | null; mode?: string } | null;
const projects = projectsData.value?.projects ?? [];
const experiences = experiencesData.value?.experiences ?? [];

useSeoMeta({
  title: seoMeta?.seoTitle || (portfolio.title as string) || 'Portfolio',
  ogTitle: seoMeta?.seoTitle || (portfolio.title as string) || 'Portfolio',
  description: seoMeta?.seoDescription ?? (portfolio.description as string) ?? undefined,
  ogDescription: seoMeta?.seoDescription ?? (portfolio.description as string) ?? undefined,
  ogImage: (portfolio.ogImageUrl as string) ?? undefined,
});

const { data: themesData } = await useAsyncData('themes', () => $fetch(`/api/themes`, { baseURL }));
const allThemes = (themesData.value as { themes: Theme[] } | null)?.themes ?? [];
const selectedTheme = allThemes.find(t => t.id === themeSettings?.themeId) ?? allThemes[0] ?? null;

const portfolioMode = themeSettings?.mode ?? 'light';
const colorMode = useColorMode();

// For "both" mode, follow the Nuxt color mode. For light/dark, force that palette.
const isDark = computed(() => {
  if (portfolioMode === 'dark') return true;
  if (portfolioMode === 'light') return false;
  return colorMode.value === 'dark';
});

function buildCssVars(colors: ThemeColors): Record<string, string> {
  return {
    '--bg-page': colors.bgPage,
    '--bg-surface': colors.bgSurface,
    '--bg-nav': colors.bgNav,
    '--primary': colors.primary,
    '--secondary': colors.secondary,
    '--text-primary': colors.textPrimary,
    '--text-secondary': colors.textSecondary,
  };
}

const cssVars = computed(() => {
  if (!selectedTheme) return {};
  return buildCssVars(isDark.value ? selectedTheme.dark : selectedTheme.light);
});
</script>

<template>
  <div
    class="portfolio-root min-h-screen"
    :style="{ ...cssVars, backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }"
  >
    <BlocksHeader
      :site-name="(portfolio.title as string) || (portfolio.slug as string)"
      :nav-links="[
        { label: 'About', url: '#about' },
        { label: 'Projects', url: '#projects' },
        { label: 'Contact', url: '#contact' },
      ]"
      :cta="{ label: 'Hire me', url: '#contact' }"
      :show-color-mode-toggle="portfolioMode === 'both'"
    />

    <BlocksHero
      :heading="(portfolio.title as string) || (portfolio.slug as string)"
      :subheading="(portfolio.description as string) || 'Welcome to my portfolio.'"
      :primary-cta="{ label: 'View my work', url: '#projects' }"
      :secondary-cta="{ label: 'Get in touch', url: '#contact' }"
    />

    <!-- About -->
    <section id="about" class="px-8 py-16 max-w-3xl mx-auto">
      <h2 class="text-3xl font-bold mb-4">About</h2>
      <div class="rounded-xl p-8" :style="{ backgroundColor: 'var(--bg-surface)' }">
        <p :style="{ color: 'var(--text-secondary)' }">
          A short bio goes here. Passionate developer with a love for clean design and great user
          experiences.
        </p>
      </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="px-8 py-16 max-w-5xl mx-auto">
      <h2 class="text-3xl font-bold mb-8">Projects</h2>
      <div v-if="projects.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            >{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Experiences -->
    <section id="experiences" class="px-8 py-16 max-w-3xl mx-auto">
      <h2 class="text-3xl font-bold mb-8">Experience</h2>
      <ul v-if="experiences.length" class="space-y-6">
        <li
          v-for="experience in experiences"
          :key="experience.id"
          class="rounded-xl p-6"
          :style="{ backgroundColor: 'var(--bg-surface)' }"
        >
          <p class="font-semibold text-lg">{{ experience.title }}</p>
          <p v-if="experience.place || experience.time" class="text-sm mt-1" :style="{ color: 'var(--text-secondary)' }">
            <span v-if="experience.place">{{ experience.place }}</span>
            <span v-if="experience.place && experience.time"> · </span>
            <span v-if="experience.time">{{ experience.time }}</span>
            <span v-if="experience.location"> · {{ experience.location }}</span>
          </p>
          <p v-if="experience.description" class="text-sm mt-2" :style="{ color: 'var(--text-secondary)' }">
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
            >{{ tag }}</span>
          </div>
        </li>
      </ul>
    </section>

    <!-- Contact -->
    <section
      id="contact"
      class="px-8 py-16 max-w-3xl mx-auto flex flex-col items-center text-center gap-4"
    >
      <h2 class="text-3xl font-bold">Contact</h2>
      <p :style="{ color: 'var(--text-secondary)' }">Let's work together.</p>
      <a
        href="mailto:hello@example.com"
        class="px-6 py-3 rounded-lg font-medium border"
        :style="{
          color: 'var(--secondary)',
          borderColor: 'var(--secondary)',
        }"
      >
        Say hello
      </a>
    </section>

    <BlocksFooter
      :site-name="(portfolio.title as string) || (portfolio.slug as string)"
      :links="[
        { label: 'About', url: '#about' },
        { label: 'Projects', url: '#projects' },
        { label: 'Contact', url: '#contact' },
      ]"
    />
  </div>
</template>
