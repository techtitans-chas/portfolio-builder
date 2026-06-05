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
    title="Build Your Next Project in Minutes"
    description="Create a stunning, professional project without writing a single line of code. Choose a template, add your work, and share it with the world."
    :links="links"
    class="[background:linear-gradient(135deg,#00CC99_0%,#088b8b_100%)] m-10 rounded-2xl max-w-7xl mx-auto text-center"
    :ui="{
      title: 'text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-white',
      description: 'text-lg sm:text-xl/8 text-white/80 mt-6',
    }"
  />
  <LandingDemoSandbox />
  <HealthStatus />
</template>
