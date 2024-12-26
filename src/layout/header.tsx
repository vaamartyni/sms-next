"use client";

import { useEffect, useState } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import NavLink from "@/src/components/NavLink";
import LanguageButton from "@/src/components/LanguageButton";
import ThemeButton from "@/src/components/ThemeButton";
import { useTranslation } from "@/src/hooks/useTranslation";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useTranslation();

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
        { href: "/", label: t?.header?.navLinks?.home || "Home" },
        { href: "/cases", label: t?.header?.navLinks?.cases || "Cases" },
        { href: "/services", label: t?.header?.navLinks?.services || "Services" },
        { href: "/clients", label: t?.header?.navLinks?.clients || "Clients" },
        { href: "/contacts", label: t?.header?.navLinks?.contacts || "Contacts" },
        { href: "/web-dev", label: t?.header?.navLinks?.dev || "Dev" },
    ];

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    {t?.header?.logo || "Smart Mir"}
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