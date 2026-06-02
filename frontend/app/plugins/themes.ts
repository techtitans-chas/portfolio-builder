import type { Theme } from '~/components/pagebuilder/ThemeView.vue';

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();
  const baseURL = import.meta.server
    ? (config.apiUrl as string)
    : (config.public.apiUrl as string);

  const { data } = await useAsyncData('themes', () =>
    $fetch<{ themes: Theme[] }>(`/api/themes`, { baseURL }),
  );

  return {
    provide: {
      themes: computed(() => data.value?.themes ?? []),
    },
  };
});
