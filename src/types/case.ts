export interface Case {
    slug: string;
    documentId: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    markdown: string;
    category: { name: string } | null;
    tags: { name: string }[];
    mainImage: {
        url: string
    };
    gallery: {
        url: string;
        documentId: string;
    }[];
}