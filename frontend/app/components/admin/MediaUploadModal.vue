<script setup lang="ts">
defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const { uploading, uploadQueue, uploadError, allowedTypes, handleFiles, clearUploadQueue } =
  useMedia();

const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

async function onFileInput(e: Event) {
  const input = e.target as HTMLInputElement;
  if (!input.files?.length) return;
  const done = await handleFiles(input.files);
  input.value = '';
  if (done) closeModal();
}

async function onDrop(e: DragEvent) {
  isDragging.value = false;
  if (!e.dataTransfer?.files?.length) return;
  const done = await handleFiles(e.dataTransfer.files);
  if (done) closeModal();
}

function closeModal() {
  clearUploadQueue();
  emit('update:open', false);
}

function onModalUpdateOpen(val: boolean) {
  if (!val && !uploading.value) closeModal();
}

const hasErrors = computed(() => uploadQueue.value.some(e => e.status === 'error'));
</script>

<template>
  <UModal :open="open" title="Upload files" @update:open="onModalUpdateOpen">
    <template #body>
      <div class="space-y-4">
        <!-- Dropzone — hidden while uploading -->
        <div
          v-if="uploadQueue.length === 0"
          class="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors"
          :class="
            isDragging ? 'border-primary bg-primary/5' : 'border-default hover:border-primary/50'
          "
          @click="fileInput?.click()"
          @dragover.prevent="isDragging = true"
          @dragleave="isDragging = false"
          @drop.prevent="onDrop"
        >
          <UIcon name="i-lucide-upload-cloud" class="w-10 h-10 text-muted" />
          <div class="text-center">
            <p class="font-medium">Drop files here or click to browse</p>
            <p class="text-sm text-muted mt-1">
              Images (JPG, PNG, GIF, WebP, SVG) and PDFs · JPG/PNG converted to WebP · max 2 MB for
              images
            </p>
          </div>
        </div>

        <input
          ref="fileInput"
          type="file"
          multiple
          :accept="allowedTypes.join(',')"
          class="hidden"
          @change="onFileInput"
        />

        <UAlert v-if="uploadError" color="error" variant="soft" :description="uploadError" />

        <!-- Per-file progress list -->
        <ul v-if="uploadQueue.length > 0" class="space-y-3">
          <li v-for="entry in uploadQueue" :key="entry.file.name" class="space-y-1">
            <div class="flex items-center justify-between text-sm">
              <span class="truncate max-w-[80%]">{{ entry.file.name }}</span>
              <span class="text-muted shrink-0 ml-2">
                <UIcon
                  v-if="entry.status === 'done'"
                  name="i-lucide-check"
                  class="w-4 h-4 text-success"
                />
                <UIcon
                  v-else-if="entry.status === 'error'"
                  name="i-lucide-x"
                  class="w-4 h-4 text-error"
                />
                <span v-else>{{ entry.progress }}%</span>
              </span>
            </div>
            <div class="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-200"
                :class="entry.status === 'error' ? 'bg-error' : 'bg-primary'"
                :style="{ width: `${entry.progress}%` }"
              />
            </div>
            <p v-if="entry.error" class="text-xs text-error">{{ entry.error }}</p>
          </li>
        </ul>
      </div>
    </template>

    <template v-if="uploadQueue.length > 0" #footer>
      <div class="flex justify-end">
        <UButton :disabled="uploading" @click="closeModal">
          {{ hasErrors ? 'Close' : 'Done' }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>
