<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});

const { user, fetch: fetchUser } = useCurrentUser();
const { fetcher } = useApi();

await fetchUser();

// ---------------------------------------------------------------------------
// Profile name form
// ---------------------------------------------------------------------------
const form = reactive({ name: '' });

watch(
  user,
  u => {
    if (u) form.name = u.name ?? '';
  },
  { immediate: true },
);

const { markSaved } = useUnsavedChanges(form);

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

    markSaved();
    successMessage.value = 'Account updated successfully.';
  } catch {
    errorMessage.value = 'Something went wrong. Please try again.';
  } finally {
    saving.value = false;
  }
}

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------
const avatarModalOpen = ref(false);
const displayedImage = computed(() => user.value?.image ?? null);

function onAvatarSuccess(imageUrl: string) {
  if (user.value) user.value.image = imageUrl;
}

const { features, fetchFeatures } = useServerFeatures();
await fetchFeatures();

// ---------------------------------------------------------------------------
// Delete account
// ---------------------------------------------------------------------------
const deleteModalOpen = ref(false);
const deleting = ref(false);
const deleteError = ref('');

async function confirmDeleteAccount() {
  deleting.value = true;
  deleteError.value = '';

  try {
    await fetcher('/api/users/me', {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({ email: user.value?.email }),
    });

    deleteModalOpen.value = false;
    await navigateTo('/?deleted=true');
  } catch {
    deleteError.value = 'Something went wrong. Please try again.';
    deleting.value = false;
  }
}
</script>

<template>
  <AdminLayoutPageStructure
    title="My Account"
    description="Configure settings for your user account."
  >
    <div class="max-w-md">
      <!-- ---------------------------------------------------------------- -->
      <!-- Avatar section                                                    -->
      <!-- ---------------------------------------------------------------- -->
      <div class="flex items-center gap-4 mb-8">
        <div
          class="w-20 h-20 rounded-full overflow-hidden bg-muted border border-muted flex items-center justify-center shrink-0"
        >
          <img
            v-if="displayedImage"
            :src="displayedImage"
            alt="Profile image"
            class="w-full h-full object-cover"
          />
          <UIcon v-else name="i-lucide-user" class="w-8 h-8 text-muted-foreground" />
        </div>

        <div>
          <p class="font-medium">Profile Image</p>
          <p class="text-sm text-muted mb-2">JPG, PNG, GIF or WebP · max 10 MB</p>
          <UButton
            size="sm"
            variant="outline"
            icon="i-lucide-pencil"
            @click="avatarModalOpen = true"
          >
            Change avatar
          </UButton>
        </div>
      </div>

      <AdminAvatarModal
        v-model:open="avatarModalOpen"
        :current-image="displayedImage"
        :storage-enabled="features.storage"
        @success="onAvatarSuccess"
      />

      <!-- ---------------------------------------------------------------- -->
      <!-- Profile name / email form                                         -->
      <!-- ---------------------------------------------------------------- -->
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

        <UAlert v-if="errorMessage" color="error" variant="soft" :description="errorMessage" />

        <UButton type="submit" :loading="saving"> Save changes </UButton>
      </UForm>

      <USeparator class="mt-8 mb-6" />

      <!-- ---------------------------------------------------------------- -->
      <!-- Password reset                                                    -->
      <!-- ---------------------------------------------------------------- -->
      <div class="max-w-m">
        <h2 class="font-medium mb-1">Password</h2>
        <p class="text-muted text-sm mb-3">Send a password reset link to your email address.</p>
        <UButton to="/reset-password" variant="outline">Reset password</UButton>
      </div>

      <USeparator class="mt-8 mb-6" />

      <!-- ---------------------------------------------------------------- -->
      <!-- Danger zone                                                       -->
      <!-- ---------------------------------------------------------------- -->
      <div class="max-w-md">
        <h2 class="font-medium mb-1 text-red-600 dark:text-red-400">Danger zone</h2>
        <p class="text-muted text-sm mb-3">
          Permanently delete your account and all associated data. This cannot be undone.
        </p>

        <UAlert
          v-if="deleteError"
          color="error"
          variant="soft"
          :description="deleteError"
          class="mb-3"
        />

        <UButton color="error" variant="outline" @click="deleteModalOpen = true">
          Delete account
        </UButton>

        <AdminDeleteAccountModal
          v-model:open="deleteModalOpen"
          :user-email="user?.email ?? ''"
          @confirm="confirmDeleteAccount"
          @cancel="deleteError = ''"
        />
      </div>
    </div>
  </AdminLayoutPageStructure>
</template>
