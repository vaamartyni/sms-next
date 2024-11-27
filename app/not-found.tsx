import Link from "next/link";
import styles from "./404.module.scss";

export default function Custom404() {
    return (
        <div className={styles.container}>
            <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
                <h1 className={styles.errorCode}>404</h1>
                <Link href="/" className={styles.homeLink}>
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}
