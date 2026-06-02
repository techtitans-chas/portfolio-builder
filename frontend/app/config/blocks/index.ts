import { headerDefinition } from './header';
import { footerDefinition } from './footer';
import { heroDefinition } from './hero';
import { textDefinition } from './text';
export type { BlockField, BlockSection, BlockTab, BlockDefinition } from './types';

export { headerDefinition, footerDefinition, heroDefinition, textDefinition };

/** Content blocks shown in the BlocksView picker (excludes layout blocks) */
export const blockDefinitions = [heroDefinition, textDefinition];

/** All blocks including layout — used by Renderer and RightSidebar */
export const allBlockDefinitions = [
  headerDefinition,
  footerDefinition,
  heroDefinition,
  textDefinition,
];
