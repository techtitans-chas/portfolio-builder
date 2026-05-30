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

const { files, renameMedia } = useMedia();

const liveFile = computed(() =>
  props.file ? (files.value.find(f => f.id === props.file!.id) ?? props.file) : null,
);

function close() {
  emit('update:open', false);
}

// ---------------------------------------------------------------------------
// Rename
// ---------------------------------------------------------------------------
const renaming = ref(false);
const renameValue = ref('');
const renameSaving = ref(false);

function openRename() {
  renameValue.value = liveFile.value!.filename;
  renaming.value = true;
  nextTick(() => {
    (document.getElementById('rename-input') as HTMLInputElement | null)?.select();
  });
}

async function saveRename() {
  const name = renameValue.value.trim();
  if (!name || !liveFile.value) return;
  renameSaving.value = true;
  await renameMedia(liveFile.value.id, name);
  renameSaving.value = false;
  renaming.value = false;
}

function cancelRename() {
  renaming.value = false;
}

// ---------------------------------------------------------------------------
// Copy URL
// ---------------------------------------------------------------------------
const copied = ref(false);

async function copyUrl(url: string) {
  await navigator.clipboard.writeText(url).catch(() => {});
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
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
  <UModal
    :open="open"
    :title="liveFile?.filename ?? ''"
    @close="close"
    @update:open="emit('update:open', $event)"
  >
    <template v-if="liveFile" #body>
      <div class="space-y-4">
        <!-- Image preview -->
        <div
          v-if="isImage(liveFile.fileType)"
          class="rounded-lg overflow-hidden bg-muted flex items-center justify-center max-h-96"
        >
          <img :src="liveFile.url" :alt="liveFile.filename" class="max-w-full max-h-96 object-contain" />
        </div>
        <!-- Non-image icon -->
        <div v-else class="flex justify-center py-8">
          <UIcon name="i-lucide-file-text" class="w-20 h-20 text-muted" />
        </div>

        <!-- File details -->
        <dl class="text-sm space-y-1">
          <!-- Name row with inline rename -->
          <div class="flex gap-2 items-center">
            <dt class="text-muted w-24 shrink-0">Name</dt>
            <dd class="flex-1 min-w-0">
              <div v-if="renaming" class="flex items-center gap-2">
                <UInput
                  id="rename-input"
                  v-model="renameValue"
                  size="sm"
                  class="flex-1"
                  @keyup.enter="saveRename"
                  @keyup.escape="cancelRename"
                />
                <UButton size="sm" :loading="renameSaving" @click="saveRename">Save</UButton>
                <UButton size="sm" variant="ghost" @click="cancelRename">Cancel</UButton>
              </div>
              <div v-else class="flex items-center gap-2">
                <span class="truncate">{{ liveFile.filename }}</span>
                <UButton size="xs" variant="ghost" icon="i-lucide-pencil" @click="openRename" />
              </div>
            </dd>
          </div>
          <div class="flex gap-2">
            <dt class="text-muted w-24 shrink-0">Type</dt>
            <dd>{{ liveFile.fileType }}</dd>
          </div>
          <div class="flex gap-2">
            <dt class="text-muted w-24 shrink-0">Size</dt>
            <dd>{{ formatBytes(liveFile.sizeBytes) }}</dd>
          </div>
          <div class="flex gap-2">
            <dt class="text-muted w-24 shrink-0">Uploaded</dt>
            <dd>{{ formatDate(liveFile.createdAt) }}</dd>
          </div>
          <div class="flex gap-2 items-center">
            <dt class="text-muted w-24 shrink-0">URL</dt>
            <dd class="truncate text-xs font-mono">{{ liveFile.url }}</dd>
          </div>
        </dl>

        <!-- Actions -->
        <div class="flex gap-2 pt-2">
          <UButton
            variant="outline"
            :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
            size="sm"
            @click="copyUrl(liveFile.url)"
          >
            {{ copied ? 'Copied!' : 'Copy URL' }}
          </UButton>
          <UButton
            :href="liveFile.url"
            target="_blank"
            variant="outline"
            icon="i-lucide-external-link"
            size="sm"
          >
            Open
          </UButton>
          <UButton
            color="error"
            variant="outline"
            icon="i-lucide-trash-2"
            size="sm"
            class="ml-auto"
            @click="emit('delete', liveFile); close()"
          >
            Delete
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
