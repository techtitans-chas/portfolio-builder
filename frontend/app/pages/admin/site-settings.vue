<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});

const { portfolio, fetch: fetchUser, clear: clearUser } = useCurrentUser();
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
  logoLight: '',
  logoDark: '',
});

watch(
  portfolio,
  p => {
    if (!p) return;
    const seoMeta = p.seoMeta as { seoTitle?: string; seoDescription?: string } | null;
    const themeSettings = p.themeSettings as {
      logoLight?: string | null;
      logoDark?: string | null;
    } | null;
    form.isPublished = p.isPublished ?? false;
    form.title = p.title ?? '';
    form.slug = p.slug ?? '';
    form.description = p.description ?? '';
    form.ogImageUrl = p.ogImageUrl ?? '';
    form.seoTitle = seoMeta?.seoTitle ?? '';
    form.seoDescription = seoMeta?.seoDescription ?? '';
    form.logoLight = themeSettings?.logoLight ?? '';
    form.logoDark = themeSettings?.logoDark ?? '';
  },
  { immediate: true },
);

const { markSaved } = useUnsavedChanges(form);

const successMessage = ref('');
const errorMessage = ref('');
const saving = ref(false);

const ogImagePickerOpen = ref(false);
const logoLightPickerOpen = ref(false);
const logoDarkPickerOpen = ref(false);

async function save() {
  if (!portfolio.value?.id) return;

  saving.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  // Preserve existing themeSettings fields (theme, mode, fonts) and only update logo fields
  const existingThemeSettings = portfolio.value.themeSettings as Record<string, unknown> | null;

  try {
    await fetcher(`/api/portfolios/${portfolio.value.id}/settings`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({
        isPublished: form.isPublished,
        ...(form.title && { title: form.title }),
        ...(form.slug && { slug: form.slug }),
        description: form.description || null,
        ogImageUrl: form.ogImageUrl || null,
        seoMeta: {
          seoTitle: form.seoTitle || null,
          seoDescription: form.seoDescription || null,
        },
        themeSettings: {
          ...existingThemeSettings,
          logoLight: form.logoLight || null,
          logoDark: form.logoDark || null,
        },
      }),
    });
    clearUser();
    await fetchUser();
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
      <USwitch
        v-model="form.isPublished"
        label="Publish site"
        description="Your portfolio will be publicly available."
      />
      <UFormField label="Portfolio title" name="title">
        <UInput v-model="form.title" placeholder="My Portfolio" class="w-full" />
      </UFormField>

      <UFormField label="URL" name="slug">
        <UInput
          v-model="form.slug"
          placeholder="my-portfolio"
          class="w-full"
          :ui="{ base: 'pl-8', leading: 'pointer-events-none' }"
        >
          <template #leading>
            <span class="text-muted text-sm">/p/</span>
          </template>
        </UInput>
      </UFormField>

      <UFormField label="Description" name="description">
        <UTextarea
          v-model="form.description"
          placeholder="A short description of your website."
          class="w-full"
        />
      </UFormField>

      <USeparator class="mt-8 mb-6" />

      <h2 class="font-medium mb-2">Logo</h2>

      <UAlert
        color="neutral"
        variant="subtle"
        title="SVG or transparent PNG recommended."
        description="Dark mode falls back to light logo if not set."
      />

      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Light mode" name="logoLight">
          <div class="flex flex-col gap-2 w-full">
            <UButton
              :icon="form.logoLight ? 'i-lucide-image' : 'i-lucide-plus'"
              color="neutral"
              variant="outline"
              class="w-full"
              @click="logoLightPickerOpen = true"
            >
              {{ form.logoLight ? 'Change logo' : 'Choose logo' }}
            </UButton>
            <div
              v-if="form.logoLight"
              class="relative rounded-md overflow-hidden border border-default bg-white flex items-center justify-center h-20 w-full"
            >
              <img :src="form.logoLight" alt="" class="max-h-full max-w-full object-contain p-2" />
              <UButton
                icon="i-lucide-x"
                color="neutral"
                variant="solid"
                size="xs"
                class="absolute top-1 right-1 opacity-80 hover:opacity-100"
                aria-label="Remove light logo"
                @click="form.logoLight = ''"
              />
            </div>
          </div>
        </UFormField>

        <UFormField label="Dark mode" name="logoDark">
          <div class="flex flex-col gap-2 w-full">
            <div
              v-if="form.logoDark"
              class="relative rounded-md overflow-hidden border border-default bg-gray-900 flex items-center justify-center h-20 w-full"
            >
              <img :src="form.logoDark" alt="" class="max-h-full max-w-full object-contain p-2" />
              <UButton
                icon="i-lucide-x"
                color="neutral"
                variant="solid"
                size="xs"
                class="absolute top-1 right-1 opacity-80 hover:opacity-100"
                aria-label="Remove dark logo"
                @click="form.logoDark = ''"
              />
            </div>
            <UButton
              :icon="form.logoDark ? 'i-lucide-image' : 'i-lucide-plus'"
              color="neutral"
              variant="outline"
              class="w-full"
              @click="logoDarkPickerOpen = true"
            >
              {{ form.logoDark ? 'Change logo' : 'Choose logo' }}
            </UButton>
          </div>
        </UFormField>
      </div>

      <USeparator class="mt-8 mb-6" />

      <h2 class="font-medium mb-2">SEO</h2>

      <UFormField label="SEO title" name="seoTitle">
        <UInput v-model="form.seoTitle" placeholder="SEO title" class="w-full" />
      </UFormField>

      <UFormField label="SEO description" name="seoDescription">
        <UTextarea v-model="form.seoDescription" placeholder="SEO description" class="w-full" />
      </UFormField>

      <UFormField
        label="OG image"
        name="ogImageUrl"
        description="Image shown when your portfolio is shared on social media. Recommended size: 1200×630."
      >
        <div class="flex flex-col gap-2 w-full">
          <div
            v-if="form.ogImageUrl"
            class="relative rounded-md overflow-hidden border border-default aspect-video bg-muted w-full"
          >
            <img :src="form.ogImageUrl" alt="" class="w-full h-full object-cover" />
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="solid"
              size="xs"
              class="absolute top-1 right-1 opacity-80 hover:opacity-100"
              aria-label="Remove OG image"
              @click="form.ogImageUrl = ''"
            />
          </div>
          <UButton
            :icon="form.ogImageUrl ? 'i-lucide-image' : 'i-lucide-plus'"
            color="neutral"
            variant="outline"
            class="w-full"
            @click="ogImagePickerOpen = true"
          >
            {{ form.ogImageUrl ? 'Change image' : 'Choose image' }}
          </UButton>
        </div>
      </UFormField>

      <UAlert v-if="successMessage" color="success" variant="soft" :description="successMessage" />
      <UAlert v-if="errorMessage" color="error" variant="soft" :description="errorMessage" />

      <UButton type="submit" :loading="saving">Save changes</UButton>
    </UForm>
  </AdminLayoutPageStructure>

  <AdminMediaPickerModal
    v-model:open="ogImagePickerOpen"
    images-only
    :selected-url="form.ogImageUrl || null"
    @select="url => (form.ogImageUrl = url)"
  />

  <AdminMediaPickerModal
    v-model:open="logoLightPickerOpen"
    images-only
    :selected-url="form.logoLight || null"
    @select="url => (form.logoLight = url)"
  />

  <AdminMediaPickerModal
    v-model:open="logoDarkPickerOpen"
    images-only
    :selected-url="form.logoDark || null"
    @select="url => (form.logoDark = url)"
  />
</template>
