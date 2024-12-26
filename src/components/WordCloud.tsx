
import * as THREE from "three";
import { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Text, TrackballControls } from "@react-three/drei";
import {useRouter} from "next/router";

// Типизация пропсов
interface WordCloudProps {
    words: {
        slug: string;
        locale: string;
        word: string;
    }[]; // Массив слов, передаваемых из родителя
}

interface WordProps {
    word?: {
        slug: string;
        locale: string;
        word: string;
    }
    position: THREE.Vector3;
    onHover: (hoveredWord: string | null) => void;
}

// Компонент отдельного слова
function Word({ word, position, onHover }: WordProps) {

    const router = useRouter();

    const handleClick = () => {
        router.push(`/words/${word?.slug}`);
    };

    const fontProps = {
        fontSize: 2.5,
        letterSpacing: -0.05,
        lineHeight: 1,
        "material-toneMapped": false,
    };
    const ref = useRef<THREE.Mesh>();
    const [hovered, setHovered] = useState(false);

    const handleMouseOver = (e: any) => {
        e.stopPropagation();
        setHovered(true);
        onHover(word?.word || null);
    };

    const handleMouseOut = () => {
        setHovered(false);
        onHover(null);
    };

    useFrame(() => {
        if (ref.current) {
            ref.current.material.color.lerp(
                new THREE.Color(hovered ? "#2E76E2" : "#FFFFFF"),
                0.1
            );
            ref.current.scale.lerp(
                hovered ? new THREE.Vector3(1.2, 1.2, 1) : new THREE.Vector3(1, 1, 1),
                0.1
            );
        }
    });

    return (
        <Billboard position={position}>
            <Text
                ref={ref}
                onPointerOver={handleMouseOver}
                onPointerOut={handleMouseOut}
                onClick={handleClick} // Переход на страницу слова
                {...fontProps}
            >
                {word?.word}
            </Text>
        </Billboard>
    );
}

// Компонент линий между словами
function Connections({
                         positions,
                         hoverWordIndex,
                     }: {
    positions: THREE.Vector3[];
    hoverWordIndex: number | null;
}) {
    const groupRef = useRef<THREE.Group>();
    const animatedLines = useRef<THREE.Line[]>([]);

    useFrame(() => {
        if (hoverWordIndex !== null) {
            const start = positions[hoverWordIndex];
            positions.forEach((end, index) => {
                if (index !== hoverWordIndex) {
                    const line = animatedLines.current[index];
                    if (line) {
                        line.geometry.setFromPoints([
                            start.clone().lerp(end, 0.1),
                            end,
                        ]);
                    }
                }
            });
        }
    });

    if (hoverWordIndex === null) return null;

    return (
        <group ref={groupRef}>
            {positions.map((end, index) => {
                if (index === hoverWordIndex) return null;
                return (
                    <line key={index} ref={(el) => (animatedLines.current[index] = el!)}>
                        <bufferGeometry />
                        <lineBasicMaterial
                            attach="material"
                            color="#2E76E2"
                            linewidth={1}
                            transparent
                            opacity={0.8}
                        />
                    </line>
                );
            })}
        </group>
    );
}

// Компонент облака слов
function Cloud({ words, count = 7, radius = 20 }: WordCloudProps & { count?: number; radius?: number }) {
    const groupRef = useRef<THREE.Group>();
    const [hoverWord, setHoverWord] = useState<number | null>(null);
    const { temp, positions } = useMemo(() => {
        const temp: { word: {
                slug: string;
                locale: string;
                word: string;
            }, position: THREE.Vector3 }[] = [];
        const positions: THREE.Vector3[] = [];
        const spherical = new THREE.Spherical();
        const phiSpan = Math.PI / (count + 1);
        const thetaSpan = (Math.PI * 2) / count;

        for (let i = 1; i < count + 1; i++) {
            for (let j = 0; j < count; j++) {
                const word = words[(i * count + j) % words.length];
                const position = new THREE.Vector3().setFromSpherical(
                    spherical.set(radius, phiSpan * i, thetaSpan * j)
                );
                temp.push({ word, position });
                positions.push(position);
            }
        }
        return { temp, positions };
    }, [count, radius, words]);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.003; // Постоянное вращение вокруг Y-оси
        }
    });
    return (
        <group ref={groupRef}>
            {temp.map(({ word, position }, index) => (
                <Word
                    key={index}
                    word={word}
                    position={position}
                    onHover={(hoveredWord) =>
                        setHoverWord(hoveredWord === word.word ? index : null)
                    }
                />
            ))}
            <Connections positions={positions} hoverWordIndex={hoverWord} />
        </group>
    );
}

// Анимация камеры
function CameraAnimation() {
    const zTarget = 35; // Финальная позиция Z камеры
    const animationSpeed = 0.2;

    useFrame(({ camera }) => {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, zTarget, animationSpeed);
        camera.lookAt(0, 0, 0);
    });

    return null;
}

// Основной компонент WordCloud
export default function WordCloud({ words }: WordCloudProps) {
    if (words.length === 0) {
        return (
            <div style={{ textAlign: "center", color: "#FFFFFF" }}>
                No words available
            </div>
        );
    }

    return (
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 1000], fov: 90 }}>
            <fog attach="fog" args={["#202025", 0, 70]} />
            <Suspense fallback={null}>
                <Cloud words={words} count={7} radius={20} />
                <CameraAnimation />
            </Suspense>
            <TrackballControls />
        </Canvas>
    );
}