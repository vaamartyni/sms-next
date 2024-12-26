import styles from "./GridLayout.module.scss";
import {ReactNode} from "react";

interface GridProps {
    items: ReactNode[];
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
                        key={index}
                        className={styles.gridItem}
                        style={{ "--animation-order": waveOrder } as React.CSSProperties}
                    >
                        <div>{item}</div>
                    </div>
                );
            })}
        </div>
    );
}
