<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import type { Block } from '@portfolio-builder/shared/types';
import type { BlockDefinition } from '~/config/blocks';
import { allBlockDefinitions } from '~/config/blocks';
import type PagebuilderLayersView from '~/components/pagebuilder/LayersView.vue';
import type PortfolioLayoutComp from '~/components/PortfolioLayout.vue';
import type { WidgetType } from '~/components/blocks/Header.vue';
import { portfolioSlugKey } from '~/utils/portfolioSlug';

type LayersViewInstance = InstanceType<typeof PagebuilderLayersView>;

const props = defineProps<{
  portfolioSlug: string;
  portfolioTitle: string;
  pageSlug: string;
  layersView: LayersViewInstance | null | undefined;
  liveThemeSettings?: {
    themeId?: string | null;
    mode?: string;
    fonts?: { heading: string; body: string } | null;
  } | null;
}>();

const liveThemeOverride = computed(() => props.liveThemeSettings ?? null);
const { cssVars, portfolioMode, navLinks, googleFontsUrl, logoLight, logoDark } = usePortfolio(
  props.portfolioSlug,
  liveThemeOverride,
);

provide(portfolioSlugKey, props.portfolioSlug);

// Local copy kept in sync with LayersView — VueDraggable mutates this directly
const localBlocks = ref<Block[]>([]);

watch(
  () => props.layersView?.contentBlocks,
  blocks => {
    // Only sync from outside when we're not mid-drag
    if (blocks) localBlocks.value = [...blocks];
  },
  { immediate: true, deep: true },
);

const headerBlock = computed(() => props.layersView?.headerBlock ?? null);
const footerBlock = computed(() => props.layersView?.footerBlock ?? null);

const headerContent = computed(() => {
  const block = headerBlock.value;
  if (!block) return undefined;
  const pending = pendingContentEdits.value[block.id];
  return pending
    ? { ...(block.content as Record<string, unknown>), ...pending }
    : (block.content as Record<string, unknown>);
});
const footerContent = computed(
  () => footerBlock.value?.content as Record<string, unknown> | undefined,
);

const { selectedBlock, selectBlock, clearSelection } = useSelectedBlock();

const blockEls = ref<Record<string, HTMLElement>>({});
function setBlockRef(id: string, el: unknown) {
  if (el) blockEls.value[id] = el as HTMLElement;
}

