<script setup lang="ts">
import { inlineEditorKey } from '~/utils/inlineEditor';
import HeaderWidget from './HeaderWidget.vue';

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

export type WidgetType = 'logo' | 'nav' | 'cta' | 'socials' | 'toggle';

export interface HeaderBlockProps {
  siteName?: string;
  homeUrl?: string;
  navLinks?: NavLink[];
  ctaButtons?: CtaButton[];
  socialLinks?: SocialLink[];
  showColorModeToggle?: boolean;

  layout?: 'single' | 'stacked';
  position?: 'static' | 'sticky';
  leftOrder?: WidgetType[];
  centerOrder?: WidgetType[];
  rightOrder?: WidgetType[];
  topOrder?: WidgetType[];

  logoUrl?: string | null;
  logoUrlDark?: string | null;
  logoSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  logoStacked?: boolean;
  brandingDisplay?: 'logo-only' | 'title-only' | 'logo-and-title';

  background?: string | null;
  textColor?: string | null;
  navVariant?: 'ghost' | 'soft' | 'solid' | 'outline' | 'link';
  navColor?: string | null;
  navRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  navSize?: 'xs' | 'sm' | 'md' | 'lg';
  navSpacing?: number;
  padding?: number;
  borderWidth?: number;
  maxWidth?: 'full' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

  showLogo?: boolean;
  showNav?: boolean;
  showCta?: boolean;
  showSocials?: boolean;

  mobileMenuTitle?: string;
  mobileMenuBg?: string | null;

  isEditor?: boolean;
  onSlotReorder?: (slots: {
    leftOrder: WidgetType[];
    centerOrder: WidgetType[];
    rightOrder: WidgetType[];
    topOrder: WidgetType[];
  }) => void;

  cta?: { label: string; url: string; style?: string } | null;
}

const props = withDefaults(defineProps<HeaderBlockProps>(), {
  siteName: '',
  homeUrl: '/',
  navLinks: () => [],
  ctaButtons: () => [],
  socialLinks: () => [],
  showColorModeToggle: false,
  layout: 'single',
  position: 'static',
  leftOrder: () => ['logo', 'nav'],
  centerOrder: () => [],
  rightOrder: () => ['cta'],
  topOrder: () => ['logo'],
  logoUrl: null,
  logoUrlDark: null,
  logoSize: 'md',
  logoStacked: false,
  brandingDisplay: 'logo-and-title',
  background: null,
  textColor: null,
  navVariant: 'ghost',
  navColor: null,
  navRadius: 'md',
  navSize: 'sm',
  navSpacing: 4,
  padding: 16,
  borderWidth: 1,
  maxWidth: '7xl',
  showLogo: true,
  showNav: true,
  showCta: true,
  showSocials: false,
  mobileMenuTitle: '',
  mobileMenuBg: null,
  isEditor: false,
  onSlotReorder: undefined,
  cta: null,
});

const inlineEditor = inject(inlineEditorKey, null);
const inEditor = computed(() => props.isEditor || !!inlineEditor);

const { resolveColor } = useActivePalette();

// ── Styles ──────────────────────────────────────────────────────────────────

const MIN_X_PADDING = 16;
const paddingStyle = computed(() => {
  const p = props.padding ?? 16;
  const x = Math.max(p, MIN_X_PADDING);
  return {
    paddingTop: `${p}px`,
    paddingBottom: `${p}px`,
    paddingLeft: `${x}px`,
    paddingRight: `${x}px`,
  };
});

const bgColor = computed(() => (props.background ? resolveColor(props.background) : null));
const bgStyle = computed(() =>
  bgColor.value ? { backgroundColor: bgColor.value } : { backgroundColor: 'var(--bg-nav)' },
);

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

const textStyle = computed<Record<string, string>>(() =>
  autoTextColor.value ? { color: autoTextColor.value } : { color: 'var(--text-primary)' },
);

