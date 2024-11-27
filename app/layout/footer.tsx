import styles from "./footer.module.scss";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.leftSection}>
                    <p>© 2024 Smart Mir Services. Все права защищены.</p>
                </div>
                <div className={styles.rightSection}>
                    <Link href="mailto:info@smartmir.com" className={styles.link}>
                        Email
                    </Link>
                    <Link href="https://wa.me/1234567890" className={styles.link} target="_blank" rel="noopener noreferrer">
                        WhatsApp
                    </Link>
                    <Link href="https://t.me/smartmir" className={styles.link} target="_blank" rel="noopener noreferrer">
                        Telegram
                    </Link>
                </div>
            </div>
        </footer>
    );
}
