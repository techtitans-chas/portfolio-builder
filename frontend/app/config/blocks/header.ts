import type { Component } from 'vue';
import BlocksHeader from '~/components/blocks/Header.vue';
import type { BlockDefinition } from './types';

const PLATFORM_OPTIONS = [
  { label: 'Twitter / X', value: 'twitter' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'GitHub', value: 'github' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Dribbble', value: 'dribbble' },
  { label: 'Behance', value: 'behance' },
];

export const headerDefinition: BlockDefinition = {
  type: 'header',
  label: 'Header',
  icon: 'i-lucide-panel-top',
  component: BlocksHeader as Component,
  defaultContent: {
    siteName: '',
    ctaButtons: [],
    socialLinks: [],
    showColorModeToggle: false,
    brandingDisplay: 'logo-and-title',
    layout: 'left-nav',
    background: null,
    textColor: null,
    navStyle: 'plain',
    height: 'normal',
  },
  tabs: [
    {
      label: 'Content',
      icon: 'i-lucide-type',
      sections: [
        {
          label: 'Branding',
          fields: [
            { key: 'siteName', label: 'Site name', type: 'text', placeholder: 'Your name' },
            {
              key: 'brandingDisplay',
              label: 'Display',
              type: 'select',
              options: [
                { label: 'Logo & title', value: 'logo-and-title' },
                { label: 'Logo only', value: 'logo-only' },
                { label: 'Title only', value: 'title-only' },
              ],
            },
          ],
        },
        {
          label: 'Call to action buttons',
          fields: [
            {
              key: 'ctaButtons',
              label: 'Buttons',
              type: 'list',
              itemLabel: 'Button',
              defaultItem: () => ({
                id: crypto.randomUUID(),
                label: 'Hire me',
                url: '#contact',
                style: 'filled',
              }),
              itemFields: [
                { key: 'label', label: 'Label', placeholder: 'Hire me', inline: true },
                { key: 'url', label: 'URL', placeholder: '#contact', type: 'url' },
                {
                  key: 'style',
                  label: 'Style',
                  type: 'select',
                  options: [
                    { label: 'Filled', value: 'filled' },
                    { label: 'Outline', value: 'outline' },
                    { label: 'Ghost', value: 'ghost' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Social links',
          fields: [
            {
              key: 'socialLinks',
              label: 'Accounts',
              type: 'list',
              itemLabel: 'Account',
              defaultItem: () => ({ id: crypto.randomUUID(), platform: 'instagram', url: '' }),
              itemFields: [
                {
                  key: 'platform',
                  label: 'Platform',
                  inline: true,
                  type: 'select',
                  options: PLATFORM_OPTIONS,
                },
                { key: 'url', label: 'URL', placeholder: 'https://...', type: 'url' },
              ],
            },
          ],
        },
        {
          label: 'Options',
          fields: [
            { key: 'showColorModeToggle', label: 'Show color mode toggle', type: 'checkbox' },
          ],
        },
      ],
    },
    {
      label: 'Style',
      icon: 'i-lucide-palette',
      sections: [
        {
          label: 'Layout',
          fields: [
            {
              key: 'layout',
              label: 'Layout',
              type: 'select',
              options: [
                { label: 'Logo left, nav left', value: 'left-nav' },
                { label: 'Logo center, nav split', value: 'centered-logo' },
                { label: 'Logo left, nav center', value: 'centered-nav' },
              ],
            },
            {
              key: 'height',
              label: 'Height',
              type: 'select',
              options: [
                { label: 'Compact', value: 'compact' },
                { label: 'Normal', value: 'normal' },
                { label: 'Tall', value: 'tall' },
              ],
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              key: 'navStyle',
              label: 'Link style',
              type: 'select',
              options: [
                { label: 'Plain', value: 'plain' },
                { label: 'Underline', value: 'underline' },
                { label: 'Pill', value: 'pill' },
                { label: 'Block', value: 'block' },
              ],
            },
          ],
        },
        {
          label: 'Colors',
          fields: [
            { key: 'background', label: 'Background', type: 'theme-color' },
            { key: 'textColor', label: 'Text color override', type: 'theme-color' },
          ],
        },
      ],
    },
  ],
};
