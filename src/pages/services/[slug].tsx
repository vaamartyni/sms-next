import { GetStaticPaths, GetStaticProps } from "next";
import { GraphQLClient } from "graphql-request";
import { useRouter } from "next/router";
import styles from "./slug.module.scss";
import MarkdownTypingEffect from "@/src/components/MarkdownTypingEffect";
import {Service} from "@/src/pages/services/index";
import ReactMarkdown from "react-markdown";
import RandomShape from "@/src/components/RandomShape";
import {Canvas} from "@react-three/fiber";

interface ServicePageProps {
    title: string;
    description: string;
    markdown: string;
    geometry?: { shape: string; id: string; color: string; };
    slug: string;
    documentId: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const endpoint = process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql";
    const client = new GraphQLClient(endpoint);

    const query = `
        query GetAllWords {
          services(pagination: { limit: -1 }) {
           slug
          }
        }
    `;

    const response: {services: Service[]} = await client.request(query);
    const paths = response.services.map((item: any) => ({
        params: { slug: item.slug },
    }));

    return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
    const endpoint = process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql";
    const client = new GraphQLClient(endpoint);

    const query = `
        query GetService($slug: String!, $locale: I18NLocaleCode) {
          services(filters: { slug: { eq: $slug } }, locale: $locale) {
                title
                description
                markdown
                geometry {
                        id
                        color
                        shape
                  }
                slug
                documentId
          }
        }
    `;

    const variables = { slug: params?.slug, locale: locale || "en" };

    try {
        const response: {services: Service[]} = await client.request(query, variables);
        const serviceData: Service = response.services[0];
        console.log(serviceData);
        if (!serviceData) {
            return { notFound: true };
        }

        return {
            props: {
                ...serviceData
            },
            revalidate: 10,
        };
    } catch (error) {
        console.error("Error fetching word data:", error);
        return { notFound: true };
    }
};

export default function WordPage({ title, geometry, markdown }: ServicePageProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    console.log(markdown)

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <h1>{title}</h1>
                    <Canvas>
                        <ambientLight intensity={0.5}/>
                        <directionalLight position={[2, 2, 2]}/>
                        <RandomShape geometry={geometry && `${geometry.shape}-${geometry.color}`}/>
                    </Canvas>
                </div>
                <div className={styles.right}>
                    <MarkdownTypingEffect markdown={markdown}/>
                </div>
            </div>
        </section>
    );
}