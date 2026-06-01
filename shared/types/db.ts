export interface Page {
  id: string;
  portfolioId: string;
  title: string;
  slug: string;
  isPublished: boolean;
  showInMenu: boolean;
  sortOrder: number;
  isMandatory: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  seoOgImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Block {
  id: string;
  pageId: string;
  type: string;
  sortOrder: number;
  content: Record<string, unknown>;
  styles: Record<string, unknown>;
  isVisible: boolean;
  isMandatory: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  portfolioId: string;
  title: string;
  description: string | null;
  time: string | null;
  isPublished: boolean;
  sortOrder: number;
  links: ProjectLink[];
  previewImageUrl: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectLink {
  id: string;
  title: string;
  url: string;
  icon: string | null;
  isPublished: boolean;
  sortOrder: number;
}

export interface Experience {
  id: string;
  portfolioId: string;
  title: string;
  place: string | null;
  location: string | null;
  time: string | null;
  description: string | null;
  isPublished: boolean;
  sortOrder: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
