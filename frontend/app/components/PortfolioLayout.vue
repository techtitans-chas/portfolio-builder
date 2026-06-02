<script setup lang="ts">
defineProps<{
  cssVars: Record<string, string>;
  portfolioMode: string;
  siteName: string;
  homeUrl: string;
  navLinks: { label: string; url: string }[];
  headerContent?: Record<string, unknown>;
  footerContent?: Record<string, unknown>;
}>();
</script>

<template>
  <div
    class="portfolio-root min-h-screen"
    :style="{ ...cssVars, backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }"
  >
    <BlocksHeader
      :site-name="(headerContent?.siteName as string) || siteName"
      :home-url="homeUrl"
      :nav-links="navLinks"
      :cta="(headerContent?.cta as { label: string; url: string } | null) ?? null"
      :show-color-mode-toggle="portfolioMode === 'both'"
    />

    <UMain>
      <slot />
    </UMain>

    <BlocksFooter
      :site-name="(footerContent?.siteName as string) || siteName"
      :links="navLinks"
      :copyright-text="(footerContent?.copyrightText as string) || ''"
    />
  </div>
</template>
