"use client";

import { useParams } from "next/navigation";
import { useTranslation } from "next-i18next";
import styles from "./ServiceDetails.module.scss";
import RandomShape from "@/app/components/RandomShape";
import {Canvas} from "@react-three/fiber";

export default function ServiceDetails() {
    const { id } = useParams(); // Access dynamic route parameter
    const { t } = useTranslation("common");

    // Fetch service data from i18n translations
    const serviceData = t("services.list", { returnObjects: true }) as {
        id: string;
        title: string;
        description: string;
        imageUrl: string;
    }[];

    const service = serviceData.find((item) => item.id === id);

    if (!service) {
        return <p>Service not found.</p>;
    }

    return (
        <div className={styles.layoutSection}>
            <div className={styles.container}>
                <div className={styles.mainCard}>
                    <div className={styles.canvasContainer}>
                        <Canvas>
                            <ambientLight intensity={0.5}/>
                            <directionalLight position={[2, 2, 2]}/>
                            <RandomShape/>
                        </Canvas>
                    </div>
                    <div className={styles.serviceDetails}>
                        <h1 className={styles.title}>{service.title}</h1>
                        <p className={styles.description}>{service.description}</p>
                    </div>
                </div>
                <div className={styles.serviceDetails}>
                    <h1 className={styles.title}>{service.title}</h1>
                    <p className={styles.description}>{service.description}</p>
                </div>
            </div>
        </div>)
};
