import styles from './page.module.scss';
import Image from "next/image";
import GridWhatWeOffer from "@/app/components/GridWhatWeOffer";

interface HeroProps {
    imageUrl: string;
    title: string;
    subtitle: string;
}

interface SectionProps {
    title: string;
    content?: string;
    gridItems?: Array<{
        id: string;
        imageUrl: string;
        title: string;
        description: string;
    }>;
    items?: Array<{
        title: string;
        description: string;
    }>;
}

interface PageTemplateProps {
    hero: HeroProps;
    sections: SectionProps[];
}

export default function PageTemplate({ hero, sections }: PageTemplateProps) {
    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.container}>
                    <Image
                        src={hero.imageUrl}
                        alt="Hero Image"
                        width={200}
                        height={200}
                        className={styles.globeIcon}
                    />
                    <h1 className={styles.title}>{hero.title}</h1>
                    <p className={styles.subtitle}>{hero.subtitle}</p>
                </div>
            </section>

            {/* Dynamic Sections */}
            {sections.map((section, index) => (
                <section key={index} className={styles.genericSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>{section.title}</h2>
                        {section.content && <p className={styles.text}>{section.content}</p>}
                        {section.gridItems && (
                            <GridWhatWeOffer items={section.gridItems} />
                        )}
                        {section.items && (
                            <div className={styles.typesGrid}>
                                {section.items.map((item, i) => (
                                    <div key={i} className={styles.typeCard}>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                        <button className={styles.backButton}>Подробнее</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            ))}
        </div>
    );
}
