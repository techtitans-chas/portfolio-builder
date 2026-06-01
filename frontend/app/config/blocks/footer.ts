import type { Component } from 'vue';
import BlocksFooter from '~/components/blocks/Footer.vue';
import type { BlockDefinition } from './types';

export const footerDefinition: BlockDefinition = {
  type: 'footer',
  label: 'Footer',
  icon: 'i-lucide-panel-bottom',
  component: BlocksFooter as Component,
  defaultContent: {
    siteName: '',
    copyrightText: '',
  },
  sections: [
    {
      label: 'Branding',
      fields: [{ key: 'siteName', label: 'Site name', type: 'text', placeholder: 'Your name' }],
    },
    {
      label: 'Copyright',
      fields: [
        {
          key: 'copyrightText',
          label: 'Copyright text',
          type: 'text',
          placeholder: '© 2025 Your name (leave blank for auto)',
        },
      ],
    },
  ],
};
