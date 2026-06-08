<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const openPanel = ref<'heading' | 'list' | 'align' | 'link' | null>(null);
const linkUrl = ref('');

const fmt = reactive({
  bold: false,
  italic: false,
  strike: false,
  code: false,
  underline: false,
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  bulletList: false,
  orderedList: false,
  blockquote: false,
  alignLeft: false,
  alignCenter: false,
  alignRight: false,
  link: false,
});

const activeHeading = computed(() => {
  for (const l of [1, 2, 3, 4, 5, 6] as const) if (fmt[`h${l}`]) return `H${l}`;
  return 'H';
});
const activeAlign = computed(() => {
  if (fmt.alignCenter) return 'i-lucide-align-center';
  if (fmt.alignRight) return 'i-lucide-align-right';
  return 'i-lucide-align-left';
});
const activeList = computed(() => {
  if (fmt.orderedList) return 'i-lucide-list-ordered';
  if (fmt.bulletList) return 'i-lucide-list';
  if (fmt.blockquote) return 'i-lucide-quote';
  return 'i-lucide-list';
});

function updateFmt() {
  if (!editor.value) return;
  const ed = editor.value;
  fmt.bold = ed.isActive('bold');
  fmt.italic = ed.isActive('italic');
  fmt.strike = ed.isActive('strike');
  fmt.code = ed.isActive('code');
  fmt.underline = ed.isActive('underline');
  for (const l of [1, 2, 3, 4, 5, 6] as const) fmt[`h${l}`] = ed.isActive('heading', { level: l });
  fmt.bulletList = ed.isActive('bulletList');
  fmt.orderedList = ed.isActive('orderedList');
  fmt.blockquote = ed.isActive('blockquote');
  fmt.alignLeft = ed.isActive({ textAlign: 'left' });
  fmt.alignCenter = ed.isActive({ textAlign: 'center' });
  fmt.alignRight = ed.isActive({ textAlign: 'right' });
  fmt.link = ed.isActive('link');
}

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Placeholder.configure({ placeholder: props.placeholder ?? '' }),
  ],
  editorProps: { attributes: { class: 'outline-none rich-text px-3 py-3 min-h-48 cursor-text' } },
  onUpdate({ editor: ed }) {
    emit('update:modelValue', ed.getHTML());
    updateFmt();
  },
  onSelectionUpdate: updateFmt,
  onFocus: updateFmt,
});

watch(
  () => props.modelValue,
  val => {
    if (!editor.value || editor.value.isFocused) return;
    if (editor.value.getHTML() !== val) editor.value.commands.setContent(val);
  },
);

onUnmounted(() => editor.value?.destroy());

function togglePanel(name: typeof openPanel.value) {
  openPanel.value = openPanel.value === name ? null : name;
  if (name === 'link') linkUrl.value = editor.value?.getAttributes('link').href ?? '';
}

function runAndClose(fn: () => void) {
  fn();
  openPanel.value = null;
}

function applyLink() {
  const url = linkUrl.value.trim();
  if (url) editor.value?.chain().focus().setLink({ href: url }).run();
  else editor.value?.chain().focus().unsetLink().run();
  openPanel.value = null;
}
</script>

