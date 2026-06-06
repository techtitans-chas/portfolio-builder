import type { BlockTab } from './types';

export const styleTab: BlockTab = {
  label: 'Style',
  icon: 'i-lucide-palette',
  sections: [
    {
      label: 'Colors',
      fields: [
        { key: 'background', label: 'Background', type: 'theme-color' },
        { key: 'surfaceColor', label: 'Surface', type: 'theme-color' },
      ],
    },
    {
      label: 'Background image',
      fields: [{ key: 'backgroundImage', label: 'Image', type: 'image' }],
    },
  ],
};

export const styleDefaults = {
  background: null,
  surfaceColor: null,
  backgroundImage: null,
};
