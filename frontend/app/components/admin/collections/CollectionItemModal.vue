<script setup lang="ts">
import type { CollectionItem } from '@portfolio-builder/shared/types';
import { getCollectionType } from '@portfolio-builder/shared/types';

const props = defineProps<{
  item?: CollectionItem | null;
  collectionId: string;
  collectionType: string;
}>();

const emit = defineEmits<{
  saved: [item: CollectionItem];
}>();

const open = defineModel<boolean>('open', { default: false });

const { fetcher } = useApi();

const typeDef = computed(() => getCollectionType(props.collectionType));
const isEdit = computed(() => !!props.item);

const form = reactive<{
  data: Record<string, unknown>;
  isPublished: boolean;
}>({
  data: {},
  isPublished: false,
});

const snapshot = ref('');

function resetForm() {
  const fields = typeDef.value?.fields ?? [];
  const initialData: Record<string, unknown> = {};
  for (const field of fields) {
    initialData[field.key] =
      props.item?.data[field.key] ??
      (field.type === 'tags' ? [] : field.type === 'boolean' ? false : '');
  }
  form.data = initialData;
  form.isPublished = props.item?.isPublished ?? false;
  snapshot.value = JSON.stringify(form);
}

watch(open, val => {
  if (val) resetForm();
});

const isDirty = computed(() => snapshot.value !== JSON.stringify(form));
const confirmCloseOpen = ref(false);

function tryClose() {
  if (isDirty.value) {
    confirmCloseOpen.value = true;
  } else {
    open.value = false;
  }
}

function forceClose() {
  confirmCloseOpen.value = false;
  open.value = false;
}

// Tag handling
const tagInputs = reactive<Record<string, string>>({});

function addTag(fieldKey: string) {
  const tag = (tagInputs[fieldKey] ?? '').trim();
  if (!tag) return;
  const current = (form.data[fieldKey] as string[]) ?? [];
  if (!current.includes(tag)) {
    form.data[fieldKey] = [...current, tag];
  }
  tagInputs[fieldKey] = '';
}

function removeTag(fieldKey: string, tag: string) {
  form.data[fieldKey] = ((form.data[fieldKey] as string[]) ?? []).filter(t => t !== tag);
}

function onTagKeydown(e: KeyboardEvent, fieldKey: string) {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTag(fieldKey);
  }
}

// Image picker
const imagePickerField = ref<string | null>(null);
const imagePickerOpen = computed({
  get: () => imagePickerField.value !== null,
  set: val => {
    if (!val) imagePickerField.value = null;
  },
});

// Save
const saving = ref(false);
const errorMessage = ref('');

