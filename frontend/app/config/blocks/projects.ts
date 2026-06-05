import type { Component } from 'vue';
import BlocksProjects from '~/components/blocks/Projects.vue';
import BlocksProjectList from '~/components/blocks/ProjectList.vue';
import type { BlockDefinition } from './types';

const sharedFields = [
  { key: 'heading', label: 'Heading', type: 'inline-text' as const },
  { key: 'showHeading', label: 'Show heading', type: 'switch' as const },
  { key: 'linkToPage', label: 'Link to project page', type: 'switch' as const },
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
  },
  sections: [{ label: 'Settings', fields: sharedFields }],
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
  },
  sections: [{ label: 'Settings', fields: sharedFields }],
};
