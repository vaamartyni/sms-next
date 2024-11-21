"use client";

import React from "react";
import { useModal } from "./modalContext";
import styles from "./modal.module.scss";
import Button from "@/app/components/Button";

export default function Modal() {
    const { isOpen, closeModal } = useModal();

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={closeModal}>
                    ×
                </button>
                <h2 className={styles.title}>Связаться с нами</h2>
                <form className={styles.form}>
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        className={styles.input}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Ваш номер телефона"
                        className={styles.input}
                        required
                    />
                    <textarea
                        placeholder="Ваше сообщение"
                        className={styles.textarea}
                        rows={4}
                    ></textarea>
                    <Button size={'small'} onClick={() => closeModal()}>
                        Отправить
                    </Button>
                </form>
            </div>
        </div>
    );
}
