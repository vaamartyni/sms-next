"use client"
import Image from "next/image";
import styles from "./LanguageButton.module.scss";
import { useTranslation } from "next-i18next";

export default function LanguageButton() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "ru" : "en";
        i18n.changeLanguage(newLang); // Update language
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
            <span className={styles.languageLabel}>{i18n.language.toUpperCase()}</span>
        </button>
    );
}
