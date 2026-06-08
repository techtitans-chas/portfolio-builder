export type MaxContentWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export const MAX_CONTENT_WIDTH_OPTIONS: { label: string; value: MaxContentWidth }[] = [
  { label: 'Small (48rem)', value: 'sm' },
  { label: 'Medium (56rem)', value: 'md' },
  { label: 'Large (64rem)', value: 'lg' },
  { label: 'Extra large (80rem)', value: 'xl' },
  { label: 'Full width', value: 'full' },
];

export const MAX_CONTENT_WIDTH_CLASS: Record<MaxContentWidth, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
  full: 'max-w-none',
};

export function useLayoutSettings() {
  const maxContentWidth = useState<MaxContentWidth>('layout-max-content-width', () => 'sm');

  return { maxContentWidth };
}
