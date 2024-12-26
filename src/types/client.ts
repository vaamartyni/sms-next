export interface Client {
    documentId: string;
    slug: string;
    name: string;
    markdown: string;
    logo: { url: string } | null;
    shortDescription: string;
}