<script setup lang="ts">
import type { Block } from '@portfolio-builder/shared/types';
import type PagebuilderLayersView from '~/components/pagebuilder/LayersView.vue';

type LayersViewInstance = InstanceType<typeof PagebuilderLayersView>;

const props = defineProps<{
  portfolioSlug: string;
  portfolioTitle: string;
  layersView: LayersViewInstance | null | undefined;
}>();

const { cssVars, portfolioMode, navLinks } = usePortfolio(props.portfolioSlug);

const contentBlocks = computed(() => props.layersView?.contentBlocks ?? []);
const headerBlock = computed(() => props.layersView?.headerBlock ?? null);
const footerBlock = computed(() => props.layersView?.footerBlock ?? null);

const headerContent = computed(
  () => headerBlock.value?.content as Record<string, unknown> | undefined,
);
const footerContent = computed(
  () => footerBlock.value?.content as Record<string, unknown> | undefined,
);

const { selectedBlock, selectBlock } = useSelectedBlock();

function isSelected(block: Block) {
  return selectedBlock.value?.id === block.id;
}
</script>

<template>
  <PortfolioLayout
    is-editor
    :css-vars="cssVars"
    :portfolio-mode="portfolioMode"
    :site-name="portfolioTitle"
    :home-url="`/p/${portfolioSlug}`"
    :nav-links="navLinks"
    :header-content="headerContent"
    :footer-content="footerContent"
    @select-header="headerBlock && selectBlock(headerBlock)"
    @select-footer="footerBlock && selectBlock(footerBlock)"
  >
    <div
      v-for="block in contentBlocks"
      :key="block.id"
      class="relative cursor-pointer after:absolute after:inset-0 after:pointer-events-none after:ring-2 after:ring-inset after:transition-shadow after:duration-150"
      :class="
        isSelected(block)
          ? 'after:ring-primary'
          : 'after:ring-transparent hover:after:ring-primary/60'
      "
      @click="selectBlock(block)"
    >
      <BlocksRenderer :block="block" />
    </div>
  </PortfolioLayout>
</template>
