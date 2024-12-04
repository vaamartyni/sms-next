import styles from "./GridWhatWeOffer.module.scss";

interface GridItem {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
}

interface GridProps {
    items: GridItem[];
}

export default function GridWhatWeOffer({ items }: GridProps) {
    const cols = 3; // Number of columns in the grid

    return (
        <div className={styles.grid}>
            {items.map((item, index) => {
                const row = Math.floor(index / cols); // Row index
                const col = index % cols; // Column index
                const waveOrder = row + col; // Wave animation order

                return (
                    <div
                        key={item.id}
                        className={styles.gridItem}
                        style={{ "--animation-order": waveOrder } as React.CSSProperties}
                    >
                        <img src={item.imageUrl} alt={item.title} className={styles.image} />
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.description}>{item.description}</p>
                    </div>
                );
            })}
        </div>
    );
}
