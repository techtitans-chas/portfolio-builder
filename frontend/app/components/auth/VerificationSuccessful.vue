<script setup lang="ts">
defineProps<{
  email: string;
}>();
</script>

<template>
  <UCard class="text-center">
    <div class="py-4">
      <UIcon name="i-lucide-mail-check" class="text-primary mx-auto mb-3 h-10 w-10" />
      <h2 class="mb-1 text-lg font-semibold">Check your email</h2>
      <div class="text-muted text-sm">
        <p>We sent a verification link to:</p>
        <p>
          <strong>{{ email }}</strong>
        </p>
        <p>Click the link to activate your account.</p>
      </div>
    </div>
  </UCard>
</template>
