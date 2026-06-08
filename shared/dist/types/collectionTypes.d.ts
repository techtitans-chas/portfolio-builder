export interface CollectionFieldDef {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'url' | 'number' | 'boolean' | 'tags' | 'image';
    required?: boolean;
    placeholder?: string;
}
export interface CollectionTypeDef {
    /** Stable identifier stored in the DB */
    type: string;
    /** Human-readable label shown in the UI */
    label: string;
    /** Lucide icon class */
    icon: string;
    /** Fields that each item in this collection has */
    fields: CollectionFieldDef[];
    /** Block types that are unlocked when this collection exists in the portfolio */
    allowedBlocks: string[];
    /**
     * Name of the Vue component (without extension) in components/collection-pages/
     * that renders the detail page for an item in this collection.
     * When set, item cards link to /p/:slug/:collectionType/:itemId.
     */
    pageTemplate?: string;
}
export declare const collectionTypes: CollectionTypeDef[];
export declare function getCollectionType(type: string): CollectionTypeDef | undefined;
//# sourceMappingURL=collectionTypes.d.ts.map