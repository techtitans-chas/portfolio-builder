import type { Component } from 'vue';

export interface ListItemField {
  key: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'url' | 'textarea';
}

export interface BlockField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'color' | 'url' | 'image' | 'list';
  placeholder?: string;
  options?: { label: string; value: string }[];
  // Only used when type === 'list':
  itemLabel?: string;
  itemFields?: ListItemField[];
  defaultItem?: () => Record<string, unknown>;
}

export interface BlockSection {
  label?: string;
  fields: BlockField[];
}

export interface BlockTab {
  label: string;
  icon?: string;
  sections: BlockSection[];
}

export interface BlockDefinition {
  type: string;
  label: string;
  icon: string;
  component: Component;
  defaultContent: Record<string, unknown>;
  /** Use tabs when you need multiple panels; otherwise use sections directly */
  tabs?: BlockTab[];
  sections?: BlockSection[];
}
