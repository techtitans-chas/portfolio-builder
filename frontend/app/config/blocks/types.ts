import type { Component } from 'vue';
import type { ButtonStyleValue } from '~/components/pagebuilder/ButtonStyleModal.vue';
export type { ButtonStyleValue };

/** Style props shared by all blocks. */
export interface BlockStyleProps {
  background?: string | null;
  backgroundImage?: string | null;
  backgroundOpacity?: number;
  backgroundFixed?: boolean;
  overlayEnabled?: boolean;
  overlayType?: 'solid' | 'gradient';
  overlayColor?: string | null;
  overlayColor2?: string | null;
  overlayDegree?: number;
  overlayOpacity?: number;
  surfaceColor?: string | null;
}

export interface TextBlockProps extends BlockStyleProps {
  content?: string;
  align?: 'left' | 'center' | 'right';
}

export interface PostFeedBlockProps extends BlockStyleProps {
  heading?: string;
  showHeading?: boolean;
  collectionId?: string;
  filterTag?: string;
  pageSize?: number;
}

export interface ProjectsBlockProps extends BlockStyleProps {
  heading?: string;
  showHeading?: boolean;
  filterTag?: string;
  linkToPage?: boolean;
  collectionId?: string;
}

export interface ProjectListBlockProps extends BlockStyleProps {
  heading?: string;
  showHeading?: boolean;
  filterTag?: string;
  linkToPage?: boolean;
  collectionId?: string;
}

export interface ExperiencesBlockProps extends BlockStyleProps {
  heading?: string;
  showHeading?: boolean;
  filterTag?: string;
  collectionId?: string;
}

export interface TestimonialItem {
  id?: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string | null;
}

export interface TestimonialBlockProps extends BlockStyleProps {
  heading?: string;
  showHeading?: boolean;
  autoplay?: boolean;
  items?: TestimonialItem[];
}

export interface AccordionItem {
  id?: string;
  question: string;
  answer: string;
}

export interface AccordionBlockProps extends BlockStyleProps {
  heading?: string;
  showHeading?: boolean;
  items?: AccordionItem[];
}

export interface PostListBlockProps extends BlockStyleProps {
  heading?: string;
  showHeading?: boolean;
  collectionId?: string;
  filterTag?: string;
}

export interface SkillItem {
  id?: string;
  name: string;
  level: string;
  category: string;
}

export interface SkillsBlockProps extends BlockStyleProps {
  heading?: string;
  showHeading?: boolean;
  columns?: '1' | '2';
  skills?: SkillItem[];
}

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
    | 'switch'
    | 'color'
    | 'url'
    | 'image'
    | 'file'
    | 'list'
    | 'font'
    | 'theme-color'
    | 'slider'
    | 'inline-text'
    | 'inline-rich'
    | 'collection-select'
    | 'button-style';
  /** Required when type === 'collection-select': the collection type to filter by */
  collectionType?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  // Only used when type === 'list':
  itemLabel?: string;
  itemFields?: ListItemField[];
  defaultItem?: () => Record<string, unknown>;
  // For 'text'/'textarea': also render as editable inline in the preview
  inline?: boolean;
  // Character limit — shows a live counter below the input
  maxLength?: number;
  // For 'slider':
  min?: number;
  max?: number;
  step?: number;
  // Unit suffix shown next to slider value (e.g. '%', 'deg', 'rem'). Defaults to 'px' when omitted.
  unit?: string;
  // Only show this field when another field has a specific value.
  // Use value: 'truthy' to show whenever the field is non-null / non-empty.
  showIf?: { key: string; value: unknown | 'truthy' };
  // Like showIf but ALL conditions must pass.
  showIfAll?: { key: string; value: unknown | 'truthy' }[];
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
