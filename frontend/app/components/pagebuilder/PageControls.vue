<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import type { Page } from '@portfolio-builder/shared/types';

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

const pageModalOpen = ref(false);
const pageToEdit = ref<Page | null>(null);

function openAddPage() {
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
        :label="`Page: ${activePage?.title ?? 'Select page'}`"
        color="neutral"
        variant="subtle"
        size="sm"
        trailing-icon="i-lucide-chevron-down"
      />
      <template #content>
        <div class="p-1 min-w-52">
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
      size="sm"
      aria-label="Edit page"
      @click="openEditPage"
    />

    <UButton
      icon="i-lucide-plus"
      label="Add page"
      color="primary"
      variant="solid"
      size="sm"
      @click="openAddPage"
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
