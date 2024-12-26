"use client";

import { useEffect, useState } from "react";
import styles from "./HeroWithCarousel.module.scss";

interface Image {
    url: string;
    alt: string;
}

const SLIDE_DURATION = 3000; // 3 seconds per slide

export default function HeroWithCarousel({images}: {images: Image[]}) {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        let progressInterval: NodeJS.Timeout;
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
            setProgress(0); // Reset progress bar for the new slide
        }, SLIDE_DURATION);

        // Progress bar increment logic
        progressInterval = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 100 : prevProgress + 100 / (SLIDE_DURATION / 100)
            );
        }, 100);

        return () => {
            clearInterval(slideInterval);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <div className={styles.heroContainer}>
            <div className={styles.carousel}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`${styles.slide} ${
                            index === currentSlide ? styles.active : ""
                        }`}
                        style={{ backgroundImage: `url(${image.url})` }}
                    >
                        <span className={styles.visuallyHidden}>{image.alt}</span>
                    </div>
                ))}
                <div className={styles.progressBars}>
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={styles.progressBar}
                            style={{
                                width: `${
                                    index === currentSlide ? progress : index < currentSlide ? 100 : 0
                                }%`,
                            }}
                        />
                    ))}
                </div>
            </div>
            <h1 className={styles.title}>Hero Section with Stories</h1>
        </div>
    );
}