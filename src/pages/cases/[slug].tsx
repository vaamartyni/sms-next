import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { GraphQLClient } from "graphql-request";
import ReactMarkdown from "react-markdown";
import styles from "@/src/pages/cases/CaseDetails.module.scss";
import { Case } from "@/src/types/case";

// GraphQL query to get case by slug
const GET_CASE_BY_SLUG = `
    query GetCaseBySlug($slug: String!, $locale: I18NLocaleCode) {
        cases(filters: { slug: { eq: $slug } }, locale: $locale) {
            slug
            documentId
            title
            shortDescription
            fullDescription
            markdown
            gallery {
                url
                documentId
            }
            mainImage {
                url
            }
            tags {
                name
            }
        }
    }
`;

// GraphQL query to get all slugs
const GET_ALL_SLUGS = `
    query GetAllSlugs($locale: I18NLocaleCode) {
        cases(locale: $locale) {
            slug
        }
    }
`;

// Fetch specific case by slug via `getStaticProps`
export const getStaticProps: GetStaticProps<{ caseData: Case }> = async ({ params, locale }) => {
    const endpoint = process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql";
    const client = new GraphQLClient(endpoint);

    try {
        const response = await client.request<{ cases: Case[] }>(GET_CASE_BY_SLUG, {
            slug: params?.slug,
            locale: locale || "en",
        });

        const caseData = response.cases?.[0] || null;

        if (!caseData) {
            return { notFound: true };
        }

        return {
            props: { caseData },
            revalidate: 10, // ISR: Update data every 10 seconds
        };
    } catch (error) {
        console.error("Error fetching case:", error);
        return { notFound: true };
    }
};

// Generate paths for all slugs via `getStaticPaths`
export const getStaticPaths: GetStaticPaths = async () => {
    const endpoint = process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql";
    const client = new GraphQLClient(endpoint);
    const locales = ["en", "ru"]; // Available locales
    const paths: { params: { slug: string }; locale: string }[] = [];

    try {
        for (const locale of locales) {
            const response = await client.request<{ cases: { slug: string }[] }>(GET_ALL_SLUGS, { locale });

            response.cases.forEach((caseItem) => {
                paths.push({
                    params: { slug: caseItem.slug },
                    locale,
                });
            });
        }

        return {
            paths,
            fallback: "blocking", // Serve pages dynamically if not pre-rendered
        };
    } catch (error) {
        console.error("Error fetching slugs:", error);
        return { paths: [], fallback: "blocking" };
    }
};

// Case details page component
export default function CaseDetailsPage({ caseData }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div className={styles.layoutSection}>
            <div className={styles.container}>
                <div className={styles.caseDetails}>
                    <h1>{caseData.title}</h1>
                    <div className={styles.description}>
                        <p>{caseData.shortDescription}</p>
                        <div className={styles.tags}>
                            {caseData.tags.map((tag) => (
                                <span key={tag.name} className={styles.tag}>
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    {caseData.mainImage?.url && (
                        <img
                            src={`http://localhost:1337${caseData.mainImage.url}`}
                            alt={caseData.title}
                            className={styles.mainImage}
                        />
                    )}
                    <ReactMarkdown className={styles.markdownContent}>{caseData.markdown}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}