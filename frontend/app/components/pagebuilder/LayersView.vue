<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import type { Block } from '@portfolio-builder/shared/types';

const props = defineProps<{
  portfolioId: string | null;
  pageId: string | null;
}>();

const { fetcher } = useApi();
const { pendingNewBlocks, pendingDeletions, pendingContentEdits, queueDeletion, setCurrentPage } =
  usePageEditor();

const blockToDelete = ref<Block | null>(null);
const confirmDeleteOpen = ref(false);

function requestDelete(block: Block) {
  blockToDelete.value = block;
  confirmDeleteOpen.value = true;
}

function confirmDelete() {
  if (!blockToDelete.value) return;
  const id = blockToDelete.value.id;
  if (id.startsWith('pending-')) {
    pendingNewBlocks.value = pendingNewBlocks.value.filter(b => b.id !== id);
  } else {
    queueDeletion(id);
  }
  blockToDelete.value = null;
  confirmDeleteOpen.value = false;
}

// Blocks loaded from DB for this page (excludes header/footer)
const dbContentBlocks = ref<Block[]>([]);
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
  explicitOrder.value = null;

  try {
    const data = await fetcher(
      `/api/portfolios/${props.portfolioId}/pages/${resolvedPageId.value}/blocks`,
      { credentials: 'include' },
    );
    const all: Block[] = data.blocks ?? [];
    headerBlock.value = all.find(b => b.type === 'header') ?? null;
    footerBlock.value = all.find(b => b.type === 'footer') ?? null;
    dbContentBlocks.value = all.filter(b => b.type !== 'header' && b.type !== 'footer');
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

watch(resolvedPageId, id => setCurrentPage(id), { immediate: true });

const { selectBlock, selectedBlock } = useSelectedBlock();

// Merge DB blocks with pending new ones into a draggable ref
const contentBlocks = ref<Block[]>([]);

// Explicit user-defined order as an array of IDs; null means use default (db then pending)
const explicitOrder = ref<string[] | null>(null);

function applyPendingContent(block: Block): Block {
  const edits = pendingContentEdits.value[block.id];
  return edits ? { ...block, content: { ...block.content, ...edits } } : block;
}

watch(
  [dbContentBlocks, pendingNewBlocks, pendingDeletions, pendingContentEdits, resolvedPageId],
  () => {
    const pageNewBlocks = pendingNewBlocks.value.filter(b => b.pageId === resolvedPageId.value);
    const allBlocks = new Map<string, Block>(
      [...dbContentBlocks.value, ...pageNewBlocks].map(b => [b.id, applyPendingContent(b)]),
    );

    const order = explicitOrder.value;
    if (order) {
      // Honour explicit order, then append any new blocks not yet in it
      const ordered = order.flatMap(id => {
        const b = allBlocks.get(id);
        return b && !pendingDeletions.value.has(id) ? [b] : [];
      });
      const inOrder = new Set(order);
      const appended = [...allBlocks.values()].filter(
        b => !inOrder.has(b.id) && !pendingDeletions.value.has(b.id),
      );
      contentBlocks.value = [...ordered, ...appended];
    } else {
      contentBlocks.value = [...allBlocks.values()].filter(b => !pendingDeletions.value.has(b.id));
    }
  },
  { immediate: true, deep: true },
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
  explicitOrder.value = contentBlocks.value.map(b => b.id);
  reorderedIds.value = contentBlocks.value.filter(b => !b.id.startsWith('pending-')).map(b => b.id);
}

function reorder(newList: Block[]) {
  explicitOrder.value = newList.map(b => b.id);
  reorderedIds.value = newList.filter(b => !b.id.startsWith('pending-')).map(b => b.id);
}

// Exposed so index.vue save() can read and flush pending changes
const layersChanges = computed(() => ({
  visibilityChanges: visibilityChanges.value,
  reorderedIds: reorderedIds.value,
}));

const liveHeaderBlock = computed(() =>
  headerBlock.value ? applyPendingContent(headerBlock.value) : null,
);
const liveFooterBlock = computed(() =>
  footerBlock.value ? applyPendingContent(footerBlock.value) : null,
);

defineExpose({
  layersChanges,
  portfolioId: computed(() => props.portfolioId),
  pageId: resolvedPageId,
  refresh: fetchBlocks,
  contentBlocks,
  headerBlock: liveHeaderBlock,
  footerBlock: liveFooterBlock,
  reorder,
});
</script>

<template>
  <div>
    <div class="flex flex-col gap-1">
      <div v-if="loading" class="text-sm text-muted py-4 text-center">Loading…</div>
      <div v-else-if="error" class="text-sm text-error py-2">{{ error }}</div>
      <template v-else>
        <!-- Pinned header block -->
        <div
          v-if="headerBlock"
          class="flex items-center gap-1.5 px-2 py-1.5 text-sm rounded-md cursor-pointer"
          :class="
            selectedBlock?.id === headerBlock.id
              ? 'bg-elevated'
              : 'bg-elevated/30 hover:bg-elevated/60'
          "
          @click="selectBlock(headerBlock)"
        >
          <UIcon name="i-lucide-panel-top" class="size-4 text-muted shrink-0" />
          <span class="flex-1 truncate min-w-0">
            <span class="block truncate">{{ headerBlock.name || headerBlock.type }}</span>
            <span v-if="headerBlock.name" class="block text-xs text-muted capitalize">{{
              headerBlock.type
            }}</span>
          </span>
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
            class="flex items-center gap-1.5 px-2 py-1.5 text-sm rounded-md cursor-pointer"
            :class="[
              selectedBlock?.id === block.id ? 'bg-elevated' : 'hover:bg-elevated/50',
              { 'opacity-50': !block.isVisible },
            ]"
            @click="selectBlock(block)"
          >
            <UIcon
              name="i-lucide-grip-vertical"
              class="drag-handle size-4 text-muted shrink-0 -ml-1 cursor-grab active:cursor-grabbing"
            />
            <span class="flex-1 truncate min-w-0">
              <span class="block truncate">{{ block.name || block.type }}</span>
              <span v-if="block.name" class="block text-xs text-muted capitalize">{{
                block.type
              }}</span>
            </span>
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
                :class="
                  pendingDeletions.has(block.id)
                    ? 'text-error'
                    : 'text-muted hover:text-highlighted hover:bg-accented/50'
                "
                @click.stop="requestDelete(block)"
              />
            </div>
          </div>
        </VueDraggable>

        <!-- Pinned footer block -->
        <div
          v-if="footerBlock"
          class="flex items-center gap-1.5 px-2 py-1.5 text-sm rounded-md cursor-pointer"
          :class="
            selectedBlock?.id === footerBlock.id
              ? 'bg-elevated'
              : 'bg-elevated/30 hover:bg-elevated/60'
          "
          @click="selectBlock(footerBlock)"
        >
          <UIcon name="i-lucide-panel-bottom" class="size-4 text-muted shrink-0" />
          <span class="flex-1 truncate min-w-0">
            <span class="block truncate">{{ footerBlock.name || footerBlock.type }}</span>
            <span v-if="footerBlock.name" class="block text-xs text-muted capitalize">{{
              footerBlock.type
            }}</span>
          </span>
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

    <AdminConfirmModal
      v-model:open="confirmDeleteOpen"
      title="Delete block?"
      :description="`'${blockToDelete?.name || blockToDelete?.type}' will be removed when you save.`"
      confirm-label="Delete"
      @confirm="confirmDelete"
      @cancel="confirmDeleteOpen = false"
    />
  </div>
</template>
