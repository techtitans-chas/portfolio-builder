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
    primaryCta: { label: 'View my work', url: '#projects' },
    secondaryCta: { label: 'Get in touch', url: '#contact' },
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
      label: 'Primary button',
      fields: [
        { key: 'primaryCta.label', label: 'Label', type: 'text', placeholder: 'View my work' },
        { key: 'primaryCta.url', label: 'URL', type: 'url', placeholder: '#projects' },
      ],
    },
    {
      label: 'Secondary button',
      fields: [
        { key: 'secondaryCta.label', label: 'Label', type: 'text', placeholder: 'Get in touch' },
        { key: 'secondaryCta.url', label: 'URL', type: 'url', placeholder: '#contact' },
      ],
    },
  ],
};
