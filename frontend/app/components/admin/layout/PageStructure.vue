<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <AdminLayoutPageWrapper title="My account">
    <UContainer>
      <UPage>
        <UPageHeader :title="title" :description="description ? description : undefined" />
        <UPageBody>
          <slot />
        </UPageBody>
      </UPage>
    </UContainer>
  </AdminLayoutPageWrapper>
</template>
