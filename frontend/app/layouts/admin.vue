<script setup lang="ts"></script>

<template>
  <UMain>
    <UDashboardGroup>
      <ClientOnly>
        <AdminLayoutRibbon />
      </ClientOnly>
      <slot />
    </UDashboardGroup>
  </UMain>
</template>
