<script setup lang="ts">
withDefaults(
  defineProps<{
    white?: boolean;
    to?: string;
    underline?: boolean;
  }>(),
  {
    white: false,
    to: undefined,
    underline: false,
  },
);
</script>

<template>
  <UButton
    :to="to ? to : undefined"
    variant="link"
    color="primary"
    class="app-logo text-3xl"
    :class="{ white: white, 'logo-underline': underline }"
  >
    <UIcon name="i-lucide-lightbulb" class="text-[1em]" />
    <span class="font-extrabold font-display text-[1em] tracking-widest relative top-[0.05em]">
      Starta
    </span>
  </UButton>
</template>

<style>
@reference "@/assets/css/main.css";

.app-logo {
  @apply text-teal-500;
  position: relative;
  padding-block: 0.5em;
  gap: 0.2em;

  &:hover {
    @apply text-primary-500;
  }

  &.logo-underline {
    &::after {
      @apply bg-primary-400 transition-all;
      content: '';
      position: absolute;
      bottom: 0;
      width: 0%;
      left: 52%;
      transform: translateX(-50%);
      height: 2px;
    }

    &:hover {
      &::after {
        width: 90%;
      }
    }
  }

  &.white {
    @apply text-white;

    &::after {
      @apply bg-primary-300;
    }

    &:hover {
      @apply text-primary-100;
    }
  }
}
</style>
