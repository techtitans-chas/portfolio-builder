<script setup lang="ts">
export interface CtaButton {
  id?: string;
  label: string;
  url: string;
}

export interface HeroBlockProps {
  heading?: string;
  subheading?: string;
  backgroundImage?: string | null;
  ctaButtons?: CtaButton[];
}

withDefaults(defineProps<HeroBlockProps>(), {
  heading: '',
  subheading: '',
  backgroundImage: null,
  ctaButtons: () => [],
});
</script>

<template>
  <section
    class="relative flex flex-col items-center justify-center text-center px-8 py-24 gap-6"
    :style="
      backgroundImage
        ? {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
        : {}
    "
  >
    <div v-if="backgroundImage" class="absolute inset-0 bg-black/40" />
    <div class="relative flex flex-col items-center gap-6">
      <h1
        class="text-5xl font-bold leading-tight"
        :style="{ color: backgroundImage ? 'white' : 'var(--text-primary)' }"
      >
        {{ heading }}
      </h1>

      <p
        v-if="subheading"
        class="text-lg max-w-xl"
        :style="{ color: backgroundImage ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)' }"
      >
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
              : backgroundImage
                ? { color: 'white', borderColor: 'rgba(255,255,255,0.6)' }
                : { color: 'var(--secondary)', borderColor: 'var(--secondary)' }
          "
        >
          {{ btn.label }}
        </a>
      </div>
    </div>
  </section>
</template>
