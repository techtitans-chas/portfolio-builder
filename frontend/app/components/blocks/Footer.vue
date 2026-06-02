<script setup lang="ts">
import type { NavLink } from './Header.vue';

export interface FooterBlockProps {
  siteName?: string;
  links?: NavLink[];
  copyrightText?: string;
}

withDefaults(defineProps<FooterBlockProps>(), {
  siteName: '',
  links: () => [],
  copyrightText: '',
});

const year = new Date().getFullYear();
</script>

<template>
  <footer
    class="px-8 py-8 border-t"
    :style="{
      backgroundColor: 'var(--bg-nav)',
      color: 'var(--text-secondary)',
      borderColor: 'color-mix(in srgb, var(--text-primary) 12%, transparent)',
    }"
  >
    <div class="max-w-5xl mx-auto flex flex-col @sm:flex-row items-center justify-between gap-4">
      <span class="font-semibold text-sm" :style="{ color: 'var(--text-primary)' }">
        {{ siteName }}
      </span>

      <nav v-if="links.length" class="flex gap-6 text-sm">
        <a
          v-for="link in links"
          :key="link.url"
          :href="link.url"
          class="hover:opacity-80 transition-opacity"
        >
          {{ link.label }}
        </a>
      </nav>

      <span class="text-sm">
        {{ copyrightText || `© ${year} ${siteName}` }}
      </span>
    </div>
  </footer>
</template>
