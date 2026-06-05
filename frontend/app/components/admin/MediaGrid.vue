<script setup lang="ts">
import type { MediaFile } from '~/composables/useMedia';
import type { DefaultMediaFile } from '~/composables/useDefaultMedia';

const props = defineProps<{
  /**
   * When true, the grid emits 'select' on item click instead of 'preview'.
   * The selected item is highlighted.
   */
  selectMode?: boolean;
  /** Currently selected file URL (highlight only, used in selectMode) */
  selectedUrl?: string | null;
  /** Lock filterType to images only (hides type filter dropdown) */
  imagesOnly?: boolean;
  /** Show an Upload button in the tab row (gallery page only) */
  canUpload?: boolean;
}>();

const emit = defineEmits<{
  preview: [file: MediaFile];
  select: [url: string];
  upload: [];
}>();

const { files, loading, error, fetchMedia } = useMedia();
const { defaultFiles, fetchDefaultMedia } = useDefaultMedia();

type Tab = 'default' | 'uploads';
const activeTab = ref<Tab>('default');

// Local search / filter / sort so the picker doesn't mutate gallery page state
const localSearch = ref('');
const localSort = ref<'date' | 'name' | 'size'>('date');
const localFilterType = ref<'all' | 'image' | 'pdf'>('all');

const sortOptions = [
  { label: 'Newest first', value: 'date' as const },
  { label: 'Name', value: 'name' as const },
  { label: 'Largest first', value: 'size' as const },
];

const typeOptions = [
  { label: 'All', value: 'all' as const },
  { label: 'Images', value: 'image' as const },
  { label: 'PDFs', value: 'pdf' as const },
];

// Filtered default files
const filteredDefaultFiles = computed(() => {
  let list = defaultFiles.value;
  if (props.imagesOnly) {
    list = list.filter(f => f.fileType.startsWith('image/'));
  }
  if (localSearch.value.trim()) {
    const q = localSearch.value.toLowerCase();
    list = list.filter(
      f => f.filename.toLowerCase().includes(q) || f.label.toLowerCase().includes(q),
    );
  }
  return list;
});

