<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import type { Page } from '@portfolio-builder/shared/types';
import { MAX_PAGES_PER_PORTFOLIO } from '@portfolio-builder/shared/schemas';
import { useActivePage } from '~/composables/useActivePage';

const props = defineProps<{
  portfolioId: string | null;
}>();

const { activePageId, activePage } = useActivePage();
const { pages, pagesLoading, pagesError } = usePages();
const { fetcher } = useApi();

function selectPage(page: Page) {
  activePageId.value = page.id;
}

async function onPagesReorder() {
  if (!props.portfolioId) return;
  await fetcher(`/api/portfolios/${props.portfolioId}/pages/reorder`, {
    method: 'PATCH',
    credentials: 'include',
    body: JSON.stringify({ pageIds: pages.value.map(p => p.id) }),
  });
}

async function toggleVisibility(page: Page) {
  const original = page.isPublished;
  page.isPublished = !original;
  try {
    await fetcher(`/api/portfolios/${props.portfolioId}/pages/${page.id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({ isPublished: page.isPublished }),
    });
  } catch {
    page.isPublished = original;
  }
}

async function toggleShowInMenu(page: Page) {
  const original = page.showInMenu;
  page.showInMenu = !original;
  try {
    await fetcher(`/api/portfolios/${props.portfolioId}/pages/${page.id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({ showInMenu: page.showInMenu }),
    });
  } catch {
    page.showInMenu = original;
  }
}

const deleteModalOpen = ref(false);
const pageToDelete = ref<Page | null>(null);
const deleting = ref(false);
const deleteError = ref('');

function openDeleteModal(page: Page) {
  pageToDelete.value = page;
  deleteError.value = '';
  deleteModalOpen.value = true;
}

async function confirmDelete() {
  if (!pageToDelete.value || !props.portfolioId) return;
  deleting.value = true;
  deleteError.value = '';
  try {
    await fetcher(`/api/portfolios/${props.portfolioId}/pages/${pageToDelete.value.id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const deletedId = pageToDelete.value.id;
    pages.value = pages.value.filter(p => p.id !== deletedId);
    if (activePageId.value === deletedId) {
      activePageId.value = pages.value[0]?.id ?? null;
    }
    deleteModalOpen.value = false;
    pageToDelete.value = null;
  } catch (e: unknown) {
    deleteError.value = e instanceof Error ? e.message : 'Failed to delete page.';
  } finally {
    deleting.value = false;
  }
}

const atPageLimit = computed(() => pages.value.length >= MAX_PAGES_PER_PORTFOLIO);

const pageModalOpen = ref(false);
const pageToEdit = ref<Page | null>(null);

function openAddPage() {
  if (atPageLimit.value) return;
  pageToEdit.value = null;
  pageModalOpen.value = true;
}

function openEditPage() {
  pageToEdit.value = activePage.value;
  pageModalOpen.value = true;
}

function onPageSaved(page: Page) {
  const idx = pages.value.findIndex(p => p.id === page.id);
  if (idx !== -1) {
    pages.value = pages.value.map(p => (p.id === page.id ? page : p));
  } else {
    pages.value = [...pages.value, page];
    activePageId.value = page.id;
  }
}
</script>

<template>
  <div class="flex items-center gap-1">
    <UPopover>
      <UButton
        color="neutral"
        variant="ghost"
        size="md"
        trailing-icon="i-lucide-chevron-down"
        class="min-w-45 justify-between"
      >
        <span class="flex items-center gap-2">
          <span class="text-muted">Page:</span>
          <span>{{ activePage?.title ?? 'Select page' }}</span>
        </span>
      </UButton>
      <template #content>
        <div class="p-1 min-w-52">
          <div class="flex items-center justify-between px-2 py-1.5">
            <button
              class="flex items-center gap-2 text-sm rounded-md font-medium transition-colors"
              :class="
                atPageLimit ? 'text-muted cursor-not-allowed' : 'text-primary hover:text-primary/80'
              "
              :disabled="atPageLimit"
              @click="openAddPage"
            >
              <UIcon name="i-lucide-plus" class="size-4 shrink-0" />
              Add page
            </button>
            <span class="text-xs text-muted tabular-nums">
              {{ pages.length }}&thinsp;/&thinsp;{{ MAX_PAGES_PER_PORTFOLIO }}
            </span>
          </div>
          <div class="my-1 border-t border-default" />
          <div v-if="pagesLoading" class="flex items-center justify-center py-4">
            <UIcon name="i-lucide-loader-2" class="size-4 animate-spin text-muted" />
          </div>
          <p v-else-if="pagesError" class="px-2 py-2 text-sm text-error">
            {{ pagesError }}
          </p>
          <VueDraggable v-else v-model="pages" handle=".drag-handle" @end="onPagesReorder">
            <div
              v-for="page in pages"
              :key="page.id"
              class="group flex items-center gap-1.5 w-full px-2 py-1.5 text-sm rounded-md hover:bg-elevated/50 cursor-pointer"
              :class="{ 'bg-elevated': page.id === activePageId }"
              @click="selectPage(page)"
            >
              <UIcon
                name="i-lucide-grip-vertical"
                class="drag-handle size-4 text-muted shrink-0 -ml-1 cursor-grab active:cursor-grabbing"
              />
              <span class="flex-1 truncate">{{ page.title }}</span>
              <div class="flex -my-0.5">
                <UButton
                  :icon="page.showInMenu ? 'pepicons-pop-list' : 'pepicons-pop-list-off'"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  :class="page.showInMenu ? 'text-highlighted' : 'text-muted'"
                  class="hover:text-highlighted hover:bg-accented/50"
                  @click.stop="toggleShowInMenu(page)"
                />
                <UButton
                  v-if="!page.isMandatory"
                  :icon="page.isPublished ? 'i-lucide-globe' : 'i-lucide-globe-off'"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  :class="page.isPublished ? 'text-highlighted' : 'text-muted'"
                  class="hover:text-highlighted hover:bg-accented/50"
                  @click.stop="toggleVisibility(page)"
                />
                <UButton
                  :icon="page.isMandatory ? 'i-lucide-lock' : 'i-lucide-trash'"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  :disabled="page.isMandatory"
                  class="text-muted hover:text-highlighted hover:bg-accented/50"
                  @click.stop="openDeleteModal(page)"
                />
              </div>
            </div>
          </VueDraggable>
        </div>
      </template>
    </UPopover>

    <UButton
      icon="i-lucide-edit-3"
      color="neutral"
      variant="ghost"
      size="md"
      aria-label="Edit page"
      @click="openEditPage"
    />
  </div>

  <PagebuilderPageModal
    v-if="portfolioId"
    v-model:open="pageModalOpen"
    :portfolio-id="portfolioId"
    :page="pageToEdit"
    @saved="onPageSaved"
  />

  <AdminConfirmModal
    v-model:open="deleteModalOpen"
    title="Delete page"
    :description="pageToDelete ? `Are you sure you want to delete '${pageToDelete.title}'?` : ''"
    confirm-label="Delete"
    :loading="deleting"
    :error-message="deleteError"
    @confirm="confirmDelete"
    @cancel="deleteModalOpen = false"
  />
</template>
