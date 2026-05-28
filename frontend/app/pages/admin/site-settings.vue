<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});

const languageOptions = useLanguageOptions();

const form = reactive({
  title: 'My Portfolio',
  url: 'awesome-portfolio',
  seoTitle: 'The Best Portfolio page on the internet',
  seoDescription:
    'Iusto et fugit voluptas error doloribus quo incidunt itaque. Fuga voluptas et qui soluta esse consequatur voluptas.',
  language: 'en',
});

const successMessage = ref('');
const errorMessage = ref('');
const saving = ref(false);

async function save() {
  console.log('Saving page');
}
</script>

<template>
  <AdminLayoutPageStructure title="Site settings" description="Configure your portfolio.">
    <UForm class="max-w-md space-y-4" @submit.prevent="save">
      <UFormField label="Site title" name="title">
        <UInput v-model="form.title" placeholder="Site title" class="w-full" />
      </UFormField>

      <UFormField label="URL" name="url">
        <UInput
          v-model="form.url"
          placeholder="my-portfolio"
          class="w-full"
          :ui="{
            base: 'pl-21',
            leading: 'pointer-events-none',
          }"
        >
          <template #leading>
            <span class="text-muted text-sm">folio.app/u/</span>
          </template>
        </UInput>
      </UFormField>

      <UFormField
        label="Language"
        name="language"
        description="Sets the lang attribute on your portfolio page. Type a BCP 47 tag if your language isn't listed."
      >
        <UInputMenu
          v-model="form.language"
          :items="languageOptions"
          value-key="value"
          placeholder="Search or type a language tag…"
          class="w-full"
        />
      </UFormField>

      <USeparator class="mt-8 mb-6" />

      <UFormField label="SEO title" name="seo-title">
        <UInput v-model="form.seoTitle" placeholder="SEO title" class="w-full" />
      </UFormField>

      <UFormField label="SEO description" name="seo-description">
        <UTextarea v-model="form.seoDescription" placeholder="SEO description" class="w-full" />
      </UFormField>

      <UAlert v-if="successMessage" color="success" variant="soft" :description="successMessage" />
      <UAlert v-if="errorMessage" color="error" variant="soft" :description="errorMessage" />

      <UButton type="submit" :loading="saving"> Save changes </UButton>
    </UForm>
  </AdminLayoutPageStructure>
</template>
