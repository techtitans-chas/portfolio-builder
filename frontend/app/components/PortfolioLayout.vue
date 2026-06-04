<script setup lang="ts">
import type BlocksHeader from './blocks/Header.vue';
import type { WidgetType } from './blocks/Header.vue';

type HeaderInstance = InstanceType<typeof BlocksHeader>;

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
  onSlotReorder?: (slots: { leftOrder: WidgetType[]; centerOrder: WidgetType[]; rightOrder: WidgetType[]; topOrder: WidgetType[] }) => void;
}>();

const headerRef = useTemplateRef<HeaderInstance>('headerBlock');
defineExpose({ headerRef });

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
      class="relative after:absolute after:inset-0 after:pointer-events-none after:ring-2 after:ring-inset after:ring-transparent hover:after:ring-primary/60 after:transition-shadow after:duration-150"
      @click.capture="(e) => { if (!(e.target as HTMLElement).closest('[data-drag-zone]')) { e.preventDefault(); $emit('select-header'); } }"
    >
      <BlocksHeader
        ref="headerBlock"
        :site-name="(headerContent?.siteName as string) || siteName"
        :home-url="homeUrl"
        :nav-links="navLinks"
        :logo-url="logoUrl"
        :is-editor="true"
        :on-slot-reorder="onSlotReorder"
        :layout="(headerContent?.layout as any) || 'single'"
        :left-order="(headerContent?.leftOrder as any) || ['logo', 'nav']"
        :center-order="(headerContent?.centerOrder as any) || []"
        :right-order="(headerContent?.rightOrder as any) || ['cta']"
        :top-order="(headerContent?.topOrder as any) || ['logo']"
        :cta-buttons="(headerContent?.ctaButtons as any[]) ?? []"
        :social-links="(headerContent?.socialLinks as any[]) ?? []"
        :show-logo="headerContent?.showLogo !== false"
        :show-nav="headerContent?.showNav !== false"
        :show-cta="headerContent?.showCta !== false"
        :show-socials="!!(headerContent?.showSocials)"
        :show-color-mode-toggle="portfolioMode === 'both' && !!headerContent?.showColorModeToggle"
        :logo-size="(headerContent?.logoSize as any) || 'md'"
        :logo-stacked="!!(headerContent?.logoStacked)"
        :branding-display="(headerContent?.brandingDisplay as any) || 'logo-and-title'"
        :background="(headerContent?.background as string | null) ?? null"
        :text-color="(headerContent?.textColor as string | null) ?? null"
        :logo-tint="(headerContent?.logoTint as string | null) ?? null"
        :logo-dark="!!(headerContent?.logoDark)"
        :nav-variant="(headerContent?.navVariant as any) || 'ghost'"
        :nav-color="(headerContent?.navColor as string | null) ?? null"
        :nav-radius="(headerContent?.navRadius as any) || 'md'"
        :nav-size="(headerContent?.navSize as any) || 'sm'"
        :nav-spacing="(headerContent?.navSpacing as number) ?? 4"
        :padding="(headerContent?.padding as number) ?? 16"
        :border-width="(headerContent?.borderWidth as number) ?? 1"
        :max-width="(headerContent?.maxWidth as any) || '7xl'"
        :position="(headerContent?.position as any) || 'static'"
      />
    </div>

    <BlocksHeader
      v-else
      :site-name="(headerContent?.siteName as string) || siteName"
      :home-url="homeUrl"
      :nav-links="navLinks"
      :logo-url="logoUrl"
      :layout="(headerContent?.layout as any) || 'single'"
      :left-order="(headerContent?.leftOrder as any) || ['logo', 'nav']"
      :center-order="(headerContent?.centerOrder as any) || []"
      :right-order="(headerContent?.rightOrder as any) || ['cta']"
      :top-order="(headerContent?.topOrder as any) || ['logo']"
      :cta-buttons="(headerContent?.ctaButtons as any[]) ?? []"
      :social-links="(headerContent?.socialLinks as any[]) ?? []"
      :show-logo="headerContent?.showLogo !== false"
      :show-nav="headerContent?.showNav !== false"
      :show-cta="headerContent?.showCta !== false"
      :show-socials="!!(headerContent?.showSocials)"
      :show-color-mode-toggle="portfolioMode === 'both' && !!headerContent?.showColorModeToggle"
      :logo-size="(headerContent?.logoSize as any) || 'md'"
      :logo-stacked="!!(headerContent?.logoStacked)"
      :branding-display="(headerContent?.brandingDisplay as any) || 'logo-and-title'"
      :background="(headerContent?.background as string | null) ?? null"
      :text-color="(headerContent?.textColor as string | null) ?? null"
      :logo-tint="(headerContent?.logoTint as string | null) ?? null"
      :logo-dark="!!(headerContent?.logoDark)"
      :nav-variant="(headerContent?.navVariant as any) || 'ghost'"
      :nav-color="(headerContent?.navColor as string | null) ?? null"
      :nav-radius="(headerContent?.navRadius as any) || 'md'"
      :nav-size="(headerContent?.navSize as any) || 'sm'"
      :nav-spacing="(headerContent?.navSpacing as number) ?? 4"
      :padding="(headerContent?.padding as number) ?? 16"
      :border-width="(headerContent?.borderWidth as number) ?? 1"
      :max-width="(headerContent?.maxWidth as any) || '7xl'"
      :position="(headerContent?.position as any) || 'static'"
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
