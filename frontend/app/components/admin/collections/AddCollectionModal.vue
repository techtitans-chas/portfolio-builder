<script setup lang="ts">
import type { Collection } from '@portfolio-builder/shared/types';
import { collectionTypes } from '@portfolio-builder/shared/types';

const emit = defineEmits<{
  added: [collection: Collection];
}>();

const open = defineModel<boolean>('open', { default: false });

const { fetcher } = useApi();
const { activeCollectionTypes } = useCollections();

const availableTypes = computed(() =>
  collectionTypes.filter(ct => !activeCollectionTypes.value.has(ct.type)),
);

const selectedType = ref('');
const saving = ref(false);
const errorMessage = ref('');

function reset() {
  selectedType.value = '';
  errorMessage.value = '';
}

watch(open, val => {
  if (val) reset();
});

async function add() {
  if (!selectedType.value) return;
  saving.value = true;
  errorMessage.value = '';
  try {
    const result = await fetcher('/api/collections', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ type: selectedType.value }),
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
        <div v-if="!availableTypes.length" class="py-4 text-center text-sm text-muted">
          All available collection types have already been added.
        </div>
        <div v-else class="grid grid-cols-1 gap-2">
          <button
            v-for="ct in availableTypes"
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
            <div>
              <p class="font-medium text-sm">{{ ct.label }}</p>
              <div class="flex items-center gap-1 mt-1 flex-wrap">
                <span class="text-xs text-muted">Blocks:</span>
                <UBadge v-for="block in ct.allowedBlocks" :key="block" variant="soft" size="sm">
                  {{ block }}
                </UBadge>
              </div>
            </div>
          </button>
        </div>
        <UAlert v-if="errorMessage" color="error" variant="soft" :description="errorMessage" />
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <UButton variant="ghost" @click="open = false">Cancel</UButton>
        <UButton :loading="saving" :disabled="!selectedType" @click="add">Add collection</UButton>
      </div>
    </template>
  </UModal>
</template>