<template>
  <div class="border border-default rounded-md overflow-hidden flex flex-col">
    <!-- Static toolbar -->
    <div
      class="flex flex-wrap items-center gap-0.5 border-b border-default bg-neutral-900 text-white px-1.5 py-1 text-sm select-none relative"
    >
      <!-- Heading panel -->
      <div
        v-if="openPanel === 'heading'"
        class="absolute top-full mt-1 left-2 z-10 bg-neutral-900 text-white rounded-lg shadow-xl p-1 flex gap-0.5"
      >
        <button
          v-for="lvl in [1, 2, 3, 4, 5, 6]"
          :key="lvl"
          class="tiptap-toolbar-btn text-xs font-semibold w-7"
          :class="{ active: fmt[`h${lvl}` as keyof typeof fmt] }"
          @click="
            runAndClose(() =>
              editor!
                .chain()
                .focus()
                .toggleHeading({ level: lvl as 1 | 2 | 3 | 4 | 5 | 6 })
                .run(),
            )
          "
        >
          H{{ lvl }}
        </button>
      </div>

      <!-- List panel -->
      <div
        v-if="openPanel === 'list'"
        class="absolute top-full mt-1 left-2 z-10 bg-neutral-900 text-white rounded-lg shadow-xl p-1 flex gap-0.5"
      >
        <button
          class="tiptap-toolbar-btn"
          :class="{ active: fmt.bulletList }"
          title="Bullet list"
          @click="runAndClose(() => editor!.chain().focus().toggleBulletList().run())"
        >
          <UIcon name="i-lucide-list" class="size-3.5" />
        </button>
        <button
          class="tiptap-toolbar-btn"
          :class="{ active: fmt.orderedList }"
          title="Numbered list"
          @click="runAndClose(() => editor!.chain().focus().toggleOrderedList().run())"
        >
          <UIcon name="i-lucide-list-ordered" class="size-3.5" />
        </button>
        <button
          class="tiptap-toolbar-btn"
          :class="{ active: fmt.blockquote }"
          title="Blockquote"
          @click="runAndClose(() => editor!.chain().focus().toggleBlockquote().run())"
        >
          <UIcon name="i-lucide-quote" class="size-3.5" />
        </button>
      </div>

      <!-- Align panel -->
      <div
        v-if="openPanel === 'align'"
        class="absolute top-full mt-1 left-2 z-10 bg-neutral-900 text-white rounded-lg shadow-xl p-1 flex gap-0.5"
      >
        <button
          class="tiptap-toolbar-btn"
          :class="{ active: fmt.alignLeft }"
          title="Align left"
          @click="runAndClose(() => editor!.chain().focus().setTextAlign('left').run())"
        >
          <UIcon name="i-lucide-align-left" class="size-3.5" />
        </button>
        <button
          class="tiptap-toolbar-btn"
          :class="{ active: fmt.alignCenter }"
          title="Align center"
          @click="runAndClose(() => editor!.chain().focus().setTextAlign('center').run())"
        >
          <UIcon name="i-lucide-align-center" class="size-3.5" />
        </button>
        <button
          class="tiptap-toolbar-btn"
          :class="{ active: fmt.alignRight }"
          title="Align right"
          @click="runAndClose(() => editor!.chain().focus().setTextAlign('right').run())"
        >
          <UIcon name="i-lucide-align-right" class="size-3.5" />
        </button>
      </div>

      <!-- Link panel -->
      <div
        v-if="openPanel === 'link'"
        class="absolute top-full mt-1 left-2 z-10 bg-neutral-900 text-white rounded-lg shadow-xl p-1.5 flex items-center gap-1 min-w-48"
      >
        <input
          v-model="linkUrl"
          placeholder="https://..."
          class="flex-1 bg-white/10 rounded px-2 py-0.5 text-xs outline-none placeholder:text-white/40"
          @keydown.enter.prevent="applyLink"
          @keydown.escape.prevent="openPanel = null"
        />
        <button class="tiptap-toolbar-btn bg-white/20 hover:bg-white/30 text-xs" @click="applyLink">
          Apply
        </button>
        <button
          v-if="fmt.link"
          class="tiptap-toolbar-btn text-xs text-red-400"
          @click="
            editor!.chain().focus().unsetLink().run();
            openPanel = null;
          "
        >
          <UIcon name="i-lucide-unlink" class="size-3.5" />
        </button>
      </div>

      <button
        class="tiptap-toolbar-btn font-bold"
        :class="{ active: fmt.bold }"
        title="Bold"
        @click="editor!.chain().focus().toggleBold().run()"
      >
        B
      </button>
      <button
        class="tiptap-toolbar-btn italic"
        :class="{ active: fmt.italic }"
        title="Italic"
        @click="editor!.chain().focus().toggleItalic().run()"
      >
        <em>I</em>
      </button>
      <button
        class="tiptap-toolbar-btn underline text-xs"
        :class="{ active: fmt.underline }"
        title="Underline"
        @click="editor!.chain().focus().toggleUnderline().run()"
      >
        U
      </button>
      <button
        class="tiptap-toolbar-btn line-through text-xs"
        :class="{ active: fmt.strike }"
        title="Strikethrough"
        @click="editor!.chain().focus().toggleStrike().run()"
      >
        S
      </button>
      <button
        class="tiptap-toolbar-btn font-mono text-xs"
        :class="{ active: fmt.code }"
        title="Code"
        @click="editor!.chain().focus().toggleCode().run()"
      >
        &lt;/&gt;
      </button>

      <div class="tiptap-toolbar-divider" />

      <button
        class="tiptap-toolbar-btn text-xs font-semibold w-7"
        :class="{
          active:
            openPanel === 'heading' || fmt.h1 || fmt.h2 || fmt.h3 || fmt.h4 || fmt.h5 || fmt.h6,
        }"
        title="Headings"
        @click="togglePanel('heading')"
      >
        {{ activeHeading }}
      </button>
      <button
        class="tiptap-toolbar-btn text-xs"
        :class="{
          active: openPanel === 'list' || fmt.bulletList || fmt.orderedList || fmt.blockquote,
        }"
        title="Lists"
        @click="togglePanel('list')"
      >
        <UIcon :name="activeList" class="size-3.5" />
      </button>
      <button
        class="tiptap-toolbar-btn text-xs"
        :class="{ active: openPanel === 'align' || fmt.alignCenter || fmt.alignRight }"
        title="Alignment"
        @click="togglePanel('align')"
      >
        <UIcon :name="activeAlign" class="size-3.5" />
      </button>

      <div class="tiptap-toolbar-divider" />

      <button
        class="tiptap-toolbar-btn text-xs"
        :class="{ active: openPanel === 'link' || fmt.link }"
        title="Link"
        @click="togglePanel('link')"
      >
        <UIcon name="i-lucide-link" class="size-3.5" />
      </button>
      <button
        class="tiptap-toolbar-btn text-xs"
        title="Horizontal rule"
        @click="editor!.chain().focus().setHorizontalRule().run()"
      >
        <UIcon name="i-lucide-minus" class="size-3.5" />
      </button>

      <div class="tiptap-toolbar-divider" />

      <button
        class="tiptap-toolbar-btn text-xs"
        title="Undo"
        @click="editor!.chain().focus().undo().run()"
      >
        <UIcon name="i-lucide-undo-2" class="size-3.5" />
      </button>
      <button
        class="tiptap-toolbar-btn text-xs"
        title="Redo"
        @click="editor!.chain().focus().redo().run()"
      >
        <UIcon name="i-lucide-redo-2" class="size-3.5" />
      </button>
    </div>

    <EditorContent :editor="editor" />
  </div>
</template>

<style scoped>
:deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: currentColor;
  opacity: 0.35;
  pointer-events: none;
  height: 0;
}
</style>
