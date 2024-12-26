import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./MarkdownTypingEffect.module.scss";

interface TypingEffectProps {
    markdown?: string;
}

export default function MarkdownTypingEffect({ markdown }: TypingEffectProps) {
    const [typedContent, setTypedContent] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let content = "";
        let index = 0;

        // Define the typing animation
        const typeText = () => {
            if (markdown){
                if (index < markdown.length) {
                    content += markdown[index];
                    setTypedContent(content);
                    index++;
                    setTimeout(typeText, 30); // Typing speed
                } else {
                    setIsAnimating(false); // Animation complete
                }
            }
        };

        setIsAnimating(true);
        typeText(); // Start the typing effect
    }, [markdown]);

    if (!markdown){
        return <ReactMarkdown className={styles.markdownContent}>{'# ☉ ‿ ⚆'}</ReactMarkdown>
    }
    return (
        <div className={styles.typingEffect}>
            {isAnimating ? (
                <ReactMarkdown className={styles.markdownContent}>{typedContent}</ReactMarkdown>
            ) : (
                <ReactMarkdown className={styles.markdownContent}>{markdown}</ReactMarkdown>
            )}
        </div>
    );
}