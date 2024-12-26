"use client";

import styles from "./styles.module.scss";
import GridLayout from "@/src/components/GridLayout";
import { Client } from "@/src/types/client";
import Link from "next/link";
import Image from "next/image";


export default function ClientSection({clients}:{clients: Client[]}) {
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
        <section className={styles.lightSection}>
            <div className={styles.container}>
                <GridLayout items={items} />
            </div>
        </section>
    );
}