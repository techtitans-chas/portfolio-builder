<script setup lang="ts">
import type { Experience } from '@portfolio-builder/shared/types';

const props = defineProps<{
  experience?: Experience | null;
}>();

const emit = defineEmits<{
  saved: [experience: Experience];
}>();

const open = defineModel<boolean>('open', { default: false });

const { fetcher } = useApi();

const isEdit = computed(() => !!props.experience);

const form = reactive({
  title: '',
  place: '',
  location: '',
  time: '',
  description: '',
  isPublished: false,
  tags: [] as string[],
});

const snapshot = ref('');

function resetForm() {
  const e = props.experience;
  form.title = e?.title ?? '';
  form.place = e?.place ?? '';
  form.location = e?.location ?? '';
  form.time = e?.time ?? '';
  form.description = e?.description ?? '';
  form.isPublished = e?.isPublished ?? false;
  form.tags = e?.tags ? [...e.tags] : [];
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

// Tags
const tagInput = ref('');

function addTag() {
  const tag = tagInput.value.trim();
  if (tag && !form.tags.includes(tag)) {
    form.tags.push(tag);
  }
  tagInput.value = '';
}

function removeTag(tag: string) {
  form.tags = form.tags.filter(t => t !== tag);
}

function onTagKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTag();
  }
}

// Save
const saving = ref(false);
const errorMessage = ref('');

async function save() {
  saving.value = true;
  errorMessage.value = '';

  try {
    const payload = {
      title: form.title,
      place: form.place || null,
      location: form.location || null,
      time: form.time || null,
      description: form.description || null,
      isPublished: form.isPublished,
      tags: form.tags,
    };

    let result: { experience: Experience };

    if (isEdit.value && props.experience) {
      result = await fetcher(`/api/experiences/${props.experience.id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(payload),
      });
    } else {
      result = await fetcher('/api/experiences', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
      });
    }

    snapshot.value = JSON.stringify(form);
    emit('saved', result.experience);
    open.value = false;
  } catch (e: unknown) {
    errorMessage.value = e instanceof Error ? e.message : 'Failed to save experience.';
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <UModal
    :open="open"
    :title="isEdit ? 'Edit experience' : 'New experience'"
    :ui="{ content: 'max-w-2xl' }"
    @update:open="
      val => {
        if (!val) tryClose();
      }
    "
  >
    <template #body>
      <div class="space-y-5">
        <!-- Title + Time -->
        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Title" name="title" class="col-span-2 sm:col-span-1">
            <UInput v-model="form.title" placeholder="Fullstack Developer" class="w-full" />
          </UFormField>
          <UFormField label="Time" name="time" class="col-span-2 sm:col-span-1">
            <UInput v-model="form.time" placeholder="2024 - current" class="w-full" />
          </UFormField>
        </div>

        <!-- Place + Location -->
        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Place" name="place" class="col-span-2 sm:col-span-1">
            <UInput v-model="form.place" placeholder="Webb Agency AB" class="w-full" />
          </UFormField>
          <UFormField label="Location" name="location" class="col-span-2 sm:col-span-1">
            <UInput v-model="form.location" placeholder="Stockholm, Sweden" class="w-full" />
          </UFormField>
        </div>

        <!-- Description -->
        <UFormField label="Description" name="description">
          <UTextarea
            v-model="form.description"
            placeholder="A short description of the experience."
            class="w-full"
            :rows="3"
          />
        </UFormField>

        <!-- Tags -->
        <div>
          <p class="text-sm font-medium mb-2">Tags</p>
          <div class="flex gap-2">
            <UInput
              v-model="tagInput"
              placeholder="Add a tag"
              class="flex-1"
              @keydown="onTagKeydown"
            />
            <UButton variant="outline" icon="i-lucide-plus" aria-label="Add tag" @click="addTag" />
          </div>
          <div v-if="form.tags.length" class="flex flex-wrap gap-2 mt-2">
            <UBadge v-for="tag in form.tags" :key="tag" variant="soft" class="gap-1 cursor-default">
              {{ tag }}
              <button
                type="button"
                class="ml-1 opacity-60 hover:opacity-100 flex justify-center"
                :aria-label="`Remove tag ${tag}`"
                @click="removeTag(tag)"
              >
                <UIcon name="i-lucide-x" class="size-3" />
              </button>
            </UBadge>
          </div>
        </div>

        <UAlert v-if="errorMessage" color="error" variant="soft" :description="errorMessage" />
      </div>
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

  <!-- Unsaved changes confirmation -->
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
</template>
