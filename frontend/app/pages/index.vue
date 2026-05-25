<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const links = ref<ButtonProps[]>([
  {
    label: 'Get started',
    to: '/register',
    icon: 'i-lucide-rocket',
  },
]);
</script>

<template>
  <UPageHero
    title="Build Your Portfolio in Minutes"
    description="Create a stunning, professional portfolio without writing a single line of code. Choose a template, add your work, and share it with the world."
    :links="links"
  />
  <HealthStatus />
</template>
