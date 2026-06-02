<script setup lang="ts">
export interface CtaButton {
  id?: string;
  label: string;
  url: string;
}

export interface HeroBlockProps {
  heading?: string;
  subheading?: string;
  ctaButtons?: CtaButton[];
}

withDefaults(defineProps<HeroBlockProps>(), {
  heading: '',
  subheading: '',
  ctaButtons: () => [],
});
</script>

<template>
  <section class="flex flex-col items-center justify-center text-center px-8 py-24 gap-6">
    <h1 class="text-5xl font-bold leading-tight" :style="{ color: 'var(--text-primary)' }">
      {{ heading }}
    </h1>

    <p v-if="subheading" class="text-lg max-w-xl" :style="{ color: 'var(--text-secondary)' }">
      {{ subheading }}
    </p>

    <div v-if="ctaButtons && ctaButtons.length" class="flex flex-wrap gap-4 mt-2 justify-center">
      <a
        v-for="(btn, index) in ctaButtons"
        :key="btn.id ?? index"
        :href="btn.url"
        class="px-6 py-3 rounded-lg font-medium transition-opacity hover:opacity-90"
        :class="index === 0 ? 'text-white' : 'border hover:opacity-80'"
        :style="
          index === 0
            ? { backgroundColor: 'var(--primary)' }
            : { color: 'var(--secondary)', borderColor: 'var(--secondary)' }
        "
      >
        {{ btn.label }}
      </a>
    </div>
  </section>
</template>