const zoneOutlineColor = computed(() => {
  const auto = autoTextColor.value;
  if (auto === '#ffffff') return 'rgba(255,255,255,0.35)';
  if (auto === '#1a1a1a') return 'rgba(0,0,0,0.18)';
  return 'rgba(128,128,128,0.25)';
});

const mutedTextStyle = computed<Record<string, string>>(() =>
  autoTextColor.value
    ? { color: autoTextColor.value, opacity: '0.7' }
    : { color: 'var(--text-secondary)', opacity: '1' },
);

// ── Mobile menu background + contrast text ──────────────────────────────────

// mobileMenuBg is passed as a hex string from PortfolioLayout (resolved from --bg-mobile-menu)
const mobileMenuAutoTextColor = computed(() => {
  const hex = props.mobileMenuBg;
  if (!hex || !hex.startsWith('#')) return null;
  return hexLuminance(hex) > 0.179 ? '#1a1a1a' : '#ffffff';
});

const mobileMenuBgStyle = computed(() =>
  props.mobileMenuBg
    ? { backgroundColor: props.mobileMenuBg }
    : { backgroundColor: 'var(--bg-mobile-menu)' },
);

const mobileMenuTextStyle = computed<Record<string, string>>(() =>
  mobileMenuAutoTextColor.value
    ? { color: mobileMenuAutoTextColor.value }
    : { color: 'var(--text-primary)' },
);

const mobileMenuMutedStyle = computed<Record<string, string>>(() =>
  mobileMenuAutoTextColor.value
    ? { color: mobileMenuAutoTextColor.value, opacity: '0.7' }
    : { color: 'var(--text-secondary)', opacity: '1' },
);

// Logo height in px: stacked layout gets a bigger base size so text underneath looks balanced
const LOGO_HEIGHTS: Record<string, number> = { xs: 24, sm: 32, md: 40, lg: 52, xl: 68 };
const LOGO_HEIGHTS_STACKED: Record<string, number> = { xs: 40, sm: 56, md: 72, lg: 96, xl: 128 };
const logoHeightPx = computed(() => {
  const map = props.logoStacked ? LOGO_HEIGHTS_STACKED : LOGO_HEIGHTS;
  return map[props.logoSize ?? 'md'] ?? 40;
});
const logoSizeStyle = computed(() => ({ height: `${logoHeightPx.value}px`, width: 'auto' }));
const logoTitleSizeClass = computed(() => {
  const s = props.logoSize ?? 'md';
  if (s === 'xs') return 'text-sm';
  if (s === 'sm') return 'text-base';
  if (s === 'lg') return 'text-xl';
  if (s === 'xl') return 'text-2xl';
  return 'text-lg';
});

// Pick light or dark logo based on header background luminance
const resolvedLogoUrl = computed(() => {
  if (!props.logoUrlDark) return props.logoUrl ?? null;
  // autoTextColor is '#ffffff' on dark bg, '#1a1a1a' on light bg
  return autoTextColor.value === '#ffffff'
    ? props.logoUrlDark
    : (props.logoUrl ?? props.logoUrlDark);
});

const navColorResolved = computed(() => (props.navColor ? resolveColor(props.navColor) : null));

const navRadiusClass = computed(() => {
  const r = props.navRadius ?? 'md';
  if (r === 'none') return 'rounded-none';
  if (r === 'sm') return 'rounded-sm';
  if (r === 'lg') return 'rounded-lg';
  if (r === 'full') return 'rounded-full';
  return 'rounded-md';
});

// Size → font size + padding scale
const navSizeClass = computed(() => {
  const s = props.navSize ?? 'sm';
  if (s === 'xs') return { text: 'text-xs', pad: 'px-2 py-0.5' };
  if (s === 'md') return { text: 'text-base', pad: 'px-3 py-1.5' };
  if (s === 'lg') return { text: 'text-lg', pad: 'px-4 py-2' };
  return { text: 'text-sm', pad: 'px-2.5 py-1' };
});

