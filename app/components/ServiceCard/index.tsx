import Link from "next/link";
import styles from "./ServiceCard.module.scss";
import { Canvas } from "@react-three/fiber";
import RandomShape from "@/app/components/RandomShape";
import Button from "@/app/components/Button";

interface ServiceCardProps {
    id: string;
    title: string;
    description: string;
    onReadMore: () => void;
}

export default function ServiceCard({
                                        id,
                                        title,
                                        description,
                                        onReadMore,
                                    }: ServiceCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.canvasContainer}>
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 2, 2]} />
                    <RandomShape />
                </Canvas>
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            <Link href={`/services/${id}`} passHref>
                <Button size="medium" onClick={onReadMore}>
                    Read More
                </Button>
            </Link>
        </div>
    );
}
