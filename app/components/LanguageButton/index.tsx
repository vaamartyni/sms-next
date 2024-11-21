"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./LanguageButton.module.scss";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";

export default function LanguageButton() {
    const { i18n } = useTranslation();
    const router = useRouter();
    const [theme, setTheme] = useState("light");

    const storedTheme = localStorage.getItem("theme") || "light";

    useEffect(() => {
        // Set initial theme from localStorage or default to "light"
        setTheme(storedTheme);

        const themeChangeListener = () => {
            const currentTheme = localStorage.getItem("theme") || "light";
            setTheme(currentTheme);
        };

        window.addEventListener("storage", themeChangeListener); // Listen for theme changes
        return () => window.removeEventListener("storage", themeChangeListener);
    }, [storedTheme]);

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "ru" : "en";
        i18n.changeLanguage(newLang); // Update language
        router.refresh(); // Refresh the page to apply translations
    };

    const globeIcon = "/icons/globe.svg";

    return (
        <button onClick={toggleLanguage} className={styles.languageButton}>
            <Image
                src={globeIcon}
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
