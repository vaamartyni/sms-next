import { gql } from "graphql-request";

export const GET_CASES = gql`
    query Cases($locale: I18NLocaleCode) {
      cases(locale: $locale) {
        documentId
        slug
        documentId
        title
        shortDescription
        fullDescription
        category {
          name
        }
        tags {
          name
        }
        mainImage {
          url
        }
        gallery {
          url
        }
      }
    }
`;

export interface CaseResponse {
    cases: {
        slug: string;
        documentId: string;
        title: string;
        shortDescription: string;
        fullDescription: string;
        category: { name: string } | null;
        tags: { name: string }[];
        mainImage: {
            url: string
        },
    }[]
}