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
    layout: 'single',
    leftOrder: ['logo', 'nav'],
    centerOrder: [],
    rightOrder: ['cta'],
    topOrder: ['logo'],
    showLogo: true,
    showNav: true,
    showCta: true,
    showSocials: false,
    showColorModeToggle: false,
    siteName: '',
    ctaButtons: [],
    socialLinks: [],
    logoSize: 'md',
    logoStacked: false,
    brandingDisplay: 'logo-and-title',
    background: null,
    textColor: null,
    navVariant: 'ghost',
    navColor: null,
    navRadius: 'md',
    navSize: 'sm',
    navSpacing: 4,
    padding: 16,
    borderWidth: 1,
    maxWidth: '7xl',
    position: 'static',
    mobileMenuTitle: '',
  },
  tabs: [
    {
      label: 'Layout',
      icon: 'i-lucide-layout-panel-left',
      sections: [
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
            {
              key: 'position',
              label: 'Position',
              type: 'select',
              options: [
                { label: 'Static', value: 'static' },
                { label: 'Sticky', value: 'sticky' },
              ],
            },
            {
              key: 'padding',
              label: 'Padding',
              type: 'slider',
              min: 0,
              max: 64,
              step: 2,
            },
            {
              key: 'borderWidth',
              label: 'Border size',
              type: 'slider',
              min: 0,
              max: 15,
              step: 1,
            },
            {
              key: 'maxWidth',
              label: 'Inner max width',
              type: 'select',
              options: [
                { label: 'Full', value: 'full' },
                { label: 'SM (640px)', value: 'sm' },
                { label: 'MD (768px)', value: 'md' },
                { label: 'LG (1024px)', value: 'lg' },
                { label: 'XL (1280px)', value: 'xl' },
                { label: '2XL (1536px)', value: '2xl' },
                { label: '3XL (1792px)', value: '3xl' },
                { label: '4XL (2048px)', value: '4xl' },
                { label: '5XL (2560px)', value: '5xl' },
                { label: '6XL (3072px)', value: '6xl' },
                { label: '7XL (3584px)', value: '7xl' },
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
    {
      label: 'Branding',
      icon: 'i-lucide-building-2',
      sections: [
        {
          fields: [
            { key: 'siteName', label: 'Site name', type: 'text', placeholder: 'Your name' },
            { key: 'showLogo', label: 'Show logo', type: 'switch' },
            {
              key: 'logoSize',
              label: 'Logo size',
              type: 'select',
              showIf: { key: 'showLogo', value: true },
              options: [
                { label: 'XS', value: 'xs' },
                { label: 'Small', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Large', value: 'lg' },
                { label: 'XL', value: 'xl' },
              ],
            },
            {
              key: 'logoStacked',
              label: 'Stack logo above title',
              type: 'switch',
              showIf: { key: 'showLogo', value: true },
            },
            {
              key: 'brandingDisplay',
              label: 'Display',
              type: 'select',
              showIf: { key: 'showLogo', value: true },
              options: [
                { label: 'Logo & title', value: 'logo-and-title' },
                { label: 'Logo only', value: 'logo-only' },
                { label: 'Title only', value: 'title-only' },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Navigation',
      icon: 'i-lucide-navigation',
      sections: [
        {
          fields: [
            { key: 'showNav', label: 'Show navigation', type: 'switch' },
            {
              key: 'navVariant',
              label: 'Style',
              type: 'select',
              showIf: { key: 'showNav', value: true },
              options: [
                { label: 'Ghost', value: 'ghost' },
                { label: 'Soft', value: 'soft' },
                { label: 'Solid', value: 'solid' },
                { label: 'Outline', value: 'outline' },
                { label: 'Link', value: 'link' },
              ],
            },
            {
              key: 'navColor',
              label: 'Color',
              type: 'theme-color',
              showIf: { key: 'showNav', value: true },
            },
            {
              key: 'navRadius',
              label: 'Corner radius',
              type: 'select',
              showIf: { key: 'showNav', value: true },
              options: [
                { label: 'None', value: 'none' },
                { label: 'Small', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Large', value: 'lg' },
                { label: 'Full', value: 'full' },
              ],
            },
            {
              key: 'navSize',
              label: 'Size',
              type: 'select',
              showIf: { key: 'showNav', value: true },
              options: [
                { label: 'Extra small', value: 'xs' },
                { label: 'Small', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Large', value: 'lg' },
              ],
            },
            {
              key: 'navSpacing',
              label: 'Spacing',
              type: 'slider',
              showIf: { key: 'showNav', value: true },
              min: 0,
              max: 32,
              step: 1,
            },
          ],
        },
      ],
    },
    {
      label: 'Widgets',
      icon: 'i-lucide-layout-template',
      sections: [
        {
          label: 'CTA buttons',
          fields: [
            { key: 'showCta', label: 'Show CTA buttons', type: 'switch' },
            {
              key: 'ctaButtons',
              label: 'Buttons',
              type: 'list',
              showIf: { key: 'showCta', value: true },
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
            { key: 'showSocials', label: 'Show social links', type: 'switch' },
            {
              key: 'socialLinks',
              label: 'Accounts',
              type: 'list',
              showIf: { key: 'showSocials', value: true },
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
          label: 'Color mode toggle',
          fields: [{ key: 'showColorModeToggle', label: 'Show toggle', type: 'switch' }],
        },
      ],
    },
    {
      label: 'Mobile',
      icon: 'i-lucide-smartphone',
      sections: [
        {
          fields: [
            {
              key: 'mobileMenuTitle',
              label: 'Menu header text',
              type: 'text',
              placeholder: 'Menu',
            },
          ],
        },
      ],
    },
  ],
};
