"use client";

import styles from "./ServicesSection.module.scss";
import ServiceCard from "@/app/components/ServiceCard";
import { useTranslation } from "next-i18next";

export default function ServicesSection() {
    const { t } = useTranslation("common");

    // Типизация данных
    const serviceData = t("services", { returnObjects: true }) as {
        title: string; description: string,
        list: { imageUrl: string; title: string; description: string }[];
    };

    return (
        <section className={styles.servicesSection}>
            <h2 className={styles.sectionHeader}>{serviceData.title}</h2>
            <p className={styles.sectionDescription}>
                {serviceData.description}
            </p>
            <div className={styles.servicesGrid}>
                {Array.isArray(serviceData.list) && serviceData.list.map((service, index) => (
                    <ServiceCard onReadMore={() => console.log(service.title)} key={index} {...service} />
                ))}
            </div>
        </section>
    );
}
