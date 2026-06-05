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
const { allowedTypes, handleFiles } = useMedia();

const fileInput = ref<HTMLInputElement | null>(null);
const uploading = ref(false);

const title = computed(() => (props.imagesOnly ? 'Choose image' : 'Choose file'));
const acceptTypes = computed(() =>
  props.imagesOnly ? allowedTypes.filter(t => t.startsWith('image/')) : allowedTypes,
);

function close() {
  emit('update:open', false);
}

function onSelect(url: string) {
  emit('select', url);
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
          :accept="acceptTypes.join(',')"
          class="hidden"
          @change="onFileInput"
        />
      </div>
    </template>
  </UModal>
</template>