watch(selectedBlock, async block => {
  if (!block) return;
  await nextTick();
  blockEls.value[block.id]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
const { addPendingBlock, pendingNewBlocks, queueDeletion, setBlockContent, pendingContentEdits } =
  usePageEditor();

type LayoutInstance = InstanceType<typeof PortfolioLayoutComp>;
const portfolioLayout = useTemplateRef<LayoutInstance>('portfolioLayout');

defineExpose({ portfolioLayout });

function onHeaderSlotReorder(slots: {
  leftOrder: WidgetType[];
  centerOrder: WidgetType[];
  rightOrder: WidgetType[];
  topOrder: WidgetType[];
}) {
  const block = headerBlock.value;
  if (!block) return;
  const base = pendingContentEdits.value[block.id] ?? (block.content as Record<string, unknown>);
  setBlockContent(block.id, { ...base, ...slots });
}

const blockToDelete = ref<Block | null>(null);
const confirmDeleteOpen = ref(false);

function requestDelete(block: Block) {
  blockToDelete.value = block;
  confirmDeleteOpen.value = true;
}

function confirmDelete() {
  const block = blockToDelete.value;
  if (!block) return;
  if (block.id.startsWith('pending-')) {
    pendingNewBlocks.value = pendingNewBlocks.value.filter(b => b.id !== block.id);
  } else {
    queueDeletion(block.id);
  }
  if (selectedBlock.value?.id === block.id) clearSelection();
  blockToDelete.value = null;
  confirmDeleteOpen.value = false;
}

function isSelected(block: Block) {
  return selectedBlock.value?.id === block.id;
}

function onReorder() {
  props.layersView?.reorder([...localBlocks.value]);
}

function onBlockDragStart(event: DragEvent, block: Block) {
  const dt = event.dataTransfer;
  if (!dt) return;

  const label =
    allBlockDefinitions.find(d => d.type === block.type)?.label ??
    block.name ??
    block.type ??
    'Block';

  const pill = document.createElement('div');
  pill.textContent = label;
  Object.assign(pill.style, {
    position: 'fixed',
    top: '-1000px',
    left: '-1000px',
    padding: '6px 14px',
    background: 'rgb(1, 193, 106)',
    color: '#fff',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  });
  document.body.appendChild(pill);
  dt.setDragImage(pill, pill.offsetWidth / 2, 20);
  requestAnimationFrame(() => document.body.removeChild(pill));
}

// Called when a BlockDefinition is dropped in from the blocks tab
function onBlockDropped(event: { newIndex?: number }) {
  const idx = event.newIndex ?? localBlocks.value.length - 1;
  const dropped = localBlocks.value[idx] as Block | BlockDefinition;

  // If it looks like a BlockDefinition (has no `pageId`), replace it with a real pending block
  if (!('pageId' in dropped)) {
    const def = dropped as BlockDefinition;
    const newBlock = addPendingBlock(def.type, def.defaultContent ?? {});
    selectBlock(newBlock);
    localBlocks.value.splice(idx, 1, newBlock);
    props.layersView?.reorder([...localBlocks.value]);
  }
}
</script>

<template>
  <PortfolioLayout
    ref="portfolioLayout"
    is-editor
    :css-vars="cssVars"
    :portfolio-mode="portfolioMode"
    :site-name="portfolioTitle"
    :home-url="pageSlug === 'home' ? `/p/${portfolioSlug}` : `/p/${portfolioSlug}/${pageSlug}`"
    :nav-links="navLinks"
    :header-content="headerContent"
    :footer-content="footerContent"
    :google-fonts-url="googleFontsUrl"
    :logo-url="logoLight"
    :logo-url-dark="logoDark"
    :on-slot-reorder="onHeaderSlotReorder"
    @select-header="headerBlock && selectBlock(headerBlock)"
    @select-footer="footerBlock && selectBlock(footerBlock)"
    @click.capture="($event.target as HTMLElement).closest('a') && $event.preventDefault()"
  >
    <div class="relative min-h-64">
      <Transition name="fade">
        <div
          v-if="localBlocks.length === 0"
          class="absolute inset-0 flex flex-col items-center justify-center gap-3 py-24 text-center pointer-events-none select-none z-10"
        >
          <UIcon name="i-lucide-layout-template" class="size-10 text-muted opacity-40" />
          <p class="text-sm text-muted opacity-60">
            Drag a block here<br />
            to start building
          </p>
        </div>
      </Transition>
      <VueDraggable
        v-model="localBlocks"
        :group="{ name: 'blocks', pull: true, put: ['blocks'] }"
        :animation="150"
        handle=".block-drag-handle"
        filter=".ProseMirror"
        :prevent-on-filter="false"
        ghost-class="preview-drop-ghost"
        fallback-class="preview-drag-fallback"
        class="min-h-64 flex flex-col gap-2 py-2"
        @end="onReorder"
        @add="onBlockDropped"
      >
        <div
          v-for="block in localBlocks"
          :key="block.id"
          :ref="(el: unknown) => setBlockRef(block.id, el)"
          class="group/block relative min-h-16 after:absolute after:inset-0 after:pointer-events-none after:transition-[outline] after:duration-150 after:outline-2 after:-outline-offset-2"
          :class="isSelected(block) ? 'block-selected' : 'block-hoverable'"
          @dragstart="onBlockDragStart($event, block)"
          @click="selectBlock(block)"
        >
          <!-- Drag handle — visible on hover -->
          <div
            class="block-drag-handle w-8 h-8 flex justify-center items-center absolute top-2 left-1/2 -translate-x-1/2 z-10 cursor-grab active:cursor-grabbing opacity-0 group-hover/block:opacity-100 transition-opacity bg-black/50 rounded p-1"
          >
            <UIcon name="i-lucide-grip-horizontal" class="size-4 text-white" />
          </div>
          <!-- Delete button — visible on hover, top-right corner -->
          <button
            class="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center opacity-0 group-hover/block:opacity-100 transition-opacity bg-black/50 hover:bg-red-600 rounded"
            title="Delete block"
            @click.stop="requestDelete(block)"
          >
            <UIcon name="i-lucide-trash-2" class="size-3.5 text-white" />
          </button>
          <PagebuilderPreviewBlock :block="block">
            <BlocksRenderer :block="block" />
          </PagebuilderPreviewBlock>
        </div>
      </VueDraggable>
    </div>
  </PortfolioLayout>

  <AdminConfirmModal
    v-model:open="confirmDeleteOpen"
    title="Delete block?"
    :description="`'${blockToDelete?.name || blockToDelete?.type}' will be removed when you save.`"
    confirm-label="Delete"
    @confirm="confirmDelete"
    @cancel="confirmDeleteOpen = false"
  />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.block-selected::after {
  outline: 3px dashed var(--ui-primary);
}
.block-hoverable::after {
  outline: 3px dashed transparent;
}
.block-hoverable:hover::after {
  outline: 3px dashed color-mix(in srgb, var(--ui-primary) 60%, transparent);
}
</style>
