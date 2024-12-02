"use client";

import styles from "./CaseCard.module.scss";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation
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
    layoutDirection?: "ltr" | "rtl";
}

export default function CaseCard({
                                     id,
                                     header,
                                     paragraph,
                                     tags,
                                     buttonText,
                                     imageUrl,
                                     imageAlt,
                                     layoutDirection = "ltr",
                                 }: CaseCardProps) {
    return (
        <div
            className={`${styles.card} ${
                layoutDirection === "rtl" ? styles.rtl : styles.ltr
            }`}
        >
            <div className={styles.imageContainer}>
                <Image
                    src={imageUrl}
                    alt={imageAlt || header}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 300px"
                />
            </div>

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
                <Link href={`/cases/${id}`} passHref>
                    <Button size="medium">{buttonText}</Button>
                </Link>
            </div>
        </div>
    );
}
