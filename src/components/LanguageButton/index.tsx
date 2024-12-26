import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./LanguageButton.module.scss";

export default function LanguageButton() {
    const router = useRouter();
    const { locale } = router;

    const toggleLanguage = () => {
        // Определяем новый язык
        const newLocale = locale === "en" ? "ru" : "en";

        // Переходим на главную страницу с новой локалью
        router.push("/", "/", { locale: newLocale });
    };

    return (
        <button onClick={toggleLanguage} className={styles.languageButton}>
            <Image
                src={"/icons/globe.svg"}
                alt="globe"
                width={24}
                height={24}
                priority
                className={styles.globeIcon}
            />
            <span className={styles.languageLabel}>{locale?.toUpperCase()}</span>
        </button>
    );
}