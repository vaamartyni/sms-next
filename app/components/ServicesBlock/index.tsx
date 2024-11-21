"use client";

import styles from "./ServicesBlock.module.scss";
import Button from "@/app/components/Button";

interface Service {
    title: string;
    description: string;
}

interface ServicesBlockProps {
    services: Service[];
}

export default function ServicesBlock({ services }: ServicesBlockProps) {
    return (
        <section className={styles.block}>
            <div className={styles.container}>
                {/* Заголовок и описание */}
                <div className={styles.header}>
                    <h2 className={styles.title}>Services We Provide</h2>
                    <p className={styles.description}>
                        Explore the {services.length} exceptional services we offer to help
                        you thrive in a digital-first world.
                    </p>
                </div>

                {/* Список услуг */}
                <div className={styles.servicesGrid}>
                    {services.map((service, index) => (
                        <div key={index} className={styles.serviceCard}>
                            <h3 className={styles.serviceTitle}>{service.title}</h3>
                            <p className={styles.serviceDescription}>{service.description}</p>
                        </div>
                    ))}
                    <Button onClick={() => {}}>See More</Button>
                </div>
            </div>
        </section>
    );
}
