"use client";

import { useEffect, useState } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import NavLink from "@/app/components/NavLink";
import LanguageButton from "@/app/components/LanguageButton";
import ThemeButton from "@/app/components/ThemeButton";
import { useTranslation } from "next-i18next";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useTranslation("common");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // Trigger glass effect after 50px scroll
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navLinks = [
        { href: "/", label: t("header.navLinks.home") },
        { href: "/cases", label: t("header.navLinks.cases") },
        { href: "/services", label: t("header.navLinks.services") },
        { href: "/clients", label: t("header.navLinks.clients") },
        { href: "/contacts", label: t("header.navLinks.contacts") },
    ];

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    {t("header.logo")}
                </Link>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {navLinks.map((link) => (
                            <NavLink key={link.href} href={link.href} label={link.label} />
                        ))}
                    </ul>
                </nav>
                <div className={styles.controls}>
                    <ThemeButton />
                    <LanguageButton />
                </div>
            </div>
        </header>
    );
}
