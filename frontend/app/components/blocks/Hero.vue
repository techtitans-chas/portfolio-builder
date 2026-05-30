<script setup lang="ts">
export interface HeroBlockProps {
  heading?: string;
  subheading?: string;
  primaryCta?: { label: string; url: string } | null;
  secondaryCta?: { label: string; url: string } | null;
}

withDefaults(defineProps<HeroBlockProps>(), {
  heading: '',
  subheading: '',
  primaryCta: null,
  secondaryCta: null,
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

    <div v-if="primaryCta || secondaryCta" class="flex gap-4 mt-2">
      <a
        v-if="primaryCta"
        :href="primaryCta.url"
        class="px-6 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
        :style="{ backgroundColor: 'var(--primary)' }"
      >
        {{ primaryCta.label }}
      </a>
      <a
        v-if="secondaryCta"
        :href="secondaryCta.url"
        class="px-6 py-3 rounded-lg font-medium border transition-opacity hover:opacity-80"
        :style="{ color: 'var(--secondary)', borderColor: 'var(--secondary)' }"
      >
        {{ secondaryCta.label }}
      </a>
    </div>
  </section>
</template>
