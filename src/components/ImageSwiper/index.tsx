import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/scrollbar';
import styles from "./ImageSwiper.module.scss";

interface ImageData {
    url: string;
    documentId: string;
}

interface ImageSwiperProps {
    images: ImageData[];
}

export default function ImageSwiper({ images }: ImageSwiperProps) {
    if (!images || images.length === 0) {
        return <div className={styles.noImages}>No images available</div>;
    }

    return (
        <Swiper
            // direction="vertical"
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className={styles.mySwiper}
        >
            {images.map((image) => (
                <SwiperSlide key={image.documentId}>
                    <img src={image.url} alt={`Image ${image.documentId}`} className={styles.image} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}