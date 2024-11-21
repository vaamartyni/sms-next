import Image from "next/image";
import styles from "./Grid3x3.module.scss";

interface GridItem {
    id: number;
    title: string;
    description: string;
    path: string;
}

interface Grid3x3Props {
    items: GridItem[];
}

export default function Grid3x3({ items }: Grid3x3Props) {
    return (
        <div className={styles.grid}>
            {items.map((item) => (
                <div key={item.id} className={styles.gridItem}>
                    <Image
                        src={item.path}
                        alt={item.title}
                        width={100}
                        height={100}
                        style={{ marginBottom: "8px" }}
                    />
                    <h3 className={styles.title}>{item.title}</h3>
                    {/*<p className={styles.description}>{item.description}</p>*/}
                </div>
            ))}
        </div>
    );
}
