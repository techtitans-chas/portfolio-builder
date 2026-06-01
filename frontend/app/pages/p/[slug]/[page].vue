<script setup lang="ts">
import type { Page } from '@portfolio-builder/shared/types';

const route = useRoute();
const slug = route.params.slug as string;
const pageSlug = route.params.page as string;

definePageMeta({ layout: false });

const { portfolio, portfolioError, portfolioMode, cssVars, navLinks, baseURL } =
  usePortfolio(slug);

const canonicalUrl = `${useRequestURL().origin}/p/${slug}/${pageSlug}`;

// Same key as usePortfolio — deduplicated, no extra request
const { data: pagesData } = await useAsyncData(`portfolio-${slug}-pages`, () =>
  $fetch<{ pages: Page[] }>(`/api/portfolios/${slug}/pages`, { baseURL }),
);

if (portfolioError.value || !portfolio.value) {
  throw createError({ statusCode: 404, statusMessage: 'Portfolio not found' });
}

const currentPage = pagesData.value?.pages.find(p => p.slug === pageSlug) ?? null;

if (!currentPage) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' });
}

const portfolioSeoMeta =
  portfolio.value?.seoMeta as { seoTitle?: string; seoDescription?: string } | null;

useSeoMeta({
  title: currentPage.seoTitle || currentPage.title || portfolioSeoMeta?.seoTitle || (portfolio.value?.title as string) || 'Portfolio',
  ogTitle: currentPage.seoTitle || currentPage.title || portfolioSeoMeta?.seoTitle || (portfolio.value?.title as string) || 'Portfolio',
  description: currentPage.seoDescription || portfolioSeoMeta?.seoDescription || (portfolio.value?.description as string) || undefined,
  ogDescription: currentPage.seoDescription || portfolioSeoMeta?.seoDescription || (portfolio.value?.description as string) || undefined,
  ogImage: currentPage.seoOgImageUrl || (portfolio.value?.ogImageUrl as string) || undefined,
  ogUrl: canonicalUrl,
});
</script>

<template>
  <div
    class="portfolio-root min-h-screen"
    :style="{ ...cssVars, backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }"
  >
    <BlocksHeader
      :site-name="(portfolio?.title as string) || (portfolio?.slug as string)"
      :nav-links="navLinks"
      :cta="{ label: 'Hire me', url: '#contact' }"
      :show-color-mode-toggle="portfolioMode === 'both'"
    />

    <main class="px-8 py-16 max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">{{ currentPage.title }}</h1>
      <!-- Blocks will be rendered here once the blocks system is ready -->
    </main>

    <BlocksFooter
      :site-name="(portfolio?.title as string) || (portfolio?.slug as string)"
      :links="navLinks"
    />
  </div>
</template>
