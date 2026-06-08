import type { Theme, ThemePaletteColor } from '~/components/pagebuilder/ThemeView.vue';

export function useActivePalette() {
  const activeThemeId = useState<string | null>('active-theme-id', () => null);
  const activeThemeMode = useState<'light' | 'dark' | 'both'>('active-theme-mode', () => 'light');

  const allThemes = useThemes();

  const activeTheme = computed<Theme | null>(
    () => allThemes.value.find(t => t.id === activeThemeId.value) ?? allThemes.value[0] ?? null,
  );

  const isDark = computed(() => activeThemeMode.value === 'dark');

  const palette = computed<ThemePaletteColor[]>(() => activeTheme.value?.palette ?? []);

  function resolveColor(key: string | null | undefined): string | null {
    if (!key) return null;
    const entry = palette.value.find(p => p.key === key);
    if (!entry) return null;
    return (isDark.value ? entry.dark : entry.light) ?? null;
  }

  function hexLuminance(hex: string): number {
    const h = hex.replace('#', '');
    const r = parseInt(h.slice(0, 2), 16) / 255;
    const g = parseInt(h.slice(2, 4), 16) / 255;
    const b = parseInt(h.slice(4, 6), 16) / 255;
    const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  }

  function resolvePrimary(key: string | null | undefined): string {
    if (key) {
      const entry = palette.value.find(p => p.key === key);
      const override = isDark.value ? entry?.primaryDark : entry?.primaryLight;
      if (override) return override;
    }
    return isDark.value
      ? (activeTheme.value?.dark.primary ?? 'var(--primary)')
      : (activeTheme.value?.light.primary ?? 'var(--primary)');
  }

  function resolveSecondary(key: string | null | undefined): string {
    if (key) {
      const entry = palette.value.find(p => p.key === key);
      const override = isDark.value ? entry?.secondaryDark : entry?.secondaryLight;
      if (override) return override;
    }
    return isDark.value
      ? (activeTheme.value?.dark.secondary ?? 'var(--secondary)')
      : (activeTheme.value?.light.secondary ?? 'var(--secondary)');
  }

  function resolveTextColor(key: string | null | undefined): string | null {
    if (!key) return null;
    const entry = palette.value.find(p => p.key === key);
    if (!entry) return null;
    const defined = isDark.value ? entry.textDark : entry.textLight;
    if (defined) return defined;
    // Fall back to luminance-based contrast detection
    const bg = isDark.value ? entry.dark : entry.light;
    if (!bg || !bg.startsWith('#')) return null;
    return hexLuminance(bg) > 0.179 ? '#1a1a1a' : '#ffffff';
  }

  return {
    activeThemeId,
    activeThemeMode,
    palette,
    resolveColor,
    resolveTextColor,
    resolvePrimary,
    resolveSecondary,
  };
}
