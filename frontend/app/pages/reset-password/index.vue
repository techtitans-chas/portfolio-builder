<script setup lang="ts">
const { fetcher } = useApi();

const email = ref('');
const submitted = ref(false);
const isLoading = ref(false);

async function onSubmit() {
  isLoading.value = true;
  try {
    const frontendUrl = useRuntimeConfig().public.frontendUrl;
    await fetcher('/api/auth/request-password-reset', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        redirectTo: `${frontendUrl}/reset-password/confirm`,
      }),
    });
  } catch {
    // Swallow errors — always show generic success to avoid account enumeration
  } finally {
    submitted.value = true;
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <AppLogo class="mx-auto mb-4 h-10 w-auto" />
        <h1 class="text-2xl font-bold">Reset your password</h1>
        <p class="text-muted mt-1 text-sm">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      <UCard v-if="!submitted">
        <form class="space-y-4" @submit.prevent="onSubmit">
          <UFormField label="Email" name="email">
            <UInput
              v-model="email"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
              required
              class="w-full"
            />
          </UFormField>

          <UButton type="submit" class="w-full justify-center" :loading="isLoading">
            Send reset link
          </UButton>

          <p class="text-muted text-center text-sm">
            <NuxtLink to="/login" class="text-primary font-medium hover:underline">
              Back to sign in
            </NuxtLink>
          </p>
        </form>
      </UCard>

      <div v-else class="text-center">
        <UIcon name="i-lucide-mail" class="text-primary mx-auto mb-4 h-12 w-12" />
        <h2 class="mb-2 text-xl font-bold">Check your inbox</h2>
        <p class="text-muted mb-8 text-sm">
          If an account exists for that email, you'll receive a reset link shortly.
        </p>
        <UButton to="/login" variant="outline" class="w-full justify-center">
          Back to sign in
        </UButton>
      </div>
    </div>
  </div>
</template>
