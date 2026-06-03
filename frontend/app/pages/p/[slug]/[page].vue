<script setup lang="ts">
import type { Page } from '@portfolio-builder/shared/types';
import { portfolioSlugKey } from '~/utils/portfolioSlug';

const route = useRoute();
const slug = route.params.slug as string;
const pageSlug = route.params.page as string;

provide(portfolioSlugKey, slug);

definePageMeta({ layout: false });

const {
  portfolioMode,
  cssVars,
  googleFontsUrl,
  navLinks,
  headerBlock,
  footerBlock,
  baseURL,
  activeLogo,
} = usePortfolio(slug);

// Await these directly so portfolio and pages are settled before the 404 guards below.
// useAsyncData deduplicates by key — usePortfolio's fetches are reused, not duplicated.
const [{ data: portfolioAwaitedData, error: portfolioAwaitedError }, { data: pagesAwaitedData }] =
  await Promise.all([
    useAsyncData(`portfolio-${slug}`, () =>
      $fetch<{ portfolio: Record<string, unknown> }>(`/api/portfolios/${slug}`, { baseURL }),
    ),
    useAsyncData(`portfolio-${slug}-pages`, () =>
      $fetch<{ pages: Page[] }>(`/api/portfolios/${slug}/pages`, { baseURL }),
    ),
  ]);

const { contentBlocks } = usePageBlocks(slug, pageSlug);

const headerContent = computed(
  () => headerBlock.value?.content as Record<string, unknown> | undefined,
);
const footerContent = computed(
  () => footerBlock.value?.content as Record<string, unknown> | undefined,
);

const canonicalUrl = `${useRequestURL().origin}/p/${slug}/${pageSlug}`;

if (portfolioAwaitedError.value || !portfolioAwaitedData.value?.portfolio) {
  throw createError({ statusCode: 404, statusMessage: 'Portfolio not found' });
}

const currentPage = (pagesAwaitedData.value?.pages ?? []).find(p => p.slug === pageSlug) ?? null;

if (!currentPage) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' });
}

const p = portfolioAwaitedData.value!.portfolio;
const portfolioSeoMeta = p.seoMeta as { seoTitle?: string; seoDescription?: string } | null;

useSeoMeta({
  title:
    currentPage.seoTitle ||
    currentPage.title ||
    portfolioSeoMeta?.seoTitle ||
    (p.title as string) ||
    'Portfolio',
  ogTitle:
    currentPage.seoTitle ||
    currentPage.title ||
    portfolioSeoMeta?.seoTitle ||
    (p.title as string) ||
    'Portfolio',
  description:
    currentPage.seoDescription ||
    portfolioSeoMeta?.seoDescription ||
    (p.description as string) ||
    undefined,
  ogDescription:
    currentPage.seoDescription ||
    portfolioSeoMeta?.seoDescription ||
    (p.description as string) ||
    undefined,
  ogImage: currentPage.seoOgImageUrl || (p.ogImageUrl as string) || undefined,
  ogUrl: canonicalUrl,
});

useHead({
  link: [{ rel: 'sitemap', type: 'application/xml', href: `/p/${slug}/sitemap.xml` }],
});
</script>

<template>
  <PortfolioLayout
    :css-vars="cssVars"
    :portfolio-mode="portfolioMode"
    :site-name="(p.title as string) || (p.slug as string) || ''"
    :home-url="`/p/${slug}`"
    :nav-links="navLinks"
    :header-content="headerContent"
    :footer-content="footerContent"
    :google-fonts-url="googleFontsUrl"
    :logo-url="activeLogo"
  >
    <BlocksRenderer v-for="block in contentBlocks" :key="block.id" :block="block" />
  </PortfolioLayout>
</template>
