// app/layout/footer.tsx
import styles from "./footer.module.scss";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>© 2024 Ваш проект. Все права защищены.</p>
            </div>
        </footer>
    );
}
