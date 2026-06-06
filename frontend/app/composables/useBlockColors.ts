import type { MaybeRefOrGetter } from 'vue';

/**
 * Resolves text color styles derived from a block's background palette key.
 * Use for section-level text (headings, body) that sits directly on the block background.
 */
export function useBlockBackground(background: MaybeRefOrGetter<string | null | undefined>) {
  const { resolveTextColor } = useActivePalette();

  const autoTextColor = computed(() => {
    const key = toValue(background);
    return key ? resolveTextColor(key) : null;
  });

  const textColorStyle = computed(() =>
    autoTextColor.value ? { color: autoTextColor.value } : {},
  );

  const textPrimaryStyle = computed(() =>
    autoTextColor.value
      ? { color: autoTextColor.value }
      : { color: 'var(--text-primary)' },
  );

  const textMutedStyle = computed(() =>
    autoTextColor.value
      ? { color: autoTextColor.value, opacity: '0.6' }
      : { color: 'var(--text-secondary)' },
  );

  return { autoTextColor, textColorStyle, textPrimaryStyle, textMutedStyle };
}

/**
 * Resolves color styles for a surface (card/panel) palette key.
 * Use for content rendered inside surface-colored cards within a block.
 */
export function useBlockSurface(surfaceColor: MaybeRefOrGetter<string | null | undefined>) {
  const { resolveColor, resolveTextColor, resolvePrimary, resolveSecondary } = useActivePalette();

  const surfaceHex = computed(() => {
    const key = toValue(surfaceColor);
    return key ? resolveColor(key) : null;
  });

  const surfaceHexOrDefault = computed(() => surfaceHex.value ?? 'var(--bg-surface)');

  const surfaceStyle = computed(() =>
    surfaceHex.value
      ? { backgroundColor: surfaceHex.value }
      : { backgroundColor: 'var(--bg-surface)' },
  );

  const surfaceTextColor = computed(() => {
    const key = toValue(surfaceColor);
    return key ? resolveTextColor(key) : null;
  });

  const surfaceTextStyle = computed(() =>
    surfaceTextColor.value
      ? { color: surfaceTextColor.value }
      : { color: 'var(--text-primary)' },
  );

  const surfaceTextMutedStyle = computed(() =>
    surfaceTextColor.value
      ? { color: surfaceTextColor.value, opacity: '0.6' }
      : { color: 'var(--text-secondary)' },
  );

  const surfacePrimary = computed(() => resolvePrimary(toValue(surfaceColor)));
  const surfaceSecondary = computed(() => resolveSecondary(toValue(surfaceColor)));

  return {
    surfaceHex,
    surfaceHexOrDefault,
    surfaceStyle,
    surfaceTextColor,
    surfaceTextStyle,
    surfaceTextMutedStyle,
    surfacePrimary,
    surfaceSecondary,
  };
}
