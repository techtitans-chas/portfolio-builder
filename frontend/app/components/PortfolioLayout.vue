<script setup lang="ts">
const props = defineProps<{
  cssVars: Record<string, string>;
  portfolioMode: string;
  siteName: string;
  homeUrl: string;
  navLinks: { label: string; url: string }[];
  headerContent?: Record<string, unknown>;
  footerContent?: Record<string, unknown>;
  isEditor?: boolean;
  googleFontsUrl?: string | null;
  logoUrl?: string | null;
}>();

useHead(
  computed(() => ({
    link: props.googleFontsUrl ? [{ rel: 'stylesheet', href: props.googleFontsUrl }] : [],
  })),
);

defineEmits<{
  'select-header': [];
  'select-footer': [];
}>();
</script>

<template>
  <div
    class="portfolio-root min-h-screen"
    :style="{
      ...cssVars,
      backgroundColor: 'var(--bg-page)',
      color: 'var(--text-primary)',
      fontFamily: cssVars['--font-body'] ?? undefined,
    }"
  >
    <div
      v-if="isEditor"
      class="relative cursor-pointer after:absolute after:inset-0 after:pointer-events-none after:ring-2 after:ring-inset after:ring-transparent hover:after:ring-primary/60 after:transition-shadow after:duration-150"
      @click.capture.prevent="$emit('select-header')"
    >
      <BlocksHeader
        :site-name="(headerContent?.siteName as string) || siteName"
        :home-url="homeUrl"
        :nav-links="navLinks"
        :cta="(headerContent?.cta as { label: string; url: string; style?: string } | null) ?? null"
        :cta-buttons="(headerContent?.ctaButtons as any[]) ?? []"
        :social-links="(headerContent?.socialLinks as any[]) ?? []"
        :show-color-mode-toggle="portfolioMode === 'both' && !!headerContent?.showColorModeToggle"
        :logo-url="logoUrl"
        :branding-display="(headerContent?.brandingDisplay as any) || 'logo-and-title'"
        :layout="(headerContent?.layout as any) || 'left-nav'"
        :background="(headerContent?.background as string | null) ?? null"
        :text-color="(headerContent?.textColor as string | null) ?? null"
        :nav-style="(headerContent?.navStyle as any) || 'plain'"
        :height="(headerContent?.height as any) || 'normal'"
      />
    </div>

    <BlocksHeader
      v-else
      :site-name="(headerContent?.siteName as string) || siteName"
      :home-url="homeUrl"
      :nav-links="navLinks"
      :cta="(headerContent?.cta as { label: string; url: string; style?: string } | null) ?? null"
      :cta-buttons="(headerContent?.ctaButtons as any[]) ?? []"
      :social-links="(headerContent?.socialLinks as any[]) ?? []"
      :show-color-mode-toggle="portfolioMode === 'both' && !!headerContent?.showColorModeToggle"
      :logo-url="logoUrl"
      :branding-display="(headerContent?.brandingDisplay as any) || 'logo-and-title'"
      :layout="(headerContent?.layout as any) || 'left-nav'"
      :background="(headerContent?.background as string | null) ?? null"
      :text-color="(headerContent?.textColor as string | null) ?? null"
      :nav-style="(headerContent?.navStyle as any) || 'plain'"
      :height="(headerContent?.height as any) || 'normal'"
    />

    <UMain>
      <slot />
    </UMain>

    <div
      v-if="isEditor"
      class="relative cursor-pointer after:absolute after:inset-0 after:pointer-events-none after:ring-2 after:ring-inset after:ring-transparent hover:after:ring-primary/60 after:transition-shadow after:duration-150"
      @click.capture.prevent="$emit('select-footer')"
    >
      <BlocksFooter
        :site-name="(footerContent?.siteName as string) || siteName"
        :links="navLinks"
        :copyright-text="(footerContent?.copyrightText as string) || ''"
      />
    </div>
    <BlocksFooter
      v-else
      :site-name="(footerContent?.siteName as string) || siteName"
      :links="navLinks"
      :copyright-text="(footerContent?.copyrightText as string) || ''"
    />
  </div>
</template>
