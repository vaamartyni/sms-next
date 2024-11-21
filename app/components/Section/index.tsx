// app/components/Section.tsx
import styles from "./section.module.scss";

export default function Section() {
    return (
        <section className={styles.section}>
            {/* Облако слов */}
            <div className={styles.wordCloud}>
                <p>Инновации</p>
                <p>Технологии</p>
                <p>Дизайн</p>
                <p>Разработка</p>
                <p>Эффективность</p>
                <p>Рост</p>
                <p>Мобильность</p>
            </div>

            {/* Разделительная линия */}
            <div className={styles.divider}></div>

            {/* Контент справа */}
            <div className={styles.content}>
                <h1 className={styles.title}>От идей до мощных цифровых решений</h1>
                <p className={styles.paragraph}>
                    Мы помогаем компаниям воплощать их идеи в реальность, создавая уникальные цифровые продукты.
                </p>
                <p className={styles.paragraph}>
                    Наша команда экспертов разработает решения, которые поднимут ваш бизнес на новый уровень.
                </p>
                <button className={styles.button}>Начать проект</button>
            </div>
        </section>
    );
}
