<script setup lang="ts">
import type { CollectionItem } from '@portfolio-builder/shared/types';
import { sanitizeHtml, visibleTags } from '~/utils/sanitize';

const props = defineProps<{ item: CollectionItem }>();

const tags = computed(() => visibleTags((props.item.data.tags as string[]) ?? []));
</script>

<template>
  <article class="px-8 py-16 max-w-3xl mx-auto">
    <!-- Banner image -->
    <div v-if="item.data.previewImageUrl" class="w-full h-64 rounded-2xl overflow-hidden mb-8">
      <img
        :src="item.data.previewImageUrl as string"
        :alt="item.data.title as string"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Title -->
    <h1
      class="text-4xl font-bold mb-3"
      :style="{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }"
    >
      {{ item.data.title }}
    </h1>

    <!-- Meta row: time + tags -->
    <div class="flex flex-wrap items-center gap-3 mb-6">
      <span v-if="item.data.time" class="text-sm" :style="{ color: 'var(--text-secondary)' }">
        {{ item.data.time }}
      </span>
      <span
        v-for="tag in tags"
        :key="tag"
        class="text-xs px-2 py-0.5 rounded-full"
        :style="{
          backgroundColor: 'color-mix(in srgb, var(--primary) 15%, var(--bg-surface))',
          color: 'var(--primary)',
        }"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Short description -->
    <p
      v-if="item.data.description"
      class="text-lg mb-8 leading-relaxed"
      :style="{ color: 'var(--text-secondary)' }"
    >
      {{ item.data.description }}
    </p>

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
