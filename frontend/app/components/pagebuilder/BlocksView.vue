<template>
  <div class="grid grid-cols-3 gap-2">
    <UButton
      color="neutral"
      variant="outline"
      aria-label="Text"
      label="Text"
      icon="i-lucide-type-outline"
      class="flex-col text-xs justify-center aspect-square"
      :ui="{ leadingIcon: 'size-6' }"
    />
    <UButton
      color="neutral"
      variant="outline"
      aria-label="Text"
      label="Hero"
      icon="i-lucide-monitor"
      class="flex-col text-xs justify-center aspect-square"
      :ui="{ leadingIcon: 'size-6' }"
    />
    <UButton
      color="neutral"
      variant="outline"
      aria-label="Text"
      label="Card grid"
      icon="i-lucide-grid-2x2"
      class="flex-col text-xs justify-center aspect-square"
      :ui="{ leadingIcon: 'size-6' }"
    />
  </div>
</template>
