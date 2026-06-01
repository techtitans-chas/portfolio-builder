<script setup lang="ts">
import type { Block } from '@portfolio-builder/shared/types';
import BlocksHeader from './Header.vue';
import BlocksFooter from './Footer.vue';
import BlocksHero from './Hero.vue';

const props = defineProps<{ block: Block }>();

const componentMap = {
  header: BlocksHeader,
  footer: BlocksFooter,
  hero: BlocksHero,
} as const;

const component = computed(
  () => componentMap[props.block.type as keyof typeof componentMap] ?? null,
);
</script>

<template>
  <template v-if="block.isVisible !== false">
    <component :is="component" v-if="component" v-bind="block.content as Record<string, unknown>" />
    <div v-else class="px-8 py-4 text-sm opacity-50">Unknown block type: {{ block.type }}</div>
  </template>
</template>