// Nav link classes mirroring Nuxt UI button variants
const navLinkClass = computed(() => {
  const v = props.navVariant ?? 'ghost';
  const r = navRadiusClass.value;
  const { text, pad } = navSizeClass.value;
  const base = `nav-link ${text} ${pad} transition-colors ${r}`;
  if (v === 'solid') return `${base} font-medium`;
  if (v === 'soft') return `${base}`;
  if (v === 'outline') return `${base} border`;
  if (v === 'link')
    return `nav-link ${text} transition-opacity hover:opacity-70 underline-offset-4 hover:underline`;
  // ghost (default)
  return `${base} nav-link-ghost`;
});

const navGapStyle = computed(() => ({ gap: `${props.navSpacing ?? 4}px` }));

// Nav link inline styles — color-aware per variant
const navLinkStyle = computed((): Record<string, string> => {
  const v = props.navVariant ?? 'ghost';
  const color = navColorResolved.value;
  const text = autoTextColor.value ?? 'var(--text-primary)';

  if (v === 'solid') {
    const bg = color ?? 'var(--primary)';
    const textColor = bg.startsWith('#')
      ? hexLuminance(bg) > 0.179
        ? '#1a1a1a'
        : '#ffffff'
      : '#fff';
    return { backgroundColor: bg, color: textColor };
  }
  if (v === 'soft') {
    const bg = color ?? 'var(--primary)';
    return { backgroundColor: `color-mix(in srgb, ${bg} 15%, transparent)`, color: bg };
  }
  if (v === 'outline') {
    const c = color ?? text;
    return { borderColor: c, color: c };
  }
  if (v === 'link') {
    const c = color ?? text;
    return { color: c };
  }
  // ghost: set color, hover bg via CSS var
  const c = color ?? text;
  const hoverBg = color
    ? `color-mix(in srgb, ${color} 12%, transparent)`
    : 'color-mix(in srgb, currentColor 10%, transparent)';
  return { color: c, '--nav-ghost-hover': hoverBg } as Record<string, string>;
});

const MAX_WIDTH_CLASSES: Record<string, string> = {
  full: 'w-full',
  sm: 'max-w-sm mx-auto w-full',
  md: 'max-w-md mx-auto w-full',
  lg: 'max-w-lg mx-auto w-full',
  xl: 'max-w-xl mx-auto w-full',
  '2xl': 'max-w-2xl mx-auto w-full',
  '3xl': 'max-w-3xl mx-auto w-full',
  '4xl': 'max-w-4xl mx-auto w-full',
  '5xl': 'max-w-5xl mx-auto w-full',
  '6xl': 'max-w-6xl mx-auto w-full',
  '7xl': 'max-w-7xl mx-auto w-full',
};

const innerMaxWidthClass = computed(() => MAX_WIDTH_CLASSES[props.maxWidth ?? '7xl'] ?? 'w-full');

const borderStyle = computed(() => {
  const w = props.borderWidth ?? 1;
  if (w === 0) return { borderBottomWidth: '0px' };
  return {
    borderBottomWidth: `${w}px`,
    borderColor: 'color-mix(in srgb, var(--text-primary) 12%, transparent)',
  };
});

const showLogoImg = computed<boolean>(
  () => !!props.logoUrl && props.brandingDisplay !== 'title-only',
);
const showTitle = computed(() => props.brandingDisplay !== 'logo-only');

