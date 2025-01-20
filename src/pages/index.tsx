import Head from "next/head";
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
    const endpoint = `${process.env.API_CONTAINER_URL || "http://strapi:1337"}/graphql`;
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
        locale: locale || "en",
        pagination: { limit: 100 },
    };

    try {
        const response = await client.request<HeroResponse>(query, variables);
        return {
            props: {
                hero: response.hero,
                cases: response.cases,
                clients: response.clients,
            },
            revalidate: 10,
        };
    } catch (error) {
        console.error("Error fetching Hero data:", error);
        return {
            props: {
                hero: null,
                cases: [],
            },
        };
    }
};

export default function HomePage({ hero, cases, clients }: { hero: HeroResponse["hero"]; cases: Case[]; clients: Client[] }) {
    if (!hero) {
        return <div>Failed to load Hero data.</div>;
    }

    const pageTitle = hero.headings[0]?.Heading || "Homepage";
    const pageDescription = hero.paragraph || "Welcome to our homepage.";
    const pageImage = hero.controls[0]?.url || "/default-og-image.jpg"; // Fallback image URL

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={pageImage} />
                <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"} />
                <meta property="og:type" content="website" />
                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageImage} />
            </Head>
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
