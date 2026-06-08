import type { Component } from 'vue';
import BlocksProjects from '~/components/blocks/Projects.vue';
import BlocksProjectList from '~/components/blocks/ProjectList.vue';
import type { BlockDefinition } from './types';
import { styleTab, styleDefaults } from './presets';

const sharedFields = [
  { key: 'heading', label: 'Heading', type: 'inline-text' as const },
  { key: 'showHeading', label: 'Show heading', type: 'switch' as const },
  { key: 'linkToPage', label: 'Link to project page', type: 'switch' as const },
  {
    key: 'collectionId',
    label: 'Collection',
    type: 'collection-select' as const,
    collectionType: 'projects',
  },
  {
    key: 'filterTag',
    label: 'Filter by tag',
    type: 'text' as const,
    placeholder: 'Leave empty to show all',
  },
];

export const projectsDefinition: BlockDefinition = {
  type: 'projects',
  label: 'Project cards',
  icon: 'i-lucide-layout-grid',
  component: BlocksProjects as Component,
  allowedCollections: ['projects'],
  defaultContent: {
    heading: 'Projects',
    showHeading: true,
    filterTag: '',
    linkToPage: true,
    ...styleDefaults,
  },
  tabs: [
    {
      label: 'Content',
      icon: 'i-lucide-text',
      sections: [{ label: 'Settings', fields: sharedFields }],
    },
    styleTab,
  ],
};

export const projectListDefinition: BlockDefinition = {
  type: 'project-list',
  label: 'Project list',
  icon: 'i-lucide-list',
  component: BlocksProjectList as Component,
  allowedCollections: ['projects'],
  defaultContent: {
    heading: 'Projects',
    showHeading: true,
    filterTag: '',
    linkToPage: true,
    ...styleDefaults,
  },
  tabs: [
    {
      label: 'Content',
      icon: 'i-lucide-text',
      sections: [{ label: 'Settings', fields: sharedFields }],
    },
    styleTab,
  ],
};
