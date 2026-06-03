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
  name: string | null;
  sortOrder: number;
  content: Record<string, unknown>;
  styles: Record<string, unknown>;
  isVisible: boolean;
  isMandatory: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collection {
  id: string;
  portfolioId: string;
  type: string;
  name: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionItem {
  id: string;
  collectionId: string;
  data: Record<string, unknown>;
  isPublished: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
