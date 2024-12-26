import { GraphQLClient } from "graphql-request";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";
import GridLayout from "@/src/components/GridLayout";

interface Client {
    name: string;
    slug: string;
    shortDescription: string;
    logo: {
        url: string;
    };
}

interface ClientsResponse {
    clients: Client[];
}

export const getStaticProps: GetStaticProps<{ clients: Client[] }> = async ({ locale }) => {
    const endpoint = process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql";
    const client = new GraphQLClient(endpoint);

    const query = `
    query Clients($locale: I18NLocaleCode) {
      clients(locale: $locale) {
        name
        slug
        shortDescription
        logo {
          url
        }
      }
    }
  `;

    try {
        const response: ClientsResponse = await client.request(query, { locale: locale || "en" });
        return {
            props: {
                clients: response.clients,
            },
            revalidate: 10, // ISR
        };
    } catch (error) {
        console.error("Error fetching clients:", error);
        return {
            props: {
                clients: [],
            },
        };
    }
};

export default function PartnersPage({ clients }: InferGetStaticPropsType<typeof getStaticProps>) {
    const items = clients.map((client) => (
        <Link href={`/clients/${client.slug}`} key={client.slug} className={styles.clientCardLink}>
            <div className={styles.clientCard}>
                <div className={styles.logo}>
                    {client.logo && client.logo.url && <Image
                        src={`http://localhost:1337${client.logo.url}`}
                        alt={`${client.name} logo`}
                        width={100}
                        height={100}
                        className={styles.logoImage}
                    />}
                </div>
                <div className={styles.info}>
                    <h3 className={styles.title}>{client.name}</h3>
                    <p className={styles.description}>{client.shortDescription}</p>
                </div>
            </div>
        </Link>
    ));

    return (
        <section className={styles.layoutSection}>
            <div className={styles.container}>
                <GridLayout items={items} />
            </div>
        </section>
    );
}
