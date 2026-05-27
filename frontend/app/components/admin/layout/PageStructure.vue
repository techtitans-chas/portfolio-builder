<script setup lang="ts">
defineProps<{
  title: string;
  category?: string;
  description?: string;
}>();
</script>

<template>
  <AdminLayoutPageWrapper :title="title">
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
