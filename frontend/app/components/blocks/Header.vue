<script setup lang="ts">
import { hexToFilter } from '~/utils/hexToFilter';
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
  leftOrder?: WidgetType[];
  centerOrder?: WidgetType[];
  rightOrder?: WidgetType[];
  topOrder?: WidgetType[];

  logoUrl?: string | null;
  logoTint?: string | null;
  logoDark?: boolean;
  brandingDisplay?: 'logo-only' | 'title-only' | 'logo-and-title';

  background?: string | null;
  textColor?: string | null;
  navStyle?: 'plain' | 'underline' | 'pill' | 'pill-filled' | 'block' | 'block-filled';
  height?: 'compact' | 'normal' | 'tall';

  showLogo?: boolean;
  showNav?: boolean;
  showCta?: boolean;
  showSocials?: boolean;

  isEditor?: boolean;
  onSlotReorder?: (slots: { leftOrder: WidgetType[]; centerOrder: WidgetType[]; rightOrder: WidgetType[]; topOrder: WidgetType[] }) => void;

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
  leftOrder: () => ['logo', 'nav'],
  centerOrder: () => [],
  rightOrder: () => ['cta'],
  topOrder: () => ['logo'],
  logoUrl: null,
  logoTint: null,
  logoDark: false,
  brandingDisplay: 'logo-and-title',
  background: null,
  textColor: null,
  navStyle: 'plain',
  height: 'normal',
  showLogo: true,
  showNav: true,
  showCta: true,
  showSocials: false,
  isEditor: false,
  onSlotReorder: undefined,
  cta: null,
});

const inlineEditor = inject(inlineEditorKey, null);
const inEditor = computed(() => props.isEditor || !!inlineEditor);

const { resolveColor } = useActivePalette();

// ── Styles ──────────────────────────────────────────────────────────────────

