"use client";

import styles from "./CaseCard.module.scss";
import Image from "next/image";
import Button from "@/app/components/Button";

interface CaseCardProps {
    id: string;
    header: string;
    paragraph: string;
    tags: string[];
    buttonText: string;
    imageUrl: string;
    imageAlt?: string;
    available: boolean;
    layoutDirection?: "ltr" | "rtl"; // Layout direction: Left-to-Right or Right-to-Left
}

export default function CaseCard({
                                     header,
                                     paragraph,
                                     tags,
                                     buttonText,
                                     imageUrl,
                                     imageAlt,
                                     layoutDirection = "ltr", // Default layout is Left-to-Right
                                 }: CaseCardProps) {
    return (
        <div
            className={`${styles.card} ${
                layoutDirection === "rtl" ? styles.rtl : styles.ltr
            }`}
        >
            {/* Image Section */}
            <div className={styles.imageContainer}>
                <Image
                    src={imageUrl}
                    alt={imageAlt || header}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 300px"
                />
            </div>

            {/* Content Section */}
            <div className={styles.content}>
                <h2 className={styles.header}>{header}</h2>
                <p className={styles.paragraph}>{paragraph}</p>
                <div className={styles.tags}>
                    {tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
              {tag}
            </span>
                    ))}
                </div>
                <Button size="medium" onClick={() => {}}>
                    {buttonText}
                </Button>
            </div>
        </div>
    );
}
