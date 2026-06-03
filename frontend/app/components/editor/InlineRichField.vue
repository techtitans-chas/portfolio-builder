<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { inlineEditorKey } from '~/utils/inlineEditor';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  fieldKey: string;
  placeholder?: string;
  /** Store full HTML instead of plain text (needed when rendered via v-html) */
  html?: boolean;
}>();

const ctx = inject(inlineEditorKey, null);
const value = computed(() => (ctx ? String(ctx.blockContent[props.fieldKey] ?? '') : ''));

const toolbarVisible = ref(false);
const toolbarStyle = ref<Record<string, string>>({});
const toolbarRef = useTemplateRef<HTMLElement>('toolbar');

// Which dropdown is open: 'heading' | 'list' | 'align' | 'link' | null
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
  if (fmt.h1) return 'H1';
  if (fmt.h2) return 'H2';
  if (fmt.h3) return 'H3';
  if (fmt.h4) return 'H4';
  if (fmt.h5) return 'H5';
  if (fmt.h6) return 'H6';
  return 'H';
});

const activeAlign = computed(() => {
  if (fmt.alignCenter) return 'i-lucide-align-center';
  if (fmt.alignRight) return 'i-lucide-align-right';
  return 'i-lucide-align-left';
});

const activeList = computed(() => {
  if (fmt.orderedList) return '1.';
  if (fmt.bulletList) return '•';
  return 'i-lucide-list';
});

function updateToolbar() {
  const ed = editor?.value;
  if (!ed) return;
  const { empty } = ed.state.selection;

  fmt.bold = ed.isActive('bold');
  fmt.italic = ed.isActive('italic');
  fmt.strike = ed.isActive('strike');
  fmt.code = ed.isActive('code');
  fmt.underline = ed.isActive('underline');
  fmt.h1 = ed.isActive('heading', { level: 1 });
  fmt.h2 = ed.isActive('heading', { level: 2 });
  fmt.h3 = ed.isActive('heading', { level: 3 });
  fmt.h4 = ed.isActive('heading', { level: 4 });
  fmt.h5 = ed.isActive('heading', { level: 5 });
  fmt.h6 = ed.isActive('heading', { level: 6 });
  fmt.bulletList = ed.isActive('bulletList');
  fmt.orderedList = ed.isActive('orderedList');
  fmt.blockquote = ed.isActive('blockquote');
  fmt.alignLeft = ed.isActive({ textAlign: 'left' });
  fmt.alignCenter = ed.isActive({ textAlign: 'center' });
  fmt.alignRight = ed.isActive({ textAlign: 'right' });
  fmt.link = ed.isActive('link');

  if (empty && openPanel.value === null) {
    toolbarVisible.value = false;
    return;
  }

  const domSelection = window.getSelection();
  if (!domSelection || domSelection.rangeCount === 0) return;
  const range = domSelection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  if (!rect.width && empty) return;

  toolbarVisible.value = true;
  toolbarStyle.value = {
    position: 'fixed',
    top: `${rect.top - 44}px`,
    left: `${rect.left + rect.width / 2}px`,
    transform: 'translateX(-50%)',
    zIndex: '9999',
  };
}

const editor = ctx
  ? useEditor({
      content: value.value,
      editable: ctx.isActive,
      extensions: [
        StarterKit,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Placeholder.configure({ placeholder: props.placeholder ?? '' }),
      ],
      editorProps: { attributes: { class: 'outline-none cursor-text rich-text' } },
      onUpdate({ editor }) {
        ctx.setField(props.fieldKey, props.html ? editor.getHTML() : editor.getText());
        updateToolbar();
      },
      onSelectionUpdate() {
        updateToolbar();
      },
      onBlur() {
        setTimeout(() => {
          if (!toolbarRef.value?.matches(':focus-within')) {
            toolbarVisible.value = false;
            openPanel.value = null;
          }
        }, 150);
      },
      onFocus() {
        updateToolbar();
      },
    })
  : null;

watch(value, v => {
  if (!editor?.value || editor.value.isFocused) return;
  const current = props.html ? editor.value.getHTML() : editor.value.getText();
  if (current !== v) editor.value.commands.setContent(v);
});

