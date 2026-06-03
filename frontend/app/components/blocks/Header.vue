<script setup lang="ts">
export interface NavLink {
  label: string;
  url: string;
}

export interface CtaButton {
  id: string;
  label: string;
  url: string;
  style?: 'filled' | 'outline' | 'ghost';
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

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

export interface HeaderBlockProps {
  siteName?: string;
  homeUrl?: string;
  navLinks?: NavLink[];
  // Legacy single CTA kept for backwards compat, new is ctaButtons list
  cta?: { label: string; url: string; style?: string } | null;
  ctaButtons?: CtaButton[];
  socialLinks?: SocialLink[];
  showColorModeToggle?: boolean;
  logoUrl?: string | null;
  brandingDisplay?: 'logo-only' | 'title-only' | 'logo-and-title';
  layout?: 'left-nav' | 'centered-logo' | 'centered-nav';
  background?: string | null;
  textColor?: string | null;
  navStyle?: 'plain' | 'underline' | 'pill' | 'block';
  height?: 'compact' | 'normal' | 'tall';
}

const props = withDefaults(defineProps<HeaderBlockProps>(), {
  siteName: '',
  homeUrl: '/',
  navLinks: () => [],
  cta: null,
  ctaButtons: () => [],
  socialLinks: () => [],
  showColorModeToggle: false,
  logoUrl: null,
  brandingDisplay: 'logo-and-title',
  layout: 'left-nav',
  background: null,
  textColor: null,
  navStyle: 'plain',
  height: 'normal',
});

const { resolveColor } = useActivePalette();

const paddingClass = computed(() => {
  if (props.height === 'compact') return 'py-2';
  if (props.height === 'tall') return 'py-6';
  return 'py-4';
});

const bgColor = computed(() => (props.background ? resolveColor(props.background) : null));

const bgStyle = computed(() =>
  bgColor.value ? { backgroundColor: bgColor.value } : { backgroundColor: 'var(--bg-nav)' },
);

// Auto-detect readable text color from the resolved background hex,
// falling back to the theme's text variables when no custom bg is set.
function hexLuminance(hex: string): number {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

const autoTextColor = computed(() => {
  if (props.textColor) return `var(--palette-${props.textColor})`;
  const bg = bgColor.value;
  if (!bg || !bg.startsWith('#')) return null;
  return hexLuminance(bg) > 0.179 ? '#1a1a1a' : '#ffffff';
});

const textStyle = computed(() =>
  autoTextColor.value ? { color: autoTextColor.value } : { color: 'var(--text-primary)' },
);
const mutedTextStyle = computed(() =>
  autoTextColor.value
    ? { color: autoTextColor.value, opacity: '0.7' }
    : { color: 'var(--text-secondary)' },
);

const navLinkClass = computed(() => {
  if (props.navStyle === 'underline') return 'hover:underline underline-offset-4 transition-all';
  if (props.navStyle === 'pill')
    return 'px-3 py-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors';
  if (props.navStyle === 'block')
    return 'px-3 py-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors';
  return 'hover:opacity-70 transition-opacity';
});

// Merge legacy single cta with ctaButtons list for backwards compat
const resolvedCtaButtons = computed<CtaButton[]>(() => {
  if (props.ctaButtons && props.ctaButtons.length > 0) return props.ctaButtons;
  if (props.cta)
    return [
      {
        id: 'legacy',
        label: props.cta.label,
        url: props.cta.url,
        style: (props.cta.style as CtaButton['style']) ?? 'filled',
      },
    ];
  return [];
});

function ctaButtonStyle(style?: string) {
  if (style === 'outline')
    return { border: '1.5px solid currentColor', backgroundColor: 'transparent' };
  if (style === 'ghost') return { backgroundColor: 'transparent' };
  return { backgroundColor: 'var(--primary)', color: '#fff' };
}

function ctaButtonClass(style?: string) {
  return style === 'filled'
    ? 'px-4 py-1.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90'
    : 'px-4 py-1.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-70';
}

const showLogo = computed(() => props.logoUrl && props.brandingDisplay !== 'title-only');
const showTitle = computed(() => props.brandingDisplay !== 'logo-only');
</script>

<template>
  <header
    class="sticky top-0 z-10 border-b px-8"
    :class="paddingClass"
    :style="{
      ...bgStyle,
      borderColor: 'color-mix(in srgb, var(--text-primary) 12%, transparent)',
    }"
  >
    <!-- Shared sub-components as named slots via reusable fragments -->

