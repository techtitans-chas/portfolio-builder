<script setup lang="ts">
export interface NavLink {
  label: string;
  url: string;
}

export interface HeaderBlockProps {
  siteName?: string;
  homeUrl?: string;
  navLinks?: NavLink[];
  cta?: { label: string; url: string } | null;
  showColorModeToggle?: boolean;
}

withDefaults(defineProps<HeaderBlockProps>(), {
  siteName: '',
  homeUrl: '/',
  navLinks: () => [],
  cta: null,
  showColorModeToggle: false,
});
</script>

<template>
  <header
    class="sticky top-0 z-10 flex items-center justify-between px-8 py-4 border-b"
    :style="{
      backgroundColor: 'var(--bg-nav)',
      borderColor: 'color-mix(in srgb, var(--text-primary) 12%, transparent)',
    }"
  >
    <!-- Site name / logo -->
    <UButton
      variant="ghost"
      color="neutral"
      class="font-bold text-lg"
      :style="{ color: 'var(--text-primary)' }"
      :to="homeUrl"
    >
      {{ siteName }}
    </UButton>

    <div class="flex items-center gap-6">
      <!-- Nav links -->
      <nav
        v-if="navLinks.length"
        class="flex gap-6 text-sm"
        :style="{ color: 'var(--text-secondary)' }"
      >
        <a
          v-for="link in navLinks"
          :key="link.url"
          :href="link.url"
          class="hover:opacity-80 transition-opacity"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- CTA button -->
      <a
        v-if="cta"
        :href="cta.url"
        class="px-4 py-1.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
        :style="{ backgroundColor: 'var(--primary)' }"
      >
        {{ cta.label }}
      </a>

      <!-- Color mode toggle -->
      <UColorModeButton v-if="showColorModeToggle" />
    </div>
  </header>
</template>
