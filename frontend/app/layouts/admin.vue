<script setup lang="ts">
const { fetcher } = useApi();
const { user, fetch, clear } = useCurrentUser();

if (import.meta.client) await fetch();

async function logout() {
  await fetcher('/api/auth/sign-out', { method: 'POST', credentials: 'include' }).catch(() => {});
  clear();
  await navigateTo('/');
}
</script>

<template>
  <UHeader title="Folio" :toggle="false">
    <template #right>
      <UButton
        color="neutral"
        variant="ghost"
        aria-label="Page Builder"
        label="Page Builder"
        to="/admin"
      />
      <UButton
        v-if="user"
        color="neutral"
        variant="ghost"
        aria-label="My Account"
        :label="user.name"
        to="/admin/my-account"
      />
      <UButton color="neutral" variant="ghost" aria-label="Logout" label="Logout" @click="logout" />
    </template>
  </UHeader>
  <UMain>
    <slot />
  </UMain>
</template>
