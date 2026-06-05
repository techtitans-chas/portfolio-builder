<script setup lang="ts">
import type { CollectionItem } from '@portfolio-builder/shared/types';
import { getCollectionType } from '@portfolio-builder/shared/types';
import { portfolioSlugKey } from '~/utils/portfolioSlug';

const route = useRoute();
const slug = route.params.slug as string;
const collectionType = route.params.collectionType as string;
const itemId = route.params.itemId as string;

provide(portfolioSlugKey, slug);

definePageMeta({ layout: false });

const typeDef = getCollectionType(collectionType);

if (!typeDef?.pageTemplate) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' });
}

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

const [{ error: portfolioAwaitedError }, { data: itemData, error: itemError }] = await Promise.all([
  useAsyncData(`portfolio-${slug}`, () =>
    $fetch<{ portfolio: Record<string, unknown> }>(`/api/portfolios/${slug}`, { baseURL }),
  ),
  useAsyncData(`portfolio-${slug}-${collectionType}-${itemId}`, () =>
    $fetch<{ item: CollectionItem }>(
      `/api/portfolios/${slug}/collections/${collectionType}/${itemId}`,
      { baseURL },
    ),
  ),
]);

if (portfolioAwaitedError.value || portfolioError.value || !portfolio.value) {
  throw createError({ statusCode: 404, statusMessage: 'Portfolio not found' });
}

if (itemError.value || !itemData.value?.item) {
  throw createError({ statusCode: 404, statusMessage: 'Item not found' });
}

const item = itemData.value.item;

const headerContent = computed(
  () => headerBlock.value?.content as Record<string, unknown> | undefined,
);
const footerContent = computed(
  () => footerBlock.value?.content as Record<string, unknown> | undefined,
);

const p = portfolio.value as Record<string, unknown>;
const portfolioSeoMeta = p.seoMeta as { seoTitle?: string; seoDescription?: string } | null;
const itemTitle = (item.data.title as string) || typeDef.label;

useSeoMeta({
  title: `${itemTitle} — ${(p.title as string) || portfolioSeoMeta?.seoTitle || 'Portfolio'}`,
  ogTitle: itemTitle,
  description: (item.data.description as string) || portfolioSeoMeta?.seoDescription || undefined,
  ogDescription: (item.data.description as string) || portfolioSeoMeta?.seoDescription || undefined,
  ogImage: (item.data.previewImageUrl as string) || (p.ogImageUrl as string) || undefined,
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
    :logo-url="logoLight"
    :logo-url-dark="logoDark"
  >
    <CollectionPagesProjectDetail v-if="typeDef.pageTemplate === 'ProjectDetail'" :item="item" />
    <CollectionPagesPostDetail v-else-if="typeDef.pageTemplate === 'PostDetail'" :item="item" />
  </PortfolioLayout>
</template>
