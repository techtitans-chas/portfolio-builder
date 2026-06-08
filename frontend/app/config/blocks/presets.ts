import type { BlockSection, BlockTab } from './types';

export const styleColorSection: BlockSection = {
  label: 'Colors',
  fields: [
    { key: 'background', label: 'Background', type: 'theme-color' },
    { key: 'surfaceColor', label: 'Surface', type: 'theme-color' },
  ],
};

export const styleBackgroundImageSection: BlockSection = {
  label: 'Background image',
  fields: [
    { key: 'backgroundImage', label: 'Image', type: 'image' },
    {
      key: 'backgroundOpacity',
      label: 'Image opacity',
      type: 'slider',
      min: 0,
      max: 100,
      step: 5,
      unit: '%',
      showIf: { key: 'backgroundImage', value: 'truthy' },
    },
    {
      key: 'backgroundFixed',
      label: 'Fixed / parallax',
      type: 'switch',
      showIf: { key: 'backgroundImage', value: 'truthy' },
    },
  ],
};

export const styleOverlaySection: BlockSection = {
  label: 'Overlay',
  fields: [
    { key: 'overlayEnabled', label: 'Enable overlay', type: 'switch' },
    {
      key: 'overlayType',
      label: 'Type',
      type: 'select',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Gradient', value: 'gradient' },
      ],
      showIf: { key: 'overlayEnabled', value: true },
    },
    {
      key: 'overlayColor',
      label: 'Color',
      type: 'theme-color',
      showIf: { key: 'overlayEnabled', value: true },
    },
    {
      key: 'overlayColor2',
      label: 'Gradient end color',
      type: 'theme-color',
      showIfAll: [
        { key: 'overlayEnabled', value: true },
        { key: 'overlayType', value: 'gradient' },
      ],
    },
    {
      key: 'overlayDegree',
      label: 'Gradient direction',
      type: 'slider',
      min: 0,
      max: 360,
      step: 15,
      unit: '°',
      showIfAll: [
        { key: 'overlayEnabled', value: true },
        { key: 'overlayType', value: 'gradient' },
      ],
    },
    {
      key: 'overlayOpacity',
      label: 'Opacity',
      type: 'slider',
      min: 0,
      max: 100,
      step: 5,
      unit: '%',
      showIf: { key: 'overlayEnabled', value: true },
    },
  ],
};

export const styleTab: BlockTab = {
  label: 'Style',
  icon: 'i-lucide-palette',
  sections: [styleColorSection, styleBackgroundImageSection, styleOverlaySection],
};

export const styleDefaults = {
  background: null,
  surfaceColor: null,
  backgroundImage: null,
  backgroundOpacity: 100,
  backgroundFixed: false,
  overlayEnabled: false,
  overlayType: 'solid' as 'solid' | 'gradient',
  overlayColor: null as string | null,
  overlayColor2: null as string | null,
  overlayDegree: 180,
  overlayOpacity: 40,
};
