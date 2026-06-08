import type { Component } from 'vue';
import BlocksAccordion from '~/components/blocks/Accordion.vue';
import type { BlockDefinition } from './types';
import { styleTab, styleDefaults } from './presets';

export const accordionDefinition: BlockDefinition = {
  type: 'accordion',
  label: 'Accordion',
  icon: 'i-lucide-chevrons-up-down',
  component: BlocksAccordion as Component,
  defaultContent: {
    heading: 'Frequently Asked Questions',
    showHeading: true,
    ...styleDefaults,
    items: [
      {
        id: crypto.randomUUID(),
        question: 'What services do you offer?',
        answer:
          '<p>I offer web design, development, and consulting services tailored to your needs.</p>',
      },
      {
        id: crypto.randomUUID(),
        question: 'How long does a project take?',
        answer:
          '<p>Timelines vary by scope, but most projects take between two and eight weeks from kickoff to delivery.</p>',
      },
      {
        id: crypto.randomUUID(),
        question: 'How do I get started?',
        answer:
          "<p>Just reach out via the contact form and we'll schedule a call to discuss your project.</p>",
      },
    ],
  },
  tabs: [
    {
      label: 'Content',
      icon: 'i-lucide-text',
      sections: [
        {
          label: 'Content',
          fields: [
            { key: 'showHeading', label: 'Show heading', type: 'switch' },
            {
              key: 'heading',
              label: 'Heading',
              type: 'inline-text',
              placeholder: 'FAQ',
              showIf: { key: 'showHeading', value: true },
            },
            {
              key: 'items',
              label: 'Questions',
              type: 'list',
              itemLabel: 'Question',
              defaultItem: () => ({
                id: crypto.randomUUID(),
                question: 'New question',
                answer: '<p>Your answer here.</p>',
              }),
              itemFields: [
                { key: 'question', label: 'Question', placeholder: 'Your question', inline: true },
                { key: 'answer', label: 'Answer', type: 'textarea', placeholder: 'Your answer' },
              ],
            },
          ],
        },
      ],
    },
    styleTab,
  ],
};
