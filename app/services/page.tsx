"use client"
import styles from "./page.module.scss";
import {useTranslation} from "next-i18next";
import ServiceCard from "@/app/components/ServiceCard";

export default function ServicesPage() {

    const { t } = useTranslation("common");

    // Типизация данных
    const serviceData = t("services", { returnObjects: true }) as {
        title: string; description: string,
        list: { imageUrl: string; title: string; description: string, id: string }[];
    };


    return (
        <div className={styles.layoutSection}>
            <div className={styles.container}>
                <div className={styles.servicesGrid}>
                    {Array.isArray(serviceData.list) && serviceData.list.map((service, index) => (
                        <ServiceCard onReadMore={() => console.log(service.title)} key={index} {...service} />
                    ))}
                </div>
            </div>
        </div>
    );
}
