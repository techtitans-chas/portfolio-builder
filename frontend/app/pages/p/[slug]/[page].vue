<script setup lang="ts">
import type { Page } from '@portfolio-builder/shared/types';

const route = useRoute();
const slug = route.params.slug as string;
const pageSlug = route.params.page as string;

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

const { contentBlocks } = usePageBlocks(slug, pageSlug);

const headerContent = computed(
  () => headerBlock.value?.content as Record<string, unknown> | undefined,
);
const footerContent = computed(
  () => footerBlock.value?.content as Record<string, unknown> | undefined,
);

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

const portfolioSeoMeta = portfolio.value?.seoMeta as {
  seoTitle?: string;
  seoDescription?: string;
} | null;

useSeoMeta({
  title:
    currentPage.seoTitle ||
    currentPage.title ||
    portfolioSeoMeta?.seoTitle ||
    (portfolio.value?.title as string) ||
    'Portfolio',
  ogTitle:
    currentPage.seoTitle ||
    currentPage.title ||
    portfolioSeoMeta?.seoTitle ||
    (portfolio.value?.title as string) ||
    'Portfolio',
  description:
    currentPage.seoDescription ||
    portfolioSeoMeta?.seoDescription ||
    (portfolio.value?.description as string) ||
    undefined,
  ogDescription:
    currentPage.seoDescription ||
    portfolioSeoMeta?.seoDescription ||
    (portfolio.value?.description as string) ||
    undefined,
  ogImage: currentPage.seoOgImageUrl || (portfolio.value?.ogImageUrl as string) || undefined,
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
    <BlocksRenderer v-for="block in contentBlocks" :key="block.id" :block="block" />
  </PortfolioLayout>
</template>
