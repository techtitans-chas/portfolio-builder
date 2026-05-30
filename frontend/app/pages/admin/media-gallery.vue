<script setup lang="ts">
definePageMeta({ layout: 'admin', ssr: false });

const { features, fetchFeatures } = useServerFeatures();
const {
  files,
  loading,
  error,
  search,
  filterType,
  sortBy,
  filteredFiles,
  typeOptions,
  sortOptions,
  fetchMedia,
  deleteMedia,
} = useMedia();

onMounted(async () => {
  await fetchFeatures();
  await fetchMedia();
});

// ---------------------------------------------------------------------------
// Upload modal
// ---------------------------------------------------------------------------
const uploadModalOpen = ref(false);

// ---------------------------------------------------------------------------
// Preview modal
// ---------------------------------------------------------------------------
const previewFile = ref<(typeof files.value)[0] | null>(null);
const previewOpen = ref(false);

function openPreview(file: (typeof files.value)[0]) {
  previewFile.value = file;
  previewOpen.value = true;
}

// ---------------------------------------------------------------------------
// Delete modal
// ---------------------------------------------------------------------------
const deleteTarget = ref<(typeof files.value)[0] | null>(null);
const deleteOpen = ref(false);
const deleting = ref(false);

function requestDelete(file: (typeof files.value)[0]) {
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function isImage(fileType: string): boolean {
  return fileType.startsWith('image/');
}
</script>

<template>
  <AdminLayoutPageStructure
    title="Media Gallery"
    description="Upload and manage your portfolio's media files."
  >
    <!-- Storage disabled warning -->
    <UAlert
      v-if="!features.storage"
      color="warning"
      variant="soft"
      icon="i-lucide-triangle-alert"
      title="Storage not configured"
      description="File storage is not configured. Contact support to enable uploads."
      class="mb-6"
    />

    <!-- Toolbar -->
    <div class="flex flex-wrap gap-3 mb-6 items-center">
      <UInput
        v-model="search"
        icon="i-lucide-search"
        placeholder="Search files..."
        class="w-full sm:w-64"
      />

      <USelect
        v-model="filterType"
        :items="typeOptions"
        value-key="value"
        label-key="label"
        class="w-36"
      />

      <USelect
        v-model="sortBy"
        :items="sortOptions"
        value-key="value"
        label-key="label"
        class="w-40"
      />

      <UButton
        v-if="features.storage"
        icon="i-lucide-upload"
        class="ml-auto"
        @click="uploadModalOpen = true"
      >
        Upload
      </UButton>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-muted" />
    </div>

    <!-- Error -->
    <UAlert v-else-if="error" color="error" variant="soft" :description="error" class="mb-4" />

    <!-- Empty state -->
    <div
      v-else-if="filteredFiles.length === 0"
      class="flex flex-col items-center justify-center py-20 text-muted gap-3"
    >
      <UIcon name="i-lucide-image-off" class="w-12 h-12" />
      <p class="text-sm">
        {{ files.length === 0 ? 'No files uploaded yet.' : 'No files match your search.' }}
      </p>
      <UButton
        v-if="files.length === 0 && features.storage"
        variant="outline"
        icon="i-lucide-upload"
        @click="uploadModalOpen = true"
      >
        Upload your first file
      </UButton>
    </div>

    <!-- Media grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      <div
        v-for="file in filteredFiles"
        :key="file.id"
        class="group relative cursor-pointer rounded-lg overflow-hidden border border-default bg-muted aspect-square flex items-center justify-center hover:border-primary transition-colors"
        @click="openPreview(file)"
      >
        <!-- Image thumbnail -->
        <img
          v-if="isImage(file.fileType)"
          :src="file.url"
          :alt="file.filename"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <!-- PDF / other icon -->
        <div v-else class="flex flex-col items-center gap-2 p-3 text-muted">
          <UIcon name="i-lucide-file-text" class="w-10 h-10" />
          <span class="text-xs text-center break-all line-clamp-2">{{ file.filename }}</span>
        </div>

        <!-- Hover overlay with filename -->
        <div
          class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end"
        >
          <p class="text-white text-xs p-2 truncate w-full">{{ file.filename }}</p>
        </div>
      </div>
    </div>

    <!-- File count -->
    <p v-if="!loading && files.length > 0" class="text-xs text-muted mt-4">
      {{ filteredFiles.length }} of {{ files.length }} file{{ files.length === 1 ? '' : 's' }}
    </p>

    <!-- Preview modal -->
    <AdminMediaPreviewModal
      v-model:open="previewOpen"
      :file="previewFile"
      @delete="requestDelete"
    />

    <!-- ------------------------------------------------------------------ -->
    <!-- Delete confirmation modal                                            -->
    <!-- ------------------------------------------------------------------ -->
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
