<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});

const { portfolio, fetch: fetchUser } = useCurrentUser();
const { fetcher } = useApi();

await fetchUser();

const form = reactive({
  isPublished: false,
  title: '',
  slug: '',
  description: '',
  ogImageUrl: '',
  seoTitle: '',
  seoDescription: '',
});

watch(
  portfolio,
  p => {
    if (!p) return;
    const seoMeta = p.seoMeta as { seoTitle?: string; seoDescription?: string } | null;
    form.isPublished = p.isPublished ?? false;
    form.title = p.title ?? '';
    form.slug = p.slug ?? '';
    form.description = p.description ?? '';
    form.ogImageUrl = p.ogImageUrl ?? '';
    form.seoTitle = seoMeta?.seoTitle ?? '';
    form.seoDescription = seoMeta?.seoDescription ?? '';
  },
  { immediate: true },
);

const { markSaved } = useUnsavedChanges(form);

const successMessage = ref('');
const errorMessage = ref('');
const saving = ref(false);

async function save() {
  if (!portfolio.value?.id) return;

  saving.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    await fetcher(`/api/portfolios/${portfolio.value.id}/settings`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({
        isPublished: form.isPublished,
        title: form.title || null,
        slug: form.slug || null,
        description: form.description || null,
        ogImageUrl: form.ogImageUrl || null,
        seoMeta: {
          seoTitle: form.seoTitle || null,
          seoDescription: form.seoDescription || null,
        },
      }),
    });
    markSaved();
    successMessage.value = 'Settings saved.';
  } catch (e: unknown) {
    errorMessage.value = e instanceof Error ? e.message : 'Failed to save settings.';
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <AdminLayoutPageStructure title="Site settings" description="Configure your portfolio.">
    <UForm class="max-w-md space-y-4" @submit.prevent="save">
      <USwitch v-model="form.isPublished" label="Publish site" description="Your portfolio will be publicly available." />
      <UFormField label="Portfolio title" name="title">
        <UInput v-model="form.title" placeholder="My Portfolio" class="w-full" />
      </UFormField>

      <UFormField label="URL" name="slug">
        <UInput
          v-model="form.slug"
          placeholder="my-portfolio"
          class="w-full"
          :ui="{ base: 'pl-21', leading: 'pointer-events-none' }"
        >
          <template #leading>
            <span class="text-muted text-sm">folio.app/p/</span>
          </template>
        </UInput>
      </UFormField>

      <UFormField label="Description" name="description">
        <UTextarea
          v-model="form.description"
          placeholder="A short description of your portfolio."
          class="w-full"
        />
      </UFormField>

      <USeparator class="mt-8 mb-6" />

      <UFormField label="SEO title" name="seoTitle">
        <UInput v-model="form.seoTitle" placeholder="SEO title" class="w-full" />
      </UFormField>

      <UFormField label="SEO description" name="seoDescription">
        <UTextarea v-model="form.seoDescription" placeholder="SEO description" class="w-full" />
      </UFormField>

      <UFormField
        label="OG image URL"
        name="ogImageUrl"
        description="Image shown when your portfolio is shared on social media."
      >
        <UInput v-model="form.ogImageUrl" placeholder="https://..." class="w-full" />
      </UFormField>

      <UAlert v-if="successMessage" color="success" variant="soft" :description="successMessage" />
      <UAlert v-if="errorMessage" color="error" variant="soft" :description="errorMessage" />

      <UButton type="submit" :loading="saving">Save changes</UButton>
    </UForm>
  </AdminLayoutPageStructure>
</template>
