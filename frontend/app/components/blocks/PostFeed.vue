<script setup lang="ts">
import type { CollectionItem } from '@portfolio-builder/shared/types';
import { getCollectionType } from '@portfolio-builder/shared/types';
import { portfolioSlugKey } from '~/utils/portfolioSlug';
import { visibleTags } from '~/utils/sanitize';
import { useLayoutSettings, MAX_CONTENT_WIDTH_CLASS } from '~/composables/useLayoutSettings';

const props = withDefaults(
  defineProps<{
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
    surfaceColor?: string | null;
    heading?: string;
    showHeading?: boolean;
    collectionId?: string;
    filterTag?: string;
    pageSize?: number;
  }>(),
  {
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
    surfaceColor: null,
    heading: 'Posts',
    showHeading: true,
    collectionId: '',
    filterTag: '',
    pageSize: 6,
  },
);

const slug = inject(portfolioSlugKey, '');
const config = useRuntimeConfig();
const baseURL = import.meta.server ? (config.apiUrl as string) : (config.public.apiUrl as string);

const { maxContentWidth } = useLayoutSettings();
const maxWidthClass = computed(() => MAX_CONTENT_WIDTH_CLASS[maxContentWidth.value]);

const { resolveColor, resolvePrimary } = useActivePalette();

const bgHex = computed(() => (props.background ? resolveColor(props.background) : null));
const bgPrimary = computed(() => resolvePrimary(props.background));

const { autoTextColor, textColorStyle } = useBlockBackground(() => props.background);
const {
  surfaceHexOrDefault,
  surfaceStyle,
  surfaceTextStyle,
  surfaceTextMutedStyle,
  surfacePrimary,
} = useBlockSurface(() => props.surfaceColor);

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
  <BlocksBlockWrapper
    v-if="allPosts.length"
    class="py-16"
    v-bind="{
      background,
      backgroundImage,
      backgroundOpacity,
      backgroundFixed,
      overlayEnabled,
      overlayType,
      overlayColor,
      overlayColor2,
      overlayDegree,
      overlayOpacity,
    }"
  >
    <div class="mx-auto" :class="[maxWidthClass]">
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

      <div class="flex flex-col gap-4">
        <component
          :is="hasDetailPage ? 'a' : 'div'"
          v-for="post in posts"
          :key="post.id"
          class="rounded-xl overflow-hidden flex flex-row transition-opacity hover:opacity-80"
          :class="{ 'cursor-pointer': hasDetailPage }"
          :href="hasDetailPage ? `/p/${slug}/posts/${post.id}` : undefined"
          :style="surfaceStyle"
        >
          <!-- Cover image (left side) -->
          <div
            class="relative w-40 sm:w-52 shrink-0 overflow-hidden"
            :style="{
              backgroundColor: `color-mix(in srgb, ${surfacePrimary} 15%, ${surfaceHexOrDefault})`,
            }"
          >
            <img
              v-if="post.data.coverImageUrl"
              :src="post.data.coverImageUrl as string"
              :alt="post.data.title as string"
              class="w-full h-full object-cover absolute inset-0"
            />
            <!-- Category badge -->
            <span
              v-if="visibleTags((post.data.tags as string[]) ?? []).length"
              class="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-md font-medium"
              :style="{
                backgroundColor: surfacePrimary,
                color: surfaceHexOrDefault,
              }"
            >
              {{ visibleTags((post.data.tags as string[]) ?? [])[0] }}
            </span>
          </div>

          <!-- Content (right side) -->
          <div class="p-5 flex flex-col gap-2 flex-1 min-w-0">
            <!-- Meta row -->
            <div
              class="flex justify-between items-center gap-3 text-xs"
              :style="surfaceTextMutedStyle"
            >
              <span v-if="post.data.date">{{ post.data.date }}</span>
            </div>

            <!-- Title -->
            <h3 class="font-bold text-base leading-snug" :style="surfaceTextStyle">
              {{ post.data.title }}
            </h3>

            <!-- Excerpt -->
            <p v-if="post.data.excerpt" class="text-sm line-clamp-2" :style="surfaceTextMutedStyle">
              {{ post.data.excerpt }}
            </p>

            <!-- Tags + author row -->
            <div class="flex items-center justify-between gap-2 mt-auto pt-2">
              <div
                v-if="visibleTags((post.data.tags as string[]) ?? []).length > 1"
                class="flex flex-wrap gap-x-1.5 gap-y-1"
                :style="{
                  color: surfacePrimary,
                }"
              >
                <span
                  v-for="tag in visibleTags((post.data.tags as string[]) ?? []).slice(1)"
                  :key="tag"
                  class="text-xs px-2 py-0.5 rounded-full"
                  :style="{
                    backgroundColor: `color-mix(in srgb, ${surfacePrimary} 15%, ${surfaceHexOrDefault})`,
                    color: surfacePrimary,
                  }"
                >
                  {{ tag }}
                </span>
              </div>
              <span
                v-if="post.data.author"
                class="text-xs shrink-0 flex items-center gap-1.5"
                :style="surfaceTextMutedStyle"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full inline-block"
                  :style="{ backgroundColor: surfacePrimary }"
                />
                {{ post.data.author }}
              </span>
              <div v-else class="flex-1" />
            </div>
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
  </BlocksBlockWrapper>
</template>
