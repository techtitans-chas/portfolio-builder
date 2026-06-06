<script setup lang="ts">
import type { CollectionItem } from '@portfolio-builder/shared/types';
import { sanitizeHtml, visibleTags } from '~/utils/sanitize';

const props = defineProps<{ item: CollectionItem }>();

const tags = computed(() => visibleTags((props.item.data.tags as string[]) ?? []));
</script>

<template>
  <article class="px-8 py-16 max-w-3xl mx-auto">
    <!-- Tags -->
    <div v-if="tags.length" class="flex flex-wrap gap-2 mb-4">
      <span
        v-for="tag in tags"
        :key="tag"
        class="text-xs px-2 py-0.5 rounded-full"
        :style="{
          backgroundColor: 'color-mix(in srgb, var(--primary) 25%, var(--bg-page))',
          color: 'var(--primary)',
        }"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Title -->
    <h1
      class="text-4xl font-bold mb-4 leading-tight"
      :style="{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }"
    >
      {{ item.data.title }}
    </h1>

    <!-- Author + date -->
    <div class="flex items-center gap-2 mb-6 text-sm" :style="{ color: 'var(--text-secondary)' }">
      <span v-if="item.data.author" class="font-semibold uppercase tracking-wide">
        {{ item.data.author }}
      </span>
      <span v-if="item.data.author && item.data.date">/</span>
      <span v-if="item.data.date">{{ item.data.date }}</span>
    </div>

    <!-- Excerpt -->
    <p
      v-if="item.data.excerpt"
      class="text-base mb-8 leading-relaxed italic"
      :style="{ color: 'var(--text-secondary)' }"
    >
      {{ item.data.excerpt }}
    </p>

    <!-- Cover image -->
    <div v-if="item.data.coverImageUrl" class="w-full rounded-2xl overflow-hidden mb-8">
      <img
        :src="item.data.coverImageUrl as string"
        :alt="item.data.title as string"
        class="w-full object-cover"
      />
    </div>

    <!-- Page body (rich text) -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div
      v-if="item.pageBody"
      class="rich-text"
      :style="{ color: 'var(--text-primary)' }"
      v-html="sanitizeHtml(item.pageBody)"
    />
  </article>
</template>
