<script setup lang="ts">
const { fetcher } = useApi();
const { user, fetch, clear } = useCurrentUser();

await fetch();

async function logout() {
  await fetcher('/api/auth/sign-out', { method: 'POST', credentials: 'include' }).catch(() => {});
  clear();
  await navigateTo('/');
}
</script>

<template>
  <UHeader title="Folio" :toggle="false">
    <template #right>
      <span v-if="user" class="text-muted text-sm">{{ user.name }}</span>
      <UButton color="neutral" variant="ghost" aria-label="Logout" label="Logout" @click="logout" />
    </template>
  </UHeader>
  <UMain>
    <slot />
  </UMain>
</template>
