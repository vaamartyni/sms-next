import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { GraphQLClient } from "graphql-request";
import ReactMarkdown from "react-markdown";
import styles from "./ClientDetails.module.scss";
import { useRouter } from "next/router";

// Define GraphQL queries
const GET_ALL_CLIENTS = `
    query GetAllClients($locale: I18NLocaleCode) {
        clients(locale: $locale) {
            slug
        }
    }
`;

const GET_CLIENT_BY_SLUG = `
    query GetClient($slug: String!, $locale: I18NLocaleCode) {
        clients(filters: { slug: { eq: $slug } }, locale: $locale) {
            name
            markdown
            logo {
                url
            }
            cases {
                slug
                title
                shortDescription
            }
            shortDescription
        }
    }
`;

// Define TypeScript interfaces for data
interface ClientCase {
    slug: string;
    title: string;
    shortDescription: string;
}

interface Client {
    name: string;
    markdown: string;
    logo: { url: string } | null;
    cases: ClientCase[];
    shortDescription: string;
}

interface ClientsResponse {
    clients: { slug: string }[];
}

interface ClientResponse {
    clients: Client[];
}

// Fetch paths for all client slugs
export const getStaticPaths: GetStaticPaths = async () => {
    const endpoint = process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql";
    const client = new GraphQLClient(endpoint);
    const locales = ["en", "ru"];
    const paths: { params: { slug: string }; locale: string }[] = [];

    try {
        for (const locale of locales) {
            const response: ClientsResponse = await client.request(GET_ALL_CLIENTS, { locale });
            response.clients.forEach((client) => {
                paths.push({ params: { slug: client.slug }, locale });
            });
        }
    } catch (error) {
        console.error("Error fetching client slugs:", error);
    }

    return {
        paths,
        fallback: "blocking", // Serve missing pages dynamically
    };
};

// Fetch data for a specific client
export const getStaticProps: GetStaticProps<{ clientData: Client }> = async ({ params, locale }) => {
    const endpoint = process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql";
    const client = new GraphQLClient(endpoint);

    try {
        const response: ClientResponse = await client.request(GET_CLIENT_BY_SLUG, {
            slug: params?.slug,
            locale: locale || "en",
        });

        const clientData = response.clients?.[0] || null;

        if (!clientData) {
            return { notFound: true };
        }

        return {
            props: {
                clientData,
            },
            revalidate: 10,
        };
    } catch (error) {
        console.error("Error fetching client data:", error);
        return { notFound: true };
    }
};

// Component for rendering client details
export default function ClientPage({ clientData }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();

    return (
        <div className={styles.layoutSection}>
            <div className={styles.container}>
                <div className={styles.caseDetails}>
                    <h1>{clientData.name}</h1>
                    {clientData.logo?.url && (
                        <img
                            src={`http://localhost:1337${clientData.logo.url}`}
                            alt={`${clientData.name} logo`}
                            className={styles.logo}
                        />
                    )}
                    <div className={styles.description}>
                        <p>{clientData.shortDescription}</p>
                        <ul className={styles.caseList}>
                            {clientData.cases.map((clientCase) => {
                                const localizedSlug =
                                    router.locale === "ru"
                                        ? `/cases/${clientCase.slug}`
                                        : `/en/cases/${clientCase.slug}`;
                                return (
                                    <li key={clientCase.slug} className={styles.caseCard}>
                                        <a href={localizedSlug} className={styles.caseLink}>
                                            <h3 className={styles.caseTitle}>{clientCase.title}</h3>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <ReactMarkdown className={styles.markdownContent}>
                        {clientData.markdown}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}