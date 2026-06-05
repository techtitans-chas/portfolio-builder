import type { Component } from 'vue';
import BlocksPostFeed from '~/components/blocks/PostFeed.vue';
import BlocksPostList from '~/components/blocks/PostList.vue';
import type { BlockDefinition } from './types';

const sharedFields = [
  { key: 'heading', label: 'Heading', type: 'inline-text' as const },
  { key: 'showHeading', label: 'Show heading', type: 'switch' as const },
  {
    key: 'collectionId',
    label: 'Collection',
    type: 'collection-select' as const,
    collectionType: 'posts',
  },
  {
    key: 'filterTag',
    label: 'Filter by tag',
    type: 'text' as const,
    placeholder: 'Leave empty to show all',
  },
];

export const postFeedDefinition: BlockDefinition = {
  type: 'post-feed',
  label: 'Post feed',
  icon: 'i-lucide-layout-grid',
  component: BlocksPostFeed as Component,
  allowedCollections: ['posts'],
  defaultContent: {
    heading: 'Posts',
    showHeading: true,
    collectionId: '',
    filterTag: '',
    pageSize: 6,
  },
  sections: [
    {
      label: 'Settings',
      fields: [
        ...sharedFields,
        {
          key: 'pageSize',
          label: 'Posts per page',
          type: 'slider' as const,
          min: 2,
          max: 12,
          step: 2,
        },
      ],
    },
  ],
};

export const postListDefinition: BlockDefinition = {
  type: 'post-list',
  label: 'Post list',
  icon: 'i-lucide-list',
  component: BlocksPostList as Component,
  allowedCollections: ['posts'],
  defaultContent: {
    heading: 'Posts',
    showHeading: true,
    collectionId: '',
    filterTag: '',
  },
  sections: [{ label: 'Settings', fields: sharedFields }],
};
