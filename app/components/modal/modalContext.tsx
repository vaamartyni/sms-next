"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import styles from "./modal.module.scss"; // Assuming styles are in Modal.module.scss

type ModalContextType = {
    isOpen: boolean;
    content: ReactNode;
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<ReactNode>(null);

    const openModal = (modalContent: ReactNode) => {
        setContent(modalContent);
        setIsOpen(true);
    };

    const closeModal = () => {
        setContent(null);
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
            {children}
            {isOpen && (
                <div className={styles.overlay}>
                    <div className={styles.modal}>
                        <button className={styles.closeButton} onClick={closeModal}>
                            &times;
                        </button>
                        {content}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
