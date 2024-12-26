// Global Types
export interface SocialLink {
    url: string;
    title: string;
    documentId: string;
    icon : {
        url: string
    }
}

export interface CopyrightData {
    copyrights: string;
}

export interface GlobalData {
    socialLinks: SocialLink[];
    copyright: CopyrightData | null;
}