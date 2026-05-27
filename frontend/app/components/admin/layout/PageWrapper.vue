<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <UDashboardPanel resizable :ui="{ body: '!p-0' }">
    <template #header>
      <UDashboardNavbar :title="title">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <!-- Middle content -->
        <slot name="middle" />

        <template #right>
          <!-- Right content -->
          <slot name="right" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-1 min-h-0 overflow-hidden">
        <slot />
      </div>
    </template>
  </UDashboardPanel>
</template>
