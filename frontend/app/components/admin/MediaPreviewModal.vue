<script setup lang="ts">
import type { MediaFile } from '~/composables/useMedia';

const props = defineProps<{
  file: MediaFile | null;
  open: boolean;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
  delete: [file: MediaFile];
}>();

function close() {
  emit('update:open', false);
}

const copied = ref(false);

async function copyUrl(url: string) {
  await navigator.clipboard.writeText(url).catch(() => {});
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function isImage(fileType: string): boolean {
  return fileType.startsWith('image/');
}
</script>

<template>
  <UModal :open="open" :title="file?.filename ?? ''" @close="close" @update:open="emit('update:open', $event)">
    <template v-if="file" #body>
      <div class="space-y-4">
        <!-- Image preview -->
        <div
          v-if="isImage(file.fileType)"
          class="rounded-lg overflow-hidden bg-muted flex items-center justify-center max-h-96"
        >
          <img :src="file.url" :alt="file.filename" class="max-w-full max-h-96 object-contain" />
        </div>
        <!-- Non-image icon -->
        <div v-else class="flex justify-center py-8">
          <UIcon name="i-lucide-file-text" class="w-20 h-20 text-muted" />
        </div>

        <!-- File details -->
        <dl class="text-sm space-y-1">
          <div class="flex gap-2">
            <dt class="text-muted w-24 shrink-0">Type</dt>
            <dd>{{ file.fileType }}</dd>
          </div>
          <div class="flex gap-2">
            <dt class="text-muted w-24 shrink-0">Size</dt>
            <dd>{{ formatBytes(file.sizeBytes) }}</dd>
          </div>
          <div class="flex gap-2">
            <dt class="text-muted w-24 shrink-0">Uploaded</dt>
            <dd>{{ formatDate(file.createdAt) }}</dd>
          </div>
          <div class="flex gap-2 items-center">
            <dt class="text-muted w-24 shrink-0">URL</dt>
            <dd class="truncate text-xs font-mono">{{ file.url }}</dd>
          </div>
        </dl>

        <!-- Actions -->
        <div class="flex gap-2 pt-2">
          <UButton
            variant="outline"
            :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
            size="sm"
            @click="copyUrl(file.url)"
          >
            {{ copied ? 'Copied!' : 'Copy URL' }}
          </UButton>
          <UButton :href="file.url" target="_blank" variant="outline" icon="i-lucide-external-link" size="sm">
            Open
          </UButton>
          <UButton
            color="error"
            variant="outline"
            icon="i-lucide-trash-2"
            size="sm"
            class="ml-auto"
            @click="emit('delete', file); close()"
          >
            Delete
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
