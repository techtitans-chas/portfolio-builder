import { headerDefinition } from './header';
import { footerDefinition } from './footer';
import { heroDefinition } from './hero';
import { textDefinition } from './text';
import { projectsDefinition } from './projects';
import { experiencesDefinition } from './experiences';
import { demoDefinition } from './demo';
import { accordionDefinition } from './accordion';
import { testimonialDefinition } from './testimonial';
export type { BlockField, BlockSection, BlockTab, BlockDefinition } from './types';

export {
  headerDefinition,
  footerDefinition,
  heroDefinition,
  textDefinition,
  projectsDefinition,
  experiencesDefinition,
  demoDefinition,
  accordionDefinition,
  testimonialDefinition,
};

/** Content blocks shown in the BlocksView picker (excludes layout blocks) */
export const blockDefinitions = [
  heroDefinition,
  textDefinition,
  projectsDefinition,
  experiencesDefinition,
  demoDefinition,
  accordionDefinition,
  testimonialDefinition,
];

/** All blocks including layout — used by Renderer and RightSidebar */
export const allBlockDefinitions = [
  headerDefinition,
  footerDefinition,
  heroDefinition,
  textDefinition,
  projectsDefinition,
  experiencesDefinition,
  demoDefinition,
  accordionDefinition,
  testimonialDefinition,
];
