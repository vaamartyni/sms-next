// app/page.tsx
"use client"
import { useTranslation } from "react-i18next";
import styles from "./page.module.scss";
import Section from "@/app/components/Section";
import CaseCard from "@/app/components/CaseCard";
import Button from "@/app/components/Button";
import SpinningStripe from "@/app/components/SpinningStripe";
import ClientsCard from "@/app/components/ClientsCard";
import ServicesBlock from "@/app/components/ServicesBlock";

export default function HomePage() {
    const { t } = useTranslation("common");
    const caseData = {
        header: "Innovative AI Solutions",
        paragraph:
            "Discover how our AI-powered tools transformed the business process and enhanced productivity by 35%. Discover how our AI-powered tools transformed the business process and enhanced productivity by 35%. Discover how our AI-powered tools transformed the business process and enhanced productivity by 35%.",
        tags: ["AI", "Development", "Business"],
        buttonText: "See Details",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJxJTfS2oOCt7hOsSOOM1V_mIFj5i8Nj_5iA&s",
        imageAlt: "AI Solutions Image", // Альтернативный текст
    };
    const logos = [
        { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJxJTfS2oOCt7hOsSOOM1V_mIFj5i8Nj_5iA&s", alt: "Client 1" },
        { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJxJTfS2oOCt7hOsSOOM1V_mIFj5i8Nj_5iA&s", alt: "Client 2" },
        { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJxJTfS2oOCt7hOsSOOM1V_mIFj5i8Nj_5iA&s", alt: "Client 3" },
        { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJxJTfS2oOCt7hOsSOOM1V_mIFj5i8Nj_5iA&s", alt: "Client 4" },
        { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJxJTfS2oOCt7hOsSOOM1V_mIFj5i8Nj_5iA&s", alt: "Client 5" },
    ];

    const services = [
        { title: "Web Development", description: "Creating responsive, user-friendly websites." },
        { title: "Mobile Apps", description: "Innovative mobile solutions for iOS and Android." },
        { title: "Cloud Computing", description: "Secure and scalable cloud infrastructure." },
        // { title: "AI Integration", description: "Leveraging AI to transform your business processes." },
        // { title: "Cybersecurity", description: "Ensuring robust protection against digital threats." },
        // { title: "Data Analytics", description: "Unlocking actionable insights from your data." },
        // { title: "UI/UX Design", description: "Crafting intuitive and aesthetically pleasing user interfaces." },
        // { title: "Blockchain Development", description: "Building secure and transparent blockchain solutions." },
        // { title: "E-Commerce Solutions", description: "Creating robust and scalable online stores." },
        // { title: "Digital Marketing", description: "Enhancing your online presence with tailored strategies." },
        // { title: "Machine Learning", description: "Developing predictive models and intelligent systems." },
        // { title: "DevOps Services", description: "Streamlining development with efficient CI/CD pipelines." },
        // { title: "IoT Solutions", description: "Connecting devices to create smarter ecosystems." },
        // { title: "Content Management Systems", description: "Building flexible and user-friendly CMS platforms." },
        // { title: "Quality Assurance", description: "Ensuring flawless performance through rigorous testing." },
        // { title: "IT Consulting", description: "Providing expert advice for your technology strategies." },
        // { title: "Network Administration", description: "Managing and optimizing network infrastructures." },
        // { title: "Business Intelligence", description: "Transforming data into actionable insights for decision-making." },
        // { title: "Serverless Computing", description: "Simplifying infrastructure with serverless architectures." },
        // { title: "AR/VR Development", description: "Creating immersive experiences with AR and VR technologies." },
    ];

    const _services = t("services.list", { returnObjects: true });
    console.log({_services})


    return (
        <>
            <Section />

            <section className={styles.layoutSection}>
                <div className={styles.container}>
                    <CaseCard {...caseData} />
                    <CaseCard {...caseData} />
                    <CaseCard {...caseData} />
                    <div style={{alignSelf: 'flex-end'}}><Button onClick={() => {}}>See more cases</Button></div>
                </div>
            </section>
            <SpinningStripe />
            <section className={styles.lightSection}>
                <div className={styles.container}>
                    <ClientsCard
                        title="Our Clients"
                        paragraph={'"We deeply value and cherish our clients. Their trust inspires us to consistently deliver innovative and tailored solutions that meet their unique needs. Each partnership we build is rooted in mutual respect, transparency, and a shared vision for success.\n' +
                            '\n' +
                            'For us, clients are not just business associates; they are the driving force behind everything we do. We strive to exceed expectations, foster long-term relationships, and empower their growth in the ever-evolving digital landscape.\n' +
                            '\n' +
                            'Your goals are our goals, and your success is our success. Together, we create impactful, future-ready solutions that not only solve today\'s challenges but also unlock tomorrow\'s opportunities."'}
                        buttonText="See More"
                        logos={logos}
                    />
                </div>
            </section>
            <SpinningStripe direction={"ltr"} />
            <section className={styles.lightSection}>
                <div className={styles.container}>
                    <ServicesBlock services={services} />
                </div>
            </section>
        </>
    );
}
