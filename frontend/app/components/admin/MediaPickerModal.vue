<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  /** Currently selected file URL (shown as highlighted in the grid) */
  selectedUrl?: string | null;
  /** When true, only images are shown and the file input is restricted to images */
  imagesOnly?: boolean;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
  select: [url: string];
}>();

const { features } = useServerFeatures();
const { allowedTypes, handleFiles, uploadQueue, uploading, clearUploadQueue } = useMedia();

const fileInput = ref<HTMLInputElement | null>(null);
const showProgress = ref(false);

const title = computed(() => (props.imagesOnly ? 'Choose image' : 'Choose file'));
const acceptTypes = computed(() =>
  props.imagesOnly ? allowedTypes.filter(t => t.startsWith('image/')) : allowedTypes,
);

const uploadDone = computed(() => showProgress.value && !uploading.value);

function close() {
  emit('update:open', false);
}

function onSelect(url: string) {
  emit('select', url);
  close();
}

function dismissProgress() {
  showProgress.value = false;
  clearUploadQueue();
}

async function onFileInput(e: Event) {
  const input = e.target as HTMLInputElement;
  if (!input.files?.length) return;
  showProgress.value = true;
  await handleFiles(input.files);
  input.value = '';
}
</script>

<template>
  <UModal
    :open="open"
    :title="title"
    :ui="{ content: 'max-w-2xl' }"
    @update:open="emit('update:open', $event)"
  >
    <template #body>
      <AdminMediaGrid
        select-mode
        :images-only="imagesOnly"
        :selected-url="selectedUrl"
        @select="onSelect"
      />
    </template>

    <template #footer>
      <div class="flex flex-col gap-3 w-full">
        <!-- Per-file progress panel -->
        <div
          v-if="showProgress && uploadQueue.length > 0"
          class="rounded-lg border border-default bg-elevated p-3 space-y-2"
        >
          <ul class="space-y-2">
            <li v-for="entry in uploadQueue" :key="entry.file.name" class="space-y-1">
              <div class="flex items-center justify-between text-xs">
                <span class="truncate max-w-[75%] font-medium">{{ entry.file.name }}</span>
                <span class="shrink-0 ml-2 text-muted">
                  <UIcon
                    v-if="entry.status === 'done'"
                    name="i-lucide-check"
                    class="w-3.5 h-3.5 text-success"
                  />
                  <UIcon
                    v-else-if="entry.status === 'error'"
                    name="i-lucide-x"
                    class="w-3.5 h-3.5 text-error"
                  />
                  <span v-else>{{ entry.progress }}%</span>
                </span>
              </div>
              <div class="h-1 rounded-full bg-muted overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-200"
                  :class="entry.status === 'error' ? 'bg-error' : 'bg-primary'"
                  :style="{ width: `${entry.progress}%` }"
                />
              </div>
              <p v-if="entry.error" class="text-xs text-error">{{ entry.error }}</p>
            </li>
          </ul>

          <div v-if="uploadDone" class="flex justify-end pt-1">
            <UButton size="xs" variant="subtle" color="neutral" @click="dismissProgress">
              Dismiss
            </UButton>
          </div>
        </div>

        <!-- Footer actions -->
        <div class="flex justify-end">
          <UButton
            v-if="features.storage"
            variant="outline"
            icon="i-lucide-upload"
            size="sm"
            :loading="uploading"
            :disabled="uploading"
            @click="fileInput?.click()"
          >
            Upload new
          </UButton>
          <input
            ref="fileInput"
            type="file"
            multiple
            :accept="acceptTypes.join(',')"
            class="hidden"
            @change="onFileInput"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
