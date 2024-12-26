import styles from "./styles.module.scss";
import CaseCard from "@/src/components/CaseCard"; // Компонент карточки кейса
import { Case } from "@/src/types/case"; // Тип данных для кейса

interface CaseSectionProps {
    cases: Case[]; // Список кейсов
}

export default function CaseSection({ cases }: CaseSectionProps) {

    return (
        <section className={styles.layoutSection}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {cases.map((caseData) => (
                        <CaseCard key={caseData.documentId} {...caseData} />
                    ))}
                </div>
            </div>
        </section>
    );
}