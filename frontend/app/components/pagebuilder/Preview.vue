<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import type { Block } from '@portfolio-builder/shared/types';
import type { BlockDefinition } from '~/config/blocks';
import type PagebuilderLayersView from '~/components/pagebuilder/LayersView.vue';
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
const { cssVars, portfolioMode, navLinks, googleFontsUrl } = usePortfolio(
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

const headerContent = computed(
  () => headerBlock.value?.content as Record<string, unknown> | undefined,
);
const footerContent = computed(
  () => footerBlock.value?.content as Record<string, unknown> | undefined,
);

const { selectedBlock, selectBlock, clearSelection } = useSelectedBlock();
const { addPendingBlock, pendingNewBlocks, queueDeletion } = usePageEditor();

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
    is-editor
    :css-vars="cssVars"
    :portfolio-mode="portfolioMode"
    :site-name="portfolioTitle"
    :home-url="pageSlug === 'home' ? `/p/${portfolioSlug}` : `/p/${portfolioSlug}/${pageSlug}`"
    :nav-links="navLinks"
    :header-content="headerContent"
    :footer-content="footerContent"
    :google-fonts-url="googleFontsUrl"
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
        class="min-h-64"
        @end="onReorder"
        @add="onBlockDropped"
      >
        <div
          v-for="block in localBlocks"
          :key="block.id"
          class="group/block relative after:absolute after:inset-0 after:pointer-events-none after:ring-2 after:ring-inset after:transition-shadow after:duration-150"
          :class="
            isSelected(block)
              ? 'after:ring-primary'
              : 'after:ring-transparent hover:after:ring-primary/60'
          "
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
</style>
