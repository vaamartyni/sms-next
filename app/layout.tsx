"use client"
// import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.scss"; // Global styles
import styles from "./layout.module.scss"; // Layout-specific styles
import Header from "./layout/header";
import Footer from "./layout/footer";
import { ModalProvider } from "@/app/components/modal/modalContext";
import Modal from "@/app/components/modal/Modal";
import "../app/i18n"; // Initialize translations
import { I18nextProvider } from "react-i18next";
import i18n from "@/app/i18n";

// Font configuration
const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat",
});

// export const metadata: Metadata = {
//     title: "My Project",
//     description: "A responsive Next.js project with SCSS Modules",
// };

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={montserrat.variable}>
        <body className={styles.body}>
        <I18nextProvider i18n={i18n}>
            <Header />
            <main className={styles.main}>
                <ModalProvider>
                    <Modal />
                    {children}
                </ModalProvider>
            </main>
            <Footer />
        </I18nextProvider>
        </body>
        </html>
    );
}
