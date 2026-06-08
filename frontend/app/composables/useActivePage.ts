import type { Page } from '@portfolio-builder/shared/types';

export function useActivePage() {
  const { pages } = usePages();
  const activePageId = useState<string | null>('active-page-id', () => null);

  watch(
    pages,
    newPages => {
      if (!activePageId.value && newPages.length > 0) {
        activePageId.value = newPages[0]?.id ?? null;
      }
    },
    { immediate: true },
  );

  const activePage = computed<Page | null>(
    () => pages.value.find(p => p.id === activePageId.value) ?? pages.value[0] ?? null,
  );

  return { activePageId, activePage };
}
