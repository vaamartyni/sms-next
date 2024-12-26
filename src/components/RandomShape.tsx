import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RandomShapeProps {
    geometry?: string; // Example: "cube-red", optional
    size?: number; // Size of the shape
}

export default function RandomShape({ geometry, size = 3 }: RandomShapeProps) {
    const shapeRef = useRef<THREE.Mesh>(null);

    // Rotate the shape on each frame
    useFrame(() => {
        if (shapeRef.current) {
            shapeRef.current.rotation.x += 0.005;
            shapeRef.current.rotation.y += 0.005;
        }
    });

    // Array of shape types for random selection
    const shapeTypes = ["cube", "sphere", "triangle", "torus", "dodecahedron", "icosahedron"];

    // Function to parse the geometry string
    const parseGeometry = (geometryString: string) => {
        const [shapeType, color] = geometryString.split("-");
        return { shapeType, color: color || "white" }; // Default color if not provided
    };

    // Get the shape type and color, or randomize if geometry is not provided
    const { shapeType, color } = geometry
        ? parseGeometry(geometry)
        : {
            shapeType: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
            color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        };

    // Select geometry based on shapeType
    const renderGeometry = () => {
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
    };

    return (
        <group>
            <mesh ref={shapeRef}>
                {renderGeometry()}
                <meshStandardMaterial color={color} />
            </mesh>
            {!geometry && (
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[size * 2, size / 2]} />
                    <meshBasicMaterial color="red" />
                </mesh>
            )}
        </group>
    );
}