const paddingClass = computed(() => {
  if (props.height === 'compact') return 'py-2';
  if (props.height === 'tall') return 'py-6';
  return 'py-4';
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
const mutedTextStyle = computed<Record<string, string>>(() =>
  autoTextColor.value
    ? { color: autoTextColor.value, opacity: '0.7' }
    : { color: 'var(--text-secondary)', opacity: '1' },
);

const logoFilterStyle = computed<Record<string, string>>(() => {
  const invert = props.logoDark ? 'invert(1) ' : '';
  const base: Record<string, string> = invert ? { filter: invert.trim() } : {};
  if (!props.logoTint) return base;
  const hex = resolveColor(props.logoTint);
  if (!hex) return base;
  const filter = hexToFilter(hex);
  return filter ? { filter: invert + filter } : base;
});

const navLinkClass = computed(() => {
  switch (props.navStyle) {
    case 'underline':    return 'hover:underline underline-offset-4 transition-all';
    case 'pill':         return 'px-3 py-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors';
    case 'pill-filled':  return 'px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors';
    case 'block':        return 'px-3 py-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors';
    case 'block-filled': return 'px-3 py-1 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors';
    default:             return 'hover:opacity-70 transition-opacity';
  }
});

const showLogoImg = computed<boolean>(() => !!props.logoUrl && props.brandingDisplay !== 'title-only');
const showTitle   = computed(() => props.brandingDisplay !== 'logo-only');

const resolvedCtaButtons = computed<CtaButton[]>(() => {
  if (props.ctaButtons.length > 0) return props.ctaButtons;
  if (props.cta)
    return [{ id: 'legacy', label: props.cta.label, url: props.cta.url, style: (props.cta.style as CtaButton['style']) ?? 'filled' }];
  return [];
});

function ctaButtonStyle(style?: string): Record<string, string> {
  if (style === 'outline') return { border: '1.5px solid currentColor', backgroundColor: 'transparent', color: 'currentColor' };
  if (style === 'ghost') return { backgroundColor: 'transparent', color: 'var(--primary)', border: 'none' };
  return { backgroundColor: 'var(--primary)', color: '#fff', border: 'none' };
}
function ctaButtonClass(style?: string) {
  return 'px-4 py-1.5 rounded-lg text-sm font-medium transition-opacity ' +
    (style === 'filled' ? 'hover:opacity-90' : 'hover:opacity-70');
}

// ── Slot ordering ───────────────────────────────────────────────────────────

const slotOrders = computed(() => ({
  leftOrder:   props.leftOrder,
  centerOrder: props.centerOrder,
  rightOrder:  props.rightOrder,
  topOrder:    props.topOrder,
  layout:      props.layout ?? 'single',
}));

const slotVisibility = computed(() => ({
  showLogo:            props.showLogo ?? true,
  showNav:             props.showNav ?? true,
  showCta:             props.showCta ?? true,
  showSocials:         props.showSocials ?? false,
  showColorModeToggle: props.showColorModeToggle ?? false,
}));

const { zones, slotOrder, initSortable, destroySortables } =
  useHeaderSlots(slotOrders, slotVisibility, props.onSlotReorder);

defineExpose({ slotOrder });

// Zone element refs — SortableJS is attached to these
const zoneRefs = {
  top:    useTemplateRef<HTMLElement>('zone-top'),
  left:   useTemplateRef<HTMLElement>('zone-left'),
  center: useTemplateRef<HTMLElement>('zone-center'),
  right:  useTemplateRef<HTMLElement>('zone-right'),
};

// Init/destroy SortableJS when editor mode changes
watch(inEditor, (active) => {
  destroySortables();
  if (!active) return;
  nextTick(() => {
    for (const [zone, ref] of Object.entries(zoneRefs) as [keyof typeof zoneRefs, ReturnType<typeof useTemplateRef<HTMLElement>>][]) {
      if (ref.value) initSortable(ref.value, zone);
    }
  });
}, { immediate: true });

// Also reinit when layout changes (stacked ↔ single swaps the DOM)
watch(() => props.layout, () => {
  if (!inEditor.value) return;
  destroySortables();
  nextTick(() => {
    for (const [zone, ref] of Object.entries(zoneRefs) as [keyof typeof zoneRefs, ReturnType<typeof useTemplateRef<HTMLElement>>][]) {
      if (ref.value) initSortable(ref.value, zone);
    }
  });
});

onUnmounted(() => destroySortables());

// Shared widget props to avoid repetition in template
const widgetProps = computed(() => ({
  inEditor:            inEditor.value,
  showLogoImg:         showLogoImg.value,
  logoUrl:             props.logoUrl,
  siteName:            props.siteName,
  showTitle:           showTitle.value,
  homeUrl:             props.homeUrl,
  logoFilterStyle:     logoFilterStyle.value,
  textStyle:           textStyle.value,
  mutedTextStyle:      mutedTextStyle.value,
  navLinks:            props.navLinks,
  navLinkClass:        navLinkClass.value,
  resolvedCtaButtons:  resolvedCtaButtons.value,
  ctaButtonClass:      ctaButtonClass,
  ctaButtonStyle:      ctaButtonStyle,
  socialLinks:         props.socialLinks,
  showColorModeToggle: props.showColorModeToggle,
}));
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
    <!-- ── Stacked ── -->
    <template v-if="layout === 'stacked'">
      <div class="flex justify-center mb-2">
        <div
          ref="zone-top"
          class="flex items-center gap-3 min-h-9"
          :class="inEditor && 'outline-dashed outline-1 outline-black/10 rounded px-2 min-w-16'"
        >
          <HeaderWidget
            v-for="widget in zones.top" :key="widget" :widget="widget" v-bind="widgetProps"
          />
        </div>
      </div>
      <div class="grid items-center gap-4" style="grid-template-columns: 1fr auto 1fr">
        <div
          ref="zone-left"
          class="flex items-center gap-3 min-h-9"
          :class="inEditor && 'outline-dashed outline-1 outline-black/10 rounded px-2'"
        >
          <HeaderWidget
            v-for="widget in zones.left" :key="widget" :widget="widget" v-bind="widgetProps"
          />
        </div>
        <div
          ref="zone-center"
          class="flex items-center gap-3 justify-center min-h-9"
          :class="inEditor && 'outline-dashed outline-1 outline-black/10 rounded px-2 min-w-16'"
        >
          <HeaderWidget
            v-for="widget in zones.center" :key="widget" :widget="widget" v-bind="widgetProps"
          />
        </div>
        <div
          ref="zone-right"
          class="flex items-center gap-3 justify-end min-h-9"
          :class="inEditor && 'outline-dashed outline-1 outline-black/10 rounded px-2'"
        >
          <HeaderWidget
            v-for="widget in zones.right" :key="widget" :widget="widget" v-bind="widgetProps"
          />
        </div>
      </div>
    </template>

    <!-- ── Single row ── -->
    <div v-else class="grid items-center gap-4" style="grid-template-columns: 1fr auto 1fr">
      <div
        ref="zone-left"
        class="flex items-center gap-3 min-h-9"
        :class="inEditor && 'outline-dashed outline-1 outline-black/10 rounded px-2'"
      >
        <HeaderWidget
          v-for="widget in zones.left" :key="widget" :widget="widget" v-bind="widgetProps"
        />
      </div>
      <div
        ref="zone-center"
        class="flex items-center gap-3 justify-center min-h-9"
        :class="inEditor && 'outline-dashed outline-1 outline-black/10 rounded px-2 min-w-16'"
      >
        <HeaderWidget
          v-for="widget in zones.center" :key="widget" :widget="widget" v-bind="widgetProps"
        />
      </div>
      <div
        ref="zone-right"
        class="flex items-center gap-3 justify-end min-h-9"
        :class="inEditor && 'outline-dashed outline-1 outline-black/10 rounded px-2'"
      >
        <HeaderWidget
          v-for="widget in zones.right" :key="widget" :widget="widget" v-bind="widgetProps"
        />
      </div>
    </div>
  </header>
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
</style>
