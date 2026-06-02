<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
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

// Toolbar visibility and position
const toolbarVisible = ref(false);
const toolbarStyle = ref<Record<string, string>>({});
const toolbarRef = useTemplateRef<HTMLElement>('toolbar');

const isBold = ref(false);
const isItalic = ref(false);
const isHeading1 = ref(false);
const isHeading2 = ref(false);
const isBulletList = ref(false);

function updateToolbar() {
  const ed = editor?.value;
  if (!ed) return;
  const { empty } = ed.state.selection;
  isBold.value = ed.isActive('bold');
  isItalic.value = ed.isActive('italic');
  isHeading1.value = ed.isActive('heading', { level: 1 });
  isHeading2.value = ed.isActive('heading', { level: 2 });
  isBulletList.value = ed.isActive('bulletList');

  if (empty) {
    toolbarVisible.value = false;
    return;
  }

  // Position toolbar above the selection
  const domSelection = window.getSelection();
  if (!domSelection || domSelection.rangeCount === 0) return;
  const range = domSelection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  if (!rect.width) return;

  toolbarVisible.value = true;
  // Use fixed positioning relative to viewport; toolbar is in a portal-like fixed div
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
      extensions: [StarterKit, Placeholder.configure({ placeholder: props.placeholder ?? '' })],
      editorProps: {
        attributes: { class: 'outline-none cursor-text rich-text' },
      },
      onUpdate({ editor }) {
        ctx.setField(props.fieldKey, props.html ? editor.getHTML() : editor.getText());
        updateToolbar();
      },
      onSelectionUpdate() {
        updateToolbar();
      },
      onBlur() {
        // Delay so toolbar button clicks register before hiding
        setTimeout(() => {
          if (!toolbarRef.value?.matches(':focus-within')) {
            toolbarVisible.value = false;
          }
        }, 150);
      },
      onFocus() {
        updateToolbar();
      },
    })
  : null;

// Sync external changes (e.g. sidebar edit) into Tiptap without triggering onUpdate loop
watch(value, v => {
  if (!editor?.value || editor.value.isFocused) return;
  const current = props.html ? editor.value.getHTML() : editor.value.getText();
  if (current !== v) editor.value.commands.setContent(v);
});

onUnmounted(() => editor?.value?.destroy());
</script>

<template>
  <template v-if="ctx && editor">
    <!-- Floating toolbar — rendered in a Teleport so it escapes overflow:hidden parents -->
    <Teleport to="body">
      <div
        v-if="toolbarVisible"
        ref="toolbar"
        :style="toolbarStyle"
        class="flex items-center gap-0.5 bg-neutral-900 text-white rounded-lg shadow-xl px-1.5 py-1 text-sm select-none"
        @mousedown.prevent
      >
        <button
          class="px-2 py-0.5 rounded font-bold transition-colors"
          :class="isBold ? 'bg-white/20' : 'hover:bg-white/10'"
          @click="editor!.chain().focus().toggleBold().run()"
        >
          B
        </button>
        <button
          class="px-2 py-0.5 rounded italic transition-colors"
          :class="isItalic ? 'bg-white/20' : 'hover:bg-white/10'"
          @click="editor!.chain().focus().toggleItalic().run()"
        >
          <em>I</em>
        </button>
        <div class="w-px h-4 bg-white/20 mx-0.5" />
        <button
          class="px-2 py-0.5 rounded font-semibold transition-colors text-xs"
          :class="isHeading1 ? 'bg-white/20' : 'hover:bg-white/10'"
          @click="editor!.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          H1
        </button>
        <button
          class="px-2 py-0.5 rounded font-semibold transition-colors text-xs"
          :class="isHeading2 ? 'bg-white/20' : 'hover:bg-white/10'"
          @click="editor!.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          H2
        </button>
        <div class="w-px h-4 bg-white/20 mx-0.5" />
        <button
          class="px-2 py-0.5 rounded transition-colors text-xs"
          :class="isBulletList ? 'bg-white/20' : 'hover:bg-white/10'"
          @click="editor!.chain().focus().toggleBulletList().run()"
        >
          • List
        </button>
      </div>
    </Teleport>

    <EditorContent :editor="editor" :class="$attrs.class" />
  </template>
  <slot v-else />
</template>
