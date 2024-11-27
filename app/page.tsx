"use client"
import { useTranslation } from "next-i18next";
import styles from "./page.module.scss";
import Section from "@/app/components/Section";
import CaseCard from "@/app/components/CaseCard";
import SpinningStripe from "@/app/components/SpinningStripe";
import ClientsCard from "@/app/components/ClientsCard";
import GridPage from "@/app/grid";
import ServicesSection from "@/app/components/ServicesSection";

export default function HomePage() {
    const { t } = useTranslation("common");

    // Получаем массив объектов из перевода
    const caseDataList = t("cases", { returnObjects: true }) as {    id: string;
        header: string;
        paragraph: string;
        tags: string[];
        buttonText: string;
        imageUrl: string;
        imageAlt?: string;
        available: boolean;}[];

    return (
        <>
            <Section />
            <SpinningStripe/>
            <section className={styles.layoutSection}>
                <div className={styles.container}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)", // Две колонки одинаковой ширины
                        gap: "100px", // Расстояние между карточками
                        justifyContent: "center", // Выравнивание по центру
                        alignItems: "start" // Выравнивание карточек по верхнему краю
                    }}>
                        {Array.isArray(caseDataList) && caseDataList
                            .filter((caseData) => caseData.available) // Только доступные кейсы
                            .map((caseData) => (
                                <CaseCard key={caseData.id} {...caseData} />
                            ))}
                    </div>
                </div>
            </section>
            <SpinningStripe/>
            <section className={styles.lightSection}>
                <div className={styles.container}>
                <ClientsCard />
                </div>
            </section>
            <section className={styles.lightSection}>
                <div className={styles.container}>
                    <ServicesSection />
                </div>
            </section>
            <div style={{position: "relative", height: 'var(--section-full-height)'}}>
                <GridPage />
            </div>
        </>
    );
}
