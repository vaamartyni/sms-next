// app/services/page.tsx
"use client"
import styles from "./page.module.scss";
import RidingGridPage from "@/app/components/RidingGridPage";
import App from "@/app/components/App";

export default function ServicesPage() {
    return (
        // <div className={styles.container}>
        //     <h1>Услуги</h1>
        //     <p>Описание наших услуг будет доступно на этой странице.</p>
        // </div>
        // <RidingGridPage />
        <div style={{height: '100vh'}}><App /></div>
    );
}
