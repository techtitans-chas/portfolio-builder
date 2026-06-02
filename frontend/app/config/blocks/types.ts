import type { Component } from 'vue';

export interface BlockField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'color' | 'url';
  placeholder?: string;
  options?: { label: string; value: string }[];
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
