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
  headingFont?: string | null;
}

const props = withDefaults(defineProps<HeroBlockProps>(), {
  heading: '',
  subheading: '',
  backgroundImage: null,
  ctaButtons: () => [],
  headingFont: null,
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
      <EditorInlineTextField
        field-key="heading"
        tag="h1"
        class="text-5xl font-bold leading-tight"
        :style="{
          color: backgroundImage ? 'white' : 'var(--text-primary)',
          fontFamily: props.headingFont ?? undefined,
        }"
      >
        <h1
          class="text-5xl font-bold leading-tight"
          :style="{
            color: backgroundImage ? 'white' : 'var(--text-primary)',
            fontFamily: props.headingFont ?? undefined,
          }"
        >
          {{ heading }}
        </h1>
      </EditorInlineTextField>

      <EditorInlineRichField
        field-key="subheading"
        placeholder="Your tagline"
        class="text-lg max-w-xl"
        :style="{ color: backgroundImage ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)' }"
      >
        <p
          v-if="subheading"
          class="text-lg max-w-xl"
          :style="{ color: backgroundImage ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)' }"
        >
          {{ subheading }}
        </p>
      </EditorInlineRichField>

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
          <EditorInlineTextField
            :field-key="`ctaButtons.${index}.label`"
            :data-placeholder="btn.label"
          >
            {{ btn.label }}
          </EditorInlineTextField>
        </a>
      </div>
    </div>
  </section>
</template>