async function save() {
  saving.value = true;
  errorMessage.value = '';
  try {
    const payload = { data: form.data, isPublished: form.isPublished };
    let result: { item: CollectionItem };
    if (isEdit.value && props.item) {
      result = await fetcher(`/api/collections/${props.collectionId}/items/${props.item.id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(payload),
      });
    } else {
      result = await fetcher(`/api/collections/${props.collectionId}/items`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
      });
    }
    snapshot.value = JSON.stringify(form);
    emit('saved', result.item);
    open.value = false;
  } catch (e: unknown) {
    errorMessage.value = e instanceof Error ? e.message : 'Failed to save item.';
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <UModal
    :open="open"
    :title="isEdit ? 'Edit item' : 'New item'"
    :ui="{ content: 'max-w-lg' }"
    @update:open="
      val => {
        if (!val) tryClose();
      }
    "
  >
    <template #body>
      <div v-if="typeDef" class="space-y-4">
        <template v-for="field in typeDef.fields" :key="field.key">
          <!-- Tags field -->
          <div v-if="field.type === 'tags'">
            <p class="text-sm font-medium mb-2">{{ field.label }}</p>
            <div class="flex gap-2">
              <UInput
                v-model="tagInputs[field.key]"
                :placeholder="field.placeholder ?? 'Add a tag'"
                class="flex-1"
                @keydown="onTagKeydown($event, field.key)"
              />
              <UButton
                variant="outline"
                icon="i-lucide-plus"
                aria-label="Add tag"
                @click="addTag(field.key)"
              />
            </div>
            <div
              v-if="(form.data[field.key] as string[])?.length"
              class="flex flex-wrap gap-2 mt-2"
            >
              <UBadge
                v-for="tag in form.data[field.key] as string[]"
                :key="tag"
                variant="soft"
                class="gap-1 cursor-default"
              >
                {{ tag }}
                <button
                  type="button"
                  class="ml-1 flex justify-center opacity-60 hover:opacity-100"
                  :aria-label="`Remove tag ${tag}`"
                  @click="removeTag(field.key, tag)"
                >
                  <UIcon name="i-lucide-x" class="size-3" />
                </button>
              </UBadge>
            </div>
          </div>

          <!-- Boolean field -->
          <UFormField v-else-if="field.type === 'boolean'" :label="field.label" :name="field.key">
            <USwitch v-model="form.data[field.key] as boolean" />
          </UFormField>

          <!-- Textarea field -->
          <UFormField v-else-if="field.type === 'textarea'" :label="field.label" :name="field.key">
            <UTextarea
              v-model="form.data[field.key] as string"
              :placeholder="field.placeholder"
              class="w-full"
              :rows="3"
            />
          </UFormField>

          <!-- Image field -->
          <UFormField v-else-if="field.type === 'image'" :label="field.label" :name="field.key">
            <div class="flex gap-3 items-start">
              <div
                class="relative w-24 h-16 rounded-md overflow-hidden border border-default bg-muted flex items-center justify-center cursor-pointer hover:border-primary transition-colors shrink-0"
                @click="imagePickerField = field.key"
              >
                <img
                  v-if="form.data[field.key]"
                  :src="form.data[field.key] as string"
                  alt=""
                  class="w-full h-full object-cover"
                />
                <UIcon v-else name="i-lucide-image" class="text-muted size-5" />
                <UButton
                  v-if="form.data[field.key]"
                  icon="i-lucide-x"
                  color="neutral"
                  variant="solid"
                  size="xs"
                  class="absolute top-0.5 right-0.5 opacity-80 hover:opacity-100"
                  aria-label="Remove image"
                  @click.stop="form.data[field.key] = ''"
                />
              </div>
              <UButton
                color="neutral"
                variant="outline"
                size="xs"
                @click="imagePickerField = field.key"
              >
                {{ form.data[field.key] ? 'Change image' : 'Choose image' }}
              </UButton>
            </div>
          </UFormField>

          <!-- Text / url / number -->
          <UFormField v-else :label="field.label" :name="field.key">
            <UInput
              v-model="form.data[field.key] as string"
              :placeholder="field.placeholder"
              :type="field.type === 'url' ? 'url' : field.type === 'number' ? 'number' : 'text'"
              class="w-full"
            />
          </UFormField>
        </template>

        <UAlert v-if="errorMessage" color="error" variant="soft" :description="errorMessage" />
      </div>
      <p v-else class="text-sm text-muted">Unknown collection type.</p>
    </template>

    <template #footer>
      <div class="flex items-center justify-between w-full">
        <USwitch v-model="form.isPublished" label="Published" />
        <div class="flex gap-2">
          <UButton variant="ghost" @click="tryClose">Cancel</UButton>
          <UButton :loading="saving" @click="save">Save</UButton>
        </div>
      </div>
    </template>
  </UModal>

  <UModal
    v-model:open="confirmCloseOpen"
    title="Unsaved changes"
    description="You have unsaved changes. Are you sure you want to discard them?"
  >
    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <UButton variant="ghost" @click="confirmCloseOpen = false">Keep editing</UButton>
        <UButton color="error" @click="forceClose">Discard changes</UButton>
      </div>
    </template>
  </UModal>

  <AdminMediaPickerModal
    v-model:open="imagePickerOpen"
    images-only
    :selected-url="imagePickerField ? (form.data[imagePickerField] as string | null) : null"
    @select="
      url => {
        if (imagePickerField) {
          form.data[imagePickerField] = url;
          imagePickerField = null;
        }
      }
    "
  />
</template>
