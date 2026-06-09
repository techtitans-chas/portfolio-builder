export const collectionTypes = [
    {
        type: 'projects',
        label: 'Projects',
        icon: 'i-lucide-folder-kanban',
        fields: [
            { key: 'title', label: 'Title', type: 'text', required: true },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'time', label: 'Time / Period', type: 'text', placeholder: 'e.g. 2023–2024' },
            { key: 'previewImageUrl', label: 'Preview image', type: 'image' },
            { key: 'tags', label: 'Tags', type: 'tags' },
        ],
        allowedBlocks: ['projects'],
        pageTemplate: 'ProjectDetail',
    },
    {
        type: 'posts',
        label: 'Posts',
        icon: 'i-lucide-newspaper',
        fields: [
            { key: 'title', label: 'Title', type: 'text', required: true },
            { key: 'date', label: 'Date', type: 'text', placeholder: 'e.g. 2024-06-01' },
            { key: 'author', label: 'Author', type: 'text' },
            { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
            { key: 'coverImageUrl', label: 'Cover image', type: 'image' },
            { key: 'tags', label: 'Tags', type: 'tags' },
        ],
        allowedBlocks: ['post-cards', 'post-feed', 'post-list'],
        pageTemplate: 'PostDetail',
    },
    {
        type: 'experiences',
        label: 'Experiences',
        icon: 'i-lucide-briefcase',
        fields: [
            { key: 'title', label: 'Title', type: 'text', required: true },
            { key: 'place', label: 'Place / Company', type: 'text' },
            { key: 'location', label: 'Location', type: 'text' },
            { key: 'time', label: 'Time / Period', type: 'text', placeholder: 'e.g. 2021–2023' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'tags', label: 'Tags', type: 'tags' },
        ],
        allowedBlocks: ['experiences'],
    },
];
export function getCollectionType(type) {
    return collectionTypes.find(ct => ct.type === type);
}
//# sourceMappingURL=collectionTypes.js.map