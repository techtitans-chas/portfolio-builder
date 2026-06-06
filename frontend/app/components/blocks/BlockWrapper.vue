<script setup lang="ts">
import { hexToRgba } from '~/composables/useBlockColors';
defineOptions({ inheritAttrs: false });

export interface BlockWrapperProps {
  background?: string | null;
  backgroundImage?: string | null;
  backgroundOpacity?: number;
  backgroundFixed?: boolean;
  overlayEnabled?: boolean;
  overlayType?: 'solid' | 'gradient';
  overlayColor?: string | null;
  overlayColor2?: string | null;
  overlayDegree?: number;
  overlayOpacity?: number;
  /** Extra classes applied to the <section> element (e.g. padding, layout) */
  class?: string;
}

const props = withDefaults(defineProps<BlockWrapperProps>(), {
  class: 'px-8 py-16',
  background: null,
  backgroundImage: null,
  backgroundOpacity: 100,
  backgroundFixed: false,
  overlayEnabled: false,
  overlayType: 'solid',
  overlayColor: null,
  overlayColor2: null,
  overlayDegree: 180,
  overlayOpacity: 40,
});

const { resolveColor } = useActivePalette();

const bgHex = computed(() => (props.background ? resolveColor(props.background) : null));
const hasBackgroundImage = computed(() => !!props.backgroundImage);

const sectionStyle = computed(() => ({
  ...(bgHex.value ? { backgroundColor: bgHex.value } : {}),
  // Fixed/parallax must use CSS background-image — position:fixed on <img> breaks layout
  ...(hasBackgroundImage.value && props.backgroundFixed
    ? {
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }
    : {}),
}));

const bgImageStyle = computed(() => ({
  opacity: (props.backgroundOpacity ?? 100) / 100,
}));

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

const sectionEl = useTemplateRef<HTMLElement>('sectionEl');
defineExpose({ el: sectionEl });
</script>

<template>
  <section ref="sectionEl" class="relative" :class="props.class" :style="sectionStyle">
    <!-- Background image: absolute layer with independent opacity. Not used in fixed/parallax mode. -->
    <img
      v-if="backgroundImage && !backgroundFixed"
      :src="backgroundImage"
      aria-hidden="true"
      class="absolute inset-0 w-full h-full object-cover pointer-events-none"
      :style="bgImageStyle"
    />

    <!-- Overlay: works over background image and background color -->
    <div
      v-if="overlayEnabled && overlayStyle"
      class="absolute inset-0 pointer-events-none"
      :style="overlayStyle"
    />

    <!-- Content: relative so it sits above image and overlay layers -->
    <div class="relative">
      <slot />
    </div>
  </section>
</template>
