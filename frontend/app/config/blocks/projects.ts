import type { Component } from 'vue';
import BlocksProjects from '~/components/blocks/Projects.vue';
import type { BlockDefinition } from './types';

export const projectsDefinition: BlockDefinition = {
  type: 'projects',
  label: 'Projects',
  icon: 'i-lucide-folder-kanban',
  component: BlocksProjects as Component,
  defaultContent: {
    heading: 'Projects',
    showHeading: true,
    filterTag: '',
  },
  sections: [
    {
      label: 'Settings',
      fields: [
        { key: 'heading', label: 'Heading', type: 'text', placeholder: 'Projects' },
        { key: 'showHeading', label: 'Show heading', type: 'checkbox' },
        {
          key: 'filterTag',
          label: 'Filter by tag',
          type: 'text',
          placeholder: 'Leave empty to show all',
        },
      ],
    },
  ],
};
