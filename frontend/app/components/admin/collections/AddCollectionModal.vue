<script setup lang="ts">
import type { Collection } from '@portfolio-builder/shared/types';
import { collectionTypes } from '@portfolio-builder/shared/types';

const emit = defineEmits<{
  added: [collection: Collection];
}>();

const open = defineModel<boolean>('open', { default: false });

const { fetcher } = useApi();
const { collections } = useCollections();

const selectedType = ref('');
const customName = ref('');
const saving = ref(false);
const errorMessage = ref('');

const selectedTypeDef = computed(() => collectionTypes.find(ct => ct.type === selectedType.value));

const alreadyHasType = computed(() => collections.value.some(c => c.type === selectedType.value));

const existingNames = computed(() => collections.value.map(c => c.name.trim().toLowerCase()));

const nameToSubmit = computed(() => {
  if (!alreadyHasType.value) return selectedTypeDef.value?.label ?? '';
  return customName.value.trim();
});

const nameError = computed(() => {
  if (!alreadyHasType.value || !customName.value.trim()) return '';
  if (existingNames.value.includes(customName.value.trim().toLowerCase())) {
    return 'A collection with this name already exists.';
  }
  return '';
});

const canSubmit = computed(() => {
  if (!selectedType.value) return false;
  if (alreadyHasType.value && !customName.value.trim()) return false;
  if (nameError.value) return false;
  return true;
});

function reset() {
  selectedType.value = '';
  customName.value = '';
  errorMessage.value = '';
}

watch(open, val => {
  if (val) reset();
});

watch(selectedType, () => {
  customName.value = '';
  errorMessage.value = '';
});

async function add() {
  if (!canSubmit.value) return;
  saving.value = true;
  errorMessage.value = '';
  try {
    const result = await fetcher('/api/collections', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ type: selectedType.value, name: nameToSubmit.value }),
    });
    emit('added', result.collection);
    open.value = false;
  } catch (e: unknown) {
    errorMessage.value = e instanceof Error ? e.message : 'Failed to add collection.';
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <UModal v-model:open="open" title="Add collection">
    <template #body>
      <div class="space-y-4">
        <p class="text-sm text-muted">
          Choose a collection type to add to your portfolio. Once added, the associated blocks will
          become available in the page builder.
        </p>
        <div class="grid grid-cols-1 gap-2">
          <button
            v-for="ct in collectionTypes"
            :key="ct.type"
            type="button"
            class="flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors text-left"
            :class="
              selectedType === ct.type
                ? 'border-primary bg-primary/5'
                : 'border-default hover:bg-muted/30'
            "
            @click="selectedType = ct.type"
          >
            <UIcon :name="ct.icon" class="size-5 shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-medium text-sm">{{ ct.label }}</p>
                <UBadge
                  v-if="collections.some(c => c.type === ct.type)"
                  variant="soft"
                  size="xs"
                  color="neutral"
                >
                  added
                </UBadge>
              </div>
              <div class="flex items-center gap-1 mt-1 flex-wrap">
                <span class="text-xs text-muted">Blocks:</span>
                <UBadge v-for="block in ct.allowedBlocks" :key="block" variant="soft" size="sm">
                  {{ block }}
                </UBadge>
              </div>
            </div>
          </button>
        </div>

        <div v-if="alreadyHasType" class="space-y-1">
          <p class="text-sm font-medium">Collection name</p>
          <p class="text-xs text-muted">
            You already have a {{ selectedTypeDef?.label }} collection. Give this one a unique name.
          </p>
          <UInput
            v-model="customName"
            :placeholder="`e.g. Articles, Blog posts…`"
            autofocus
            @keydown.enter="add"
          />
          <p v-if="nameError" class="text-xs text-error">{{ nameError }}</p>
        </div>

        <UAlert v-if="errorMessage" color="error" variant="soft" :description="errorMessage" />
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <UButton variant="ghost" @click="open = false">Cancel</UButton>
        <UButton :loading="saving" :disabled="!canSubmit" @click="add">Add collection</UButton>
      </div>
    </template>
  </UModal>
</template>
