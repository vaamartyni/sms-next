import { GetStaticProps, InferGetStaticPropsType } from "next";
import { GraphQLClient } from "graphql-request";
import styles from "./page.module.scss";
import ServiceCard from "@/src/components/ServiceCard";
import { useRouter } from "next/router";

// Define the Service interface
export interface Service {
    title: string;
    description: string;
    markdown: string;
    geometry: {
        shape: string;
        id: string;
        color: string;
    };
    slug: string;
    documentId: string;
}

// GraphQL response type
interface GetServicesResponse {
    services: Service[];
}

// getStaticProps function
export const getStaticProps: GetStaticProps<{ services: Service[] }> = async ({ locale }) => {
    const endpoint = process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql";
    const client = new GraphQLClient(endpoint);

    const query = `
        query GetServices($locale: I18NLocaleCode) {
            services(locale: $locale) {
                title
                locale
                description
                markdown
                slug
                documentId
                geometry {
                    id
                    color
                    shape
                }
            }
        }
    `;

    try {
        // Fetch services from GraphQL API
        const data = await client.request<GetServicesResponse>(query, { locale: locale || "en" });

        return {
            props: {
                services: data.services || [], // Ensure services is an array
            },
            revalidate: 10, // Incremental Static Regeneration (ISR)
        };
    } catch (error) {
        console.error("Error fetching services:", error);
        return {
            props: {
                services: [], // Fallback to an empty array in case of an error
            },
        };
    }
};

// Main Component
export default function ServicesPage({ services }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();

    return (
        <div className={styles.layoutSection}>
            <div className={styles.container}>
                <div className={styles.servicesGrid}>
                    {services.map((service) => {
                        // Generate localized slugs for navigation
                        const localizedSlug = router.locale === "ru"
                            ? `/services/${service.slug}`
                            : `/en/services/${service.slug}`;

                        return (
                            <ServiceCard
                                key={service.documentId}
                                title={service.title}
                                description={service.description}
                                geometry={service.geometry}
                                slug={localizedSlug}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}