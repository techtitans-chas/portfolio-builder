import type { Component } from 'vue';
import BlocksHeader from '~/components/blocks/Header.vue';
import type { BlockDefinition } from './types';

export const headerDefinition: BlockDefinition = {
  type: 'header',
  label: 'Header',
  icon: 'i-lucide-panel-top',
  component: BlocksHeader as Component,
  defaultContent: {
    siteName: '',
    cta: { label: 'Hire me', url: '#contact' },
    showColorModeToggle: false,
  },
  sections: [
    {
      label: 'Branding',
      fields: [
        { key: 'siteName', label: 'Site name', type: 'text', placeholder: 'Your name' },
      ],
    },
    {
      label: 'Call to action',
      fields: [
        { key: 'cta.label', label: 'Button label', type: 'text', placeholder: 'Hire me' },
        { key: 'cta.url', label: 'Button URL', type: 'url', placeholder: '#contact' },
      ],
    },
    {
      label: 'Options',
      fields: [
        { key: 'showColorModeToggle', label: 'Show color mode toggle', type: 'checkbox' },
      ],
    },
  ],
};
