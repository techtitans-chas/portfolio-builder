<script setup lang="ts">
import type { CollectionItem } from '@portfolio-builder/shared/types';
import { getCollectionType } from '@portfolio-builder/shared/types';
import { portfolioSlugKey } from '~/utils/portfolioSlug';
import { visibleTags } from '~/utils/sanitize';

export interface PostFeedBlockProps {
  heading?: string;
  showHeading?: boolean;
  collectionId?: string;
  filterTag?: string;
  pageSize?: number;
  background?: string | null;
  surfaceColor?: string | null;
  backgroundImage?: string | null;
  backgroundFixed?: boolean;
}

const props = withDefaults(defineProps<PostFeedBlockProps>(), {
  heading: 'Posts',
  showHeading: true,
  collectionId: '',
  filterTag: '',
  pageSize: 6,
  background: null,
  surfaceColor: null,
  backgroundImage: null,
  backgroundFixed: false,
});

const slug = inject(portfolioSlugKey, '');
const config = useRuntimeConfig();
const baseURL = import.meta.server ? (config.apiUrl as string) : (config.public.apiUrl as string);

const { resolveColor, resolveTextColor, resolvePrimary } = useActivePalette();

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

const surfacePrimary = computed(() => resolvePrimary(props.surfaceColor));
const bgPrimary = computed(() => resolvePrimary(props.background));
const surfaceHexOrDefault = computed(() => surfaceHex.value ?? 'var(--bg-surface)');

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

const allPosts = computed(() => {
  const all = data.value?.items ?? [];
  return props.filterTag
    ? all.filter(p => (p.data.tags as string[] | undefined)?.includes(props.filterTag!))
    : all;
});

const page = ref(1);
const totalPages = computed(() => Math.ceil(allPosts.value.length / props.pageSize));
const posts = computed(() => {
  const start = (page.value - 1) * props.pageSize;
  return allPosts.value.slice(start, start + props.pageSize);
});
</script>

<template>
  <section v-if="allPosts.length" class="py-16" :style="sectionStyle">
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

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <component
          :is="hasDetailPage ? 'a' : 'div'"
          v-for="post in posts"
          :key="post.id"
          class="rounded-xl overflow-hidden flex flex-col transition-opacity hover:opacity-80"
          :class="{ 'cursor-pointer': hasDetailPage }"
          :href="hasDetailPage ? `/p/${slug}/posts/${post.id}` : undefined"
          :style="surfaceStyle"
        >
          <!-- Cover image -->
          <div
            class="h-44 w-full overflow-hidden shrink-0"
            :style="{
              backgroundColor: `color-mix(in srgb, ${surfacePrimary} 15%, ${surfaceHexOrDefault})`,
            }"
          >
            <img
              v-if="post.data.coverImageUrl"
              :src="post.data.coverImageUrl as string"
              :alt="post.data.title as string"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Content -->
          <div class="p-5 flex flex-col gap-2 flex-1">
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-semibold text-base leading-snug" :style="surfaceTextStyle">
                {{ post.data.title }}
              </h3>
              <span
                v-if="post.data.date"
                class="text-xs shrink-0 pt-0.5"
                :style="surfaceTextMutedStyle"
              >
                {{ post.data.date }}
              </span>
            </div>
            <p v-if="post.data.excerpt" class="text-sm line-clamp-3" :style="surfaceTextMutedStyle">
              {{ post.data.excerpt }}
            </p>
            <div
              v-if="visibleTags((post.data.tags as string[]) ?? []).length"
              class="flex flex-wrap gap-1 mt-auto pt-2"
            >
              <span
                v-for="tag in visibleTags((post.data.tags as string[]) ?? [])"
                :key="tag"
                class="text-xs px-2 py-0.5 rounded-full"
                :style="{
                  backgroundColor: `color-mix(in srgb, ${surfacePrimary} 15%, ${surfaceHexOrDefault})`,
                  color: surfacePrimary,
                }"
                >{{ tag }}</span
              >
            </div>
            <span
              v-if="hasDetailPage"
              class="text-xs font-medium mt-auto pt-1"
              :style="{ color: surfacePrimary }"
            >
              Read more →
            </span>
          </div>
        </component>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-10">
        <button
          v-for="p in totalPages"
          :key="p"
          class="w-8 h-8 rounded-full text-sm transition-colors"
          :style="
            p === page
              ? { backgroundColor: bgPrimary, color: bgHex ?? 'var(--bg-page)' }
              : { ...surfaceStyle, ...surfaceTextMutedStyle }
          "
          @click="page = p"
        >
          {{ p }}
        </button>
      </div>
    </div>
  </section>
</template>
