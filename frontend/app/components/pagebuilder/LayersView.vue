<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import type { Block } from '@portfolio-builder/shared/types';

const props = defineProps<{
  portfolioId: string | null;
  pageId: string | null;
}>();

const { fetcher } = useApi();

// Local working copy of blocks for this page (excludes header/footer — those are pinned)
const contentBlocks = ref<Block[]>([]);
const headerBlock = ref<Block | null>(null);
const footerBlock = ref<Block | null>(null);
const loading = ref(false);
const error = ref('');

// Track which blocks had their visibility toggled (blockId → isVisible)
const visibilityChanges = ref<Record<string, boolean>>({});
// Ordered IDs of content blocks after drag (null means unchanged)
const reorderedIds = ref<string[] | null>(null);

// Resolved page ID — uses prop if provided, otherwise falls back to home page
const resolvedPageId = ref<string | null>(null);

async function resolvePageId() {
  if (!props.portfolioId) {
    resolvedPageId.value = null;
    return;
  }
  if (props.pageId) {
    resolvedPageId.value = props.pageId;
    return;
  }
  // No pageId provided — look up the home page
  try {
    const data = await fetcher(`/api/portfolios/${props.portfolioId}/pages`, {
      credentials: 'include',
    });
    const pages: { id: string; slug: string }[] = data.pages ?? [];
    const home = pages.find(p => p.slug === 'home') ?? pages[0] ?? null;
    resolvedPageId.value = home?.id ?? null;
  } catch {
    resolvedPageId.value = null;
  }
}

async function fetchBlocks() {
  if (!props.portfolioId || !resolvedPageId.value) return;

  loading.value = true;
  error.value = '';
  visibilityChanges.value = {};
  reorderedIds.value = null;

  try {
    const data = await fetcher(
      `/api/portfolios/${props.portfolioId}/pages/${resolvedPageId.value}/blocks`,
      { credentials: 'include' },
    );
    const all: Block[] = data.blocks ?? [];
    headerBlock.value = all.find(b => b.type === 'header') ?? null;
    footerBlock.value = all.find(b => b.type === 'footer') ?? null;
    contentBlocks.value = all.filter(b => b.type !== 'header' && b.type !== 'footer');
  } catch {
    error.value = 'Failed to load blocks';
  } finally {
    loading.value = false;
  }
}

watch(
  () => [props.portfolioId, props.pageId],
  async () => {
    await resolvePageId();
    await fetchBlocks();
  },
  { immediate: true },
);

function toggleVisibility(block: Block) {
  block.isVisible = !block.isVisible;
  visibilityChanges.value[block.id] = block.isVisible;
}

function toggleHeaderVisibility() {
  if (!headerBlock.value) return;
  headerBlock.value.isVisible = !headerBlock.value.isVisible;
  visibilityChanges.value[headerBlock.value.id] = headerBlock.value.isVisible;
}

function toggleFooterVisibility() {
  if (!footerBlock.value) return;
  footerBlock.value.isVisible = !footerBlock.value.isVisible;
  visibilityChanges.value[footerBlock.value.id] = footerBlock.value.isVisible;
}

function onReorder() {
  reorderedIds.value = contentBlocks.value.map(b => b.id);
}

// Exposed so index.vue save() can read and flush pending changes
const layersChanges = computed(() => ({
  visibilityChanges: visibilityChanges.value,
  reorderedIds: reorderedIds.value,
}));

defineExpose({
  layersChanges,
  portfolioId: computed(() => props.portfolioId),
  pageId: resolvedPageId,
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <div v-if="loading" class="text-sm text-muted py-4 text-center">Loading…</div>
    <div v-else-if="error" class="text-sm text-error py-2">{{ error }}</div>
    <template v-else>
      <!-- Pinned header block -->
      <div
        v-if="headerBlock"
        class="flex items-center gap-1.5 px-2 py-1.5 text-sm rounded-md bg-elevated/30"
      >
        <UIcon name="i-lucide-panel-top" class="size-4 text-muted shrink-0" />
        <span class="flex-1 truncate capitalize">{{ headerBlock.type }}</span>
        <div class="flex -my-0.5">
          <UButton
            :icon="headerBlock.isVisible ? 'i-lucide-eye' : 'i-lucide-eye-off'"
            color="neutral"
            variant="ghost"
            size="xs"
            :class="headerBlock.isVisible ? 'text-highlighted' : 'text-muted'"
            class="hover:text-highlighted hover:bg-accented/50"
            @click="toggleHeaderVisibility"
          />
          <UButton
            icon="i-lucide-lock"
            color="neutral"
            variant="ghost"
            size="xs"
            class="text-muted cursor-default"
            disabled
          />
        </div>
      </div>

      <!-- Draggable content blocks -->
      <VueDraggable
        v-model="contentBlocks"
        handle=".drag-handle"
        class="flex flex-col gap-1"
        @end="onReorder"
      >
        <div
          v-for="block in contentBlocks"
          :key="block.id"
          class="flex items-center gap-1.5 px-2 py-1.5 text-sm rounded-md hover:bg-elevated/50"
          :class="{ 'opacity-50': !block.isVisible }"
        >
          <UIcon
            name="i-lucide-grip-vertical"
            class="drag-handle size-4 text-muted shrink-0 -ml-1 cursor-grab active:cursor-grabbing"
          />
          <span class="flex-1 truncate capitalize">{{ block.type }}</span>
          <div class="flex -my-0.5">
            <UButton
              :icon="block.isVisible ? 'i-lucide-eye' : 'i-lucide-eye-off'"
              color="neutral"
              variant="ghost"
              size="xs"
              :class="block.isVisible ? 'text-highlighted' : 'text-muted'"
              class="hover:text-highlighted hover:bg-accented/50"
              @click="toggleVisibility(block)"
            />
            <UButton
              icon="i-lucide-trash"
              color="neutral"
              variant="ghost"
              size="xs"
              class="text-muted hover:text-highlighted hover:bg-accented/50"
            />
          </div>
        </div>
      </VueDraggable>

      <!-- Pinned footer block -->
      <div
        v-if="footerBlock"
        class="flex items-center gap-1.5 px-2 py-1.5 text-sm rounded-md bg-elevated/30"
      >
        <UIcon name="i-lucide-panel-bottom" class="size-4 text-muted shrink-0" />
        <span class="flex-1 truncate capitalize">{{ footerBlock.type }}</span>
        <div class="flex -my-0.5">
          <UButton
            :icon="footerBlock.isVisible ? 'i-lucide-eye' : 'i-lucide-eye-off'"
            color="neutral"
            variant="ghost"
            size="xs"
            :class="footerBlock.isVisible ? 'text-highlighted' : 'text-muted'"
            class="hover:text-highlighted hover:bg-accented/50"
            @click="toggleFooterVisibility"
          />
          <UButton
            icon="i-lucide-lock"
            color="neutral"
            variant="ghost"
            size="xs"
            class="text-muted cursor-default"
            disabled
          />
        </div>
      </div>
    </template>
  </div>
</template>
