<script setup lang="ts">
import { z } from 'zod';

const schema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof schema>;

const { fetcher } = useApi();
const route = useRoute();

const state = reactive<LoginForm>({ email: '', password: '' });
const showPassword = ref(false);
const isLoading = ref(false);
const error = ref<string | null>(null);

async function onSubmit() {
  error.value = null;
  isLoading.value = true;
  try {
    await fetcher('/api/auth/sign-in/email', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ email: state.email, password: state.password }),
    });
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/admin';
    await navigateTo(redirect);
  } catch {
    error.value = 'Invalid email or password.';
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
        <h1 class="text-2xl font-bold">Sign in</h1>
        <p class="text-muted mt-1 text-sm">Welcome back</p>
      </div>

      <UCard>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Email" name="email">
            <UInput
              v-model="state.email"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput
              v-model="state.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Your password"
              autocomplete="current-password"
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
            Sign in
          </UButton>

          <div class="flex flex-col items-center gap-1 text-center text-sm">
            <NuxtLink to="/reset-password" class="text-muted hover:text-primary hover:underline">
              Forgot your password?
            </NuxtLink>
            <p class="text-muted">
              Don't have an account?
              <NuxtLink to="/register" class="text-primary font-medium hover:underline">
                Create one
              </NuxtLink>
            </p>
          </div>
        </UForm>
      </UCard>
    </div>
  </div>
</template>
