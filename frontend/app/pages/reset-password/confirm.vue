<script setup lang="ts">
const route = useRoute();
const { fetcher } = useApi();

const token = computed(() => route.query.token as string | undefined);

const newPassword = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const error = ref<string | null>(null);
const success = ref(false);

async function onSubmit() {
  if (!token.value) {
    error.value = 'Invalid or missing reset token. Please request a new reset link.';
    return;
  }

  error.value = null;
  isLoading.value = true;

  try {
    await fetcher('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ newPassword: newPassword.value, token: token.value }),
    });
    success.value = true;
  } catch {
    error.value = 'This reset link is invalid or has expired. Please request a new one.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <AppLogo class="mx-auto mb-4 h-10 w-auto" />
        <h1 class="text-2xl font-bold">Choose a new password</h1>
      </div>

      <div v-if="success" class="text-center">
        <UIcon name="i-lucide-circle-check" class="text-primary mx-auto mb-4 h-12 w-12" />
        <h2 class="mb-2 text-xl font-bold">Password updated!</h2>
        <p class="text-muted mb-8 text-sm">You can now sign in with your new password.</p>
        <UButton to="/login" class="w-full justify-center">Sign in</UButton>
      </div>

      <UCard v-else>
        <form class="space-y-4" @submit.prevent="onSubmit">
          <UFormField label="New password" name="newPassword">
            <UInput
              v-model="newPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Your new password"
              autocomplete="new-password"
              required
              class="w-full"
            >
              <template #trailing>
                <UButton
                  variant="ghost"
                  size="sm"
                  :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  @click="showPassword = !showPassword"
                />
              </template>
            </UInput>
          </UFormField>

          <UAlert v-if="error" color="error" :description="error" />

          <UButton type="submit" class="w-full justify-center" :loading="isLoading">
            Set new password
          </UButton>
        </form>
      </UCard>
    </div>
  </div>
</template>
