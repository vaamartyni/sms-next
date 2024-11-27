"use client";

import styles from "./ClientsCard.module.scss";
import Button from "@/app/components/Button";
import GridLayout from "@/app/components/GridLayout";
import {useTranslation} from "next-i18next";

export default function ClientsCard() {
    const { t } = useTranslation("common");

    const clientsData = t("clients", { returnObjects: true }) as {
        title: string;
        description: string;
        buttonText: string;
        list: {
            id: string
            imageUrl: string
            title: string
            description: string
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.headerBlock}>
                <h2 className={styles.title}>{clientsData.title}</h2>
                <p className={styles.paragraph}>{clientsData.description}</p>
            </div>
            <GridLayout items={Array.isArray(clientsData.list) ? clientsData.list : []} />
            <Button size="medium" onClick={() => {}}>
                {clientsData.buttonText}
            </Button>
        </div>
    );
}
