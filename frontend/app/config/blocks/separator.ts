import type { Component } from 'vue';
import BlocksSeparator from '~/components/blocks/Separator.vue';
import type { BlockDefinition } from './types';
import { MAX_CONTENT_WIDTH_OPTIONS } from '~/composables/useLayoutSettings';

export const separatorDefinition: BlockDefinition = {
  type: 'separator',
  label: 'Separator',
  icon: 'i-lucide-minus',
  component: BlocksSeparator as Component,
  defaultContent: {
    label: '',
    icon: '',
    avatar: '',
    size: 'xs',
    color: null,
    labelFont: null,
    maxWidth: 'full',
  },
  sections: [
    {
      label: 'Content',
      fields: [
        { key: 'label', label: 'Label', type: 'text', placeholder: 'Optional label text' },
        { key: 'icon', label: 'Icon', type: 'text', placeholder: 'e.g. i-lucide-star' },
        { key: 'avatar', label: 'Image', type: 'image' },
      ],
    },
    {
      label: 'Style',
      fields: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: [
            { label: 'XS', value: 'xs' },
            { label: 'SM', value: 'sm' },
            { label: 'MD', value: 'md' },
            { label: 'LG', value: 'lg' },
            { label: 'XL', value: 'xl' },
          ],
        },
        { key: 'color', label: 'Color', type: 'theme-color' },
        {
          key: 'labelFont',
          label: 'Label font',
          type: 'font',
          showIf: { key: 'label', value: 'truthy' },
        },
        {
          key: 'maxWidth',
          label: 'Max width',
          type: 'select',
          options: MAX_CONTENT_WIDTH_OPTIONS,
        },
      ],
    },
  ],
};
