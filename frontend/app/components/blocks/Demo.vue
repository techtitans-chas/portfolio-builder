<script setup lang="ts">
export interface DemoBlockProps {
  // Tab 1 — Text fields
  textField?: string;
  textareaField?: string;
  urlField?: string;
  inlineTextField?: string;
  inlineRichField?: string;
  // Tab 2 — Choices
  selectField?: string;
  checkboxField?: boolean;
  fontField?: string;
  colorField?: string;
  themeColorField?: string | null;
  // Tab 3 — Media
  imageField?: string | null;
  fileField?: string | null;
  // Tab 4 — List
  listField?: { id: string; label: string; url: string }[];
}

const props = withDefaults(defineProps<DemoBlockProps>(), {
  textField: '',
  textareaField: '',
  urlField: '',
  inlineTextField: 'Inline text (click to edit)',
  inlineRichField: '',
  selectField: 'option-a',
  checkboxField: false,
  fontField: '',
  colorField: '#6c8fff',
  themeColorField: null,
  imageField: null,
  fileField: null,
  listField: () => [],
});
</script>

<template>
  <section
    class="px-8 py-12 flex flex-col gap-6"
    :style="themeColorField ? { backgroundColor: `var(--palette-${themeColorField})` } : {}"
  >
    <p class="text-xs uppercase tracking-widest font-semibold opacity-40">Demo Block</p>

    <div>
      <EditorInlineTextField field-key="inlineTextField" tag="h2" class="text-3xl font-bold">
        {{ inlineTextField }}
      </EditorInlineTextField>
    </div>

    <div class="rich-text">
      <EditorInlineRichField
        field-key="inlineRichField"
        placeholder="Rich text field (click to edit)"
        html
        class="w-full"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-if="inlineRichField" v-html="inlineRichField" />
      </EditorInlineRichField>
    </div>

    <div class="grid grid-cols-2 gap-4 text-sm">
      <div v-if="textField" class="flex flex-col gap-1">
        <span class="text-xs opacity-50">text</span>
        <span>{{ textField }}</span>
      </div>
      <div v-if="textareaField" class="flex flex-col gap-1">
        <span class="text-xs opacity-50">textarea</span>
        <span class="whitespace-pre-wrap">{{ textareaField }}</span>
      </div>
      <div v-if="urlField" class="flex flex-col gap-1">
        <span class="text-xs opacity-50">url</span>
        <a :href="urlField" class="underline break-all">{{ urlField }}</a>
      </div>
      <div v-if="selectField" class="flex flex-col gap-1">
        <span class="text-xs opacity-50">select</span>
        <span>{{ selectField }}</span>
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-xs opacity-50">checkbox</span>
        <span>{{ checkboxField ? 'true' : 'false' }}</span>
      </div>
      <div v-if="fontField" class="flex flex-col gap-1">
        <span class="text-xs opacity-50">font</span>
        <span :style="{ fontFamily: fontField }">{{ fontField }}</span>
      </div>
      <div v-if="colorField" class="flex items-center gap-2">
        <span class="text-xs opacity-50">color</span>
        <span
          class="size-5 rounded border border-default inline-block"
          :style="{ backgroundColor: colorField }"
        />
        <span>{{ colorField }}</span>
      </div>
      <div v-if="themeColorField" class="flex items-center gap-2">
        <span class="text-xs opacity-50">theme-color</span>
        <span
          class="size-5 rounded border border-default inline-block"
          :style="{ backgroundColor: `var(--palette-${themeColorField})` }"
        />
        <span>{{ themeColorField }}</span>
      </div>
    </div>

    <div v-if="imageField" class="flex flex-col gap-1">
      <span class="text-xs opacity-50">image</span>
      <img :src="imageField" alt="" class="max-h-48 rounded object-cover" />
    </div>

    <div v-if="fileField" class="flex flex-col gap-1">
      <span class="text-xs opacity-50">file</span>
      <a :href="fileField" class="underline text-sm break-all">{{ fileField.split('/').at(-1) }}</a>
    </div>

    <div v-if="listField?.length" class="flex flex-col gap-2">
      <span class="text-xs opacity-50">list</span>
      <div v-for="(item, i) in listField" :key="item.id ?? i" class="flex gap-3 text-sm">
        <span class="opacity-50">{{ i + 1 }}.</span>
        <span>{{ item.label }}</span>
        <a v-if="item.url" :href="item.url" class="underline opacity-60">{{ item.url }}</a>
      </div>
    </div>
  </section>
</template>
