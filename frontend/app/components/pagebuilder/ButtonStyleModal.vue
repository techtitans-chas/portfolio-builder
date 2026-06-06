<script setup lang="ts">
import { useActivePalette } from '~/composables/useActivePalette';

export interface ButtonStyleValue {
  variant: 'ghost' | 'soft' | 'solid' | 'outline' | 'link';
  radius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  size: 'xs' | 'sm' | 'md' | 'lg';
  spacing: number;
  uppercase: boolean;
  letterSpacing: number;
}

const props = defineProps<{
  open: boolean;
  modelValue: ButtonStyleValue;
  label?: string;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
  'update:modelValue': [value: ButtonStyleValue];
}>();

const local = ref<ButtonStyleValue>({ ...props.modelValue });

watch(
  () => props.modelValue,
  val => {
    local.value = { ...val };
  },
  { deep: true },
);

function update<K extends keyof ButtonStyleValue>(key: K, val: ButtonStyleValue[K]) {
  local.value = { ...local.value, [key]: val };
  emit('update:modelValue', { ...local.value });
}

const VARIANT_OPTIONS = [
  { label: 'Ghost', value: 'ghost' },
  { label: 'Soft', value: 'soft' },
  { label: 'Solid', value: 'solid' },
  { label: 'Outline', value: 'outline' },
  { label: 'Link', value: 'link' },
];

const RADIUS_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Full', value: 'full' },
];

