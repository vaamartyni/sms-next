import { GetStaticProps, InferGetStaticPropsType } from "next";
import styles from "./page.module.scss";
import { GraphQLClient } from "graphql-request";
import CaseCard from "@/src/components/CaseCard";
import { GET_CASES } from "@/src/lib/queries";
import {Case} from "@/src/types/case";

// Props for the page
interface CasesPageProps {
    caseDataList: Case[];
}

export const getStaticProps: GetStaticProps<CasesPageProps> = async ({ locale }) => {
    const endpoint = process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql";
    const client = new GraphQLClient(endpoint);

    try {
        const response = await client.request<{ cases: Case[] }>(GET_CASES, { locale: locale || "ru" });

        return {
            props: { caseDataList: response.cases || [] },
            revalidate: 10, // ISR: rebuild every 10 seconds
        };
    } catch (error) {
        console.error("Error fetching cases:", error);
        return {
            props: { caseDataList: [] }, // Provide an empty array as a fallback
        };
    }
};

export default function CasesPage({ caseDataList }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div className={styles.layoutSection}>
            <section className={styles.container}>
                <div className={styles.grid}>
                    {caseDataList.map((caseData) => (
                        <CaseCard key={caseData.documentId} {...caseData} />
                    ))}
                </div>
            </section>
        </div>
    );
}