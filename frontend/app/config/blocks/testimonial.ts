import type { Component } from 'vue';
import BlocksTestimonial from '~/components/blocks/Testimonial.vue';
import type { BlockDefinition } from './types';
import { styleTab, styleDefaults } from './presets';

export const testimonialDefinition: BlockDefinition = {
  type: 'testimonial',
  label: 'Testimonials',
  icon: 'i-lucide-quote',
  component: BlocksTestimonial as Component,
  defaultContent: {
    heading: 'What people say',
    showHeading: true,
    autoplay: false,
    ...styleDefaults,
    items: [
      {
        id: crypto.randomUUID(),
        quote:
          '<p>Working with them was an absolute pleasure. The attention to detail and speed of delivery exceeded every expectation we had.</p>',
        author: 'Sarah Johnson',
        role: 'CEO at Acme',
        avatar: null,
      },
      {
        id: crypto.randomUUID(),
        quote:
          '<p>Truly outstanding work. They took our rough idea and turned it into something we are genuinely proud to show off.</p>',
        author: 'Marcus Lee',
        role: 'Founder at Spark',
        avatar: null,
      },
      {
        id: crypto.randomUUID(),
        quote:
          '<p>Fast, communicative, and the quality speaks for itself. We will definitely be working together again.</p>',
        author: 'Priya Nair',
        role: 'Product Lead at Loop',
        avatar: null,
      },
    ],
  },
  tabs: [
    {
      label: 'Content',
      icon: 'i-lucide-text',
      sections: [
        {
          fields: [
            { key: 'showHeading', label: 'Show heading', type: 'switch' },
            {
              key: 'heading',
              label: 'Heading',
              type: 'inline-text',
              placeholder: 'What people say',
              showIf: { key: 'showHeading', value: true },
            },
            {
              key: 'items',
              label: 'Testimonials',
              type: 'list',
              itemLabel: 'Testimonial',
              defaultItem: () => ({
                id: crypto.randomUUID(),
                quote: '<p>Your testimonial here.</p>',
                author: 'Full Name',
                role: 'Role at Company',
                avatar: null,
              }),
              itemFields: [
                {
                  key: 'quote',
                  label: 'Quote',
                  type: 'textarea',
                  placeholder: 'Their words...',
                  inline: true,
                },
                { key: 'author', label: 'Author', placeholder: 'Full Name', inline: true },
                { key: 'role', label: 'Role / Company', placeholder: 'CEO at Acme', inline: true },
                { key: 'avatar', label: 'Avatar URL', type: 'url', placeholder: 'https://...' },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Settings',
      icon: 'i-lucide-settings-2',
      sections: [
        {
          fields: [{ key: 'autoplay', label: 'Autoplay', type: 'switch' }],
        },
      ],
    },
    styleTab,
  ],
};
