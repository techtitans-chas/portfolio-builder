<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import type { Block } from '@portfolio-builder/shared/types';
import type { BlockDefinition } from '~/config/blocks';
import type PagebuilderLayersView from '~/components/pagebuilder/LayersView.vue';

type LayersViewInstance = InstanceType<typeof PagebuilderLayersView>;

const props = defineProps<{
  portfolioSlug: string;
  portfolioTitle: string;
  pageSlug: string;
  layersView: LayersViewInstance | null | undefined;
}>();

const { cssVars, portfolioMode, navLinks } = usePortfolio(props.portfolioSlug);

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

const { selectedBlock, selectBlock } = useSelectedBlock();
const { addPendingBlock } = usePageEditor();

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
    @select-header="headerBlock && selectBlock(headerBlock)"
    @select-footer="footerBlock && selectBlock(footerBlock)"
  >
    <VueDraggable
      v-model="localBlocks"
      :group="{ name: 'blocks', pull: true, put: true }"
      :animation="150"
      handle=".block-drag-handle"
      class="min-h-16"
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
        <BlocksRenderer :block="block" />
      </div>
    </VueDraggable>
  </PortfolioLayout>
</template>
