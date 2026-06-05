<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const links = ref<ButtonProps[]>([
  {
    label: 'Get started',
    to: '/register',
    icon: 'i-lucide-rocket',
  },
]);

const route = useRoute();
const accountDeleted = computed(() => route.query.deleted === 'true');
</script>

<template>
  <div>
    <UAlert
      v-if="accountDeleted"
      color="success"
      variant="soft"
      icon="i-lucide-check-circle"
      title="Account deleted"
      description="Your account and all associated data have been permanently deleted. We're sorry to see you go."
      class="max-w-2xl mx-auto mt-6 px-4"
    />
    <UPageHero
      title="Build Your Portfolio in Minutes"
      description="Create a stunning, professional portfolio without writing a single line of code. Choose a template, add your work, and share it with the world."
      :links="links"
    />
    <HealthStatus />
  </div>
</template>