    <!-- ① left-nav: [logo/name] [nav] ··· [cta + socials + toggle] -->
    <div v-if="layout === 'left-nav'" class="flex items-center justify-between gap-6">
      <div class="flex items-center gap-8 min-w-0">
        <!-- Branding -->
        <a :href="homeUrl" class="flex items-center gap-2.5 shrink-0">
          <img v-if="showLogo" :src="logoUrl!" :alt="siteName" class="h-9 w-auto max-w-36" />
          <span
            v-if="showTitle && siteName"
            class="font-bold text-lg leading-none"
            :style="textStyle"
            >{{ siteName }}</span
          >
        </a>
        <!-- Nav -->
        <nav v-if="navLinks.length" class="flex gap-1 text-sm" :style="mutedTextStyle">
          <a v-for="link in navLinks" :key="link.url" :href="link.url" :class="navLinkClass">{{
            link.label
          }}</a>
        </nav>
      </div>
      <!-- Right -->
      <div class="flex items-center gap-3 shrink-0">
        <div v-if="socialLinks.length" class="flex items-center gap-2">
          <a
            v-for="s in socialLinks"
            :key="s.id"
            :href="s.url"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:opacity-70 transition-opacity"
            :style="mutedTextStyle"
          >
            <UIcon :name="SOCIAL_ICONS[s.platform] ?? 'i-lucide-link'" class="size-4" />
          </a>
        </div>
        <a
          v-for="btn in resolvedCtaButtons"
          :key="btn.id"
          :href="btn.url"
          :class="ctaButtonClass(btn.style)"
          :style="ctaButtonStyle(btn.style)"
          >{{ btn.label }}</a
        >
        <UColorModeButton v-if="showColorModeToggle" />
      </div>
    </div>

    <!-- ② centered-logo: [nav left] ··· [logo/name] ··· [nav right + extras] -->
    <div v-else-if="layout === 'centered-logo'" class="flex items-center justify-between gap-6">
      <!-- Left nav half -->
      <nav v-if="navLinks.length" class="flex gap-1 text-sm flex-1" :style="mutedTextStyle">
        <a
          v-for="link in navLinks.slice(0, Math.ceil(navLinks.length / 2))"
          :key="link.url"
          :href="link.url"
          :class="navLinkClass"
          >{{ link.label }}</a
        >
      </nav>
      <div v-else class="flex-1" />

      <!-- Center branding -->
      <a :href="homeUrl" class="flex items-center gap-2.5 shrink-0 px-4">
        <img v-if="showLogo" :src="logoUrl!" :alt="siteName" class="h-9 w-auto max-w-36" />
        <span
          v-if="showTitle && siteName"
          class="font-bold text-lg leading-none"
          :style="textStyle"
          >{{ siteName }}</span
        >
      </a>

      <!-- Right nav half + extras -->
      <div class="flex items-center gap-4 flex-1 justify-end">
        <nav v-if="navLinks.length" class="flex gap-1 text-sm" :style="mutedTextStyle">
          <a
            v-for="link in navLinks.slice(Math.ceil(navLinks.length / 2))"
            :key="link.url"
            :href="link.url"
            :class="navLinkClass"
            >{{ link.label }}</a
          >
        </nav>
        <div v-if="socialLinks.length" class="flex items-center gap-2">
          <a
            v-for="s in socialLinks"
            :key="s.id"
            :href="s.url"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:opacity-70 transition-opacity"
            :style="mutedTextStyle"
          >
            <UIcon :name="SOCIAL_ICONS[s.platform] ?? 'i-lucide-link'" class="size-4" />
          </a>
        </div>
        <a
          v-for="btn in resolvedCtaButtons"
          :key="btn.id"
          :href="btn.url"
          :class="ctaButtonClass(btn.style)"
          :style="ctaButtonStyle(btn.style)"
          >{{ btn.label }}</a
        >
        <UColorModeButton v-if="showColorModeToggle" />
      </div>
    </div>

    <!-- ③ centered-nav: [logo/name] ··· [nav centered] ··· [extras] -->
    <div v-else-if="layout === 'centered-nav'" class="flex items-center justify-between gap-6">
      <!-- Left branding -->
      <a :href="homeUrl" class="flex items-center gap-2.5 shrink-0 flex-1">
        <img v-if="showLogo" :src="logoUrl!" :alt="siteName" class="h-9 w-auto max-w-36" />
        <span
          v-if="showTitle && siteName"
          class="font-bold text-lg leading-none"
          :style="textStyle"
          >{{ siteName }}</span
        >
      </a>

      <!-- Center nav -->
      <nav v-if="navLinks.length" class="flex gap-1 text-sm" :style="mutedTextStyle">
        <a v-for="link in navLinks" :key="link.url" :href="link.url" :class="navLinkClass">{{
          link.label
        }}</a>
      </nav>
      <div v-else class="flex-1" />

      <!-- Right extras -->
      <div class="flex items-center gap-3 flex-1 justify-end">
        <div v-if="socialLinks.length" class="flex items-center gap-2">
          <a
            v-for="s in socialLinks"
            :key="s.id"
            :href="s.url"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:opacity-70 transition-opacity"
            :style="mutedTextStyle"
          >
            <UIcon :name="SOCIAL_ICONS[s.platform] ?? 'i-lucide-link'" class="size-4" />
          </a>
        </div>
        <a
          v-for="btn in resolvedCtaButtons"
          :key="btn.id"
          :href="btn.url"
          :class="ctaButtonClass(btn.style)"
          :style="ctaButtonStyle(btn.style)"
          >{{ btn.label }}</a
        >
        <UColorModeButton v-if="showColorModeToggle" />
      </div>
    </div>
  </header>
</template>
