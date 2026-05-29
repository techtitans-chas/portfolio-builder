<script setup lang="ts">
import type { Project, ProjectLink } from '@portfolio-builder/shared/types';

const props = defineProps<{
  project?: Project | null;
}>();

const emit = defineEmits<{
  saved: [project: Project];
  deleted: [id: string];
}>();

const open = defineModel<boolean>('open', { default: false });

const { fetcher } = useApi();

const isEdit = computed(() => !!props.project);

const form = reactive({
  title: '',
  description: '',
  time: '',
  isPublished: false,
  tags: [] as string[],
  links: [] as ProjectLink[],
});

const snapshot = ref('');

function resetForm() {
  const p = props.project;
  form.title = p?.title ?? '';
  form.description = p?.description ?? '';
  form.time = p?.time ?? '';
  form.isPublished = p?.isPublished ?? false;
  form.tags = p?.tags ? [...p.tags] : [];
  form.links = p?.links ? p.links.map(l => ({ ...l })) : [];
  snapshot.value = JSON.stringify(form);
}

watch(open, val => {
  if (val) resetForm();
});

const isDirty = computed(() => snapshot.value !== JSON.stringify(form));

// Confirmation modal state for unsaved changes
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

// Tag input
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

// Links
const expandedLinks = ref<Set<string>>(new Set());

function toggleLink(id: string) {
  if (expandedLinks.value.has(id)) {
    expandedLinks.value.delete(id);
  } else {
    expandedLinks.value.add(id);
  }
}

function addLink() {
  const newLink: ProjectLink = {
    id: crypto.randomUUID(),
    title: '',
    url: '',
    icon: null,
    isPublished: true,
    sortOrder: form.links.length,
  };
  form.links.push(newLink);
  expandedLinks.value.add(newLink.id);
}

function removeLink(id: string) {
  form.links = form.links.filter(l => l.id !== id);
  expandedLinks.value.delete(id);
}

function toggleLinkPublished(link: ProjectLink) {
  link.isPublished = !link.isPublished;
}

// Save / delete
const saving = ref(false);
const errorMessage = ref('');

async function save() {
  saving.value = true;
  errorMessage.value = '';

  try {
    const payload = {
      title: form.title,
      description: form.description || null,
      time: form.time || null,
      isPublished: form.isPublished,
      tags: form.tags,
      links: form.links,
    };

    let result: { project: Project };

    if (isEdit.value && props.project) {
      result = await fetcher(`/api/projects/${props.project.id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(payload),
      });
    } else {
      result = await fetcher('/api/projects', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
      });
    }

    snapshot.value = JSON.stringify(form);
    emit('saved', result.project);
    open.value = false;
  } catch (e: unknown) {
    errorMessage.value = e instanceof Error ? e.message : 'Failed to save project.';
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <UModal
    :open="open"
    :title="isEdit ? 'Edit project' : 'New project'"
    :ui="{ content: 'max-w-2xl' }"
    @update:open="
      val => {
        if (!val) tryClose();
      }
    "
  >
    <template #body>
      <div class="space-y-5">
        <!-- Preview image placeholder -->
        <div class="flex gap-5 items-start">
          <div class="shrink-0">
            <p class="text-sm font-medium mb-2">Preview image</p>
            <div
              class="w-28 h-20 rounded-md border-2 border-dashed border-muted flex items-center justify-center bg-muted/30"
            >
              <UIcon name="i-lucide-image" class="text-muted-foreground size-7" />
            </div>
            <p class="text-xs text-muted mt-1">Coming soon</p>
          </div>

          <div class="flex-1 space-y-4">
            <UFormField label="Title" name="title">
              <UInput v-model="form.title" placeholder="My project" class="w-full" />
            </UFormField>

            <UFormField label="Time" name="time">
              <UInput v-model="form.time" placeholder="2024" class="w-full" />
            </UFormField>
          </div>
        </div>

        <UFormField label="Description" name="description">
          <UTextarea
            v-model="form.description"
            placeholder="A short description of the project."
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
                class="ml-1 flex justify-center opacity-60 hover:opacity-100"
                :aria-label="`Remove tag ${tag}`"
                @click="removeTag(tag)"
              >
                <UIcon name="i-lucide-x" class="size-3" />
              </button>
            </UBadge>
          </div>
        </div>

        <USeparator />

        <!-- Links -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm font-medium">Links</p>
            <UButton size="xs" icon="i-lucide-plus" @click="addLink">New link</UButton>
          </div>

          <div v-if="form.links.length" class="space-y-2">
            <div
              v-for="link in form.links"
              :key="link.id"
              class="border border-default rounded-md overflow-hidden"
            >
              <!-- Link header row -->
              <div class="flex items-center gap-2 px-3 py-2 bg-muted/20">
                <!-- Reorder placeholder -->
                <UIcon
                  name="i-lucide-grip-vertical"
                  class="text-muted-foreground size-4 shrink-0"
                />

                <button
                  type="button"
                  class="flex-1 text-left text-sm font-medium truncate"
                  @click="toggleLink(link.id)"
                >
                  {{ link.title || 'Untitled link' }}
                </button>

                <UButton
                  :icon="link.isPublished ? 'i-lucide-eye' : 'i-lucide-eye-off'"
                  size="xs"
                  variant="ghost"
                  :color="link.isPublished ? 'primary' : 'neutral'"
                  :aria-label="link.isPublished ? 'Hide link' : 'Show link'"
                  @click="toggleLinkPublished(link)"
                />
                <UButton
                  icon="i-lucide-trash-2"
                  size="xs"
                  variant="ghost"
                  color="error"
                  aria-label="Remove link"
                  @click="removeLink(link.id)"
                />
                <UButton
                  :icon="
                    expandedLinks.has(link.id) ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'
                  "
                  size="xs"
                  variant="ghost"
                  aria-label="Toggle link details"
                  @click="toggleLink(link.id)"
                />
              </div>

              <!-- Link fields (accordion body) -->
              <div
                v-if="expandedLinks.has(link.id)"
                class="px-3 py-3 space-y-3 border-t border-default"
              >
                <UFormField label="Icon" name="icon">
                  <UInput
                    :model-value="link.icon ?? ''"
                    placeholder="e.g. i-lucide-github"
                    class="w-full"
                    @update:model-value="link.icon = ($event as string) || null"
                  />
                </UFormField>
                <UFormField label="Title" name="title">
                  <UInput v-model="link.title" placeholder="GitHub" class="w-full" />
                </UFormField>
                <UFormField label="URL" name="url">
                  <UInput v-model="link.url" placeholder="https://..." class="w-full" />
                </UFormField>
              </div>
            </div>
          </div>

          <p v-else class="text-sm text-muted mt-1">No links added yet.</p>
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
