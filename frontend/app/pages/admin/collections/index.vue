<script setup lang="ts">
import type { Collection } from '@portfolio-builder/shared/types';
import { getCollectionType } from '@portfolio-builder/shared/types';

definePageMeta({ layout: 'admin', ssr: false });

const { fetcher } = useApi();
const { collections, fetchCollections } = useCollections();

onMounted(() => {
  fetchCollections();
});

const addModalOpen = ref(false);
const deleteModalOpen = ref(false);
const collectionToDelete = ref<Collection | null>(null);
const deleting = ref(false);
const deleteError = ref('');

function onAdded(collection: Collection) {
  collections.value.push(collection);
}

function openDelete(collection: Collection) {
  collectionToDelete.value = collection;
  deleteError.value = '';
  deleteModalOpen.value = true;
}

async function confirmDelete() {
  if (!collectionToDelete.value) return;
  deleting.value = true;
  deleteError.value = '';
  try {
    await fetcher(`/api/collections/${collectionToDelete.value.id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    collections.value = collections.value.filter(c => c.id !== collectionToDelete.value!.id);
    deleteModalOpen.value = false;
    collectionToDelete.value = null;
  } catch (e: unknown) {
    deleteError.value = e instanceof Error ? e.message : 'Failed to delete collection.';
  } finally {
    deleting.value = false;
  }
}
</script>

<template>
  <AdminLayoutPageStructure
    title="Collections"
    description="Manage your content collections. Adding a collection unlocks the associated blocks in the page builder."
  >
    <div class="max-w-lg grid gap-4">
      <UButton
        trailing-icon="i-lucide-plus"
        class="w-full flex justify-center"
        @click="addModalOpen = true"
        >Add collection</UButton
      >

      <div v-if="!collections.length" class="py-12 text-center text-muted text-sm">
        No collections yet. Add one to get started.
      </div>

      <div v-else class="divide-y divide-default border border-default rounded-md">
        <div
          v-for="collection in collections"
          :key="collection.id"
          class="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"
        >
          <UIcon
            :name="getCollectionType(collection.type)?.icon ?? 'i-lucide-database'"
            class="size-4 shrink-0 text-muted-foreground"
          />
          <div class="flex-1 min-w-0">
            <p class="font-medium truncate">{{ collection.name }}</p>
            <p class="text-xs text-muted">{{ collection.type }}</p>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <UButton size="xs" variant="ghost" :to="`/admin/collections/${collection.id}`">
              Manage items
            </UButton>
            <UButton
              icon="i-lucide-trash-2"
              size="xs"
              variant="ghost"
              color="error"
              aria-label="Delete collection"
              @click="openDelete(collection)"
            />
          </div>
        </div>
      </div>
    </div>
  </AdminLayoutPageStructure>

  <AdminCollectionsAddCollectionModal v-model:open="addModalOpen" @added="onAdded" />

  <AdminConfirmModal
    v-model:open="deleteModalOpen"
    title="Delete collection"
    :description="`Delete &quot;${collectionToDelete?.name}&quot;? All items in this collection will be permanently removed.`"
    confirm-label="Delete"
    :loading="deleting"
    :error-message="deleteError"
    @confirm="confirmDelete"
    @cancel="deleteModalOpen = false"
  />
</template>
