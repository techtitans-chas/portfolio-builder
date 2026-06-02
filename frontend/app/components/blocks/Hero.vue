<script setup lang="ts">
export interface CtaButton {
  id?: string;
  label: string;
  url: string;
}

export interface HeroBlockProps {
  heading?: string;
  subheading?: string;
  background?: string | null;
  backgroundImage?: string | null;
  ctaButtons?: CtaButton[];
  headingFont?: string | null;
}

const props = withDefaults(defineProps<HeroBlockProps>(), {
  heading: '',
  subheading: '',
  background: null,
  backgroundImage: null,
  ctaButtons: () => [],
  headingFont: null,
});

const sectionStyle = computed(() => {
  if (props.backgroundImage) {
    return {
      backgroundImage: `url(${props.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }
  if (props.background) {
    return { backgroundColor: `var(--palette-${props.background})` };
  }
  return {};
});

// Force light text on dark palette colors (primary/dark) or when a background image is set
const hasDarkBg = computed(() =>
  !props.backgroundImage && (props.background === 'primary' || props.background === 'dark'),
);
const forceLight = computed(() => !!props.backgroundImage || hasDarkBg.value);
</script>

<template>
  <section
    class="relative flex flex-col items-center justify-center text-center px-8 py-24 gap-6"
    :style="sectionStyle"
  >
    <div v-if="backgroundImage" class="absolute inset-0 bg-black/40" />
    <div class="relative flex flex-col items-center gap-6">
      <EditorInlineTextField
        field-key="heading"
        tag="h1"
        class="text-5xl font-bold leading-tight"
        :style="{
          color: forceLight ? 'white' : 'var(--text-primary)',
          fontFamily: props.headingFont ?? undefined,
        }"
      >
        <h1
          class="text-5xl font-bold leading-tight"
          :style="{
            color: forceLight ? 'white' : 'var(--text-primary)',
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
        :style="{ color: forceLight ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)' }"
      >
        <p
          v-if="subheading"
          class="text-lg max-w-xl"
          :style="{ color: forceLight ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)' }"
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
              : forceLight
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
