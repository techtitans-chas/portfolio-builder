<script setup lang="ts">
import { sanitizeHtml } from '~/utils/sanitize';
import type { ButtonStyleValue } from '~/config/blocks/types';
import { hexToRgba } from '~/composables/useBlockColors';

export interface HeroBlockProps {
  heading?: string;
  showSubheading?: boolean;
  subheading?: string;
  alignH?: 'left' | 'center' | 'right';
  alignV?: 'top' | 'center' | 'bottom';
  showButton1?: boolean;
  button1Label?: string;
  button1Url?: string;
  button1Style?: ButtonStyleValue | null;
  showButton2?: boolean;
  button2Label?: string;
  button2Url?: string;
  button2Style?: ButtonStyleValue | null;
  image?: string | null;
  imagePosition?: 'left' | 'right' | 'above' | 'below';
  imageSize?: 'sm' | 'md' | 'lg' | 'xl';
  imageRadius?: number;
  imageAspect?: 'auto' | 'square' | 'portrait' | 'video';
  headingFont?: string | null;
  background?: string | null;
  surfaceColor?: string | null;
  backgroundImage?: string | null;
  backgroundOpacity?: number;
  backgroundFixed?: boolean;
  overlayEnabled?: boolean;
  overlayType?: 'solid' | 'gradient';
  overlayColor?: string | null;
  overlayColor2?: string | null;
  overlayDegree?: number;
  overlayOpacity?: number;
  textShadow?: boolean;
  fullHeight?: boolean;
  height?: number;
  padding?: number;
  maxWidth?: 'sm' | 'md' | 'lg' | 'full';
}

const B1_DEFAULTS: ButtonStyleValue = {
  variant: 'solid',
  radius: 'md',
  size: 'md',
  spacing: 4,
  uppercase: false,
  letterSpacing: 0,
};
const B2_DEFAULTS: ButtonStyleValue = {
  variant: 'outline',
  radius: 'md',
  size: 'md',
  spacing: 4,
  uppercase: false,
  letterSpacing: 0,
};

const props = withDefaults(defineProps<HeroBlockProps>(), {
  heading: '',
  showSubheading: true,
  subheading: '',
  alignH: 'center',
  alignV: 'center',
  showButton1: true,
  button1Label: 'View my work',
  button1Url: '#projects',
  button1Style: null,
  showButton2: true,
  button2Label: 'Get in touch',
  button2Url: '#contact',
  button2Style: null,
  image: null,
  imagePosition: 'right',
  imageSize: 'md',
  imageRadius: 12,
  imageAspect: 'auto',
  headingFont: null,
  background: null,
  surfaceColor: null,
  backgroundImage: null,
  backgroundOpacity: 100,
  backgroundFixed: false,
  overlayEnabled: false,
  overlayType: 'solid',
  overlayColor: null,
  overlayColor2: null,
  overlayDegree: 180,
  overlayOpacity: 40,
  textShadow: false,
  fullHeight: false,
  height: 500,
  padding: 48,
  maxWidth: 'md',
});

const { resolveColor, resolveTextColor, resolvePrimary, resolveSecondary } = useActivePalette();

const bgHex = computed(() => (props.background ? resolveColor(props.background) : null));
const autoTextColor = computed(() =>
  props.background ? resolveTextColor(props.background) : null,
);
const hasBackgroundImage = computed(() => !!props.backgroundImage);

// Text colors always derived from background color; CSS vars as fallback.
const headingColor = computed(() => autoTextColor.value ?? 'var(--text-primary)');
const subheadingColor = computed(() => autoTextColor.value ?? 'var(--text-secondary)');

// Text shadow: contrast-aware — dark shadow on light text, light shadow on dark text.
const textShadowColor = computed(() => {
  const c = autoTextColor.value;
  if (!c || !c.startsWith('#')) return 'rgba(0,0,0,0.6)';
  const h = c.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const lin = (x: number) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
  const lum = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return lum > 0.5 ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.55)';
});

// Overlay: resolves palette colors, works over both bg-image and bg-color
const overlayColorHex = computed(() =>
  props.overlayColor ? resolveColor(props.overlayColor) : null,
);
const overlayColor2Hex = computed(() =>
  props.overlayColor2 ? resolveColor(props.overlayColor2) : null,
);

const overlayStyle = computed(() => {
  if (!props.overlayEnabled) return null;
  const opacity = (props.overlayOpacity ?? 40) / 100;
  const c1 = hexToRgba(overlayColorHex.value ?? '#000000', opacity);
  const bg =
    props.overlayType === 'gradient'
      ? `linear-gradient(${props.overlayDegree ?? 180}deg, ${c1}, ${hexToRgba(overlayColor2Hex.value ?? '#000000', opacity)})`
      : c1;
  return { background: bg };
});

