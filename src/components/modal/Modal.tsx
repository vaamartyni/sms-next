"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import styles from "./modal.module.scss";
import Button from "@/src/components/Button";

// GraphQL Mutation
const CREATE_CONTACT_FORM = gql`
  mutation Mutation($data: ContctFormInput!) {
    createContctForm(data: $data) {
      req_id
      message
      name
      phone
    }
  }
`;

export default function Modal() {
    const [name, setName] = useState("Vladimir Martynyuk");
    const [phone, setPhone] = useState("79957955212");
    const [message, setMessage] = useState("I wanna create the best app ever");

    const [createContactForm, { data, loading, error }] = useMutation(CREATE_CONTACT_FORM);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await createContactForm({
                variables: {
                    data: { name, phone, message }, // Correct payload for the mutation
                },
            });
            console.log("Form submitted successfully:", response.data);
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    };

    return (
        <>
            <h2 className={styles.title}>Связаться с нами</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ваше имя"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="tel"
                    placeholder="Ваш номер телефона"
                    className={styles.input}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Ваше сообщение"
                    className={styles.textarea}
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>
                <Button size="small" type="submit" disabled={loading}>
                    {loading ? "Отправка..." : "Отправить"}
                </Button>
                {error && <p className={styles.error}>Ошибка отправки: {error.message}</p>}
                {data && (
                    <p className={styles.success}>
                        Заявка успещно сформирована.<br />
                        ID Запроса: {data.createContctForm.req_id}<br />
                    </p>
                )}
            </form>
        </>
    );
}