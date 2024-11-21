"use client";

import styles from "./ClientsCard.module.scss";
import Image from "next/image";
import Button from "@/app/components/Button";
import Grid3x3 from "@/app/components/Grid3x3";

interface ClientsCardProps {
    title: string;
    paragraph: string;
    buttonText: string;
    logos: { src: string; alt: string }[]; // Массив логотипов
}

export default function ClientsCard({
                                        title,
                                        paragraph,
                                        buttonText,
                                        logos,
                                    }: ClientsCardProps) {

    const gridItems = [
        { id: 1, title: "Item 1", description: "Description for item 1", path: "/logos/logo1.png" },
        { id: 2, title: "Item 2", description: "Description for item 2", path: "/logos/logo2.png" },
        { id: 3, title: "Item 3", description: "Description for item 3", path: "/logos/logo3.png" },
        { id: 4, title: "Item 4", description: "Description for item 4", path: "/logos/logo4.png" },
        { id: 5, title: "Item 5", description: "Description for item 5", path: "/logos/logo5.png" },
        { id: 6, title: "Item 6", description: "Description for item 6", path: "/logos/logo6.png" },
        { id: 7, title: "Item 7", description: "Description for item 7", path: "/logos/logo7.png" },
        { id: 8, title: "Item 8", description: "Description for item 8", path: "/logos/logo8.png" },
        { id: 9, title: "Item 9", description: "Description for item 9", path: "/logos/logo9.png" },
    ];

    return (
        <div className={styles.card}>
            {/* Левая сторона с заголовком и описанием */}
            <div className={styles.headerBlock}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.paragraph}>{paragraph}</p>
                <Button size="medium" onClick={() => {}}>
                    {buttonText}
                </Button>
            </div>
            {/* Правая сторона с логотипами */}
            <Grid3x3 items={gridItems} />
        </div>
    );
}
