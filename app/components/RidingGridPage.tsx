import * as THREE from "three";
import React, {Suspense, useRef, useState} from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import {BackGrid} from "@/app/BackGrid";

const state = { top: 0 };

export default function RidingGridPage() {

    const scrollArea = useRef<HTMLDivElement>(null);
    const [pages, setPages] = useState(0);

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        state.top = e.currentTarget.scrollTop;
    };

    return (
        <div style={{width: "100vw", height: "calc(100vh - 170px)", overflow: "", position: "relative"}}>
            <Canvas
                camera={{position: [0, 0, 5]}}
                // style={{backgroundColor: "#272730"}}
                onCreated={({scene}) => {
                    // scene.fog = new THREE.FogExp2("#000000", 0.2); // Add fog for depth
                }}
            >
                {/*<ambientLight intensity={0.5}/>*/}
                {/*<directionalLight position={[0, 10, 5]} intensity={1}/>*/}

                <Suspense fallback={<Html center>Loading...</Html>}>
                    <BackGrid/>
                </Suspense>
            </Canvas>
            <div
                ref={scrollArea}
                onScroll={onScroll}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflowY: "scroll",
                    backgroundColor: "transparent",
                }}
            >
                <div style={{height: "200vh"}}> {/* Placeholder for scrolling */}
                    <h1 style={{margin: "50vh 0", textAlign: "center",   fontSize: "68px",
                        fontWeight: 900,
                        color: "#000000", textShadow: "6px 6px 0 var(--color-shadow)"}}>
                        NO LIMITS FOR YOUR CREATIVITY
                    </h1>
                </div>
            </div>
        </div>
    );
}
