<script setup lang="ts">
import type { CollectionItem } from '@portfolio-builder/shared/types';
import { portfolioSlugKey } from '~/utils/portfolioSlug';
import { visibleTags } from '~/utils/sanitize';

export interface ExperiencesBlockProps {
  heading?: string;
  showHeading?: boolean;
  filterTag?: string;
  collectionId?: string;
  background?: string | null;
  surfaceColor?: string | null;
  backgroundImage?: string | null;
  backgroundFixed?: boolean;
}

const props = withDefaults(defineProps<ExperiencesBlockProps>(), {
  heading: 'Experience',
  showHeading: true,
  filterTag: '',
  collectionId: '',
  background: null,
  surfaceColor: null,
  backgroundImage: null,
  backgroundFixed: false,
});

const slug = inject(portfolioSlugKey, '');
const config = useRuntimeConfig();
const baseURL = import.meta.server ? (config.apiUrl as string) : (config.public.apiUrl as string);

const { resolveColor, resolveTextColor, resolveSecondary } = useActivePalette();

const bgHex = computed(() => (props.background ? resolveColor(props.background) : null));
const surfaceHex = computed(() => (props.surfaceColor ? resolveColor(props.surfaceColor) : null));

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
const textColorStyle = computed(() => (autoTextColor.value ? { color: autoTextColor.value } : {}));

const surfaceStyle = computed(() =>
  surfaceHex.value
    ? { backgroundColor: surfaceHex.value }
    : { backgroundColor: 'var(--bg-surface)' },
);

const surfaceTextColor = computed(() =>
  props.surfaceColor ? resolveTextColor(props.surfaceColor) : null,
);
const surfaceTextStyle = computed(() =>
  surfaceTextColor.value ? { color: surfaceTextColor.value } : { color: 'var(--text-primary)' },
);
const surfaceTextMutedStyle = computed(() =>
  surfaceTextColor.value
    ? { color: surfaceTextColor.value, opacity: '0.6' }
    : { color: 'var(--text-secondary)' },
);

const surfaceSecondary = computed(() => resolveSecondary(props.surfaceColor));
const surfaceHexOrDefault = computed(() => surfaceHex.value ?? 'var(--bg-surface)');

const { data } = await useAsyncData(
  () => `portfolio-${slug}-experiences-${props.collectionId || 'default'}`,
  () => {
    const url = props.collectionId
      ? `/api/portfolios/${slug}/collections/by-id/${props.collectionId}`
      : `/api/portfolios/${slug}/collections/experiences`;
    return $fetch<{ items: CollectionItem[] }>(url, { baseURL });
  },
);

const experiences = computed(() => {
  const all = data.value?.items ?? [];
  return props.filterTag
    ? all.filter(e => (e.data.tags as string[] | undefined)?.includes(props.filterTag!))
    : all;
});
</script>

<template>
  <section v-if="experiences.length" class="py-16" :style="sectionStyle">
    <div class="px-8 max-w-3xl mx-auto">
      <EditorInlineTextField
        v-if="showHeading"
        field-key="heading"
        tag="h2"
        class="text-3xl font-bold mb-8"
        :style="autoTextColor ? textColorStyle : { color: 'var(--text-primary)' }"
      >
        <h2
          class="text-3xl font-bold mb-8"
          :style="{
            ...(autoTextColor ? textColorStyle : { color: 'var(--text-primary)' }),
            fontFamily: 'var(--font-heading)',
          }"
        >
          {{ heading }}
        </h2>
      </EditorInlineTextField>
      <ul class="space-y-6">
        <li
          v-for="experience in experiences"
          :key="experience.id"
          class="rounded-xl p-6"
          :style="surfaceStyle"
        >
          <p class="font-semibold text-lg" :style="surfaceTextStyle">{{ experience.data.title }}</p>
          <p
            v-if="experience.data.place || experience.data.time"
            class="text-sm mt-1"
            :style="surfaceTextMutedStyle"
          >
            <span v-if="experience.data.place">{{ experience.data.place }}</span>
            <span v-if="experience.data.place && experience.data.time"> · </span>
            <span v-if="experience.data.time">{{ experience.data.time }}</span>
            <span v-if="experience.data.location"> · {{ experience.data.location }}</span>
          </p>
          <p v-if="experience.data.description" class="text-sm mt-2" :style="surfaceTextMutedStyle">
            {{ experience.data.description }}
          </p>
          <div
            v-if="visibleTags((experience.data.tags as string[]) ?? []).length"
            class="flex flex-wrap gap-1 mt-3"
          >
            <span
              v-for="tag in visibleTags((experience.data.tags as string[]) ?? [])"
              :key="tag"
              class="text-xs px-2 py-0.5 rounded-full"
              :style="{
                backgroundColor: `color-mix(in srgb, ${surfaceSecondary} 15%, ${surfaceHexOrDefault})`,
                color: surfaceSecondary,
              }"
              >{{ tag }}</span
            >
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
