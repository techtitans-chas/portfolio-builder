<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();

definePageMeta({
  layout: false,
});

// Use private apiUrl on SSR (works inside Docker), public apiUrl on client
const baseURL = import.meta.server ? (config.apiUrl as string) : (config.public.apiUrl as string);

const { data, error } = await useAsyncData(`portfolio-${route.params.slug}`, () =>
  $fetch(`/api/portfolios/${route.params.slug}`, { baseURL }),
);

if (error.value || !data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Portfolio not found' });
}

const portfolio = (data.value as { portfolio: Record<string, unknown> }).portfolio;
const seoMeta = portfolio.seoMeta as { seoTitle?: string; seoDescription?: string } | null;

useSeoMeta({
  title: seoMeta?.seoTitle || (portfolio.title as string) || 'Portfolio',
  ogTitle: seoMeta?.seoTitle || (portfolio.title as string) || 'Portfolio',
  description: seoMeta?.seoDescription ?? (portfolio.description as string) ?? undefined,
  ogDescription: seoMeta?.seoDescription ?? (portfolio.description as string) ?? undefined,
  ogImage: (portfolio.ogImageUrl as string) ?? undefined,
});
</script>

<template>
  <div class="min-h-screen p-8">
    <h1>{{ portfolio.title || portfolio.slug }}</h1>
    <p v-if="portfolio.description">{{ portfolio.description }}</p>
  </div>
</template>
