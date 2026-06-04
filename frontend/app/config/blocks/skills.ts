import type { Component } from 'vue';
import BlocksSkills from '~/components/blocks/Skills.vue';
import type { BlockDefinition } from './types';

export const skillsDefinition: BlockDefinition = {
  type: 'skills',
  label: 'Skills',
  icon: 'i-lucide-bar-chart-2',
  component: BlocksSkills as Component,
  defaultContent: {
    heading: 'Skills & Expertise',
    showHeading: true,
    columns: '2',
    skills: [
      { id: crypto.randomUUID(), name: 'JavaScript', level: '90', category: 'Languages' },
      { id: crypto.randomUUID(), name: 'TypeScript', level: '85', category: 'Languages' },
      { id: crypto.randomUUID(), name: 'Python', level: '70', category: 'Languages' },
      { id: crypto.randomUUID(), name: 'Vue.js', level: '90', category: 'Frameworks' },
      { id: crypto.randomUUID(), name: 'React', level: '75', category: 'Frameworks' },
      { id: crypto.randomUUID(), name: 'Node.js', level: '80', category: 'Frameworks' },
      { id: crypto.randomUUID(), name: 'Figma', level: '85', category: 'Design' },
      { id: crypto.randomUUID(), name: 'UI / UX', level: '75', category: 'Design' },
    ],
  },
  sections: [
    {
      label: 'Content',
      fields: [
        { key: 'showHeading', label: 'Show heading', type: 'switch' },
        {
          key: 'heading',
          label: 'Heading',
          type: 'inline-text',
          placeholder: 'Skills & Expertise',
          showIf: { key: 'showHeading', value: true },
        },
        {
          key: 'skills',
          label: 'Skills',
          type: 'list',
          itemLabel: 'Skill',
          defaultItem: () => ({
            id: crypto.randomUUID(),
            name: 'New Skill',
            level: '75',
            category: '',
          }),
          itemFields: [
            { key: 'name', label: 'Name', placeholder: 'e.g. JavaScript', inline: true },
            {
              key: 'level',
              label: 'Level',
              type: 'select',
              options: [
                { label: 'Beginner — 20%', value: '20' },
                { label: 'Elementary — 40%', value: '40' },
                { label: 'Intermediate — 60%', value: '60' },
                { label: 'Advanced — 75%', value: '75' },
                { label: 'Proficient — 85%', value: '85' },
                { label: 'Expert — 95%', value: '95' },
                { label: 'Master — 100%', value: '100' },
              ],
            },
            { key: 'category', label: 'Category', placeholder: 'e.g. Languages' },
          ],
        },
      ],
    },
    {
      label: 'Layout',
      fields: [
        {
          key: 'columns',
          label: 'Columns',
          type: 'select',
          options: [
            { label: '1 column', value: '1' },
            { label: '2 columns', value: '2' },
          ],
        },
      ],
    },
  ],
};