const sectionStyle = computed(() => ({
  minHeight: props.fullHeight ? '100vh' : `${props.height}px`,
  paddingTop: `${props.padding}px`,
  paddingBottom: `${props.padding}px`,
  ...(bgHex.value ? { backgroundColor: bgHex.value } : {}),
  // When fixed/parallax is on, bg image must be applied as CSS background-image (position:fixed on <img> breaks layout)
  ...(hasBackgroundImage.value && props.backgroundFixed
    ? {
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        opacity: undefined,
      }
    : {}),
}));

const bgImageStyle = computed(() => ({
  opacity: (props.backgroundOpacity ?? 100) / 100,
}));

const maxWidthClass = computed(() => {
  if (props.maxWidth === 'sm') return 'max-w-xl';
  if (props.maxWidth === 'lg') return 'max-w-5xl';
  if (props.maxWidth === 'full') return 'max-w-none';
  return 'max-w-3xl';
});

const textAlignClass = computed(() => {
  if (props.alignH === 'left') return 'items-start text-left';
  if (props.alignH === 'right') return 'items-end text-right';
  return 'items-center text-center';
});

const justifyHClass = computed(() => {
  if (props.alignH === 'left') return 'justify-start';
  if (props.alignH === 'right') return 'justify-end';
  return 'justify-center';
});

// Vertical alignment: applied to the inner flex container that fills the section height
const justifyVClass = computed(() => {
  if (props.alignV === 'top') return 'justify-start';
  if (props.alignV === 'bottom') return 'justify-end';
  return 'justify-center';
});

const hasImage = computed(() => !!props.image);
const isVerticalImage = computed(
  () => props.imagePosition === 'above' || props.imagePosition === 'below',
);
const contentLayout = computed(() => {
  if (!hasImage.value) return 'flex-col';
  return isVerticalImage.value ? 'flex-col' : 'flex-row gap-12';
});
const imageOrderClass = computed(() => {
  if (props.imagePosition === 'left' || props.imagePosition === 'above') return 'order-first';
  return 'order-last';
});

const imageSizeClass = computed(() => {
  if (isVerticalImage.value) {
    const map = { sm: 'max-w-xs', md: 'max-w-sm', lg: 'max-w-lg', xl: 'max-w-2xl' };
    return map[props.imageSize ?? 'md'];
  }
  const map = { sm: 'sm:max-w-[200px]', md: 'sm:max-w-xs', lg: 'sm:max-w-sm', xl: 'sm:max-w-md' };
  return map[props.imageSize ?? 'md'];
});

const imageAspectClass = computed(() => {
  const map = {
    auto: '',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    video: 'aspect-video',
  };
  return map[props.imageAspect ?? 'auto'];
});

const imageRadiusStyle = computed(() => ({ borderRadius: `${props.imageRadius ?? 12}px` }));

const textShadowStyle = computed(() =>
  props.textShadow ? { textShadow: `0 1px 4px ${textShadowColor.value}` } : {},
);

// Button style helpers
function btnRadiusClass(radius: ButtonStyleValue['radius']): string {
  if (radius === 'none') return 'rounded-none';
  if (radius === 'sm') return 'rounded-sm';
  if (radius === 'lg') return 'rounded-lg';
  if (radius === 'full') return 'rounded-full';
  return 'rounded-md';
}

function btnSizeClass(size: ButtonStyleValue['size']): string {
  if (size === 'xs') return 'px-2 py-0.5 text-xs';
  if (size === 'md') return 'px-4 py-2 text-base';
  if (size === 'lg') return 'px-5 py-2.5 text-lg';
  return 'px-3 py-1.5 text-sm';
}

function btnTextStyle(style: ButtonStyleValue) {
  return {
    ...(style.uppercase ? { textTransform: 'uppercase' as const } : {}),
    ...(style.letterSpacing > 0
      ? { letterSpacing: `${(style.letterSpacing * 0.0625).toFixed(4)}em` }
      : {}),
  };
}

const bgPrimary = computed(() => resolvePrimary(props.background));
const bgSecondary = computed(() => resolveSecondary(props.background));

