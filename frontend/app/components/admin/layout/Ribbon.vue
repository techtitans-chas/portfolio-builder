<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { useDashboard } from '~/composables/useDashboard';
import { getCollectionType } from '@portfolio-builder/shared/types';

const { apiBase } = useApi();
const { fetch: fetchUser, clear, portfolio } = useCurrentUser();
const { collections, fetchCollections } = useCollections();

if (import.meta.client) {
  await fetchUser();
  await fetchCollections();
}

const { isSidebarOpen } = useDashboard();

defineShortcuts({
  o: () => (isSidebarOpen.value = !isSidebarOpen.value),
});

async function logout() {
  try {
    const response = await fetch(`${apiBase}/api/auth/sign-out`, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('Sign-out failed', response.status, errorText);
    }
  } catch (error) {
    console.error('Sign-out failed', error);
  }
  clear();
  await navigateTo('/');
}

const collectionLinks = computed(() =>
  collections.value.map(c => ({
    label: c.name,
    icon: getCollectionType(c.type)?.icon ?? 'i-lucide-database',
    to: `/admin/collections/${c.id}`,
  })),
);

const topLinks = computed(
  () =>
    [
      { label: 'General', type: 'label' },
      { label: 'Page builder', icon: 'i-lucide-layout-dashboard', to: '/admin' },
      { label: 'Media', icon: 'i-lucide-image', to: '/admin/media-gallery' },
      { label: 'Collections', type: 'label' },
      {
        label: 'Manage collections',
        icon: 'i-lucide-settings-2',
        to: '/admin/collections',
      },
      ...collectionLinks.value,
      { label: 'Site', type: 'label' },
      { label: 'Site settings', icon: 'i-lucide-info', to: '/admin/site-settings' },
      { label: 'Contact form', icon: 'i-lucide-mail', to: '/admin/contact-form', badge: '4' },
    ] satisfies NavigationMenuItem[],
);

const bottomLinks = [
  { label: 'Account', icon: 'i-lucide-settings', to: '/admin/my-account' },
  { label: 'Logout', icon: 'i-lucide-log-out', onSelect: () => logout() },
] satisfies NavigationMenuItem[];
</script>

<template>
  <UDashboardSidebar v-model:open="isSidebarOpen" collapsible>
    <template #default="{ collapsed }">
      <UTooltip
        :text="portfolio?.isPublished ? `p/${portfolio.slug}` : 'Portfolio unpublished'"
        :delay-duration="300"
      >
        <UButton
          :to="portfolio?.isPublished ? `/p/${portfolio.slug}` : undefined"
          :target="portfolio?.isPublished ? '_blank' : undefined"
          :disabled="!portfolio?.isPublished"
          :icon="collapsed ? 'i-lucide-external-link' : undefined"
          :trailing-icon="!collapsed ? 'i-lucide-external-link' : undefined"
          variant="solid"
          color="primary"
          :class="['w-full mt-2 -mb-2', collapsed ? 'justify-center' : 'justify-between']"
        >
          <span v-if="!collapsed" class="truncate text-sm"> My Portfolio </span>
        </UButton>
      </UTooltip>

      <UNavigationMenu
        :collapsed="collapsed"
        :items="topLinks"
        orientation="vertical"
        tooltip
        popover
      />

      <div class="mt-auto flex flex-col gap-1">
        <!-- Color mode toggle -->
        <UColorModeButton :label="collapsed ? undefined : 'Toggle theme'" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="bottomLinks"
          orientation="vertical"
          tooltip
        />
      </div>
    </template>
  </UDashboardSidebar>
</template>
