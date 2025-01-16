"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import styles from "./modal.module.scss";
import Modal from "@/src/components/modal/Modal";
import ModalApplicationStatus from "@/src/components/modal/ModalApplicationStatus";

// Пример компонентов для различных модальных окон
const FeedbackModal = () => <div>Feedback Form</div>;
const InfoModal = () => <div>Information Modal</div>;

// Маппинг модальных окон
const modalMap: Record<string, ReactNode> = {
    feedback: <FeedbackModal />,
    startProject: <Modal />,
    info: <InfoModal />,
    applicationStatus: <ModalApplicationStatus />,
};

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
    const router = useRouter();
    const { query } = router;

    const openModal = (modalContent: ReactNode) => {
        setContent(modalContent);
        setIsOpen(true);
    };

    const closeModal = () => {
        setContent(null);
        setIsOpen(false);

        // Убираем параметр из URL при закрытии модального окна
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { modal, ...restQuery } = query; // Исключаем параметр `modal`
        router.replace({ pathname: router.pathname, query: restQuery }, undefined, {
            shallow: true,
        });
    };

    useEffect(() => {
        // Открываем модальное окно, если в query есть параметр `modal`
        if (query.modal) {
            const modalContent = modalMap[query.modal as string] || <div>Unknown Modal</div>;
            openModal(modalContent);
        }
    }, [query.modal]); // Срабатывает при изменении параметра `modal`

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