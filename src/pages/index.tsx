import { GetStaticProps } from "next";
import { GraphQLClient } from "graphql-request";
import SpinningStripe from "@/src/components/SpinningStripe";
import HeroSection from "@/src/sections/heroSection";
import CaseSection from "@/src/sections/caseSection";
import ClientSection from "@/src/sections/clientSection";
import ServicesSection from "@/src/components/ServicesSection";
import CallToActionSection from "@/src/sections/callToActionSection";
import { Case } from "@/src/types/case";
import { Client } from "@/src/types/client";

interface HeroResponse {
    hero: {
        headings: {
            Heading: string;
            locale: string;
            documentId: string;
        }[];
        words: {
            locale: string;
            slug: string;
            word: string;
            documentId: string;
        }[];
        paragraph: string;
        locale: string;
        documentId: string;
        controls: {
            id: string;
            title: string;
            url: string;
            type: "internal" | "external";
        }[];
    };
    cases: Case[];
    clients: Client[];
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const endpoint = process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql";
    const client = new GraphQLClient(endpoint);

    const query = `
    query Hero($pagination: PaginationArg, $locale: I18NLocaleCode) {
      hero(locale: $locale) {
        headings {
          Heading
          locale
          documentId
        }
        words(pagination: $pagination) {
          locale
          slug
          word
          documentId
        }
        paragraph
        locale
        documentId
        controls {
          ... on ComponentElementsButton {
            id
            title
            url
            type
          }
        }
    
  }
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
      clients(locale: $locale) {
        documentId
        slug
        name
        markdown
        logo {
          url
          documentId
        }
        shortDescription
      }
    }
    `;

    const variables = {
        locale: locale || "en", // Use provided locale or fallback to "en"
        pagination: { limit: -1 }, // Disable pagination limit for words
    };

    try {
        const response = await client.request<HeroResponse>(query, variables);
        console.log("Fetched Cases: ", response.cases);
        return {
            props: {
                hero: response.hero,
                cases: response.cases, // Pass the cases data
                clients: response.clients, // Pass the cases data
            },
            revalidate: 10, // ISR: rebuild every 10 seconds
        };
    } catch (error) {
        console.error("Error fetching Hero data:", error);
        return {
            props: {
                hero: null,
                cases: [], // Fallback to empty array for cases
            },
        };
    }
};

export default function HomePage({ hero, cases, clients }: { hero: HeroResponse["hero"]; cases: Case[]; clients: Client[] }) {
    if (!hero) {
        return <div>Failed to load Hero data.</div>;
    }

    console.log("Cases Passed to CaseSection: ", cases);

    return (
        <>
            <HeroSection
                titles={hero.headings.map((heading) => heading.Heading)}
                paragraph={hero.paragraph}
                wordCloudWords={hero.words}
                controls={hero.controls}
            />
            <SpinningStripe />
            <CaseSection cases={cases} />
            <SpinningStripe />
            <ClientSection clients={clients} />
            <ServicesSection />
            <CallToActionSection />
        </>
    );
}