const resolvedCtaButtons = computed<CtaButton[]>(() => {
  if (props.ctaButtons.length > 0) return props.ctaButtons;
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

function ctaButtonStyle(style?: string): Record<string, string> {
  if (style === 'outline')
    return {
      border: '1.5px solid currentColor',
      backgroundColor: 'transparent',
      color: 'currentColor',
    };
  if (style === 'ghost')
    return { backgroundColor: 'transparent', color: 'var(--primary)', border: 'none' };
  return { backgroundColor: 'var(--primary)', color: '#fff', border: 'none' };
}
function ctaButtonClass(style?: string) {
  return (
    'px-4 py-1.5 rounded-lg text-sm font-medium transition-opacity ' +
    (style === 'filled' ? 'hover:opacity-90' : 'hover:opacity-70')
  );
}

// ── Slot ordering ───────────────────────────────────────────────────────────

const slotOrders = computed(() => ({
  leftOrder: props.leftOrder,
  centerOrder: props.centerOrder,
  rightOrder: props.rightOrder,
  topOrder: props.topOrder,
  layout: props.layout ?? 'single',
}));

const slotVisibility = computed(() => ({
  showLogo: props.showLogo ?? true,
  showNav: props.showNav ?? true,
  showCta: props.showCta ?? true,
  showSocials: props.showSocials ?? false,
  showColorModeToggle: props.showColorModeToggle ?? false,
}));

const { zones, slotOrder, initSortable, destroySortables } = useHeaderSlots(
  slotOrders,
  slotVisibility,
  props.onSlotReorder,
);

defineExpose({ slotOrder });

// Zone element refs — SortableJS is attached to these
const zoneRefs = {
  top: useTemplateRef<HTMLElement>('zone-top'),
  left: useTemplateRef<HTMLElement>('zone-left'),
  center: useTemplateRef<HTMLElement>('zone-center'),
  right: useTemplateRef<HTMLElement>('zone-right'),
};

// Init/destroy SortableJS when editor mode changes
watch(
  inEditor,
  active => {
    destroySortables();
    if (!active) return;
    nextTick(() => {
      for (const [zone, ref] of Object.entries(zoneRefs) as [
        keyof typeof zoneRefs,
        ReturnType<typeof useTemplateRef<HTMLElement>>,
      ][]) {
        if (ref.value) initSortable(ref.value, zone);
      }
    });
  },
  { immediate: true },
);

// Also reinit when layout changes (stacked ↔ single swaps the DOM)
watch(
  () => props.layout,
  () => {
    if (!inEditor.value) return;
    destroySortables();
    nextTick(() => {
      for (const [zone, ref] of Object.entries(zoneRefs) as [
        keyof typeof zoneRefs,
        ReturnType<typeof useTemplateRef<HTMLElement>>,
      ][]) {
        if (ref.value) initSortable(ref.value, zone);
      }
    });
  },
);

onUnmounted(() => destroySortables());

// ── Mobile menu ─────────────────────────────────────────────────────────────

const mobileMenuOpen = ref(false);
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

const hasMobileMenu = computed(
  () =>
    (props.showNav && props.navLinks.length > 0) ||
    (props.showCta && resolvedCtaButtons.value.length > 0) ||
    (props.showSocials && props.socialLinks.length > 0),
);

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

// Shared widget props to avoid repetition in template
const widgetProps = computed(() => ({
  inEditor: inEditor.value,
  showLogoImg: showLogoImg.value,
  logoUrl: resolvedLogoUrl.value,
  logoSizeStyle: logoSizeStyle.value,
  logoStacked: props.logoStacked ?? false,
  logoTitleSizeClass: logoTitleSizeClass.value,
  siteName: props.siteName,
  showTitle: showTitle.value,
  homeUrl: props.homeUrl,
  textStyle: textStyle.value,
  mutedTextStyle: mutedTextStyle.value,
  navLinks: props.navLinks,
  navLinkClass: navLinkClass.value,
  navLinkStyle: navLinkStyle.value,
  navVariant: props.navVariant ?? 'ghost',
  navGapStyle: navGapStyle.value,
  resolvedCtaButtons: resolvedCtaButtons.value,
  ctaButtonClass: ctaButtonClass,
  ctaButtonStyle: ctaButtonStyle,
  socialLinks: props.socialLinks,
  showColorModeToggle: props.showColorModeToggle,
}));
</script>

<template>
  <header
    :class="[position === 'sticky' ? 'sticky top-0 z-10 w-full' : 'relative']"
    :style="{ ...bgStyle, ...borderStyle, ...paddingStyle }"
  >
    <div :class="innerMaxWidthClass">
      <!-- ── Mobile layout (hidden on md+) ── -->
      <div class="flex items-center justify-between min-h-9 @4xl:hidden">
        <!-- Branding -->
        <a
          :href="inEditor ? undefined : homeUrl"
          class="flex shrink-0"
          :class="[
            props.logoStacked ? 'flex-col items-center gap-1.5' : 'flex-row items-center gap-2.5',
            inEditor && 'pointer-events-none',
          ]"
        >
          <img
            v-if="showLogoImg"
            :src="resolvedLogoUrl!"
            :alt="props.siteName"
            class="max-w-48 object-contain"
            style="height: 32px; width: auto"
          />
          <span
            v-if="showTitle && props.siteName"
            class="font-bold leading-none text-base"
            :style="textStyle"
            >{{ props.siteName }}</span
          >
        </a>

        <!-- Hamburger — only if there's something to show -->
        <button
          v-if="hasMobileMenu && !inEditor"
          class="flex items-center justify-center w-9 h-9 rounded-md transition-colors hover:bg-black/10"
          :style="textStyle"
          aria-label="Open menu"
          @click="mobileMenuOpen = true"
        >
          <UIcon name="i-lucide-menu" class="size-5" />
        </button>
        <!-- Editor placeholder so hamburger position is visible -->
        <div
          v-else-if="hasMobileMenu && inEditor"
          class="flex items-center justify-center w-9 h-9 rounded-md opacity-50"
          :style="textStyle"
        >
          <UIcon name="i-lucide-menu" class="size-5" />
        </div>
      </div>

      <!-- ── Desktop layout (hidden below md) ── -->
      <div class="hidden @4xl:block">
        <!-- Stacked -->
        <template v-if="layout === 'stacked'">
          <div class="flex justify-center mb-2">
            <div
              ref="zone-top"
              class="flex items-center gap-3 min-h-9"
              :class="inEditor && 'rounded px-2 min-w-16'"
              :style="inEditor ? { outline: `1px dashed ${zoneOutlineColor}` } : {}"
            >
              <HeaderWidget
                v-for="widget in zones.top"
                :key="widget"
                :widget="widget"
                v-bind="widgetProps"
              />
            </div>
          </div>
          <div class="grid items-center gap-4" style="grid-template-columns: 1fr auto 1fr">
            <div
              ref="zone-left"
              class="flex items-center gap-3 min-h-9"
              :class="inEditor && 'rounded px-2'"
              :style="inEditor ? { outline: `1px dashed ${zoneOutlineColor}` } : {}"
            >
              <HeaderWidget
                v-for="widget in zones.left"
                :key="widget"
                :widget="widget"
                v-bind="widgetProps"
              />
            </div>
            <div
              ref="zone-center"
              class="flex items-center gap-3 justify-center min-h-9"
              :class="inEditor && 'rounded px-2 min-w-16'"
              :style="inEditor ? { outline: `1px dashed ${zoneOutlineColor}` } : {}"
            >
              <HeaderWidget
                v-for="widget in zones.center"
                :key="widget"
                :widget="widget"
                v-bind="widgetProps"
              />
            </div>
            <div
              ref="zone-right"
              class="flex items-center gap-3 justify-end min-h-9"
              :class="inEditor && 'rounded px-2'"
              :style="inEditor ? { outline: `1px dashed ${zoneOutlineColor}` } : {}"
            >
              <HeaderWidget
                v-for="widget in zones.right"
                :key="widget"
                :widget="widget"
                v-bind="widgetProps"
              />
            </div>
          </div>
        </template>

        <!-- Single row -->
        <div v-else class="grid items-center gap-4" style="grid-template-columns: 1fr auto 1fr">
          <div
            ref="zone-left"
            class="flex items-center gap-3 min-h-9"
            :class="inEditor && 'rounded px-2'"
            :style="inEditor ? { outline: `1px dashed ${zoneOutlineColor}` } : {}"
          >
            <HeaderWidget
              v-for="widget in zones.left"
              :key="widget"
              :widget="widget"
              v-bind="widgetProps"
            />
          </div>
          <div
            ref="zone-center"
            class="flex items-center gap-3 justify-center min-h-9"
            :class="inEditor && 'rounded px-2 min-w-16'"
            :style="inEditor ? { outline: `1px dashed ${zoneOutlineColor}` } : {}"
          >
            <HeaderWidget
              v-for="widget in zones.center"
              :key="widget"
              :widget="widget"
              v-bind="widgetProps"
            />
          </div>
          <div
            ref="zone-right"
            class="flex items-center gap-3 justify-end min-h-9"
            :class="inEditor && 'rounded px-2'"
            :style="inEditor ? { outline: `1px dashed ${zoneOutlineColor}` } : {}"
          >
            <HeaderWidget
              v-for="widget in zones.right"
              :key="widget"
              :widget="widget"
              v-bind="widgetProps"
            />
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- ── Mobile slideover menu ── -->
  <USlideover v-if="isMounted" v-model:open="mobileMenuOpen" side="right" class="@4xl:hidden">
    <template #content>
      <div class="flex flex-col h-full overflow-y-auto" :style="mobileMenuBgStyle">
        <!-- Header row -->
        <div
          class="flex items-center justify-between px-4 py-3 border-b shrink-0"
          :style="{
            borderColor: mobileMenuAutoTextColor
              ? `color-mix(in srgb, ${mobileMenuAutoTextColor} 12%, transparent)`
              : 'var(--color-default-200)',
          }"
        >
          <span class="font-semibold text-sm" :style="mobileMenuTextStyle">
            {{ props.mobileMenuTitle || 'Menu' }}
          </span>
          <button
            class="flex items-center justify-center w-8 h-8 rounded-md transition-opacity hover:opacity-70"
            :style="mobileMenuTextStyle"
            aria-label="Close menu"
            @click="mobileMenuOpen = false"
          >
            <UIcon name="i-lucide-x" class="size-4" />
          </button>
        </div>

        <div class="flex flex-col gap-6 p-4 flex-1">
          <!-- Nav links + CTA buttons as plain links -->
          <nav
            v-if="
              (props.showNav && props.navLinks.length) ||
              (props.showCta && resolvedCtaButtons.length)
            "
            class="flex flex-col gap-1"
          >
            <a
              v-for="link in props.navLinks"
              v-show="props.showNav"
              :key="link.url"
              :href="link.url"
              class="px-3 py-2 rounded-md text-sm transition-opacity hover:opacity-70"
              :style="mobileMenuTextStyle"
              @click="mobileMenuOpen = false"
              >{{ link.label }}</a
            >
            <a
              v-for="btn in resolvedCtaButtons"
              v-show="props.showCta"
              :key="btn.id"
              :href="btn.url"
              class="px-3 py-2 rounded-md text-sm transition-opacity hover:opacity-70"
              :style="mobileMenuTextStyle"
              @click="mobileMenuOpen = false"
              >{{ btn.label }}</a
            >
          </nav>

          <!-- Social links -->
          <div v-if="props.showSocials && props.socialLinks.length" class="flex items-center gap-3">
            <a
              v-for="s in props.socialLinks"
              :key="s.id"
              :href="s.url"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:opacity-70 transition-opacity"
              :style="mobileMenuMutedStyle"
            >
              <UIcon :name="SOCIAL_ICONS[s.platform] ?? 'i-lucide-link'" class="size-5" />
            </a>
          </div>
        </div>
      </div>
    </template>
  </USlideover>
</template>

<style>
/* SortableJS ghost — the placeholder shown at the drop target */
.header-sortable-ghost {
  opacity: 0.3;
}
/* The element being dragged */
.header-sortable-drag {
  opacity: 0;
}
/* Ghost nav variant hover uses a CSS variable set per-link */
.nav-link-ghost:hover {
  background-color: var(--nav-ghost-hover, color-mix(in srgb, currentColor 10%, transparent));
}
</style>
