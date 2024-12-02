"use client"
import styles from "./page.module.scss";
import {useTranslation} from "next-i18next";
import GridLayout from "@/app/components/GridLayout";

export default function PartnersPage() {
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
        <section className={styles.layoutSection}>
            <div className={styles.container}>
                <GridLayout items={Array.isArray(clientsData.list) ? clientsData.list : []}/>
            </div>
        </section>
    );
}
