import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import * as THREE from "three";

// Extend TextGeometry into react-three-fiber
// extend({ TextGeometry });

interface RandomShapeProps {
    size?: number; // Size of the shape
}

export default function RandomShape({ size = 3 }: RandomShapeProps) {
    const shapeRef = useRef<THREE.Mesh>(null);

    // Array of shape types
    const shapeTypes = [
        "cube",
        "sphere",
        "triangle",
        "torus",
        "dodecahedron",
        "icosahedron",
        "tetrahedron",
        // Add more shape types here
    ];

    // Randomly select a shape and color
    const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const color = `hsl(${Math.random() * 360}, 70%, 50%)`;

    // Rotate the shape on each frame
    useFrame(() => {
        if (shapeRef.current) {
            shapeRef.current.rotation.x += 0.005;
            shapeRef.current.rotation.y += 0.005;
        }
    });

    // Load font for TextGeometry
    // const font = useMemo(() => {
    //     const loader = new THREE.FontLoader();
    //     return loader.parse(require("three/examples/fonts/helvetiker_regular.typeface.json"));
    // }, []);

    // Select geometry based on shapeType
    const geometry = (() => {
        switch (shapeType) {
            case "cube":
                return <boxGeometry args={[size, size, size]} />;
            case "sphere":
                return <sphereGeometry args={[size / 2, 32, 32]} />;
            case "triangle":
                return <tetrahedronGeometry args={[size, 0]} />;
            case "torus":
                return <torusGeometry args={[size / 2, size / 8, 16, 100]} />;
            case "dodecahedron":
                return <dodecahedronGeometry args={[size]} />;
            case "icosahedron":
                return <icosahedronGeometry args={[size]} />;
            default:
                return <boxGeometry args={[size, size, size]} />;
        }
    })();

    return (
        <mesh ref={shapeRef}>
            {geometry}
            <meshStandardMaterial color={color} />
        </mesh>
    );
}
