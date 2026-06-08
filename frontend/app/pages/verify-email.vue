<script setup lang="ts">
import { ApiError } from '~/composables/useApi';

const { fetcher } = useApi();

const email = ref('');
const isLoading = ref(false);
const success = ref(false);
const error = ref<string | null>(null);

async function resendVerification() {
  if (!email.value) return;
  error.value = null;
  isLoading.value = true;
  try {
    await fetcher('/api/auth/send-verification-email', {
      method: 'POST',
      body: JSON.stringify({ email: email.value }),
    });
    success.value = true;
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      error.value = err.message || 'Failed to resend. Please try again.';
    } else {
      error.value = 'Could not connect to the server. Please try again.';
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4 py-12">
    <div class="w-full max-w-md text-center">
      <UIcon name="i-lucide-mail" class="text-primary mx-auto mb-4 h-12 w-12" />
      <h1 class="mb-2 text-2xl font-bold">Verify your email</h1>
      <p class="text-muted mb-8 text-sm">
        We sent a verification link to your email address. Click the link to activate your account
        before signing in.
      </p>

      <UCard>
        <p class="mb-4 text-sm font-medium">Didn't receive the email?</p>

        <div v-if="success" class="text-sm text-green-600">
          Verification email resent — check your inbox.
        </div>

        <template v-else>
          <UFormField label="Your email address" name="email" class="mb-3 text-left">
            <UInput v-model="email" type="email" placeholder="you@example.com" class="w-full" />
          </UFormField>

          <UAlert v-if="error" color="error" :description="error" class="mb-3" />

          <UButton
            class="w-full justify-center"
            :loading="isLoading"
            :disabled="!email"
            @click="resendVerification"
          >
            Resend verification email
          </UButton>
        </template>
      </UCard>

      <p class="text-muted mt-6 text-sm">
        <NuxtLink to="/login" class="text-primary font-medium hover:underline">
          Back to sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
