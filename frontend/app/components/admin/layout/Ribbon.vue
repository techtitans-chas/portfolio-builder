<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { useDashboard } from '~/composables/useDashboard';
const { fetcher } = useApi();
const { fetch, clear } = useCurrentUser();

if (import.meta.client) await fetch();

const { isSidebarOpen } = useDashboard();

defineShortcuts({
  o: () => (isSidebarOpen.value = !isSidebarOpen.value),
});

async function logout() {
  await fetcher('/api/auth/sign-out', { method: 'POST', credentials: 'include' }).catch(() => {});
  clear();
  await navigateTo('/');
}

const links = [
  [
    {
      label: 'General',
      type: 'label',
    },
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
      label: 'Collections',
      type: 'label',
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
      label: 'Site',
      type: 'label',
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
      onSelect: () => {
        logout();
      },
    },
  ],
] satisfies NavigationMenuItem[][];
</script>

<template>
  <UDashboardSidebar v-model:open="isSidebarOpen" collapsible>
    <template #default="{ collapsed }">
      <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

      <UNavigationMenu
        :collapsed="collapsed"
        :items="links[0]"
        orientation="vertical"
        tooltip
        popover
      />

      <div class="mt-auto flex flex-col gap-1">
        <!-- Color mode toggle -->
        <UColorModeButton :label="collapsed ? undefined : 'Toggle theme'" />

        <UNavigationMenu :collapsed="collapsed" :items="links[1]" orientation="vertical" tooltip />
      </div>
    </template>
  </UDashboardSidebar>
</template>
