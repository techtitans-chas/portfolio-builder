import type { Component } from 'vue';
import BlocksHero from '~/components/blocks/Hero.vue';
import type { BlockDefinition } from './types';

export const heroDefinition: BlockDefinition = {
  type: 'hero',
  label: 'Hero',
  icon: 'i-lucide-monitor',
  component: BlocksHero as Component,
  defaultContent: {
    heading: 'Your name',
    subheading: 'Your tagline',
    ctaButtons: [
      { id: crypto.randomUUID(), label: 'View my work', url: '#projects' },
      { id: crypto.randomUUID(), label: 'Get in touch', url: '#contact' },
    ],
  },
  sections: [
    {
      label: 'Content',
      fields: [
        { key: 'heading', label: 'Heading', type: 'text', placeholder: 'Your name' },
        { key: 'subheading', label: 'Subheading', type: 'textarea', placeholder: 'Your tagline' },
      ],
    },
    {
      label: 'CTA Buttons',
      fields: [
        {
          key: 'ctaButtons',
          label: 'Buttons',
          type: 'list',
          itemLabel: 'Button',
          defaultItem: () => ({ id: crypto.randomUUID(), label: 'Click here', url: '#' }),
          itemFields: [
            { key: 'label', label: 'Label', placeholder: 'Click here' },
            { key: 'url', label: 'URL', placeholder: '#', type: 'url' },
          ],
        },
      ],
    },
  ],
};
