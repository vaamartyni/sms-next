import { useState, useEffect } from "react";

export function useTypingEffect(
    texts: string[],
    { speed = 100, delay = 2000 }: { speed?: number; delay?: number }
): string {
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleTyping = () => {
            const text = texts[currentIndex];
            if (isDeleting) {
                setCurrentText((prev) => text.slice(0, prev.length - 1));
                if (currentText === "") {
                    setIsDeleting(false);
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
                }
            } else {
                setCurrentText((prev) => text.slice(0, prev.length + 1));
                if (currentText === text) {
                    setTimeout(() => setIsDeleting(true), delay);
                }
            }
        };

        const timer = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentIndex, texts, speed, delay]);

    return currentText;
}