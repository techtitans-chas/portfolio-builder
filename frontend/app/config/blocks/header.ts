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
    // Slot layout
    layout: 'single',
    leftOrder: ['logo', 'nav'],
    centerOrder: [],
    rightOrder: ['cta'],
    topOrder: ['logo'],

    // Visibility
    showLogo: true,
    showNav: true,
    showCta: true,
    showSocials: false,
    showColorModeToggle: false,

    // Content
    siteName: '',
    ctaButtons: [],
    socialLinks: [],
    brandingDisplay: 'logo-and-title',

    // Style
    background: null,
    textColor: null,
    logoTint: null,
    logoDark: false,
    navStyle: 'plain',
    height: 'normal',
  },
  tabs: [
    {
      label: 'Widgets',
      icon: 'i-lucide-layout-panel-left',
      sections: [
        {
          label: 'Show / hide',
          fields: [
            { key: 'showLogo', label: 'Logo', type: 'checkbox' },
            { key: 'showNav', label: 'Navigation links', type: 'checkbox' },
            { key: 'showCta', label: 'CTA buttons', type: 'checkbox' },
            { key: 'showSocials', label: 'Social links', type: 'checkbox' },
            { key: 'showColorModeToggle', label: 'Color mode toggle', type: 'checkbox' },
          ],
        },
        {
          label: 'Layout',
          fields: [
            {
              key: 'layout',
              label: 'Header layout',
              type: 'select',
              options: [
                { label: 'Single row', value: 'single' },
                { label: 'Stacked', value: 'stacked' },
              ],
            },
          ],
        },
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
          label: 'CTA buttons',
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
      ],
    },
    {
      label: 'Style',
      icon: 'i-lucide-palette',
      sections: [
        {
          label: 'Dimensions',
          fields: [
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
          label: 'Navigation links',
          fields: [
            {
              key: 'navStyle',
              label: 'Link style',
              type: 'select',
              options: [
                { label: 'Plain', value: 'plain' },
                { label: 'Underline', value: 'underline' },
                { label: 'Pill', value: 'pill' },
                { label: 'Pill (filled)', value: 'pill-filled' },
                { label: 'Block', value: 'block' },
                { label: 'Block (filled)', value: 'block-filled' },
              ],
            },
          ],
        },
        {
          label: 'Colors',
          fields: [
            { key: 'background', label: 'Background', type: 'theme-color' },
            { key: 'textColor', label: 'Text color override', type: 'theme-color' },
            { key: 'logoTint', label: 'Logo tint', type: 'theme-color' },
            { key: 'logoDark', label: 'Logo is dark (invert before tinting)', type: 'checkbox' },
          ],
        },
      ],
    },
  ],
};
