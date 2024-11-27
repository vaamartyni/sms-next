import styles from "./GridLayout.module.scss";

interface GridItem {
    id: string
    imageUrl: string
    title: string
    description: string
}

interface GridProps {
    items: GridItem[];
}

export default function GridLayout({ items }: GridProps) {
    const cols = 3; // Define the number of columns for the grid

    return (
        <div className={styles.grid}>
            {items.map((item, index) => {
                const row = Math.floor(index / cols); // Determine the row index
                const col = index % cols; // Determine the column index
                const waveOrder = row + col; // Calculate the wave animation order

                return (
                    <div
                        key={item.id}
                        className={styles.gridItem}
                        style={{ "--animation-order": waveOrder } as React.CSSProperties}
                    >
                        <img src={item.imageUrl} alt={item.title} className={styles.image} />
                        {/* Uncomment below lines if needed */}
                        {/* <h3 className={styles.title}>{item.title}</h3> */}
                        {/* <p className={styles.description}>{item.description}</p> */}
                    </div>
                );
            })}
        </div>
    );
}
