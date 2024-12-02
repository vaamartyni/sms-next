"use client";

import { useParams } from "next/navigation";
import styles from "./CaseDetails.module.scss";
import {useTranslation} from "next-i18next";

export default function CaseDetails() {
    const { id } = useParams(); // Access the dynamic route parameter
    const { t } = useTranslation("common");
    const caseDataList = t("cases", { returnObjects: true }) as {    id: string;
        header: string;
        paragraph: string;
        tags: string[];
        buttonText: string;
        imageUrl: string;
        imageAlt?: string;
        available: boolean;}[];

    const caseData = Array.isArray(caseDataList) && caseDataList.find((item) => item.id === id); // Find case by ID

    if (!caseData) {
        return <p>Case not found.</p>;
    }

    return (
        <div className={styles.layoutSection}>
            <div className={styles.container}>
                <div className={styles.caseDetails}>
                    <h1>{caseData.header}</h1>
                    <p>{caseData.paragraph}</p>
                    <div>
                        <h3>Tags:</h3>
                        {caseData.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                        {tag}
                    </span>
                        ))}
                    </div>
                    <img src={caseData.imageUrl} alt={caseData.imageAlt}/>
                </div>
            </div>
        </div>
    );
}
