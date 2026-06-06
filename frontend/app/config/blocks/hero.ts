import type { Component } from 'vue';
import BlocksHero from '~/components/blocks/Hero.vue';
import type { BlockDefinition } from './types';
import { styleTab, styleDefaults } from './presets';

export const heroDefinition: BlockDefinition = {
  type: 'hero',
  label: 'Hero',
  icon: 'i-lucide-monitor',
  component: BlocksHero as Component,
  defaultContent: {
    heading: 'Your name',
    subheading: '<p>Your tagline</p>',
    alignH: 'center',
    alignV: 'center',
    showButton1: true,
    button1Label: 'View my work',
    button1Url: '#projects',
    button1Style: {
      variant: 'solid',
      radius: 'md',
      size: 'md',
      spacing: 4,
      uppercase: false,
      letterSpacing: 0,
    },
    showButton2: true,
    button2Label: 'Get in touch',
    button2Url: '#contact',
    button2Style: {
      variant: 'outline',
      radius: 'md',
      size: 'md',
      spacing: 4,
      uppercase: false,
      letterSpacing: 0,
    },
    image: null,
    imagePosition: 'right',
    headingFont: null,
    textShadow: false,
    fullHeight: false,
    height: 500,
    padding: 48,
    maxWidth: 'md',
    ...styleDefaults,
  },
  tabs: [
    {
      label: 'Content',
      icon: 'i-lucide-text',
      sections: [
        {
          label: 'Text',
          fields: [
            { key: 'heading', label: 'Heading', type: 'inline-text', placeholder: 'Your name' },
            {
              key: 'subheading',
              label: 'Subheading',
              type: 'inline-rich',
              placeholder: 'Your tagline',
            },
            { key: 'headingFont', label: 'Heading font', type: 'font' },
          ],
        },
        {
          label: 'Image',
          fields: [
            { key: 'image', label: 'Side image', type: 'image' },
            {
              key: 'imagePosition',
              label: 'Image position',
              type: 'select',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
              showIf: { key: 'image', value: 'truthy' },
            },
          ],
        },
        {
          label: 'Button 1',
          fields: [
            { key: 'showButton1', label: 'Show button 1', type: 'switch' },
            {
              key: 'button1Label',
              label: 'Label',
              type: 'text',
              placeholder: 'View my work',
              showIf: { key: 'showButton1', value: true },
            },
            {
              key: 'button1Url',
              label: 'URL',
              type: 'url',
              placeholder: '#projects',
              showIf: { key: 'showButton1', value: true },
            },
            {
              key: 'button1Style',
              label: 'Button style',
              type: 'button-style',
              showIf: { key: 'showButton1', value: true },
            },
          ],
        },
        {
          label: 'Button 2',
          fields: [
            { key: 'showButton2', label: 'Show button 2', type: 'switch' },
            {
              key: 'button2Label',
              label: 'Label',
              type: 'text',
              placeholder: 'Get in touch',
              showIf: { key: 'showButton2', value: true },
            },
            {
              key: 'button2Url',
              label: 'URL',
              type: 'url',
              placeholder: '#contact',
              showIf: { key: 'showButton2', value: true },
            },
            {
              key: 'button2Style',
              label: 'Button style',
              type: 'button-style',
              showIf: { key: 'showButton2', value: true },
            },
          ],
        },
      ],
    },
    {
      label: 'Layout',
      icon: 'i-lucide-layout',
      sections: [
        {
          fields: [
            {
              key: 'alignH',
              label: 'Horizontal alignment',
              type: 'select',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
              ],
            },
            {
              key: 'alignV',
              label: 'Vertical alignment',
              type: 'select',
              options: [
                { label: 'Top', value: 'top' },
                { label: 'Center', value: 'center' },
                { label: 'Bottom', value: 'bottom' },
              ],
            },
            {
              key: 'maxWidth',
              label: 'Content width',
              type: 'select',
              options: [
                { label: 'Narrow', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Wide', value: 'lg' },
                { label: 'Full', value: 'full' },
              ],
            },
            { key: 'fullHeight', label: 'Full viewport height', type: 'switch' },
            {
              key: 'height',
              label: 'Height',
              type: 'slider',
              min: 200,
              max: 900,
              step: 50,
              showIf: { key: 'fullHeight', value: false },
            },
            {
              key: 'padding',
              label: 'Padding',
              type: 'slider',
              min: 0,
              max: 192,
              step: 8,
            },
            { key: 'textShadow', label: 'Text shadow', type: 'switch' },
          ],
        },
      ],
    },
    styleTab,
  ],
};