function btnStyle(bStyle: ButtonStyleValue, color: string): Record<string, string> {
  const text = btnTextStyle(bStyle);
  const luminance = (hex: string) => {
    const h = hex.replace('#', '');
    const r = parseInt(h.slice(0, 2), 16) / 255;
    const g = parseInt(h.slice(2, 4), 16) / 255;
    const b = parseInt(h.slice(4, 6), 16) / 255;
    const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  };
  const variant = bStyle.variant;
  if (variant === 'solid') {
    const contrast = color.startsWith('#') && luminance(color) > 0.179 ? '#1a1a1a' : '#ffffff';
    return { backgroundColor: color, color: contrast, ...text };
  }
  if (variant === 'soft') {
    return { backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`, color, ...text };
  }
  if (variant === 'outline') {
    if (hasBackgroundImage.value)
      return { border: '1px solid rgba(255,255,255,0.6)', color: '#ffffff', ...text };
    return { border: `1px solid ${color}`, color, backgroundColor: 'transparent', ...text };
  }
  if (variant === 'link') {
    return { color, textDecoration: 'underline', textUnderlineOffset: '4px', ...text };
  }
  return { color, backgroundColor: 'transparent', ...text };
}

const btn1Resolved = computed(() => ({ ...B1_DEFAULTS, ...props.button1Style }));
const btn2Resolved = computed(() => ({ ...B2_DEFAULTS, ...props.button2Style }));
const btn1Class = computed(
  () =>
    `font-medium transition-opacity hover:opacity-90 ${btnRadiusClass(btn1Resolved.value.radius)} ${btnSizeClass(btn1Resolved.value.size)}`,
);
const btn2Class = computed(
  () =>
    `font-medium transition-opacity hover:opacity-90 ${btnRadiusClass(btn2Resolved.value.radius)} ${btnSizeClass(btn2Resolved.value.size)}`,
);
const btn1StyleVal = computed(() => btnStyle(btn1Resolved.value, bgPrimary.value));
const btn2StyleVal = computed(() => btnStyle(btn2Resolved.value, bgSecondary.value));

const subheadingIsEmpty = computed(() => {
  const t = props.subheading?.trim() ?? '';
  return !t || t === '<p></p>';
});
</script>

<template>
  <section class="relative px-8 flex flex-col" :class="justifyVClass" :style="sectionStyle">
    <!-- Background image as absolute element so opacity is independent of content.
         When fixed/parallax is on, the image is applied via CSS background-image on the section instead. -->
    <img
      v-if="backgroundImage && !backgroundFixed"
      :src="backgroundImage"
      aria-hidden="true"
      class="absolute inset-0 w-full h-full object-cover pointer-events-none"
      :style="bgImageStyle"
    />

    <!-- Overlay: works over both background image and background color -->
    <div
      v-if="overlayEnabled && overlayStyle"
      class="absolute inset-0 pointer-events-none"
      :style="overlayStyle"
    />

    <!-- Content wrapper: relative so it sits above the overlay -->
    <div class="relative w-full mx-auto" :class="maxWidthClass">
      <div class="flex flex-wrap w-full" :class="[contentLayout, textAlignClass]">
        <!-- Text + buttons -->
        <div class="flex flex-col flex-1 min-w-0" :class="textAlignClass">
          <EditorInlineTextField
            field-key="heading"
            tag="h1"
            class="text-5xl font-bold leading-tight"
            :style="{
              color: headingColor,
              fontFamily: headingFont ?? undefined,
              ...textShadowStyle,
            }"
          >
            <h1
              class="text-5xl font-bold leading-tight"
              :style="{
                color: headingColor,
                fontFamily: headingFont ?? undefined,
                ...textShadowStyle,
              }"
            >
              {{ heading }}
            </h1>
          </EditorInlineTextField>

          <!-- Wrapper div carries the color so it's inherited by the tiptap editor (inheritAttrs: false) -->
          <div v-if="showSubheading" :style="{ color: subheadingColor, ...textShadowStyle }">
            <EditorInlineRichField
              field-key="subheading"
              placeholder="Your tagline"
              class="text-lg mt-4 max-w-xl rich-text"
            >
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div
                v-if="!subheadingIsEmpty"
                class="text-lg mt-4 max-w-xl rich-text"
                v-html="sanitizeHtml(subheading ?? '')"
              />
            </EditorInlineRichField>
          </div>

          <div
            v-if="showButton1 || showButton2"
            class="flex flex-wrap gap-3 mt-8"
            :class="justifyHClass"
          >
            <a v-if="showButton1" :href="button1Url" :class="btn1Class" :style="btn1StyleVal">
              <EditorInlineTextField field-key="button1Label" :data-placeholder="button1Label">
                {{ button1Label }}
              </EditorInlineTextField>
            </a>
            <a v-if="showButton2" :href="button2Url" :class="btn2Class" :style="btn2StyleVal">
              <EditorInlineTextField field-key="button2Label" :data-placeholder="button2Label">
                {{ button2Label }}
              </EditorInlineTextField>
            </a>
          </div>
        </div>

        <!-- Side image / above / below image -->
        <div
          v-if="image"
          :class="[
            imageOrderClass,
            imageSizeClass,
            isVerticalImage ? 'w-full mx-auto' : 'shrink-0 w-full sm:w-auto',
          ]"
        >
          <img
            :src="image"
            alt=""
            class="w-full object-cover"
            :class="imageAspectClass || 'h-auto'"
            :style="imageRadiusStyle"
          />
        </div>
      </div>
    </div>
  </section>
</template>
