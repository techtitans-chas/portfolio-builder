import type { ThemeColors, Theme } from '~/components/pagebuilder/ThemeView.vue';
import type { Block, Page } from '@portfolio-builder/shared/types';

export function usePortfolio(slug: string) {
  const config = useRuntimeConfig();
  const colorMode = useColorMode();
  const baseURL = import.meta.server ? (config.apiUrl as string) : (config.public.apiUrl as string);

  const { data: portfolioData, error: portfolioError } = useAsyncData(`portfolio-${slug}`, () =>
    $fetch<{ portfolio: Record<string, unknown> }>(`/api/portfolios/${slug}`, { baseURL }),
  );

  const { data: pagesData } = useAsyncData(`portfolio-${slug}-pages`, () =>
    $fetch<{ pages: Page[] }>(`/api/portfolios/${slug}/pages`, { baseURL }),
  );

  const { data: themesData } = useAsyncData('themes', () => $fetch(`/api/themes`, { baseURL }));

  // Header and footer are portfolio-level layout blocks stored once on the home page
  const { data: layoutBlocksData } = useAsyncData(`portfolio-${slug}-layout-blocks`, () =>
    $fetch<{ blocks: Block[] }>(`/api/portfolios/${slug}/pages/home/blocks`, { baseURL }),
  );

  const portfolio = computed(() => portfolioData.value?.portfolio ?? null);
  const publishedPages = computed(() => pagesData.value?.pages ?? []);
  const themeSettings = computed(
    () => portfolio.value?.themeSettings as { themeId?: string | null; mode?: string } | null,
  );

  const allThemes = computed(() => (themesData.value as { themes: Theme[] } | null)?.themes ?? []);
  const selectedTheme = computed(
    () =>
      allThemes.value.find(t => t.id === themeSettings.value?.themeId) ??
      allThemes.value[0] ??
      null,
  );

  const portfolioMode = computed(() => themeSettings.value?.mode ?? 'light');

  const isDark = computed(() => {
    if (portfolioMode.value === 'dark') return true;
    if (portfolioMode.value === 'light') return false;
    return colorMode.value === 'dark';
  });

  function buildCssVars(colors: ThemeColors): Record<string, string> {
    return {
      '--bg-page': colors.bgPage,
      '--bg-surface': colors.bgSurface,
      '--bg-nav': colors.bgNav,
      '--primary': colors.primary,
      '--secondary': colors.secondary,
      '--text-primary': colors.textPrimary,
      '--text-secondary': colors.textSecondary,
    };
  }

  const cssVars = computed(() => {
    if (!selectedTheme.value) return {};
    return buildCssVars(isDark.value ? selectedTheme.value.dark : selectedTheme.value.light);
  });

  const navLinks = computed(() =>
    publishedPages.value
      .filter(p => p.showInMenu)
      .map(p => ({ label: p.title, url: `/p/${slug}/${p.slug}` })),
  );

  const layoutBlocks = computed(() => layoutBlocksData.value?.blocks ?? []);
  const headerBlock = computed(() => layoutBlocks.value.find(b => b.type === 'header') ?? null);
  const footerBlock = computed(() => layoutBlocks.value.find(b => b.type === 'footer') ?? null);

  return {
    portfolioError,
    portfolio,
    publishedPages,
    portfolioMode,
    cssVars,
    navLinks,
    headerBlock,
    footerBlock,
    baseURL,
  };
}
