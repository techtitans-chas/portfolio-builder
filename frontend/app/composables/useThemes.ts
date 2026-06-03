import type { Theme } from '~/components/pagebuilder/ThemeView.vue';

export function useThemes() {
  const { $themes } = useNuxtApp();
  return $themes as ComputedRef<Theme[]>;
}