const SIZE_OPTIONS = [
  { label: 'Extra small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
];

// ── Preview ──────────────────────────────────────────────────────────────────

const { resolvePrimary, resolveSecondary } = useActivePalette();
const primaryColor = computed(() => resolvePrimary(null));
const secondaryColor = computed(() => resolveSecondary(null));

function hexLuminance(hex: string): number {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

const radiusClass = computed(() => {
  const r = local.value.radius;
  if (r === 'none') return 'rounded-none';
  if (r === 'sm') return 'rounded-sm';
  if (r === 'lg') return 'rounded-lg';
  if (r === 'full') return 'rounded-full';
  return 'rounded-md';
});

const sizeClass = computed(() => {
  const s = local.value.size;
  if (s === 'xs') return { text: 'text-xs', pad: 'px-2 py-0.5' };
  if (s === 'md') return { text: 'text-base', pad: 'px-4 py-2' };
  if (s === 'lg') return { text: 'text-lg', pad: 'px-5 py-2.5' };
  return { text: 'text-sm', pad: 'px-3 py-1.5' };
});

const textTransformStyle = computed(() =>
  local.value.uppercase ? { textTransform: 'uppercase' as const } : {},
);

const letterSpacingStyle = computed(() =>
  local.value.letterSpacing > 0
    ? { letterSpacing: `${(local.value.letterSpacing * 0.0625).toFixed(4)}em` }
    : {},
);

const sharedTextStyle = computed(() => ({
  ...textTransformStyle.value,
  ...letterSpacingStyle.value,
}));

function previewClass(variant: string): string {
  const { text, pad } = sizeClass.value;
  const r = radiusClass.value;
  const base = `${pad} ${r} ${text} font-medium transition-opacity`;
  if (variant === 'solid') return `${base} hover:opacity-90`;
  if (variant === 'outline') return `${base} border hover:opacity-70`;
  if (variant === 'soft') return `${base} hover:opacity-80`;
  if (variant === 'link')
    return `${text} underline-offset-4 hover:underline transition-opacity hover:opacity-70`;
  // ghost
  return `${base} hover:opacity-70`;
}

function previewStyle(variant: string, color: string): Record<string, string> {
  const contrastText = hexLuminance(color) > 0.179 ? '#1a1a1a' : '#ffffff';
  if (variant === 'solid') return { backgroundColor: color, color: contrastText };
  if (variant === 'outline') return { borderColor: color, color, backgroundColor: 'transparent' };
  if (variant === 'soft')
    return { backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`, color };
  if (variant === 'link') return { color };
  // ghost
  return { color, backgroundColor: 'transparent' };
}

const gapStyle = computed(() => ({ gap: `${local.value.spacing}px` }));
</script>

<template>
  <UModal
    :open="open"
    :title="label ? `Customize ${label}` : 'Customize button style'"
    :ui="{ content: 'max-w-2xl' }"
    @update:open="emit('update:open', $event)"
  >
    <template #body>
      <div class="flex gap-6">
        <!-- Left: controls -->
        <div class="flex flex-col gap-4 w-48 shrink-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs text-muted">Style</label>
            <USelect
              :model-value="local.variant"
              :items="VARIANT_OPTIONS"
              size="sm"
              @update:model-value="update('variant', $event as ButtonStyleValue['variant'])"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-xs text-muted">Corner radius</label>
            <USelect
              :model-value="local.radius"
              :items="RADIUS_OPTIONS"
              size="sm"
              @update:model-value="update('radius', $event as ButtonStyleValue['radius'])"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-xs text-muted">Size</label>
            <USelect
              :model-value="local.size"
              :items="SIZE_OPTIONS"
              size="sm"
              @update:model-value="update('size', $event as ButtonStyleValue['size'])"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-xs text-muted">Spacing</label>
            <div class="flex items-center gap-2">
              <USlider
                :model-value="local.spacing"
                :min="0"
                :max="32"
                :step="1"
                class="flex-1"
                @update:model-value="update('spacing', $event ?? 0)"
              />
              <span class="text-xs text-muted w-8 text-right tabular-nums"
                >{{ local.spacing }}px</span
              >
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-xs text-muted">Letter spacing</label>
            <div class="flex items-center gap-2">
              <USlider
                :model-value="local.letterSpacing"
                :min="0"
                :max="8"
                :step="0.5"
                class="flex-1"
                @update:model-value="update('letterSpacing', $event ?? 0)"
              />
              <span class="text-xs text-muted w-8 text-right tabular-nums"
                >{{ local.letterSpacing }}px</span
              >
            </div>
          </div>

          <div class="flex items-center justify-between">
            <label class="text-xs text-muted">Uppercase</label>
            <USwitch
              :model-value="local.uppercase"
              size="sm"
              @update:model-value="update('uppercase', $event)"
            />
          </div>
        </div>

        <!-- Right: preview -->
        <div
          class="flex-1 flex flex-col gap-3 justify-center items-center rounded-lg bg-elevated p-6 min-h-40"
        >
          <p class="text-xs text-muted mb-1">Preview</p>

          <!-- Row of two buttons: primary + secondary -->
          <div class="flex items-center flex-wrap justify-center" :style="gapStyle">
            <template v-if="local.variant !== 'link'">
              <button
                :class="previewClass(local.variant)"
                :style="{ ...previewStyle(local.variant, primaryColor), ...sharedTextStyle }"
              >
                Primary
              </button>
              <button
                :class="previewClass(local.variant)"
                :style="{ ...previewStyle(local.variant, secondaryColor), ...sharedTextStyle }"
              >
                Secondary
              </button>
            </template>
            <template v-else>
              <button
                :class="previewClass('link')"
                :style="{ color: primaryColor, ...sharedTextStyle }"
              >
                Primary link
              </button>
              <button
                :class="previewClass('link')"
                :style="{ color: secondaryColor, ...sharedTextStyle }"
              >
                Secondary link
              </button>
            </template>
          </div>

          <!-- Second row: spacing demo with ghost buttons -->
          <div
            v-if="local.variant !== 'link'"
            class="flex items-center flex-wrap justify-center mt-2"
            :style="gapStyle"
          >
            <button
              :class="previewClass(local.variant)"
              :style="{ ...previewStyle(local.variant, primaryColor), ...sharedTextStyle }"
            >
              Button A
            </button>
            <button
              :class="previewClass(local.variant)"
              :style="{ ...previewStyle(local.variant, primaryColor), ...sharedTextStyle }"
            >
              Button B
            </button>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
