import type { Component } from 'vue';
import BlocksExperiences from '~/components/blocks/Experiences.vue';
import type { BlockDefinition } from './types';
import { styleTab, styleDefaults } from './presets';

export const experiencesDefinition: BlockDefinition = {
  type: 'experiences',
  label: 'Experience',
  icon: 'i-lucide-briefcase',
  component: BlocksExperiences as Component,
  allowedCollections: ['experiences'],
  defaultContent: {
    heading: 'Experience',
    showHeading: true,
    filterTag: '',
    ...styleDefaults,
  },
  tabs: [
    {
      label: 'Content',
      icon: 'i-lucide-text',
      sections: [
        {
          label: 'Settings',
          fields: [
            { key: 'heading', label: 'Heading', type: 'text', placeholder: 'Experience' },
            { key: 'showHeading', label: 'Show heading', type: 'checkbox' },
            {
              key: 'collectionId',
              label: 'Collection',
              type: 'collection-select' as const,
              collectionType: 'experiences',
            },
            {
              key: 'filterTag',
              label: 'Filter by tag',
              type: 'text',
              placeholder: 'Leave empty to show all',
            },
          ],
        },
      ],
    },
    styleTab,
  ],
};
