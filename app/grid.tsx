import React, {Suspense} from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import {BackGrid} from "@/app/BackGrid";
import Button from "@/app/components/Button";
import {useTranslation} from "next-i18next";
import Modal from "@/app/components/modal/Modal";
import {useModal} from "@/app/components/modal/modalContext";

export default function GridPage() {
    const { t } = useTranslation("common");
    const { openModal } = useModal();
    const buttonText = t("section.button");
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
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "transparent",
                }}
            >
                <div style={{height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center'}}> {/* Placeholder for scrolling */}
                    <Button onClick={() => openModal(<Modal />)} variant={"primary"} size="large">
                        {buttonText}
                    </Button>
                </div>
            </div>
        </>
    );
}
