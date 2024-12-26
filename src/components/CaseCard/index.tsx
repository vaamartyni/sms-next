"use client";

import styles from "./CaseCard.module.scss";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation
import Button from "@/src/components/Button";
import {Case} from "@/src/types/case";

export default function CaseCard(props: Case) {
    return (
        <div
            className={`${styles.card} rtl`}
        >
            <div className={styles.imageContainer}>
                <Image
                    src={`http://localhost:1337${props.mainImage.url}`}
                    alt={props.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 300px"
                />
            </div>

            <div className={styles.content}>
                <h2 className={styles.header}>{props.title}</h2>
                <p className={styles.paragraph}>{props.shortDescription}</p>
                <div className={styles.tags}>
                    {props.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                            {tag.name}
                        </span>
                    ))}
                </div>
                <Link href={`/cases/${props.slug}`} passHref>
                    <Button size="medium">{"learn more"}</Button>
                </Link>
            </div>
        </div>
    );
}