// Sync editability with block selection state
watch(
  () => ctx?.isActive,
  active => {
    if (!editor?.value) return;
    editor.value.setEditable(!!active);
    if (!active) {
      editor.value.commands.blur();
      toolbarVisible.value = false;
      openPanel.value = null;
    }
  },
);

onUnmounted(() => editor?.value?.destroy());

function togglePanel(name: typeof openPanel.value) {
  openPanel.value = openPanel.value === name ? null : name;
  if (name === 'link') {
    linkUrl.value = editor?.value?.getAttributes('link').href ?? '';
  }
}

function applyLink() {
  const url = linkUrl.value.trim();
  if (url) editor?.value?.chain().focus().setLink({ href: url }).run();
  else editor?.value?.chain().focus().unsetLink().run();
  openPanel.value = null;
}

function runAndClose(fn: () => void) {
  fn();
  openPanel.value = null;
}
</script>

<template>
  <template v-if="ctx && editor">
    <Teleport to="body">
      <div
        v-if="toolbarVisible"
        ref="toolbar"
        :style="toolbarStyle"
        class="relative"
        @mousedown.prevent
      >
        <!-- Popover panels — rendered above the toolbar -->
        <!-- Heading panel -->
        <div
          v-if="openPanel === 'heading'"
          class="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-neutral-900 text-white rounded-lg shadow-xl p-1 flex gap-0.5"
        >
          <button
            v-for="lvl in [1, 2, 3, 4, 5, 6]"
            :key="lvl"
            class="toolbar-btn text-xs font-semibold w-7"
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
          class="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-neutral-900 text-white rounded-lg shadow-xl p-1 flex gap-0.5"
        >
          <button
            class="toolbar-btn text-xs"
            :class="{ active: fmt.bulletList }"
            title="Bullet list"
            @click="runAndClose(() => editor!.chain().focus().toggleBulletList().run())"
          >
            <UIcon name="i-lucide-list" class="size-3.5" />
          </button>
          <button
            class="toolbar-btn text-xs"
            :class="{ active: fmt.orderedList }"
            title="Numbered list"
            @click="runAndClose(() => editor!.chain().focus().toggleOrderedList().run())"
          >
            <UIcon name="i-lucide-list-ordered" class="size-3.5" />
          </button>
          <button
            class="toolbar-btn text-xs"
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
          class="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-neutral-900 text-white rounded-lg shadow-xl p-1 flex gap-0.5"
        >
          <button
            class="toolbar-btn text-xs"
            :class="{ active: fmt.alignLeft }"
            title="Align left"
            @click="runAndClose(() => editor!.chain().focus().setTextAlign('left').run())"
          >
            <UIcon name="i-lucide-align-left" class="size-3.5" />
          </button>
          <button
            class="toolbar-btn text-xs"
            :class="{ active: fmt.alignCenter }"
            title="Align center"
            @click="runAndClose(() => editor!.chain().focus().setTextAlign('center').run())"
          >
            <UIcon name="i-lucide-align-center" class="size-3.5" />
          </button>
          <button
            class="toolbar-btn text-xs"
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
          class="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-neutral-900 text-white rounded-lg shadow-xl p-1.5 flex items-center gap-1 min-w-48"
        >
          <input
            v-model="linkUrl"
            placeholder="https://..."
            class="flex-1 bg-white/10 rounded px-2 py-0.5 text-xs outline-none placeholder:text-white/40"
            @keydown.enter.prevent="applyLink"
            @keydown.escape.prevent="openPanel = null"
          />
          <button class="toolbar-btn text-xs bg-white/20 hover:bg-white/30" @click="applyLink">
            Apply
          </button>
          <button
            v-if="fmt.link"
            class="toolbar-btn text-xs text-red-400"
            @click="
              editor!.chain().focus().unsetLink().run();
              openPanel = null;
            "
          >
            <UIcon name="i-lucide-unlink" class="size-3.5" />
          </button>
        </div>

        <!-- Main toolbar row -->
        <div
          class="flex items-center gap-0.5 bg-neutral-900 text-white rounded-lg shadow-xl px-1.5 py-1 text-sm select-none"
        >
          <!-- Bold / Italic / Underline / Strike / Code -->
          <button
            class="toolbar-btn font-bold"
            :class="{ active: fmt.bold }"
            title="Bold"
            @click="editor!.chain().focus().toggleBold().run()"
          >
            B
          </button>
          <button
            class="toolbar-btn italic"
            :class="{ active: fmt.italic }"
            title="Italic"
            @click="editor!.chain().focus().toggleItalic().run()"
          >
            <em>I</em>
          </button>
          <button
            class="toolbar-btn underline text-xs"
            :class="{ active: fmt.underline }"
            title="Underline"
            @click="editor!.chain().focus().toggleUnderline().run()"
          >
            U
          </button>
          <button
            class="toolbar-btn line-through text-xs"
            :class="{ active: fmt.strike }"
            title="Strikethrough"
            @click="editor!.chain().focus().toggleStrike().run()"
          >
            S
          </button>
          <button
            class="toolbar-btn font-mono text-xs"
            :class="{ active: fmt.code }"
            title="Inline code"
            @click="editor!.chain().focus().toggleCode().run()"
          >
            &lt;/&gt;
          </button>

          <div class="toolbar-divider" />

          <!-- Heading dropdown trigger -->
          <button
            class="toolbar-btn text-xs font-semibold w-7"
            :class="{
              active:
                openPanel === 'heading' || fmt.h1 || fmt.h2 || fmt.h3 || fmt.h4 || fmt.h5 || fmt.h6,
            }"
            title="Headings"
            @click="togglePanel('heading')"
          >
            {{ activeHeading }}
          </button>

          <!-- List dropdown trigger -->
          <button
            class="toolbar-btn text-xs"
            :class="{
              active: openPanel === 'list' || fmt.bulletList || fmt.orderedList || fmt.blockquote,
            }"
            title="Lists"
            @click="togglePanel('list')"
          >
            <UIcon
              :name="
                typeof activeList === 'string' && activeList.startsWith('i-')
                  ? activeList
                  : 'i-lucide-list'
              "
              class="size-3.5"
            />
          </button>

          <!-- Align dropdown trigger -->
          <button
            class="toolbar-btn text-xs"
            :class="{ active: openPanel === 'align' || fmt.alignCenter || fmt.alignRight }"
            title="Text alignment"
            @click="togglePanel('align')"
          >
            <UIcon :name="activeAlign" class="size-3.5" />
          </button>

          <div class="toolbar-divider" />

          <!-- Link -->
          <button
            class="toolbar-btn text-xs"
            :class="{ active: openPanel === 'link' || fmt.link }"
            title="Link"
            @click="togglePanel('link')"
          >
            <UIcon name="i-lucide-link" class="size-3.5" />
          </button>

          <!-- HR -->
          <button
            class="toolbar-btn text-xs"
            title="Horizontal rule"
            @click="editor!.chain().focus().setHorizontalRule().run()"
          >
            <UIcon name="i-lucide-minus" class="size-3.5" />
          </button>

          <div class="toolbar-divider" />

          <!-- Undo / Redo -->
          <button
            class="toolbar-btn text-xs"
            title="Undo"
            @click="editor!.chain().focus().undo().run()"
          >
            <UIcon name="i-lucide-undo-2" class="size-3.5" />
          </button>
          <button
            class="toolbar-btn text-xs"
            title="Redo"
            @click="editor!.chain().focus().redo().run()"
          >
            <UIcon name="i-lucide-redo-2" class="size-3.5" />
          </button>
        </div>
      </div>
    </Teleport>

    <EditorContent :editor="editor" :class="$attrs.class" />
  </template>
  <slot v-else />
</template>

<style scoped>
@reference "~/assets/css/main.css";

:deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: currentColor;
  opacity: 0.35;
  pointer-events: none;
  height: 0;
}

.toolbar-btn {
  @apply px-1.5 py-0.5 rounded transition-colors hover:bg-white/10 leading-none flex items-center justify-center min-w-[1.5rem];
}
.toolbar-btn.active {
  @apply bg-white/20;
}
.toolbar-divider {
  @apply w-px h-4 bg-white/20 mx-0.5 shrink-0;
}
</style>
