<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const items: NavigationMenuItem[][] = [
  [
    {
      label: 'Design System',
      icon: 'i-lucide-grip-vertical',
      active: true,
    },
    {
      label: 'Travel',
      icon: 'i-lucide-grip-vertical',
    },
    {
      label: 'Engineering',
      icon: 'i-lucide-grip-vertical',
    },
    {
      label: 'Marketing',
      icon: 'i-lucide-grip-vertical',
    },
  ],
];
</script>

<template>
  <UNavigationMenu
    orientation="vertical"
    :items="items"
    :ui="{
      link: 'overflow-hidden has-data-[state=open]:before:bg-elevated/50 pr-1',
      linkLeadingIcon: 'size-4 -ml-1',
    }"
  >
    <template #item-trailing>
      <div class="flex -my-0.5 transition-transform">
        <UButton
          as="div"
          icon="i-lucide-eye"
          color="neutral"
          variant="ghost"
          size="xs"
          class="text-muted hover:text-highlighted hover:bg-accented/50 data-[state=open]:bg-accented/50"
        />
        <UButton
          as="div"
          icon="i-lucide-trash"
          color="neutral"
          variant="ghost"
          size="xs"
          class="text-muted hover:text-highlighted hover:bg-accented/50 data-[state=open]:bg-accented/50"
        />
      </div>
    </template>
  </UNavigationMenu>
</template>
