<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});

const { user, fetch: fetchUser } = useCurrentUser();
const { fetcher } = useApi();

await fetchUser();

const form = reactive({
  name: user.value?.name ?? '',
});

const successMessage = ref('');
const errorMessage = ref('');
const saving = ref(false);

async function save() {
  successMessage.value = '';
  errorMessage.value = '';
  saving.value = true;

  try {
    const data = await fetcher('/api/users/me', {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({ name: form.name }),
    });

    if (user.value) {
      user.value.name = data.user.name;
    }

    successMessage.value = 'Account updated successfully.';
  } catch {
    errorMessage.value = 'Something went wrong. Please try again.';
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader title="My Account" description="Configure settings for your user account." />
      <UPageBody>
        <UForm class="max-w-md space-y-4" @submit.prevent="save">
          <UFormField label="Email" name="email">
            <UInput :model-value="user?.email" type="email" disabled class="w-full" />
          </UFormField>

          <UFormField label="Name" name="name">
            <UInput v-model="form.name" placeholder="Your name" class="w-full" />
          </UFormField>

          <UAlert
            v-if="successMessage"
            color="success"
            variant="soft"
            :description="successMessage"
          />

          <UAlert
            v-if="errorMessage"
            color="error"
            variant="soft"
            :description="errorMessage"
          />

          <UButton type="submit" :loading="saving">
            Save changes
          </UButton>
        </UForm>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
