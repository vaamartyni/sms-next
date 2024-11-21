// app/projects/page.tsx
import styles from "./page.module.scss";
import WordCloud from "@/app/components/WordCloud";

export default function ProjectsPage() {
    return (
        <section className={styles.projectsSection}>
            <div className={styles.container}>
                <h1>Наши проекты</h1>
                <p>Здесь будет список проектов, ограниченный рабочей областью.</p>
            </div>
            <WordCloud />
        </section>
    );
}
