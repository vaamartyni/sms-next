import styles from "./footer.module.scss";
import Link from "next/link";
import { SocialLink } from "@/src/types/global";
import Image from "next/image";

interface FooterProps {
    socialLinks: SocialLink[];
    copyright: string;
}

export default function Footer({ socialLinks, copyright }: FooterProps) {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.leftSection}>
                    <p>{copyright}</p>
                </div>
                <div className={styles.rightSection}>
                    {socialLinks.map((link) => (
                        <Link
                            key={link.documentId}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            {/*{link?.icon?.url && <Image*/}
                            {/*    src={`http://localhost:1337${link?.icon?.url}`}*/}
                            {/*    alt={link?.documentId}*/}
                            {/*    width={'18'}*/}
                            {/*    height={'18'}*/}
                            {/*    className={styles.iconLink}*/}
                            {/*/>}*/}
                            {link.title}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}