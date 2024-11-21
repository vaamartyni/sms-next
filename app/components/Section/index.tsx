"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./section.module.scss";
import WordCloud from "@/app/components/WordCloud";
import { useModal } from "@/app/components/modal/modalContext";
import Button from "@/app/components/Button";

export default function Section() {
    const { openModal } = useModal();
    const { t } = useTranslation("common");
    console.log( t("section.titles", { returnObjects: true }))

    // Заголовки для ротации
    const titles = t("section.titles", { returnObjects: true }) as string[];

    // Абзацы и текст кнопки
    const paragraphs = t("section.paragraphs", { returnObjects: true }) as string[];
    const buttonText = t("section.button");

    // Состояния для анимации печати
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [speed] = useState(50);

    useEffect(() => {
        const handleTyping = () => {
            const currentTitle = titles[currentIndex];

            if (!isDeleting) {
                const newText = currentTitle.slice(0, text.length + 1);
                setText(newText);

                if (newText === currentTitle) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                const newText = currentTitle.slice(0, text.length - 1);
                setText(newText);
                if (newText === "") {
                    setIsDeleting(false);
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
                }
            }
        };

        const typingSpeed = isDeleting ? 50 : speed;
        const timeoutId = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timeoutId);
    }, [text, isDeleting, currentIndex, titles, speed]);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.wordCloud}>
                    <WordCloud />
                </div>

                <div className={styles.content}>
                    <h1 className={styles.title}>
                        <span className={styles.dynamicText}>{text}</span>
                    </h1>
                    {Array.isArray(paragraphs) && // Проверяем, что paragraphs — это массив
                        paragraphs.map((paragraph, index) => (
                            <p key={index} className={styles.paragraph}>
                                {paragraph}
                            </p>
                        ))}
                    <Button onClick={openModal} variant={"primary"} size="large">
                        {buttonText}
                    </Button>
                </div>
            </div>
        </section>
    );
}
