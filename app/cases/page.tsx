"use client"
import styles from "./page.module.scss";
import CaseCard from "@/app/components/CaseCard";
import {useTranslation} from "next-i18next";

export default function CasesPage() {

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
        <div className={styles.layoutSection}>
            <section className={styles.container}>
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
        </div>
    );
}
