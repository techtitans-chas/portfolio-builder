<script setup lang="ts">
// better-auth redirects here after successful email verification
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4 py-12">
    <div class="w-full max-w-md text-center">
      <UIcon name="i-lucide-circle-check" class="text-primary mx-auto mb-4 h-12 w-12" />
      <h1 class="mb-2 text-2xl font-bold">Email verified!</h1>
      <p class="text-muted mb-8 text-sm">
        Your account is now active. Sign in to start building your portfolio.
      </p>
      <UButton to="/login" class="w-full"> Sign in </UButton>
    </div>
  </div>
</template>
