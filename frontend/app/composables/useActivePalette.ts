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

  return { activeThemeId, activeThemeMode, palette, resolveColor };
}
