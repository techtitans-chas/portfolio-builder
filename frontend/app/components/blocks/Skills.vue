<script setup lang="ts">
import { inlineEditorKey } from '~/utils/inlineEditor';

export interface SkillItem {
  id?: string;
  name: string;
  level: string;
  category: string;
}

export interface SkillsBlockProps {
  heading?: string;
  showHeading?: boolean;
  columns?: '1' | '2';
  skills?: SkillItem[];
  background?: string | null;
  backgroundImage?: string | null;
  backgroundFixed?: boolean;
}

const props = withDefaults(defineProps<SkillsBlockProps>(), {
  heading: 'Skills & Expertise',
  showHeading: true,
  columns: '2',
  skills: () => [],
  background: null,
  backgroundImage: null,
  backgroundFixed: false,
});

const { resolveColor, resolveTextColor, resolvePrimary, resolveSecondary } = useActivePalette();

const bgHex = computed(() => (props.background ? resolveColor(props.background) : null));

const sectionStyle = computed(() => ({
  ...(bgHex.value ? { backgroundColor: bgHex.value } : {}),
  ...(props.backgroundImage
    ? {
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: props.backgroundFixed ? 'fixed' : 'scroll',
      }
    : {}),
}));

const autoTextColor = computed(() =>
  props.background ? resolveTextColor(props.background) : null,
);
const textPrimaryStyle = computed(() =>
  autoTextColor.value ? { color: autoTextColor.value } : { color: 'var(--text-primary)' },
);
const textMutedStyle = computed(() =>
  autoTextColor.value
    ? { color: autoTextColor.value, opacity: '0.6' }
    : { color: 'var(--text-secondary)' },
);

const bgPrimary = computed(() => resolvePrimary(props.background));
const bgSecondary = computed(() => resolveSecondary(props.background));

const trackStyle = computed(() => ({
  backgroundColor: `color-mix(in srgb, ${bgPrimary.value} 12%, ${bgHex.value ?? 'var(--bg-surface)'})`,
}));

const barGradient = computed(
  () =>
    `linear-gradient(to right, ${bgPrimary.value}, color-mix(in srgb, ${bgPrimary.value} 75%, ${bgSecondary.value}))`,
);

const inEditor = Boolean(inject(inlineEditorKey, null));

// Group skills by category, preserving insertion order.
// Each entry carries the original flat index so field-keys stay correct.
const grouped = computed(() => {
  const map = new Map<string, { item: SkillItem; flatIndex: number }[]>();
  (props.skills ?? []).forEach((item, i) => {
    const cat = item.category?.trim() || 'General';
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push({ item, flatIndex: i });
  });
  return [...map.entries()];
});

const hasCategories = computed(
  () => grouped.value.length > 1 || grouped.value[0]?.[0] !== 'General',
);

// Build a global stagger delay map: flatIndex → delay in ms
const delayMap = computed(() => {
  const m = new Map<number, number>();
  let counter = 0;
  for (const [, entries] of grouped.value) {
    for (const entry of entries) {
      m.set(entry.flatIndex, counter * 60);
      counter++;
    }
  }
  return m;
});

// Animation: bars start at 0 and grow when the section enters the viewport
const sectionRef = ref<HTMLElement | null>(null);
const animated = ref(inEditor);

onMounted(() => {
  if (animated.value || !sectionRef.value) return;
  const observer = new IntersectionObserver(
    entries => {
      if (entries[0]?.isIntersecting) {
        animated.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.1 },
  );
  observer.observe(sectionRef.value);
});
</script>

<template>
  <section ref="sectionRef" class="px-8 py-12" :style="sectionStyle">
    <div class="max-w-3xl mx-auto">
      <EditorInlineTextField
        v-if="showHeading"
        field-key="heading"
        tag="h2"
        class="text-3xl font-bold mb-10"
        :style="textPrimaryStyle"
      >
        <h2
          class="text-3xl font-bold mb-10"
          :style="{ ...textPrimaryStyle, fontFamily: 'var(--font-heading)' }"
        >
          {{ heading }}
        </h2>
      </EditorInlineTextField>

      <div
        class="gap-x-12 gap-y-10"
        :class="columns === '2' ? 'grid grid-cols-1 sm:grid-cols-2' : 'flex flex-col'"
      >
        <div v-for="[category, entries] in grouped" :key="category">
          <p
            v-if="hasCategories"
            class="text-xs font-semibold uppercase tracking-widest mb-4"
            :style="textMutedStyle"
          >
            {{ category }}
          </p>

          <div class="flex flex-col gap-4">
            <div v-for="entry in entries" :key="entry.item.id ?? entry.flatIndex">
              <div class="flex items-center justify-between mb-2">
                <EditorInlineTextField
                  :field-key="`skills.${entry.flatIndex}.name`"
                  tag="span"
                  class="text-sm font-medium"
                  :style="textPrimaryStyle"
                  :data-placeholder="entry.item.name"
                >
                  {{ entry.item.name }}
                </EditorInlineTextField>
                <span
                  class="text-xs tabular-nums font-medium ml-3 shrink-0"
                  :style="textMutedStyle"
                >
                  {{ entry.item.level ?? 0 }}%
                </span>
              </div>

              <!-- Progress track -->
              <div class="w-full h-1.5 rounded-full overflow-hidden" :style="trackStyle">
                <div
                  class="h-full rounded-full"
                  :style="{
                    width: animated ? (Number(entry.item.level) || 0) + '%' : '0%',
                    background: barGradient,
                    transition: animated
                      ? `width 0.75s cubic-bezier(0.4, 0, 0.2, 1) ${delayMap.get(entry.flatIndex) ?? 0}ms`
                      : 'none',
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
