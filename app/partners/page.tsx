// app/partners/page.tsx
import styles from "./page.module.scss";
import ClientsCard from "@/app/components/ClientsCard";

export default function PartnersPage() {
    const logos = [
        { src: "/logo1.png", alt: "Client 1" },
        { src: "/logo2.png", alt: "Client 2" },
        { src: "/logo3.png", alt: "Client 3" },
        { src: "/logo4.png", alt: "Client 4" },
        { src: "/logo5.png", alt: "Client 5" },
    ];
    return (
        <div className={styles.container}>
            <h1>Партнеры</h1>
            <p>Список наших партнеров будет представлен здесь.</p>
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
    );
}
