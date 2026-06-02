import { headerDefinition } from './header';
import { footerDefinition } from './footer';
import { heroDefinition } from './hero';
export type { BlockField, BlockSection, BlockTab, BlockDefinition } from './types';

export { headerDefinition, footerDefinition, heroDefinition };

/** Content blocks shown in the BlocksView picker (excludes layout blocks) */
export const blockDefinitions = [heroDefinition];

/** All blocks including layout — used by Renderer and RightSidebar */
export const allBlockDefinitions = [headerDefinition, footerDefinition, heroDefinition];
