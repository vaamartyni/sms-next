import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { GraphQLClient } from "graphql-request";
import { useRouter } from "next/router";
import styles from "./slug.module.scss";
import MarkdownTypingEffect from "@/src/components/MarkdownTypingEffect";

// Define the shape of the GraphQL response
interface Word {
    slug: string;
    word: string;
    description: Array<{
        type: string;
        children: Array<{
            type: string;
            text: string;
        }>;
    }>;
    markdown: string;
}

// Define the structure of the props
interface WordPageProps {
    word: string;
    description: Word["description"];
    markdown: string;
}

// Fetch all slugs for static paths
export const getStaticPaths: GetStaticPaths = async () => {
    const endpoint = `${process.env.API_CONTAINER_URL || "http://strapi:1337"}/graphql`;
    const client = new GraphQLClient(endpoint);

    const query = `
        query GetAllWords {
          words(pagination: { limit: -1 }) {
            slug
          }
        }
    `;

    try {
        const response = await client.request<{ words: Pick<Word, "slug">[] }>(query);

        const paths = response.words.map((item) => ({
            params: { slug: item.slug },
        }));

        return { paths, fallback: "blocking" };
    } catch (error) {
        console.error("Error fetching word slugs:", error);
        return { paths: [], fallback: "blocking" }; // Handle errors gracefully
    }
};

// Fetch individual word data for static props
export const getStaticProps: GetStaticProps<WordPageProps> = async ({ params, locale }) => {
    const endpoint = `${process.env.API_CONTAINER_URL || "http://strapi:1337"}/graphql`;
    const client = new GraphQLClient(endpoint);

    const query = `
        query GetWord($slug: String!, $locale: I18NLocaleCode) {
          words(filters: { slug: { eq: $slug } }, locale: $locale) {
            word
            description
            markdown
          }
        }
    `;

    const variables = { slug: params?.slug, locale: locale || "en" };

    try {
        const response = await client.request<{ words: Word[] }>(query, variables);
        const wordData = response.words[0];

        if (!wordData) {
            return { notFound: true }; // Return 404 if no data is found
        }

        return {
            props: {
                word: wordData.word,
                description: wordData.description,
                markdown: wordData.markdown,
            },
            revalidate: 10, // ISR: Regenerate page every 10 seconds
        };
    } catch (error) {
        console.error("Error fetching word data:", error);
        return { notFound: true }; // Return 404 if there's an error
    }
};

// WordPage Component
export default function WordPage({ word, markdown }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>; // Fallback for static generation
    }

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <h1>{word}</h1>
                </div>
                <div className={styles.right}>
                    <MarkdownTypingEffect markdown={markdown} />
                </div>
            </div>
        </section>
    );
}