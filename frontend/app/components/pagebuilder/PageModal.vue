<script setup lang="ts">
import type { Page } from '@portfolio-builder/shared/types';

const props = defineProps<{
  portfolioId: string;
  page?: Page | null;
}>();

const emit = defineEmits<{
  saved: [page: Page];
}>();

const open = defineModel<boolean>('open', { default: false });

const { fetcher } = useApi();

const isEdit = computed(() => !!props.page);

const form = reactive({
  title: '',
  slug: '',
  seoDescription: '',
  seoTitle: '',
  seoOgImageUrl: '' as string | null,
  isPublished: false,
  showInMenu: true,
});

const snapshot = ref('');

function resetForm() {
  const p = props.page;
  form.title = p?.title ?? '';
  form.slug = p?.slug ?? '';
  form.seoDescription = p?.seoDescription ?? '';
  form.seoTitle = p?.seoTitle ?? '';
  form.seoOgImageUrl = p?.seoOgImageUrl ?? null;
  form.isPublished = p?.isPublished ?? false;
  form.showInMenu = p?.showInMenu ?? true;
  snapshot.value = JSON.stringify(form);
}

watch(open, val => {
  if (val) resetForm();
});

const isDirty = computed(() => snapshot.value !== JSON.stringify(form));

const slugTouched = ref(false);

watch(open, val => {
  if (val) slugTouched.value = false;
});

watch(
  () => form.title,
  title => {
    if (isEdit.value || slugTouched.value) return;
    form.slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },
);

function onSlugInput() {
  slugTouched.value = true;
}

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

const ogImagePickerOpen = ref(false);

const saving = ref(false);
const errorMessage = ref('');

async function save() {
  saving.value = true;
  errorMessage.value = '';
  try {
    const payload = {
      title: form.title,
      slug: form.slug || undefined,
      seoDescription: form.seoDescription || null,
      seoTitle: form.seoTitle || null,
      seoOgImageUrl: form.seoOgImageUrl || null,
      isPublished: form.isPublished,
      showInMenu: form.showInMenu,
    };

    let result: { page: Page };

    if (isEdit.value && props.page) {
      result = await fetcher(`/api/portfolios/${props.portfolioId}/pages/${props.page.id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(payload),
      });
    } else {
      result = await fetcher(`/api/portfolios/${props.portfolioId}/pages`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
      });
    }

    snapshot.value = JSON.stringify(form);
    emit('saved', result.page);
    open.value = false;
  } catch (e: unknown) {
    errorMessage.value = e instanceof Error ? e.message : 'Failed to save page.';
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <UModal
    :open="open"
    title="Page settings"
    :ui="{ content: 'max-w-xl' }"
    @update:open="
      val => {
        if (!val) tryClose();
      }
    "
  >
    <template #body>
      <div class="space-y-5">
        <!-- Title + Slug -->
        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Page title" name="title" class="col-span-2 sm:col-span-1">
            <UInput v-model="form.title" placeholder="About" class="w-full" />
          </UFormField>
          <UFormField label="Page slug" name="slug" class="col-span-2 sm:col-span-1">
            <UInput
              v-model="form.slug"
              placeholder="about"
              class="w-full"
              :ui="{ base: 'ps-4' }"
              @input="onSlugInput"
            >
              <template #leading>
                <span class="text-muted text-sm">/</span>
              </template>
            </UInput>
          </UFormField>
        </div>

        <!-- Page description -->
        <UFormField label="Page description" name="seoDescription">
          <UTextarea
            v-model="form.seoDescription"
            placeholder="A short description of this page."
            class="w-full"
            :rows="3"
          />
        </UFormField>

        <USeparator />

        <!-- OG image + SEO fields -->
        <div class="flex gap-5 items-start">
          <UFormField label="OG image" name="seoOgImageUrl" class="shrink-0">
            <div class="flex flex-col gap-2">
              <div
                class="relative w-32 h-[72px] rounded-md overflow-hidden border border-default bg-muted flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
                @click="ogImagePickerOpen = true"
              >
                <img
                  v-if="form.seoOgImageUrl"
                  :src="form.seoOgImageUrl"
                  alt=""
                  class="w-full h-full object-cover"
                />
                <UIcon v-else name="i-lucide-image" class="text-muted size-6" />
                <UButton
                  v-if="form.seoOgImageUrl"
                  icon="i-lucide-x"
                  color="neutral"
                  variant="solid"
                  size="xs"
                  class="absolute top-1 right-1 opacity-80 hover:opacity-100"
                  aria-label="Remove OG image"
                  @click.stop="form.seoOgImageUrl = null"
                />
              </div>
              <UButton
                color="neutral"
                variant="outline"
                size="xs"
                class="w-32 flex justify-center"
                @click="ogImagePickerOpen = true"
              >
                {{ form.seoOgImageUrl ? 'Change' : 'Choose' }}
              </UButton>
            </div>
          </UFormField>

          <div class="flex-1 space-y-4">
            <UFormField label="SEO title" name="seoTitle">
              <UInput v-model="form.seoTitle" placeholder="About - My Portfolio" class="w-full" />
            </UFormField>
            <UFormField label="SEO description" name="seoDescription2">
              <UTextarea
                v-model="form.seoDescription"
                placeholder="A short description for search engines."
                class="w-full"
                :rows="3"
              />
            </UFormField>
          </div>
        </div>

        <UAlert v-if="errorMessage" color="error" variant="soft" :description="errorMessage" />
      </div>
    </template>

    <template #footer>
      <div class="flex items-center justify-between w-full">
        <div class="flex gap-4">
          <USwitch v-model="form.isPublished" label="Published" />
          <USwitch v-model="form.showInMenu" label="Show in menu" />
        </div>
        <div class="flex gap-2">
          <UButton variant="ghost" @click="tryClose">Cancel</UButton>
          <UButton :loading="saving" :disabled="!form.title.trim()" @click="save">Save</UButton>
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
    v-model:open="ogImagePickerOpen"
    images-only
    :selected-url="form.seoOgImageUrl"
    @select="url => (form.seoOgImageUrl = url)"
  />
</template>
