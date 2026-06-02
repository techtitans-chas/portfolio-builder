import type { Component } from 'vue';
import BlocksText from '~/components/blocks/Text.vue';
import type { BlockDefinition } from './types';

export const textDefinition: BlockDefinition = {
  type: 'text',
  label: 'Text',
  icon: 'i-lucide-text',
  component: BlocksText as Component,
  defaultContent: {
    content: '',
    align: 'left',
  },
  sections: [
    {
      label: 'Content',
      fields: [
        { key: 'content', label: 'Content', type: 'inline-rich', placeholder: 'Start typing...' },
      ],
    },
    {
      label: 'Layout',
      fields: [
        {
          key: 'align',
          label: 'Text alignment',
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      ],
    },
  ],
};
