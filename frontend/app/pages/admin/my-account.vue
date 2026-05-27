<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});

const { user, fetch: fetchUser } = useCurrentUser();
const { fetcher, apiBase } = useApi();

await fetchUser();

// ---------------------------------------------------------------------------
// Profile name form
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Avatar constants
// ---------------------------------------------------------------------------
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const DEFAULT_AVATARS = [
  '/avatars/avatar-1.png',
  '/avatars/avatar-2.png',
  '/avatars/avatar-3.png',
  '/avatars/avatar-4.png',
  '/avatars/avatar-5.png',
  '/avatars/avatar-6.png',
];

// ---------------------------------------------------------------------------
// Avatar state
// ---------------------------------------------------------------------------
const avatarError = ref('');
const avatarSuccess = ref('');
const uploadingAvatar = ref(false);
const showDefaultPicker = ref(false);

/** The currently displayed image — optimistically updated on success. */
const displayedImage = computed(() => user.value?.image ?? null);

// ---------------------------------------------------------------------------
// Upload a custom file
// ---------------------------------------------------------------------------
const fileInput = ref<HTMLInputElement | null>(null);

function openFilePicker() {
  fileInput.value?.click();
}

async function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  avatarError.value = '';
  avatarSuccess.value = '';

  // Client-side validation
  if (!ALLOWED_TYPES.includes(file.type)) {
    avatarError.value = 'Invalid file type. Please upload a JPG, PNG, GIF, or WebP image.';
    input.value = '';
    return;
  }
  if (file.size > MAX_FILE_SIZE) {
    avatarError.value = `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum size is 5 MB.`;
    input.value = '';
    return;
  }

  uploadingAvatar.value = true;
  try {
    const formData = new FormData();
    formData.append('avatar', file);

    // Cannot use fetcher() here — it would set Content-Type to application/json
    // and break the multipart boundary. Use raw fetch instead.
    const response = await fetch(`${apiBase}/api/users/me/avatar`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(body?.errors?.[0]?.detail ?? body?.message ?? response.statusText);
    }

    if (user.value) user.value.image = body.image;
    avatarSuccess.value = 'Profile image updated.';
  } catch (err: unknown) {
    avatarError.value = err instanceof Error ? err.message : 'Upload failed. Please try again.';
  } finally {
    uploadingAvatar.value = false;
    input.value = '';
  }
}

// ---------------------------------------------------------------------------
// Select a default avatar
// ---------------------------------------------------------------------------
async function selectDefault(path: string) {
  avatarError.value = '';
  avatarSuccess.value = '';
  uploadingAvatar.value = true;

  try {
    const data = await fetcher('/api/users/me/avatar', {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({ image: path }),
    });

    if (user.value) user.value.image = data.image;
    avatarSuccess.value = 'Profile image updated.';
    showDefaultPicker.value = false;
  } catch (err: unknown) {
    avatarError.value =
      err instanceof Error ? err.message : 'Failed to update avatar. Please try again.';
  } finally {
    uploadingAvatar.value = false;
  }
}
</script>

<template>
  <AdminLayoutPageWrapper title="My account">
    <UContainer>
      <UPage>
        <UPageHeader title="My Account" description="Configure settings for your user account." />
        <UPageBody>
          <!-- ---------------------------------------------------------------- -->
          <!-- Avatar section                                                    -->
          <!-- ---------------------------------------------------------------- -->
          <div class="max-w-md space-y-3 mb-8">
            <h2 class="font-medium">Profile Image</h2>

            <!-- Current avatar preview -->
            <div class="flex items-center gap-4">
              <div
                class="w-20 h-20 rounded-full overflow-hidden bg-muted border flex items-center justify-center shrink-0"
              >
                <img
                  v-if="displayedImage"
                  :src="displayedImage"
                  alt="Profile image"
                  class="w-full h-full object-cover"
                />
                <UIcon v-else name="i-lucide-user" class="w-8 h-8 text-muted-foreground" />
              </div>

              <div class="flex flex-col gap-2">
                <!-- Hidden file input -->
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  class="hidden"
                  @change="onFileChange"
                />
                <UButton
                  size="sm"
                  variant="outline"
                  :loading="uploadingAvatar"
                  :disabled="uploadingAvatar"
                  @click="openFilePicker"
                >
                  Upload image
                </UButton>
                <UButton
                  size="sm"
                  variant="ghost"
                  :disabled="uploadingAvatar"
                  @click="showDefaultPicker = !showDefaultPicker"
                >
                  {{ showDefaultPicker ? 'Hide defaults' : 'Choose a default' }}
                </UButton>
              </div>
            </div>

            <!-- File constraints hint -->
            <p class="text-xs text-muted-foreground">JPG, PNG, GIF or WebP · max 5 MB</p>

            <!-- Feedback messages -->
            <UAlert
              v-if="avatarSuccess"
              color="success"
              variant="soft"
              :description="avatarSuccess"
            />
            <UAlert v-if="avatarError" color="error" variant="soft" :description="avatarError" />

            <!-- Default avatar picker -->
            <Transition name="fade">
              <div v-if="showDefaultPicker" class="grid grid-cols-6 gap-2 pt-1">
                <button
                  v-for="path in DEFAULT_AVATARS"
                  :key="path"
                  type="button"
                  class="w-full aspect-square rounded-full overflow-hidden border-2 transition-colors focus:outline-none"
                  :class="
                    displayedImage === path
                      ? 'border-primary'
                      : 'border-transparent hover:border-muted-foreground'
                  "
                  :disabled="uploadingAvatar"
                  :aria-label="`Select default avatar ${path}`"
                  @click="selectDefault(path)"
                >
                  <img :src="path" alt="" class="w-full h-full object-cover" />
                </button>
              </div>
            </Transition>
          </div>

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

          <!-- ---------------------------------------------------------------- -->
          <!-- Password reset                                                    -->
          <!-- ---------------------------------------------------------------- -->
          <div class="max-w-md pt-6 border-t mt-6">
            <h2 class="font-medium mb-1">Password</h2>
            <p class="text-muted text-sm mb-3">Send a password reset link to your email address.</p>
            <UButton to="/reset-password" variant="outline">Reset password</UButton>
          </div>
        </UPageBody>
      </UPage>
    </UContainer>
  </AdminLayoutPageWrapper>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
