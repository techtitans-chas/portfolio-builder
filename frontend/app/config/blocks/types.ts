import type { Component } from 'vue';

export interface ListItemField {
  key: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'url' | 'textarea' | 'select';
  options?: { label: string; value: string }[];
  inline?: boolean;
}

export interface BlockField {
  key: string;
  label: string;
  type:
    | 'text'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'color'
    | 'url'
    | 'image'
    | 'file'
    | 'list'
    | 'font'
    | 'theme-color'
    | 'slider'
    | 'inline-text'
    | 'inline-rich';
  placeholder?: string;
  options?: { label: string; value: string }[];
  // Only used when type === 'list':
  itemLabel?: string;
  itemFields?: ListItemField[];
  defaultItem?: () => Record<string, unknown>;
  // For 'text'/'textarea': also render as editable inline in the preview
  inline?: boolean;
  // For 'slider':
  min?: number;
  max?: number;
  step?: number;
  // Only show this field when another field has a specific value
  showIf?: { key: string; value: unknown };
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
  /**
   * If set, this block only appears in the picker when the portfolio has a
   * collection of one of the listed types. Maps to CollectionTypeDef.type.
   */
  allowedCollections?: string[];
}
