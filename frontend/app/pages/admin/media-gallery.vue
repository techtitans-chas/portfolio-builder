<script setup lang="ts">
import type { MediaFile } from '~/composables/useMedia';

definePageMeta({ layout: 'admin', ssr: false });

const { features, fetchFeatures } = useServerFeatures();
const { deleteMedia } = useMedia();

onMounted(() => fetchFeatures());

// ---------------------------------------------------------------------------
// Upload modal
// ---------------------------------------------------------------------------
const uploadModalOpen = ref(false);

// ---------------------------------------------------------------------------
// Preview modal
// ---------------------------------------------------------------------------
const previewFile = ref<MediaFile | null>(null);
const previewOpen = ref(false);

function openPreview(file: MediaFile) {
  previewFile.value = file;
  previewOpen.value = true;
}

// ---------------------------------------------------------------------------
// Delete modal
// ---------------------------------------------------------------------------
const deleteTarget = ref<MediaFile | null>(null);
const deleteOpen = ref(false);
const deleting = ref(false);

function requestDelete(file: MediaFile) {
  deleteTarget.value = file;
  deleteOpen.value = true;
}

async function confirmDelete() {
  if (!deleteTarget.value) return;
  deleting.value = true;
  await deleteMedia(deleteTarget.value.id);
  deleting.value = false;
  deleteOpen.value = false;
  deleteTarget.value = null;
}
</script>

<template>
  <AdminLayoutPageStructure
    title="Media Gallery"
    description="Upload and manage your portfolio's media files."
  >
    <!-- Storage disabled info -->
    <UAlert
      v-if="!features.storage"
      color="info"
      variant="soft"
      icon="i-lucide-cloud-off"
      title="File uploads not configured"
      description="Cloudflare R2 is not set up. You can still use the default images below."
      class="mb-6"
    />

    <!-- Media grid with tabs -->
    <AdminMediaGrid
      :can-upload="features.storage"
      @preview="openPreview"
      @upload="uploadModalOpen = true"
    />

    <!-- Preview modal -->
    <AdminMediaPreviewModal
      v-model:open="previewOpen"
      :file="previewFile"
      @delete="requestDelete"
    />

    <!-- Delete confirmation modal -->
    <UModal
      v-model:open="deleteOpen"
      title="Delete file"
      @close="
        deleteTarget = null;
        deleteOpen = false;
      "
    >
      <template #body>
        <p class="text-sm">
          Are you sure you want to delete
          <strong>{{ deleteTarget?.filename }}</strong
          >? This cannot be undone.
        </p>
      </template>
      <template #footer>
        <div class="flex gap-2 justify-end">
          <UButton
            variant="outline"
            @click="
              deleteTarget = null;
              deleteOpen = false;
            "
            >Cancel</UButton
          >
          <UButton color="error" :loading="deleting" @click="confirmDelete">Delete</UButton>
        </div>
      </template>
    </UModal>

    <!-- Upload modal -->
    <AdminMediaUploadModal v-model:open="uploadModalOpen" />
  </AdminLayoutPageStructure>
</template>
