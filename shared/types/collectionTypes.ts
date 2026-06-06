export interface CollectionFieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'number' | 'boolean' | 'tags' | 'image';
  required?: boolean;
  placeholder?: string;
}

export interface CollectionTypeDef {
  /** Stable identifier stored in the DB */
  type: string;
  /** Human-readable label shown in the UI */
  label: string;
  /** Lucide icon class */
  icon: string;
  /** Fields that each item in this collection has */
  fields: CollectionFieldDef[];
  /** Block types that are unlocked when this collection exists in the portfolio */
  allowedBlocks: string[];
  /**
   * Name of the Vue component (without extension) in components/collection-pages/
   * that renders the detail page for an item in this collection.
   * When set, item cards link to /p/:slug/:collectionType/:itemId.
   */
  pageTemplate?: string;
}

export const collectionTypes: CollectionTypeDef[] = [
  {
    type: 'projects',
    label: 'Projects',
    icon: 'i-lucide-folder-kanban',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'time', label: 'Time / Period', type: 'text', placeholder: 'e.g. 2023–2024' },
      { key: 'previewImageUrl', label: 'Preview image', type: 'image' },
      { key: 'tags', label: 'Tags', type: 'tags' },
    ],
    allowedBlocks: ['projects'],
    pageTemplate: 'ProjectDetail',
  },
  {
    type: 'posts',
    label: 'Posts',
    icon: 'i-lucide-newspaper',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'date', label: 'Date', type: 'text', placeholder: 'e.g. 2024-06-01' },
      { key: 'author', label: 'Author', type: 'text' },
      { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { key: 'coverImageUrl', label: 'Cover image', type: 'image' },
      { key: 'tags', label: 'Tags', type: 'tags' },
    ],
    allowedBlocks: ['post-cards', 'post-feed', 'post-list'],
    pageTemplate: 'PostDetail',
  },
  {
    type: 'experiences',
    label: 'Experiences',
    icon: 'i-lucide-briefcase',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'place', label: 'Place / Company', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'time', label: 'Time / Period', type: 'text', placeholder: 'e.g. 2021–2023' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'tags', label: 'Tags', type: 'tags' },
    ],
    allowedBlocks: ['experiences'],
  },
];

export function getCollectionType(type: string): CollectionTypeDef | undefined {
  return collectionTypes.find(ct => ct.type === type);
}