// Filtered uploaded files
const filteredUploadedFiles = computed(() => {
  let list = files.value;
  if (props.imagesOnly) {
    list = list.filter(f => f.fileType.startsWith('image/'));
  } else if (localFilterType.value === 'image') {
    list = list.filter(f => f.fileType.startsWith('image/'));
  } else if (localFilterType.value === 'pdf') {
    list = list.filter(f => f.fileType === 'application/pdf');
  }
  if (localSearch.value.trim()) {
    const q = localSearch.value.toLowerCase();
    list = list.filter(f => f.filename.toLowerCase().includes(q));
  }
  return [...list].sort((a, b) => {
    if (localSort.value === 'name') return a.filename.localeCompare(b.filename);
    if (localSort.value === 'size') return b.sizeBytes - a.sizeBytes;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
});

function handleDefaultClick(file: DefaultMediaFile) {
  if (props.selectMode) {
    emit('select', file.url);
  }
}

function handleUploadClick(file: MediaFile) {
  if (props.selectMode) {
    emit('select', file.url);
  } else {
    emit('preview', file);
  }
}

function isImage(fileType: string): boolean {
  return fileType.startsWith('image/');
}

onMounted(async () => {
  await Promise.all([
    fetchDefaultMedia(),
    files.value.length === 0 ? fetchMedia() : Promise.resolve(),
  ]);
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Tabs + upload button -->
    <div class="flex items-center justify-between">
      <div class="flex gap-1">
        <UButton
          :variant="activeTab === 'default' ? 'soft' : 'ghost'"
          size="sm"
          @click="activeTab = 'default'"
        >
          Default
        </UButton>
        <UButton
          :variant="activeTab === 'uploads' ? 'soft' : 'ghost'"
          size="sm"
          @click="activeTab = 'uploads'"
        >
          My uploads
        </UButton>
      </div>
      <UButton v-if="canUpload" icon="i-lucide-upload" size="sm" @click="emit('upload')">
        Upload
      </UButton>
    </div>

    <!-- Toolbar -->
    <div class="flex flex-wrap gap-2 items-center">
      <UInput
        v-model="localSearch"
        icon="i-lucide-search"
        placeholder="Search files..."
        size="sm"
        class="flex-1 min-w-32"
      />
      <template v-if="activeTab === 'uploads' && !imagesOnly">
        <USelect
          v-model="localFilterType"
          :items="typeOptions"
          value-key="value"
          label-key="label"
          size="sm"
          class="w-28 shrink-0"
        />
        <USelect
          v-model="localSort"
          :items="sortOptions"
          value-key="value"
          label-key="label"
          size="sm"
          class="w-36 shrink-0"
        />
      </template>
      <USelect
        v-else-if="activeTab === 'uploads' && imagesOnly"
        v-model="localSort"
        :items="sortOptions"
        value-key="value"
        label-key="label"
        size="sm"
        class="w-36 shrink-0"
      />
    </div>

    <!-- Default images tab -->
    <template v-if="activeTab === 'default'">
      <div
        v-if="filteredDefaultFiles.length === 0"
        class="flex flex-col items-center justify-center py-12 text-muted gap-2"
      >
        <UIcon name="i-lucide-image-off" class="w-10 h-10" />
        <p class="text-sm">No default images available.</p>
      </div>

      <div v-else class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        <button
          v-for="file in filteredDefaultFiles"
          :key="file.url"
          type="button"
          class="group relative rounded-lg overflow-hidden border bg-muted aspect-square flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          :class="
            selectMode && selectedUrl === file.url
              ? 'border-primary ring-2 ring-primary'
              : selectMode
                ? 'border-default hover:border-primary'
                : 'border-default cursor-default'
          "
          @click="handleDefaultClick(file)"
        >
          <img
            :src="file.url"
            :alt="file.label"
            class="w-full h-full object-cover"
            loading="lazy"
          />

          <div
            class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end"
            :class="{ 'opacity-100': selectMode && selectedUrl === file.url }"
          >
            <p class="text-white text-xs p-1.5 truncate w-full">{{ file.label }}</p>
          </div>

          <div
            v-if="selectMode && selectedUrl === file.url"
            class="absolute flex items-center justify-center h-5 w-5 top-1.5 right-1.5 bg-primary rounded-full p-0.5"
          >
            <UIcon name="i-lucide-check" class="size-3 text-white" />
          </div>
        </button>
      </div>

      <p v-if="filteredDefaultFiles.length > 0" class="text-xs text-muted">
        {{ filteredDefaultFiles.length }} {{ filteredDefaultFiles.length === 1 ? 'file' : 'files' }}
      </p>
    </template>

    <!-- My uploads tab -->
    <template v-else>
      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <UIcon name="i-lucide-loader-2" class="w-7 h-7 animate-spin text-muted" />
      </div>

      <!-- Error -->
      <UAlert v-else-if="error" color="error" variant="soft" :description="error" />

      <!-- Empty state -->
      <div
        v-else-if="filteredUploadedFiles.length === 0"
        class="flex flex-col items-center justify-center py-12 text-muted gap-2"
      >
        <UIcon name="i-lucide-image-off" class="w-10 h-10" />
        <p class="text-sm">
          {{ files.length === 0 ? 'No files uploaded yet.' : 'No files match your search.' }}
        </p>
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        <button
          v-for="file in filteredUploadedFiles"
          :key="file.id"
          type="button"
          class="group relative rounded-lg overflow-hidden border bg-muted aspect-square flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          :class="
            selectMode && selectedUrl === file.url
              ? 'border-primary ring-2 ring-primary'
              : 'border-default hover:border-primary'
          "
          @click="handleUploadClick(file)"
        >
          <img
            v-if="isImage(file.fileType)"
            :src="file.url"
            :alt="file.filename"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <div v-else class="flex flex-col items-center gap-1.5 p-2 text-muted">
            <UIcon name="i-lucide-file-text" class="w-8 h-8" />
            <span class="text-xs text-center break-all line-clamp-2">{{ file.filename }}</span>
          </div>

          <!-- Hover overlay -->
          <div
            class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end"
            :class="{ 'opacity-100': selectMode && selectedUrl === file.url }"
          >
            <p class="text-white text-xs p-1.5 truncate w-full">{{ file.filename }}</p>
          </div>

          <!-- Selected checkmark -->
          <div
            v-if="selectMode && selectedUrl === file.url"
            class="absolute flex items-center justify-center h-5 w-5 top-1.5 right-1.5 bg-primary rounded-full p-0.5"
          >
            <UIcon name="i-lucide-check" class="size-3 text-white" />
          </div>
        </button>
      </div>

      <!-- Count -->
      <p v-if="!loading && filteredUploadedFiles.length > 0" class="text-xs text-muted">
        {{ filteredUploadedFiles.length }}
        {{ filteredUploadedFiles.length === 1 ? 'file' : 'files' }}
      </p>
    </template>
  </div>
</template>
