import styles from "./SpinningStripe.module.scss";

interface SpinningStripeProps {
    words?: string[]; // Массив слов для полоски
    direction?: "ltr" | "rtl"; // Массив слов для полоски
}

export default function SpinningStripe({ words = [
    "Artificial Intelligence",
    "Machine Learning",
    "Cloud Computing",
    "Data Science",
    "Blockchain",
    "Cybersecurity",
    "IoT",
    "Augmented Reality",
    "Virtual Reality",
    "DevOps",
    "Big Data",
    "5G Technology",
    "Quantum Computing",
    "Microservices",
    "Kubernetes",
    "Docker",
    "Agile",
    "Scrum",
    "Digital Transformation",
    "Edge Computing",
    "Full Stack",
    "Backend Development",
    "Frontend Development",
    "API Integration",
    "Mobile Development",
    "Web Development",
    "Game Development",
    "IT Infrastructure",
    "Network Administration",
    "IT Consulting",
    "Software Engineering",
    "Quality Assurance",
    "Testing Automation",
    "Continuous Integration",
    "Continuous Deployment",
    "Serverless Computing",
    "Open Source",
    "Tech Support",
    "Database Management",
    "SQL",
    "NoSQL",
    "Business Intelligence",
    "Computer Vision",
    "Natural Language Processing",
    "Augmented Analytics",
    "Predictive Analytics",
    "IT Strategy",
    "Cloud Migration",
    "Security Audits",
    "SaaS",
    "PaaS",
    "IaaS"
] , direction = "rtl"}: SpinningStripeProps) {
    return (
        <div className={styles.stripe}>
            <div className={`${styles.words} ${direction === 'rtl' ? styles.rtl : styles.ltr}`}>
                {words.map((word, index) => (
                    <span key={index} className={styles.word}>
            {word}
          </span>
                ))}
            </div>
        </div>
    );
}
