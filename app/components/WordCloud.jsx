"use client"
import {Vector3, Mesh, Color, Euler,Spherical, Group } from 'three';
import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, Text, TrackballControls } from '@react-three/drei';

interface WordProps {
    position: Vector3;
    children: string;
    highlight: boolean;
}

const Word: React.FC<WordProps> = ({ position, children, highlight }) => {
    const ref = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const defaultColor = new Color(highlight ? '#2086fa' : '#202025');

    const onPointerOver = () => setHovered(true);
    const onPointerOut = () => setHovered(false);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
        return () => {
            document.body.style.cursor = 'auto';
        };
    }, [hovered]);

    useFrame(() => {
        if (ref.current) {
            const distance = Math.abs(ref.current.position.z);
            ref.current.material.color.lerp(
                defaultColor.set(hovered ? '#ff8800' : highlight ? '#2086fa' : '#202025'),
                0.1
            );
            ref.current.material.opacity = 1 - Math.min(distance / 20, 0.7);
            ref.current.material.transparent = true;
        }
    });

    return (
        <Billboard position={position}>
            <Text
                ref={ref}
                onPointerOver={onPointerOver}
                onPointerOut={onPointerOut}
                onClick={() => console.log('Word clicked:', children)}
                // font="/Inter-Bold.woff"
                fontSize={2}
                letterSpacing={-0.02}
                lineHeight={1.2}
                material-toneMapped={false}
            >
                {children}
            </Text>
        </Billboard>
    );
};

interface CloudProps {
    count?: number;
    radius?: number;
}

interface WordData {
    position: Vector3;
    rotation: Euler;
    word: string;
    highlight: boolean;
}

const Cloud: React.FC<CloudProps> = ({ count = 8, radius = 20 }) => {
    const [words, setWords] = useState<WordData[]>([]);

    useEffect(() => {
        const generateWords = (): WordData[] => {
            const phrases = [
                'Разработка мобильных приложений',
                'CRM-системы',
                'Интеграция API',
            ];

            const temp: WordData[] = [];
            const spherical = new Spherical();
            const phiSpan = Math.PI / count;
            const thetaSpan = (Math.PI * 2) / count;

            for (let i = 1; i <= count; i++) {
                for (let j = 0; j < count; j++) {
                    const index = (i * count + j) % phrases.length;
                    const position = new Vector3().setFromSpherical(
                        spherical.set(radius, phiSpan * i, thetaSpan * j)
                    );
                    const rotation = new Euler().set(
                        phiSpan * i - Math.PI / 2,
                        thetaSpan * j,
                        0
                    );
                    temp.push({
                        position,
                        rotation,
                        word: phrases[index],
                        highlight: Math.random() > 0.8,
                    });
                }
            }

            return temp;
        };

        setWords(generateWords());
    }, [count, radius]);

    return (
        <>
            {words.map(({ position, rotation, word, highlight }, index) => (
                <Billboard key={index} position={position} rotation={rotation}>
                    <Word position={position} highlight={highlight}>
                        {word}
                    </Word>
                </Billboard>
            ))}
        </>
    );
};

const RotatingGroup: React.FC = () => {
    const groupRef = useRef<Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group ref={groupRef}>
            <Cloud count={5} radius={20} />
        </group>
    );
};

const WordCloud: React.FC = () => {
    return (
        <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 40], fov: 100 }}
            style={{ background: 'white' }}
        >
            <Suspense fallback={null}>
                <RotatingGroup />
            </Suspense>
            <TrackballControls />
        </Canvas>
    );
};

export default WordCloud;
