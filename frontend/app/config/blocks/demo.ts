import type { Component } from 'vue';
import BlocksDemo from '~/components/blocks/Demo.vue';
import type { BlockDefinition } from './types';

export const demoDefinition: BlockDefinition = {
  type: 'demo',
  label: 'Demo',
  icon: 'i-lucide-blocks',
  component: BlocksDemo as Component,
  defaultContent: {
    textField: 'Hello world',
    textareaField: 'Line one\nLine two',
    urlField: 'https://example.com',
    inlineTextField: 'Inline text (click to edit)',
    inlineRichField:
      '<p>Rich text — <strong>bold</strong>, <em>italic</em>, <a href="#">link</a></p>',
    selectField: 'option-a',
    checkboxField: false,
    fontField: 'Inter',
    colorField: '#6c8fff',
    themeColorField: null,
    imageField: null,
    fileField: null,
    listField: [
      { id: crypto.randomUUID(), label: 'First item', url: 'https://example.com' },
      { id: crypto.randomUUID(), label: 'Second item', url: '' },
    ],
  },
  tabs: [
    {
      label: 'Text',
      icon: 'i-lucide-type',
      sections: [
        {
          label: 'Sidebar fields',
          fields: [
            { key: 'textField', label: 'Text', type: 'text', placeholder: 'Single-line text' },
            {
              key: 'textareaField',
              label: 'Textarea',
              type: 'textarea',
              placeholder: 'Multi-line text',
            },
            { key: 'urlField', label: 'URL', type: 'url', placeholder: 'https://' },
          ],
        },
        {
          label: 'Inline fields (edit in preview)',
          fields: [
            { key: 'inlineTextField', label: 'Inline text', type: 'inline-text' },
            { key: 'inlineRichField', label: 'Inline rich', type: 'inline-rich' },
          ],
        },
      ],
    },
    {
      label: 'Choices',
      icon: 'i-lucide-sliders-horizontal',
      sections: [
        {
          fields: [
            {
              key: 'selectField',
              label: 'Select',
              type: 'select',
              options: [
                { label: 'Option A', value: 'option-a' },
                { label: 'Option B', value: 'option-b' },
                { label: 'Option C', value: 'option-c' },
              ],
            },
            { key: 'checkboxField', label: 'Checkbox', type: 'checkbox' },
            { key: 'fontField', label: 'Font', type: 'font' },
            { key: 'colorField', label: 'Color', type: 'color' },
            { key: 'themeColorField', label: 'Theme color', type: 'theme-color' },
          ],
        },
      ],
    },
    {
      label: 'Media',
      icon: 'i-lucide-image',
      sections: [
        {
          fields: [
            { key: 'imageField', label: 'Image', type: 'image' },
            { key: 'fileField', label: 'File', type: 'file' },
          ],
        },
      ],
    },
    {
      label: 'List',
      icon: 'i-lucide-list',
      sections: [
        {
          fields: [
            {
              key: 'listField',
              label: 'Items',
              type: 'list',
              itemLabel: 'Item',
              defaultItem: () => ({ id: crypto.randomUUID(), label: 'New item', url: '' }),
              itemFields: [
                { key: 'label', label: 'Label', placeholder: 'Item label', inline: true },
                { key: 'url', label: 'URL', placeholder: 'https://', type: 'url' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
