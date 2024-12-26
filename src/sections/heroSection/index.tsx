import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import WordCloud from "@/src/components/WordCloud";
import Button from "@/src/components/Button";
import { useRouter } from "next/router";

// Типизация данных, получаемых из CMS
interface HeroSectionProps {
    titles: string[]; // Заголовки для анимации
    controls: {
        id: string,
        title: string,
        url: string,
        type: "internal" | "external"
    }[];
    paragraph: string; // Описание
    wordCloudWords: {slug: string;
        locale: string;
        word: string;}[]; // Слова для WordCloud
}

export default function HeroSection({
                                        titles,
                                        paragraph,
                                        wordCloudWords,
                                        controls
                                    }: HeroSectionProps) {
    // Состояния для анимации заголовка
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [speed] = useState(50);
    const router = useRouter();
    useEffect(() => {
        const handleTyping = () => {
            const currentTitle = titles[currentIndex] || "";

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
    console.log(wordCloudWords)
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        <span className={styles.dynamicText}>{text}</span>
                    </h1>
                    <p className={styles.paragraph}>
                        {paragraph}
                    </p>
                    <>
                        {controls?.map((control) => {
                            const handleClick = () => {
                                if (control.type === "external") {
                                    // Для внешней ссылки открываем в новом окне
                                    window.open(control.url, "_blank");
                                } else if (control.type === "internal") {
                                    // Для внутренней ссылки переходим по указанному пути
                                    router.push(control.url);
                                }
                                // openModal(<Modal />);
                            };

                            return (
                                <Button
                                    key={control.id}
                                    onClick={handleClick}
                                    variant="primary"
                                    size="large"
                                >
                                    {control.title}
                                </Button>
                            );
                        })}
                    </>
                </div>
                <div className={styles.wordCloud}>
                    <WordCloud words={wordCloudWords} />
                </div>
            </div>
        </section>
    );
}