import Link from "next/link";
import styles from "./ServiceCard.module.scss";
import { Canvas } from "@react-three/fiber";
import RandomShape from "@/src/components/RandomShape";
import Button from "@/src/components/Button";

interface ServiceCardProps {
    title: string;
    description: string;
    slug: string;
    geometry?: { shape: string; id: string; color: string; };
}

export default function ServiceCard({
                                        title,
    slug,
                                        description,
    geometry}: ServiceCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.canvasContainer}>
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 2, 2]} />
                    <RandomShape geometry={geometry && `${geometry.shape}-${geometry.color}`} />
                </Canvas>
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            <Link href={slug} passHref>
                <Button size="medium">
                    Read More
                </Button>
            </Link>
        </div>
    );
}
