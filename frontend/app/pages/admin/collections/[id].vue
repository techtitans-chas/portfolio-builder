<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import type { Collection, CollectionItem } from '@portfolio-builder/shared/types';
import { getCollectionType } from '@portfolio-builder/shared/types';

definePageMeta({ layout: 'admin', ssr: false });

const route = useRoute();
const collectionId = route.params.id as string;

const { fetcher } = useApi();

// Fetch this collection directly so SSR and client both get the same data
const collection = ref<Collection | null>(null);

async function fetchCollection() {
  try {
    const data = await fetcher(`/api/collections/${collectionId}`, { credentials: 'include' });
    collection.value = data.collection;
  } catch {
    // handled by null check in template
  }
}

const typeDef = computed(() =>
  collection.value ? getCollectionType(collection.value.type) : null,
);

// Items state
const items = ref<CollectionItem[]>([]);
const loadingItems = ref(true);
const fetchError = ref('');

async function fetchItems() {
  loadingItems.value = true;
  fetchError.value = '';
  try {
    const data = await fetcher(`/api/collections/${collectionId}/items`, {
      credentials: 'include',
    });
    items.value = data.items;
  } catch (e: unknown) {
    fetchError.value = e instanceof Error ? e.message : 'Failed to load items.';
  } finally {
    loadingItems.value = false;
  }
}

onMounted(() => {
  fetchCollection();
  fetchItems();
});

// Search
const searchQuery = ref('');

const filteredItems = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return items.value;
  const fields = typeDef.value?.fields ?? [];
  return items.value.filter(item =>
    fields.some(field => {
      const val = item.data[field.key];
      if (Array.isArray(val)) return val.some(v => String(v).toLowerCase().includes(q));
      return String(val ?? '')
        .toLowerCase()
        .includes(q);
    }),
  );
});

// Derive a display title from the first field of the item's data
function itemTitle(item: CollectionItem): string {
  const firstField = typeDef.value?.fields[0];
  if (!firstField) return 'Untitled';
  return (item.data[firstField.key] as string) || 'Untitled';
}

// Create / edit modal
const modalOpen = ref(false);
const selectedItem = ref<CollectionItem | null>(null);

function openCreate() {
  selectedItem.value = null;
  modalOpen.value = true;
}

function openEdit(item: CollectionItem) {
  selectedItem.value = item;
  modalOpen.value = true;
}

function onSaved(saved: CollectionItem) {
  const idx = items.value.findIndex(i => i.id === saved.id);
  if (idx >= 0) {
    items.value[idx] = saved;
  } else {
    items.value.unshift(saved);
  }
}

// Reorder
async function onReorder() {
  await Promise.all(
    items.value.map((item, index) =>
      fetcher(`/api/collections/${collectionId}/items/${item.id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify({ sortOrder: index }),
      }),
    ),
  );
}

// Publish toggle
const togglingId = ref<string | null>(null);

async function togglePublished(item: CollectionItem) {
  if (togglingId.value) return;
  togglingId.value = item.id;
  try {
    const data = await fetcher(`/api/collections/${collectionId}/items/${item.id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({ isPublished: !item.isPublished }),
    });
    const idx = items.value.findIndex(i => i.id === item.id);
    if (idx >= 0) items.value[idx] = data.item;
  } finally {
    togglingId.value = null;
  }
}

// Delete
const deleteModalOpen = ref(false);
const itemToDelete = ref<CollectionItem | null>(null);
const deleting = ref(false);
const deleteError = ref('');

function openDelete(item: CollectionItem) {
  itemToDelete.value = item;
  deleteError.value = '';
  deleteModalOpen.value = true;
}

async function confirmDelete() {
  if (!itemToDelete.value) return;
  deleting.value = true;
  deleteError.value = '';
  try {
    await fetcher(`/api/collections/${collectionId}/items/${itemToDelete.value.id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    items.value = items.value.filter(i => i.id !== itemToDelete.value!.id);
    deleteModalOpen.value = false;
    itemToDelete.value = null;
  } catch (e: unknown) {
    deleteError.value = e instanceof Error ? e.message : 'Failed to delete item.';
  } finally {
    deleting.value = false;
  }
}
</script>

<template>
  <AdminLayoutPageStructure
    :title="collection?.name ?? 'Collection'"
    description="Manage items in this collection."
  >
    <div class="max-w-lg grid gap-4">
      <div class="flex items-center gap-3">
        <UInput
          v-model="searchQuery"
          icon="i-lucide-search"
          :placeholder="`Search ${typeDef?.label.toLowerCase() ?? 'items'}`"
          class="flex-1"
        />
        <UButton icon="i-lucide-plus" @click="openCreate">New item</UButton>
      </div>

      <UAlert v-if="fetchError" color="error" variant="soft" :description="fetchError" />

      <div v-if="loadingItems" class="space-y-2">
        <USkeleton v-for="i in 3" :key="i" class="h-12 w-full rounded-md" />
      </div>

      <div v-else-if="!filteredItems.length" class="py-12 text-center text-muted text-sm">
        <template v-if="searchQuery">No items match your search.</template>
        <template v-else>No items yet.</template>
      </div>

      <div v-else class="divide-y divide-default border border-default rounded-md">
        <VueDraggable
          v-model="items"
          handle=".collection-item-drag-handle"
          :group="{ name: `collection-items-${collectionId}`, pull: false, put: false }"
          @end="onReorder"
        >
          <div
            v-for="item in filteredItems"
            :key="item.id"
            class="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"
          >
            <UIcon
              name="i-lucide-grip-vertical"
              class="collection-item-drag-handle text-muted-foreground size-4 shrink-0 cursor-grab active:cursor-grabbing"
            />

            <div class="flex-1 min-w-0">
              <p class="font-medium truncate">{{ itemTitle(item) }}</p>
            </div>

            <div class="flex items-center gap-1 shrink-0">
              <UButton
                :icon="item.isPublished ? 'i-lucide-eye' : 'i-lucide-eye-off'"
                size="xs"
                variant="ghost"
                :color="item.isPublished ? 'primary' : 'neutral'"
                :loading="togglingId === item.id"
                :aria-label="item.isPublished ? 'Unpublish item' : 'Publish item'"
                @click="togglePublished(item)"
              />
              <UButton
                icon="i-lucide-edit"
                size="xs"
                variant="ghost"
                aria-label="Edit item"
                @click="openEdit(item)"
              />
              <UButton
                icon="i-lucide-trash-2"
                size="xs"
                variant="ghost"
                color="error"
                aria-label="Delete item"
                @click="openDelete(item)"
              />
            </div>
          </div>
        </VueDraggable>
      </div>
    </div>
  </AdminLayoutPageStructure>

  <AdminCollectionsCollectionItemModal
    v-if="collection"
    v-model:open="modalOpen"
    :item="selectedItem"
    :collection-id="collectionId"
    :collection-type="collection.type"
    @saved="onSaved"
  />

  <AdminConfirmModal
    v-model:open="deleteModalOpen"
    title="Delete item"
    :description="`Delete &quot;${itemToDelete ? itemTitle(itemToDelete) : 'this item'}&quot;? This cannot be undone.`"
    confirm-label="Delete"
    :loading="deleting"
    :error-message="deleteError"
    @confirm="confirmDelete"
    @cancel="deleteModalOpen = false"
  />
</template>
