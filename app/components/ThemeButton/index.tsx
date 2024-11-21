"use client";

import { useState, useEffect } from "react";
import styles from "./ThemeButton.module.scss";
import Image from "next/image";

export default function ThemeButton() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        // Set initial theme from localStorage or default to "light"
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
        document.documentElement.setAttribute("data-theme", storedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark-blue" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme); // Persist theme in localStorage
    };

    return (
        <button onClick={toggleTheme} className={styles.themeButton} aria-label="Toggle theme">
            {theme === "light" ? (
                <Image
                    src="/icons/moon-eclipse-svgrepo-com.svg"
                    alt="moon"
                    width={20}
                    height={20}
                    className={styles.globeIcon}
                />
            ) : (
                <Image
                    src="/icons/sun.svg"
                    alt="sun"
                    width={24}
                    height={24}
                    className={styles.globeIcon}
                />
            )}
        </button>
    );
}
