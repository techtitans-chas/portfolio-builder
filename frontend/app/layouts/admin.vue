<script setup lang="ts">
const { fetcher } = useApi();
const { user, fetch, clear } = useCurrentUser();
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();
const toast = useToast();

const open = ref(false);
const collapsed = ref(true);
defineShortcuts({
  o: () => (open.value = !open.value),
});

if (import.meta.client) await fetch();

async function logout() {
  await fetcher('/api/auth/sign-out', { method: 'POST', credentials: 'include' }).catch(() => {});
  clear();
  await navigateTo('/');
}

const links = [
  [
    {
      label: 'Page builder',
      icon: 'i-lucide-layout-dashboard',
      to: '/admin',
    },
    {
      label: 'Media',
      icon: 'i-lucide-image',
      to: '/admin/media-gallery',
    },
    {
      label: 'Projects',
      icon: 'i-lucide-clipboard-check',
      to: '/admin/projects',
    },
    {
      label: 'Experiences',
      icon: 'i-lucide-briefcase-business',
      to: '/admin/experiences',
    },
    {
      label: 'Site settings',
      icon: 'i-lucide-info',
      to: '/admin/site-settings',
    },
    {
      label: 'Contact form',
      icon: 'i-lucide-mail',
      to: '/admin/contact-form',
      badge: '4',
    },
  ],
  [
    {
      label: 'Account',
      icon: 'i-lucide-settings',
      to: '/admin/my-account',
    },
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
    },
  ],
] satisfies NavigationMenuItem[][];
</script>

<template>
  <!-- <UHeader title="Folio" :toggle="false">
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
  </UHeader> -->
  <UMain>
    <UDashboardGroup>
      <UDashboardSidebar v-model:open="open" v-model:collapsed="collapsed">
        <template #default="{ collapsed }">
          <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

          <UNavigationMenu
            :collapsed="collapsed"
            :items="links[0]"
            orientation="vertical"
            tooltip
            popover
          />

          <UNavigationMenu
            :collapsed="collapsed"
            :items="links[1]"
            orientation="vertical"
            tooltip
            class="mt-auto"
          />
        </template>
      </UDashboardSidebar>
      <slot />
    </UDashboardGroup>
  </UMain>
</template>
