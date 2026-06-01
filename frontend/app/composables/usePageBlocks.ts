import type { Block } from '@portfolio-builder/shared/types';

export function usePageBlocks(slug: string, pageSlug: string) {
  const config = useRuntimeConfig();
  const baseURL = import.meta.server ? (config.apiUrl as string) : (config.public.apiUrl as string);

  const { data, error } = useAsyncData(`portfolio-${slug}-page-${pageSlug}-blocks`, () =>
    $fetch<{ blocks: Block[] }>(`/api/portfolios/${slug}/pages/${pageSlug}/blocks`, { baseURL }),
  );

  const contentBlocks = computed(() =>
    (data.value?.blocks ?? []).filter(b => b.type !== 'header' && b.type !== 'footer'),
  );

  return { contentBlocks, error };
}
