// app/words/page.tsx
import WordCloud from "@/app/components/WordCloud";
import styles from "./words.module.scss"; // Import the styles for WordsPage

export default function WordsPage() {
    return (
        <section className={styles.wordsSection}>
            <WordCloud />
        </section>
    );
}
