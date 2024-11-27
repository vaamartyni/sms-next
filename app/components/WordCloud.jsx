"use client";

import * as THREE from "three";
import { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Text, TrackballControls } from "@react-three/drei";
import { useTranslation } from "next-i18next";

function Word({ children, position, onHover }) {
    const fontProps = {
        fontSize: 2.5,
        letterSpacing: -0.05,
        lineHeight: 1,
        "material-toneMapped": false,
    };
    const ref = useRef();
    const [hovered, setHovered] = useState(false);

    const over = (e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(children); // Notify parent about hover
    };

    const out = () => {
        setHovered(false);
        onHover(null); // Clear hover state
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
            <Text ref={ref} onPointerOver={over} onPointerOut={out} {...fontProps}>
                {children}
            </Text>
        </Billboard>
    );
}

function Connections({ positions, hoverWordIndex }) {
    const groupRef = useRef();
    const animatedLines = useRef([]);

    useFrame(() => {
        if (hoverWordIndex !== null) {
            const start = positions[hoverWordIndex];
            positions.forEach((end, index) => {
                if (index !== hoverWordIndex) {
                    const line = animatedLines.current[index];
                    if (line) {
                        line.geometry.setFromPoints([
                            start.clone().lerp(end, 0.1), // Animate towards the endpoint
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
                if (index === hoverWordIndex) return null; // Skip self-connection
                return (
                    <line key={index} ref={(el) => (animatedLines.current[index] = el)}>
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

function Cloud({ count = 7, radius = 20 }) {
    const groupRef = useRef();
    const [hoverWord, setHoverWord] = useState(null);
    const { t } = useTranslation("common");

    const words = useMemo(() => {
        const translatedWords = t("wordCloud.words", { returnObjects: true });
        const temp = [];
        const positions = [];
        const spherical = new THREE.Spherical();
        const phiSpan = Math.PI / (count + 1);
        const thetaSpan = (Math.PI * 2) / count;

        for (let i = 1; i < count + 1; i++) {
            for (let j = 0; j < count; j++) {
                const word = translatedWords[(i * count + j) % translatedWords.length];
                const position = new THREE.Vector3().setFromSpherical(
                    spherical.set(radius, phiSpan * i, thetaSpan * j)
                );
                temp.push({ word, position });
                positions.push(position);
            }
        }
        return { temp, positions };
    }, [count, radius, t]);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001; // Continuous spinning around Y-axis
        }
    });

    return (
        <group ref={groupRef}>
            {words.temp.map(({ word, position }, index) => (
                <Word
                    key={index}
                    position={position}
                    onHover={(hoveredWord) =>
                        setHoverWord(hoveredWord === word ? index : null)
                    }
                >
                    {word}
                </Word>
            ))}
            <Connections positions={words.positions} hoverWordIndex={hoverWord} />
        </group>
    );
}

function CameraAnimation() {
    const zTarget = 35; // Final z-position of the camera
    const animationSpeed = 0.2; // Speed of the animation

    useFrame(({ camera }) => {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, zTarget, animationSpeed);
        camera.lookAt(0, 0, 0);
    });

    return null; // This component does not render anything
}

export default function WordCloud() {
    return (
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 1000], fov: 90 }}>
            <fog attach="fog" args={["#202025", 0, 70]} />
            <Suspense fallback={null}>
                <Cloud count={7} radius={20} />
                <CameraAnimation />
            </Suspense>
            <TrackballControls />
        </Canvas>
    );
}
