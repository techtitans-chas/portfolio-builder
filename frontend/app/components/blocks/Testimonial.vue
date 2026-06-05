<script setup lang="ts">
import { inlineEditorKey } from '~/utils/inlineEditor';
import { sanitizeHtml } from '~/utils/sanitize';

export interface TestimonialItem {
  id?: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string | null;
}

export interface TestimonialBlockProps {
  heading?: string;
  showHeading?: boolean;
  autoplay?: boolean;
  items?: TestimonialItem[];
}

const props = withDefaults(defineProps<TestimonialBlockProps>(), {
  heading: 'What people say',
  showHeading: true,
  autoplay: false,
  items: () => [],
});

const inEditor = Boolean(inject(inlineEditorKey, null));

const current = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

function prev() {
  current.value = (current.value - 1 + props.items!.length) % props.items!.length;
}

function next() {
  current.value = (current.value + 1) % props.items!.length;
}

function startAutoplay() {
  if (!props.autoplay || inEditor || (props.items?.length ?? 0) < 2) return;
  timer = setInterval(next, 4500);
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

onMounted(startAutoplay);
onUnmounted(stopAutoplay);

watch(
  () => props.autoplay,
  val => {
    stopAutoplay();
    if (val) startAutoplay();
  },
);

watch(
  () => props.items?.length,
  len => {
    if (current.value >= (len ?? 0)) current.value = 0;
  },
);
</script>

<template>
  <section class="px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <EditorInlineTextField
        v-if="showHeading"
        field-key="heading"
        tag="h2"
        class="text-3xl font-bold mb-10 text-center"
        :style="{ color: 'var(--text-primary)' }"
      >
        <h2 class="text-3xl font-bold mb-10 text-center" :style="{ color: 'var(--text-primary)' }">
          {{ heading }}
        </h2>
      </EditorInlineTextField>

      <!-- Editor mode: all cards visible as a stacked list -->
      <div v-if="inEditor" class="flex flex-col gap-6">
        <div
          v-for="(item, index) in items"
          :key="item.id ?? index"
          class="rounded-2xl p-8"
          :style="{ backgroundColor: 'var(--bg-surface)' }"
        >
          <UIcon
            name="i-lucide-quote"
            class="w-8 h-8 mb-4 opacity-20"
            :style="{ color: 'var(--primary)' }"
          />
          <EditorInlineRichField
            :field-key="`items.${index}.quote`"
            placeholder="Write a testimonial..."
            class="rich-text text-lg leading-relaxed mb-6"
            :style="{ color: 'var(--text-primary)' }"
            html
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-if="item.quote" v-html="sanitizeHtml(item.quote)" />
          </EditorInlineRichField>

          <div class="flex items-center gap-3">
            <img
              v-if="item.avatar"
              :src="item.avatar"
              :alt="item.author"
              class="w-10 h-10 rounded-full object-cover shrink-0"
            />
            <div
              v-else
              class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold"
              :style="{
                backgroundColor: 'color-mix(in srgb, var(--primary) 15%, var(--bg-surface))',
                color: 'var(--primary)',
              }"
            >
              {{ item.author?.charAt(0) ?? '?' }}
            </div>
            <div>
              <EditorInlineTextField
                :field-key="`items.${index}.author`"
                tag="p"
                class="font-semibold text-sm"
                :style="{ color: 'var(--text-primary)' }"
                :data-placeholder="item.author"
              >
                {{ item.author }}
              </EditorInlineTextField>
              <EditorInlineTextField
                :field-key="`items.${index}.role`"
                tag="p"
                class="text-sm"
                :style="{ color: 'var(--text-secondary)' }"
                :data-placeholder="item.role"
              >
                {{ item.role }}
              </EditorInlineTextField>
            </div>
          </div>
        </div>
      </div>

      <!-- Live mode: carousel -->
      <div v-else-if="items && items.length" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
        <!-- Card track + arrows share the same relative container so top-1/2 centers on the card, not the dots -->
        <div class="relative">
          <div class="overflow-hidden">
            <div
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${current * 100}%)` }"
            >
              <div
                v-for="(item, index) in items"
                :key="item.id ?? index"
                class="w-full shrink-0 px-1"
              >
                <div class="rounded-2xl p-8" :style="{ backgroundColor: 'var(--bg-surface)' }">
                  <UIcon
                    name="i-lucide-quote"
                    class="w-8 h-8 mb-4 opacity-20"
                    :style="{ color: 'var(--primary)' }"
                  />
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <div
                    v-if="item.quote"
                    class="rich-text text-lg leading-relaxed mb-6"
                    :style="{ color: 'var(--text-primary)' }"
                    v-html="sanitizeHtml(item.quote)"
                  />

                  <div class="flex items-center gap-3">
                    <img
                      v-if="item.avatar"
                      :src="item.avatar"
                      :alt="item.author"
                      class="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <div
                      v-else
                      class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold"
                      :style="{
                        backgroundColor:
                          'color-mix(in srgb, var(--primary) 15%, var(--bg-surface))',
                        color: 'var(--primary)',
                      }"
                    >
                      {{ item.author?.charAt(0) ?? '?' }}
                    </div>
                    <div>
                      <p class="font-semibold text-sm" :style="{ color: 'var(--text-primary)' }">
                        {{ item.author }}
                      </p>
                      <p class="text-sm" :style="{ color: 'var(--text-secondary)' }">
                        {{ item.role }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Prev / Next — inside the card-track wrapper so top-1/2 aligns to the card height -->
          <button
            v-if="items.length > 1"
            class="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-opacity hover:opacity-80"
            :style="{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }"
            aria-label="Previous"
            @click="prev"
          >
            <UIcon name="i-lucide-chevron-left" class="w-4 h-4" />
          </button>
          <button
            v-if="items.length > 1"
            class="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-opacity hover:opacity-80"
            :style="{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }"
            aria-label="Next"
            @click="next"
          >
            <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
          </button>
        </div>

        <!-- Dot indicators -->
        <div v-if="items.length > 1" class="flex justify-center gap-2 mt-6">
          <button
            v-for="(_, i) in items"
            :key="i"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :style="{
              backgroundColor:
                i === current
                  ? 'var(--primary)'
                  : 'color-mix(in srgb, var(--text-primary) 20%, transparent)',
              transform: i === current ? 'scale(1.25)' : 'scale(1)',
            }"
            :aria-label="`Go to slide ${i + 1}`"
            @click="current = i"
          />
        </div>
      </div>
    </div>
  </section>
</template>
