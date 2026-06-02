<script setup lang="ts">
import type { MediaFile } from '~/composables/useMedia';

defineProps<{
  open: boolean;
  /** Currently selected image URL (shown as highlighted in the grid) */
  selectedUrl?: string | null;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
  select: [url: string];
}>();

const { features } = useServerFeatures();
const { allowedTypes, handleFiles } = useMedia();

const fileInput = ref<HTMLInputElement | null>(null);
const uploading = ref(false);

function close() {
  emit('update:open', false);
}

function onSelect(file: MediaFile) {
  emit('select', file.url);
  close();
}

async function onFileInput(e: Event) {
  const input = e.target as HTMLInputElement;
  if (!input.files?.length) return;
  uploading.value = true;
  await handleFiles(input.files);
  uploading.value = false;
  input.value = '';
}

const imageTypes = allowedTypes.filter(t => t.startsWith('image/'));
</script>

<template>
  <UModal
    :open="open"
    title="Choose image"
    :ui="{ content: 'max-w-2xl' }"
    @update:open="emit('update:open', $event)"
  >
    <template #body>
      <AdminMediaGrid select-mode images-only :selected-url="selectedUrl" @select="onSelect" />
    </template>

    <template #footer>
      <div class="flex justify-end w-full">
        <UButton
          v-if="features.storage"
          variant="outline"
          icon="i-lucide-upload"
          size="sm"
          :loading="uploading"
          @click="fileInput?.click()"
        >
          Upload new
        </UButton>
        <input
          ref="fileInput"
          type="file"
          multiple
          :accept="imageTypes.join(',')"
          class="hidden"
          @change="onFileInput"
        />
      </div>
    </template>
  </UModal>
</template>
