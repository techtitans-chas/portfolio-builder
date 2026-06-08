<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const links = ref<ButtonProps[]>([
  {
    label: 'Get started',
    to: '/register',
    color: 'neutral',
    variant: 'outline',
    size: 'xl',
    trailingIcon: 'i-lucide-rocket',
    class: 'rounded-full font-bold text-xl px-5 py-3',
  },
]);

const route = useRoute();
const accountDeleted = computed(() => route.query.deleted === 'true');
</script>

<template>
  <UPageHero
    headline="Starta Website Builder"
    description="Create a stunning, professional project without writing a single line of code. Choose a template, add your work, and share it with the world."
    :links="links"
    orientation="horizontal"
    class="relative bg-fixed overflow-hidden"
    :style="{ backgroundImage: 'url(./media/tylijura-sparkle-10229779.webp)' }"
    :ui="{
      title: 'text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-white',
      description: 'text-lg sm:text-xl/8 text-white/80 mt-6',
      wrapper: 'relative z-10',
      headline: 'text-teal-200',
    }"
  >
    <template #title>Build Your Next Project in Minutes</template>
    <div class="absolute inset-0 z-0 bg-sky-500 opacity-80 mix-blend-multiply" />
    <div
      class="absolute inset-0 z-0 bg-linear-to-br/oklch from-teal-500 from-30% to-sky-500 opacity-60"
    />
    <img
      src="/media/hero-builder.svg"
      alt="Website builder interface"
      class="rounded-lg relative z-10"
    />
  </UPageHero>
  <UAlert
    v-if="accountDeleted"
    color="success"
    variant="soft"
    icon="i-lucide-check-circle"
    title="Account deleted"
    description="Your account and all associated data have been permanently deleted. We're sorry to see you go."
    class="max-w-2xl mx-auto mt-6 px-4"
  />
  <LandingDemoSandbox />
  <HealthStatus />
</template>
