import type { TabsItem } from '@nuxt/ui';

export const VIEWPORT_MODES: TabsItem[] = [
  { label: 'Desktop', value: 'desktop' },
  { label: 'Tablet', value: 'tablet' },
  { label: 'Mobile', value: 'mobile' },
];

const VIEWPORT_WIDTHS: Record<string, number> = {
  desktop: 1280,
  tablet: 768,
  mobile: 375,
};

function useElementWidth(key: string) {
  const el = useTemplateRef<HTMLElement>(key);
  const width = ref(0);

  const observer = import.meta.client
    ? new ResizeObserver(entries => {
        width.value = entries[0]?.contentRect.width ?? 0;
      })
    : null;

  watch(el, (next, prev) => {
    if (prev) observer?.unobserve(prev);
    if (next) {
      width.value = next.getBoundingClientRect().width;
      observer?.observe(next);
    }
  });

  onUnmounted(() => observer?.disconnect());

  return width;
}

function useElementHeight(key: string) {
  const el = useTemplateRef<HTMLElement>(key);
  const height = ref(0);

  const observer = import.meta.client
    ? new ResizeObserver(entries => {
        height.value = entries[0]?.contentRect.height ?? 0;
      })
    : null;

  watch(el, (next, prev) => {
    if (prev) observer?.unobserve(prev);
    if (next) {
      height.value = next.getBoundingClientRect().height;
      observer?.observe(next);
    }
  });

  onUnmounted(() => observer?.disconnect());

  return height;
}

export function usePreviewScale() {
  const activeViewMode = ref('desktop');

  const fixedWidth = computed(() => VIEWPORT_WIDTHS[activeViewMode.value] ?? 1280);

  const canvasWidth = useElementWidth('previewCanvas');
  const naturalHeight = useElementHeight('previewEl');

  const scale = computed(() => Math.min(1, canvasWidth.value / fixedWidth.value || 1));

  const wrapperStyle = computed(() => {
    if (scale.value >= 1) return {};
    return { height: `${naturalHeight.value * scale.value}px`, overflow: 'hidden' };
  });

  const scaleStyle = computed(() => {
    if (scale.value >= 1) {
      return { width: `${fixedWidth.value}px`, margin: '0 auto' };
    }
    return {
      width: `${fixedWidth.value}px`,
      transformOrigin: 'top left',
      transform: `scale(${scale.value})`,
    };
  });

  return { activeViewMode, wrapperStyle, scaleStyle };
}
