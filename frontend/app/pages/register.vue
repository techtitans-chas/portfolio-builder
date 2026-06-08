<script setup lang="ts">
import { registerSchema, type RegisterInput } from '@portfolio-builder/shared/schemas';
import { ApiError } from '~/composables/useApi';

const schema = registerSchema;
type RegisterForm = RegisterInput;

const { fetcher, apiBase } = useApi();

const { data: registrationClosed } = await useAsyncData('registration-status', async () => {
  const res = await fetch(`${apiBase}/api/auth/register`, { method: 'POST' });
  return res.status === 503;
});

const state = reactive<RegisterForm>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  slug: '',
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const success = ref(false);
const serverError = ref<string | null>(null);
const fieldErrors = ref<Partial<Record<keyof RegisterForm, string>>>({});

async function onSubmit() {
  serverError.value = null;
  fieldErrors.value = {};
  isLoading.value = true;
  try {
    await fetcher('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(state),
    });
    success.value = true;
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      if (err.status === 409) {
        const msg = err.message.toLowerCase();
        if (msg.includes('email')) {
          fieldErrors.value.email = err.message;
        } else if (msg.includes('slug') || msg.includes('url')) {
          fieldErrors.value.slug = err.message;
        } else {
          serverError.value = err.message;
        }
      } else if (err.status === 400) {
        const issues = (err.data as { issues?: Array<{ path: string; message: string }> })?.issues;
        if (issues) {
          for (const issue of issues) {
            const field = issue.path as keyof RegisterForm;
            if (field in state) fieldErrors.value[field] = issue.message;
          }
        }
      } else {
        serverError.value = err.message || 'Something went wrong. Please try again.';
      }
    } else {
      serverError.value = 'Could not connect to the server. Please try again.';
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <AppLogo class="mx-auto mb-4 h-10 w-auto text-6xl rounded-sm" />
        <h1 class="text-2xl font-bold">Create your account</h1>
        <p class="text-muted mt-1 text-sm">Start building your portfolio today</p>
      </div>

      <!-- Registration closed -->
      <UCard v-if="registrationClosed" class="text-center">
        <div class="py-4">
          <UIcon name="i-lucide-lock" class="text-muted mx-auto mb-3 h-10 w-10" />
          <p class="font-medium">Registration is currently closed.</p>
        </div>
      </UCard>

      <!-- Success state -->
      <AuthVerificationSuccessful v-else-if="success" :email="state.email" />

      <!-- Registration form -->
      <UCard v-else>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Name" name="name" :error="fieldErrors.name">
            <UInput
              v-model="state.name"
              placeholder="Your name"
              autocomplete="name"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Email" name="email" :error="fieldErrors.email">
            <UInput
              v-model="state.email"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Portfolio URL" name="slug" :error="fieldErrors.slug">
            <UInput
              v-model="state.slug"
              placeholder="my-portfolio"
              class="w-full"
              :ui="{
                base: 'pl-8',
                leading: 'pointer-events-none',
              }"
            >
              <template #leading>
                <span class="text-muted text-sm">/p/</span>
              </template>
            </UInput>
          </UFormField>

          <UFormField label="Password" name="password" :error="fieldErrors.password">
            <UInput
              v-model="state.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Min. 8 characters"
              autocomplete="new-password"
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

          <UFormField
            label="Confirm password"
            name="confirmPassword"
            :error="fieldErrors.confirmPassword"
          >
            <UInput
              v-model="state.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Repeat your password"
              autocomplete="new-password"
              class="w-full"
            >
              <template #trailing>
                <UButton
                  variant="ghost"
                  size="sm"
                  :icon="showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
                  @click="showConfirmPassword = !showConfirmPassword"
                />
              </template>
            </UInput>
          </UFormField>

          <UAlert v-if="serverError" color="error" :description="serverError" />

          <UButton type="submit" class="w-full justify-center" :loading="isLoading">
            Create account
          </UButton>

          <p class="text-muted text-center text-sm">
            Already have an account?
            <NuxtLink to="/login" class="text-primary font-medium hover:underline">
              Sign in
            </NuxtLink>
          </p>
        </UForm>
      </UCard>
    </div>
  </div>
</template>
