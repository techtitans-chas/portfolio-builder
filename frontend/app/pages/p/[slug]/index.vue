<script setup lang="ts">
import { portfolioSlugKey } from '~/utils/portfolioSlug';

const route = useRoute();
const slug = route.params.slug as string;

provide(portfolioSlugKey, slug);

definePageMeta({ layout: false });

const {
  portfolio,
  portfolioError,
  portfolioMode,
  cssVars,
  googleFontsUrl,
  navLinks,
  headerBlock,
  footerBlock,
  baseURL,
  logoLight,
  logoDark,
} = usePortfolio(slug);

// Await the portfolio fetch so the 404 guard below has settled data on SSR
await useAsyncData(`portfolio-${slug}`, () =>
  $fetch<{ portfolio: Record<string, unknown> }>(`/api/portfolios/${slug}`, { baseURL }),
);

const { contentBlocks } = usePageBlocks(slug, 'home');

const headerContent = computed(
  () => headerBlock.value?.content as Record<string, unknown> | undefined,
);
const footerContent = computed(
  () => footerBlock.value?.content as Record<string, unknown> | undefined,
);

if (portfolioError.value || !portfolio.value) {
  throw createError({ statusCode: 404, statusMessage: 'Portfolio not found' });
}

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

useHead({
  link: [{ rel: 'sitemap', type: 'application/xml', href: `/p/${slug}/sitemap.xml` }],
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
    :google-fonts-url="googleFontsUrl"
    :logo-url="logoLight"
    :logo-url-dark="logoDark"
  >
    <BlocksRenderer v-for="block in contentBlocks" :key="block.id" :block="block" />
  </PortfolioLayout>
</template>
