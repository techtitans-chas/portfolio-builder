import { headerDefinition } from './header';
import { footerDefinition } from './footer';
import { heroDefinition } from './hero';
import { textDefinition } from './text';
import { projectsDefinition, projectListDefinition } from './projects';
import { experiencesDefinition } from './experiences';
import { postCardsDefinition, postFeedDefinition, postListDefinition } from './posts';
import { demoDefinition } from './demo';
import { accordionDefinition } from './accordion';
import { testimonialDefinition } from './testimonial';
import { skillsDefinition } from './skills';
export type { BlockField, BlockSection, BlockTab, BlockDefinition } from './types';

export {
  headerDefinition,
  footerDefinition,
  heroDefinition,
  textDefinition,
  projectsDefinition,
  projectListDefinition,
  experiencesDefinition,
  postCardsDefinition,
  postFeedDefinition,
  postListDefinition,
  demoDefinition,
  accordionDefinition,
  testimonialDefinition,
  skillsDefinition,
};

/** Content blocks shown in the BlocksView picker (excludes layout blocks) */
export const blockDefinitions = [
  heroDefinition,
  textDefinition,
  projectsDefinition,
  projectListDefinition,
  postCardsDefinition,
  postFeedDefinition,
  postListDefinition,
  experiencesDefinition,
  // demoDefinition,
  accordionDefinition,
  testimonialDefinition,
  skillsDefinition,
];

/** All blocks including layout — used by Renderer and RightSidebar */
export const allBlockDefinitions = [
  headerDefinition,
  footerDefinition,
  heroDefinition,
  textDefinition,
  projectsDefinition,
  projectListDefinition,
  postCardsDefinition,
  postFeedDefinition,
  postListDefinition,
  experiencesDefinition,
  demoDefinition,
  accordionDefinition,
  testimonialDefinition,
  skillsDefinition,
];
