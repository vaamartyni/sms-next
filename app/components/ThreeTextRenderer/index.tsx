import React from "react";
import { Canvas } from "@react-three/fiber";
import { Text3D, OrbitControls } from "@react-three/drei";

interface ThreeTextRendererProps {
    text: string;
    color?: string; // Color of the text
    size?: number; // Size of the text
    position?: [number, number, number]; // Position in 3D space
}

const ThreeTextRenderer: React.FC<ThreeTextRendererProps> = ({
                                                                 text,
                                                                 color = "#ffffff",
                                                                 size = 1,
                                                                 position = [0, 0, 0],
                                                             }) => {
    return (
        <Canvas
            style={{ width: "200px", height: "200px" }}
            camera={{ position: [0, 0, 10], fov: 5 }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <OrbitControls />

            <Text3D
                font="/fonts/helvetiker_regular.typeface.json" // Optional, can rely on default font from library
                size={size}
                height={0.2}
                position={position}
                bevelEnabled
                bevelThickness={0.03}
                bevelSize={0.02}
            >
                {text}
                <meshStandardMaterial color={color} />
            </Text3D>
        </Canvas>
    );
};

export default ThreeTextRenderer;
