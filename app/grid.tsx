import React, {Suspense, useRef, useState} from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import {BackGrid} from "@/app/BackGrid";
import Button from "@/app/components/Button";

const state = { top: 0 };

export default function GridPage() {
    const scrollArea = useRef<HTMLDivElement>(null);
    const [pages, setPages] = useState(0);

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        state.top = e.currentTarget.scrollTop;
    };

    return (
        <>
            <Canvas
                camera={{ position: [0, 0, 5] }}
                style={{ position: "absolute", top: 0, left: 0 }}
            >
                <Suspense fallback={<Html center>Loading...</Html>}>
                    <BackGrid />
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
                <div style={{height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center'}}> {/* Placeholder for scrolling */}
                    <Button size={"medium"}>НАЧАТЬ СОТРУДНИЧЕСТВО</Button>
                </div>
            </div>
        </>
    );
}
