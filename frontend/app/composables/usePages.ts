import type { Page } from '@portfolio-builder/shared/types';

export function usePages() {
  const { portfolio } = useCurrentUser();
  const { fetcher } = useApi();

  const pages = useState<Page[]>('portfolio-pages', () => []);
  const pagesLoading = useState<boolean>('portfolio-pages-loading', () => false);
  const pagesError = useState<string>('portfolio-pages-error', () => '');

  async function fetchPages() {
    const portfolioId = portfolio.value?.id;
    if (!portfolioId) return;

    pagesLoading.value = true;
    pagesError.value = '';
    try {
      const cookieHeader = import.meta.server ? useRequestHeaders(['cookie']) : undefined;
      const data = await fetcher(`/api/portfolios/${portfolioId}/pages`, {
        credentials: 'include',
        headers: cookieHeader as HeadersInit | undefined,
      });
      pages.value = data.pages;
    } catch (e: unknown) {
      pagesError.value = e instanceof Error ? e.message : 'Failed to load pages.';
    } finally {
      pagesLoading.value = false;
    }
  }

  return { pages, pagesLoading, pagesError, fetchPages };
}
