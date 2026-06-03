<script setup lang="ts">
import type { WidgetType, NavLink, CtaButton, SocialLink } from './Header.vue';

const SOCIAL_ICONS: Record<string, string> = {
  twitter: 'i-simple-icons-x',
  instagram: 'i-simple-icons-instagram',
  linkedin: 'i-simple-icons-linkedin',
  github: 'i-simple-icons-github',
  youtube: 'i-simple-icons-youtube',
  tiktok: 'i-simple-icons-tiktok',
  facebook: 'i-simple-icons-facebook',
  dribbble: 'i-simple-icons-dribbble',
  behance: 'i-simple-icons-behance',
};

defineProps<{
  widget: WidgetType;
  inEditor: boolean;

  showLogoImg: boolean | null;
  logoUrl: string | null;
  siteName: string;
  showTitle: boolean;
  homeUrl: string;
  logoFilterStyle: Record<string, string>;
  textStyle: Record<string, string>;

  navLinks: NavLink[];
  navLinkClass: string;
  mutedTextStyle: Record<string, string>;

  resolvedCtaButtons: CtaButton[];
  ctaButtonClass: (style?: string) => string;
  ctaButtonStyle: (style?: string) => Record<string, string>;

  socialLinks: SocialLink[];
  showColorModeToggle: boolean;
}>();

// Disable auto-inheritAttrs so we control where attrs land
defineOptions({ inheritAttrs: false });
</script>

<template>
  <div
    v-bind="$attrs"
    :data-widget="widget"
    class="flex items-center shrink-0"
    :class="inEditor ? 'cursor-grab active:cursor-grabbing select-none' : ''"
    :draggable="inEditor ? 'true' : 'false'"
  >
    <!-- Logo widget -->
    <a
      v-if="widget === 'logo'"
      :href="inEditor ? undefined : homeUrl"
      class="flex items-center gap-2.5 shrink-0"
      :class="inEditor && 'pointer-events-none'"
    >
      <img
        v-if="showLogoImg"
        :src="logoUrl!"
        :alt="siteName"
        class="h-9 w-auto max-w-36"
        :style="logoFilterStyle"
      />
      <span
        v-if="showTitle && siteName"
        class="font-bold text-lg leading-none"
        :style="textStyle"
      >{{ siteName }}</span>
    </a>

    <!-- Nav widget -->
    <nav
      v-else-if="widget === 'nav' && navLinks.length"
      class="flex gap-1 text-sm"
      :class="inEditor && 'pointer-events-none'"
      :style="mutedTextStyle"
    >
      <a
        v-for="link in navLinks"
        :key="link.url"
        :href="inEditor ? undefined : link.url"
        :class="navLinkClass"
      >{{ link.label }}</a>
    </nav>

    <!-- CTA widget -->
    <div
      v-else-if="widget === 'cta' && resolvedCtaButtons.length"
      class="flex items-center gap-2"
      :class="inEditor && 'pointer-events-none'"
    >
      <a
        v-for="btn in resolvedCtaButtons"
        :key="btn.id"
        :href="inEditor ? undefined : btn.url"
        :class="ctaButtonClass(btn.style)"
        :style="ctaButtonStyle(btn.style)"
      >{{ btn.label }}</a>
    </div>

    <!-- Socials widget -->
    <div
      v-else-if="widget === 'socials' && socialLinks.length"
      class="flex items-center gap-2"
      :class="inEditor && 'pointer-events-none'"
      :style="mutedTextStyle"
    >
      <a
        v-for="s in socialLinks"
        :key="s.id"
        :href="inEditor ? undefined : s.url"
        :target="inEditor ? undefined : '_blank'"
        rel="noopener noreferrer"
        class="hover:opacity-70 transition-opacity"
      >
        <UIcon :name="SOCIAL_ICONS[s.platform] ?? 'i-lucide-link'" class="size-4" />
      </a>
    </div>

    <!-- Color mode toggle widget -->
    <div
      v-else-if="widget === 'toggle' && showColorModeToggle"
      :class="inEditor && 'pointer-events-none'"
    >
      <UColorModeButton />
    </div>
  </div>
</template>
