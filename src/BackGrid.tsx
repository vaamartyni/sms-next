import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Plane } from "@react-three/drei";

export function BackGrid() {
    const gridRef = useRef<THREE.Mesh>(null);

    useFrame(({ scene }) => {
        // Set the background color of the scene
        scene.background = new THREE.Color("#2d72e3");

        if (gridRef.current) {
            // Animate the grid to move toward the camera
            gridRef.current.position.z += 0.01;

            // Reset position to loop the grid
            if (gridRef.current.position.z > 5) {
                gridRef.current.position.z = -10;
            }
        }
    });

    return (
        <Plane
            ref={gridRef}
            position={[0, -1, -10]} // Start far from the user
            rotation={[Math.PI / 2, 0, 0]}
            args={[80, 80, 128, 128]}
        >
            {/* Custom material with emissive color for grid lines */}
            <meshStandardMaterial
                color="#FFFFFF"
                emissive="#1e90ff"
                wireframe
                wireframeLinewidth={2} // Adjust line width
            />
        </Plane>
    );
}
