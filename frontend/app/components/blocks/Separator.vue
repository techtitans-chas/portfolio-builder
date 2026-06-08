<script setup lang="ts">
import { useActivePalette } from '~/composables/useActivePalette';
import { MAX_CONTENT_WIDTH_CLASS } from '~/composables/useLayoutSettings';

export interface SeparatorBlockProps {
  label?: string;
  icon?: string;
  avatar?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string | null;
  labelFont?: string | null;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const props = withDefaults(defineProps<SeparatorBlockProps>(), {
  label: '',
  icon: '',
  avatar: '',
  size: 'md',
  color: null,
  labelFont: null,
  maxWidth: 'full',
});

const { resolveColor } = useActivePalette();

const resolvedColor = computed(() => (props.color ? resolveColor(props.color) : null));

// Applied to the wrapper so CSS vars cascade into USeparator slots
const wrapperStyle = computed(() => {
  const c = resolvedColor.value;
  if (!c) return {};
  return {
    '--sep-color': c,
    '--sep-border-color': `color-mix(in srgb, ${c} 40%, transparent)`,
  };
});

const labelStyle = computed(() => ({
  ...(resolvedColor.value ? { color: resolvedColor.value } : {}),
  ...(props.labelFont ? { fontFamily: props.labelFont } : {}),
}));

const iconStyle = computed(() => (resolvedColor.value ? { color: resolvedColor.value } : {}));

const maxWidthClass = computed(() => MAX_CONTENT_WIDTH_CLASS[props.maxWidth]);
</script>

<template>
  <div class="px-8 py-6" :style="wrapperStyle">
    <div
      class="mx-auto [&_.separator-border]:border-(--sep-border-color,inherit)"
      :class="maxWidthClass"
    >
      <USeparator
        :label="label || undefined"
        :icon="!avatar && icon ? icon : undefined"
        :avatar="avatar ? { src: avatar } : undefined"
        :size="size"
        :ui="{
          border: resolvedColor ? 'border-[var(--sep-border-color)]' : '',
          label: 'text-sm',
          icon: 'shrink-0 size-5',
        }"
      >
        <template v-if="label && (resolvedColor || labelFont)" #default>
          <span :style="labelStyle">{{ label }}</span>
        </template>
        <template v-if="!avatar && icon && resolvedColor" #icon>
          <UIcon :name="icon" class="shrink-0 size-5" :style="iconStyle" />
        </template>
      </USeparator>
    </div>
  </div>
</template>
