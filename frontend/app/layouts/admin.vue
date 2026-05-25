<script setup lang="ts">
const { fetcher } = useApi();

async function logout() {
  await fetcher('/api/auth/sign-out', { method: 'POST', credentials: 'include' }).catch(() => {});
  await navigateTo('/');
}
</script>

<template>
  <UHeader title="Folio" :toggle="false">
    <template #right>
      <UButton color="neutral" variant="ghost" aria-label="Logout" label="Logout" @click="logout" />
    </template>
  </UHeader>
  <UMain>
    <slot />
  </UMain>
</template>
