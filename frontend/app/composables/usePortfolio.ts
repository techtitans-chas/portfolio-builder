import type { ThemeColors, Theme } from '~/components/pagebuilder/ThemeView.vue';
import type { Block, Page } from '@portfolio-builder/shared/types';
import type { Ref, ComputedRef } from 'vue';

type ThemeSettingsOverride = {
  themeId?: string | null;
  mode?: string;
  fonts?: { heading: string; body: string } | null;
  logoLight?: string | null;
  logoDark?: string | null;
} | null;

export function usePortfolio(
  slug: string,
  themeOverride?: Ref<ThemeSettingsOverride> | ComputedRef<ThemeSettingsOverride>,
) {
  const config = useRuntimeConfig();
  const colorMode = useColorMode();
  const baseURL = import.meta.server ? (config.apiUrl as string) : (config.public.apiUrl as string);

  const { data: portfolioData, error: portfolioError } = useAsyncData(`portfolio-${slug}`, () =>
    $fetch<{ portfolio: Record<string, unknown> }>(`/api/portfolios/${slug}`, { baseURL }),
  );

  const { data: pagesData } = useAsyncData(`portfolio-${slug}-pages`, () =>
    $fetch<{ pages: Page[] }>(`/api/portfolios/${slug}/pages`, { baseURL }),
  );

  const allThemesRef = useThemes();

  // Header and footer are portfolio-level layout blocks stored once on the home page
  const { data: layoutBlocksData } = useAsyncData(`portfolio-${slug}-layout-blocks`, () =>
    $fetch<{ blocks: Block[] }>(`/api/portfolios/${slug}/pages/home/blocks`, { baseURL }),
  );

  const portfolio = computed(() => portfolioData.value?.portfolio ?? null);
  const publishedPages = computed(() => pagesData.value?.pages ?? []);
  const dbThemeSettings = computed(
    () =>
      portfolio.value?.themeSettings as {
        themeId?: string | null;
        mode?: string;
        fonts?: { heading: string; body: string } | null;
        logoLight?: string | null;
        logoDark?: string | null;
      } | null,
  );

  const themeSettings = computed(() =>
    themeOverride?.value
      ? { ...dbThemeSettings.value, ...themeOverride.value }
      : dbThemeSettings.value,
  );

  const allThemes = computed(() => allThemesRef.value ?? []);
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

  // Keep useActivePalette in sync so resolveColor() works correctly in block components
  // on both the live site and in the editor. Use watchEffect (not watch+immediate) so the
  // assignment runs synchronously during SSR before any component renders.
  const { activeThemeId, activeThemeMode } = useActivePalette();
  watchEffect(
    () => {
      activeThemeId.value = selectedTheme.value?.id ?? null;
    },
    { flush: 'sync' },
  );
  watchEffect(
    () => {
      activeThemeMode.value = isDark.value ? 'dark' : 'light';
    },
    { flush: 'sync' },
  );

  function buildCssVars(colors: ThemeColors, theme: Theme, dark: boolean): Record<string, string> {
    const vars: Record<string, string> = {
      '--bg-page': colors.bgPage,
      '--bg-surface': colors.bgSurface,
      '--bg-nav': colors.bgNav,
      '--bg-mobile-menu': colors.bgMobileMenu ?? colors.bgSurface,
      '--primary': colors.primary,
      '--secondary': colors.secondary,
      '--text-primary': colors.textPrimary,
      '--text-secondary': colors.textSecondary,
      '--border': colors.border ?? (dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
    };
    for (const entry of theme.palette ?? []) {
      const color = dark ? entry.dark : entry.light;
      if (color) vars[`--palette-${entry.key}`] = color;
    }
    return vars;
  }

  const selectedFonts = computed(() => themeSettings.value?.fonts ?? null);

  const logoLight = computed(() => themeSettings.value?.logoLight ?? null);
  const logoDark = computed(() => themeSettings.value?.logoDark ?? null);

  const activeLogo = computed(() => {
    if (isDark.value) return logoDark.value ?? logoLight.value;
    return logoLight.value ?? logoDark.value;
  });

  const googleFontsUrl = computed(() => {
    const fonts = selectedFonts.value;
    if (!fonts) return null;
    const families = [...new Set([fonts.heading, fonts.body])]
      .map(f => `family=${encodeURIComponent(f)}:wght@400;500;600;700`)
      .join('&');
    return `https://fonts.googleapis.com/css2?${families}&display=swap`;
  });

  const cssVars = computed(() => {
    const colorVars = selectedTheme.value
      ? buildCssVars(
          isDark.value ? selectedTheme.value.dark : selectedTheme.value.light,
          selectedTheme.value,
          isDark.value,
        )
      : {};
    const fonts = selectedFonts.value;
    if (!fonts) return colorVars;
    return {
      ...colorVars,
      '--font-heading': `"${fonts.heading}", sans-serif`,
      '--font-body': `"${fonts.body}", sans-serif`,
    };
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
    googleFontsUrl,
    navLinks,
    headerBlock,
    footerBlock,
    baseURL,
    activeLogo,
    logoLight,
    logoDark,
  };
}
