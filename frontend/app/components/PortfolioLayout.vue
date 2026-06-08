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
  logoUrlDark?: string | null;
  onSlotReorder?: (slots: {
    leftOrder: WidgetType[];
    centerOrder: WidgetType[];
    rightOrder: WidgetType[];
    topOrder: WidgetType[];
  }) => void;
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
    class="portfolio-root @container min-h-screen"
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
      @click.capture="
        (e: MouseEvent) => {
          if (!(e.target as HTMLElement).closest('[data-drag-zone]')) {
            e.preventDefault();
            $emit('select-header');
          }
        }
      "
    >
      <BlocksHeader
        ref="headerBlock"
        v-bind="headerContent"
        :site-name="(headerContent?.siteName as string) || siteName"
        :home-url="homeUrl"
        :nav-links="navLinks"
        :logo-url="logoUrl"
        :logo-url-dark="logoUrlDark"
        :mobile-menu-bg="cssVars['--bg-mobile-menu'] ?? null"
        :show-color-mode-toggle="portfolioMode === 'both' && !!headerContent?.showColorModeToggle"
        :is-editor="true"
        :on-slot-reorder="onSlotReorder"
      />
    </div>

    <BlocksHeader
      v-else
      v-bind="headerContent"
      :site-name="(headerContent?.siteName as string) || siteName"
      :home-url="homeUrl"
      :nav-links="navLinks"
      :logo-url="logoUrl"
      :logo-url-dark="logoUrlDark"
      :mobile-menu-bg="cssVars['--bg-mobile-menu'] ?? null"
      :show-color-mode-toggle="portfolioMode === 'both' && !!headerContent?.showColorModeToggle"
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
        v-bind="footerContent"
        :site-name="(footerContent?.siteName as string) || siteName"
        :links="navLinks"
      />
    </div>
    <BlocksFooter
      v-else
      v-bind="footerContent"
      :site-name="(footerContent?.siteName as string) || siteName"
      :links="navLinks"
    />
  </div>
</template>
