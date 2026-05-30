<script setup lang="ts">
const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const { uploading, uploadError, allowedTypes, handleFiles } = useMedia();

const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

async function onFileInput(e: Event) {
  const input = e.target as HTMLInputElement;
  if (!input.files?.length) return;
  const done = await handleFiles(input.files);
  input.value = '';
  if (done) emit('update:open', false);
}

async function onDrop(e: DragEvent) {
  isDragging.value = false;
  if (!e.dataTransfer?.files?.length) return;
  const done = await handleFiles(e.dataTransfer.files);
  if (done) emit('update:open', false);
}
</script>

<template>
  <UModal :open="open" title="Upload files" @update:open="emit('update:open', $event)">
    <template #body>
      <div class="space-y-4">
        <div
          class="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors"
          :class="isDragging ? 'border-primary bg-primary/5' : 'border-default hover:border-primary/50'"
          @click="fileInput?.click()"
          @dragover.prevent="isDragging = true"
          @dragleave="isDragging = false"
          @drop.prevent="onDrop"
        >
          <UIcon name="i-lucide-upload-cloud" class="w-10 h-10 text-muted" />
          <div class="text-center">
            <p class="font-medium">Drop files here or click to browse</p>
            <p class="text-sm text-muted mt-1">
              Images (JPG, PNG, GIF, WebP, SVG) and PDFs · JPG/PNG converted to WebP · max 2 MB for images
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

        <div v-if="uploading" class="flex items-center gap-2 text-sm text-muted">
          <UIcon name="i-lucide-loader-2" class="w-4 h-4 animate-spin" />
          Uploading...
        </div>
      </div>
    </template>
  </UModal>
</template>
