<script setup lang="ts">
import type { CollectionItem } from '@portfolio-builder/shared/types';
import { getCollectionType } from '@portfolio-builder/shared/types';
import { portfolioSlugKey } from '~/utils/portfolioSlug';

export interface PostListBlockProps {
  heading?: string;
  showHeading?: boolean;
  collectionId?: string;
  filterTag?: string;
  background?: string | null;
  surfaceColor?: string | null;
  backgroundImage?: string | null;
}

const props = withDefaults(defineProps<PostListBlockProps>(), {
  heading: 'Posts',
  showHeading: true,
  collectionId: '',
  filterTag: '',
  background: null,
  surfaceColor: null,
  backgroundImage: null,
});

const slug = inject(portfolioSlugKey, '');
const config = useRuntimeConfig();
const baseURL = import.meta.server ? (config.apiUrl as string) : (config.public.apiUrl as string);

const { resolveColor, resolveTextColor } = useActivePalette();

const bgHex = computed(() => (props.background ? resolveColor(props.background) : null));

const sectionStyle = computed(() => ({
  ...(bgHex.value ? { backgroundColor: bgHex.value } : {}),
  ...(props.backgroundImage
    ? {
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {}),
}));

const autoTextColor = computed(() =>
  props.background ? resolveTextColor(props.background) : null,
);
const textColorStyle = computed(() => (autoTextColor.value ? { color: autoTextColor.value } : {}));
const textMutedStyle = computed(() =>
  autoTextColor.value
    ? { color: autoTextColor.value, opacity: '0.6' }
    : { color: 'var(--text-secondary)' },
);

const borderStyle = computed(() => ({
  borderTop: `1px solid ${autoTextColor.value ? `color-mix(in srgb, ${autoTextColor.value} 15%, transparent)` : 'var(--border)'}`,
}));

const { data } = await useAsyncData(
  () => `portfolio-${slug}-posts-${props.collectionId || 'default'}`,
  () => {
    const url = props.collectionId
      ? `/api/portfolios/${slug}/collections/by-id/${props.collectionId}`
      : `/api/portfolios/${slug}/collections/posts`;
    return $fetch<{ items: CollectionItem[] }>(url, { baseURL });
  },
);

const hasDetailPage = !!getCollectionType('posts')?.pageTemplate;

const posts = computed(() => {
  const all = data.value?.items ?? [];
  return props.filterTag
    ? all.filter(p => (p.data.tags as string[] | undefined)?.includes(props.filterTag!))
    : all;
});
</script>

<template>
  <section v-if="posts.length" class="py-16" :style="sectionStyle">
    <div class="max-w-3xl mx-auto px-8">
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

      <div class="flex flex-col">
        <component
          :is="hasDetailPage ? 'a' : 'div'"
          v-for="(post, i) in posts"
          :key="post.id"
          class="flex items-baseline justify-between gap-4 py-3 transition-opacity hover:opacity-80"
          :class="{ 'cursor-pointer': hasDetailPage }"
          :style="i > 0 ? borderStyle : {}"
          :href="hasDetailPage ? `/p/${slug}/posts/${post.id}` : undefined"
        >
          <span
            class="font-medium text-sm leading-snug"
            :style="autoTextColor ? textColorStyle : { color: 'var(--text-primary)' }"
            >{{ post.data.title }}</span
          >
          <span v-if="post.data.date" class="text-xs shrink-0 tabular-nums" :style="textMutedStyle">
            {{ post.data.date }}
          </span>
        </component>
      </div>
    </div>
  </section>
</template>
