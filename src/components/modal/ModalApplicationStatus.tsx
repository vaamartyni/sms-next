"use client";

import React, { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import styles from "./modal.module.scss";
import Button from "@/src/components/Button";
import { useTranslation } from "@/src/hooks/useTranslation";

// GraphQL Query
const CHECK_REQUEST_STATUS = gql`
  query Query($filters: ContctFormFiltersInput) {
    contctForms(filters: $filters) {
      message
      phone
      name
      req_status
      req_id
      createdAt
      updatedAt
    }
  }
`;

export default function ApplicationCheckModal() {
    const [reqId, setReqId] = useState("");
    const { t } = useTranslation(); // Translation hook
    const router = useRouter(); // Next.js router
    const [fetchRequestStatus, { data, loading, error }] = useLazyQuery(CHECK_REQUEST_STATUS);

    const [isDelayed, setIsDelayed] = useState(false); // For delayed loader

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (loading) {
            timer = setTimeout(() => setIsDelayed(true), 300); // Delay loader by 300ms
        } else {
            setIsDelayed(false); // Reset when loading stops
        }
        return () => clearTimeout(timer); // Cleanup timer
    }, [loading]);

    const handleCheckStatus = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reqId.trim()) {
            alert(t?.applicationCheckModal?.alerts?.enterReqId || "Please enter a request ID.");
            return;
        }

        try {
            await fetchRequestStatus({
                variables: {
                    filters: {
                        req_id: {
                            eq: reqId,
                        },
                    },
                },
            });
        } catch (err) {
            console.error("Error fetching request status:", err);
        }
    };

    const navigateToRequestPage = () => {
        if (data && data.contctForms.length > 0) {
            const reqId = data.contctForms[0].req_id;
            router.push(`/applicationRequest/${reqId}`);
        }
    };

    const getStatusDescription = (status: string) => {
        switch (status) {
            case "idle":
                return t?.applicationCheckModal?.statuses?.idle || "The request is awaiting processing.";
            case "accepted":
                return t?.applicationCheckModal?.statuses?.accepted || "The request has been accepted.";
            case "rejected":
                return t?.applicationCheckModal?.statuses?.rejected || "The request has been rejected.";
            case "in_progress":
                return t?.applicationCheckModal?.statuses?.inProgress || "The request is in progress.";
            case "finished":
                return t?.applicationCheckModal?.statuses?.finished || "The request has been completed.";
            default:
                return t?.applicationCheckModal?.statuses?.unknown || "Unknown status.";
        }
    };

    return (
        <>
            <h2 className={styles.title}>{t?.applicationCheckModal?.title || "Check Request Status"}</h2>
            <form className={styles.form} onSubmit={handleCheckStatus}>
                <input
                    type="text"
                    placeholder={t?.applicationCheckModal?.placeholders?.reqId || "Enter request ID"}
                    className={styles.input}
                    value={reqId}
                    onChange={(e) => setReqId(e.target.value)}
                    required
                />
                <Button size="small" type="submit" disabled={loading}>
                    {isDelayed ? t?.applicationCheckModal?.buttons?.checking || "Checking..." : t?.applicationCheckModal?.buttons?.check || "Check"}
                </Button>
                {error && <p className={styles.error}>{t?.applicationCheckModal?.errors?.generic || `Error: ${error.message}`}</p>}
                {data && data.contctForms.length > 0 ? (
                    <div className={styles.success}>
                        <p><strong>{t?.applicationCheckModal?.fields?.reqId || "Request ID"}:</strong> {data.contctForms[0].req_id}</p>
                        <p><strong>{t?.applicationCheckModal?.fields?.name || "Name"}:</strong> {data.contctForms[0].name}</p>
                        <p><strong>{t?.applicationCheckModal?.fields?.phone || "Phone"}:</strong> {data.contctForms[0].phone}</p>
                        <p><strong>{t?.applicationCheckModal?.fields?.message || "Message"}:</strong> {data.contctForms[0].message}</p>
                        <p><strong>{t?.applicationCheckModal?.fields?.status || "Status"}:</strong> {getStatusDescription(data.contctForms[0].req_status)}</p>
                        <p><strong>{t?.applicationCheckModal?.fields?.createdAt || "Created At"}:</strong> {new Date(data.contctForms[0].createdAt).toLocaleString()}</p>
                        <p><strong>{t?.applicationCheckModal?.fields?.updatedAt || "Updated At"}:</strong> {new Date(data.contctForms[0].updatedAt).toLocaleString()}</p>
                        {/*<Button size="small" onClick={navigateToRequestPage}>*/}
                        {/*    {t?.applicationCheckModal?.buttons?.goToRequest || "Go to Request Page"}*/}
                        {/*</Button>*/}
                    </div>
                ) : (
                    data && <p className={styles.error}>{t?.applicationCheckModal?.errors?.notFound || "No request found with the provided ID."}</p>
                )}
            </form>
        </>
    );
}