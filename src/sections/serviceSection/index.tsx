import styles from "./styles.module.scss";
import ServicesSection from "@/src/components/ServicesSection";

export default function ServiceSection() {
    return (
        <section className={styles.lightSection}>
            <div className={styles.container}>
                <ServicesSection/>
            </div>
        </section>
    );
}