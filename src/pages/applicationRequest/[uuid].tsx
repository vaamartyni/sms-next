"use client";

import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import styles from "./requestPage.module.scss";

// GraphQL Query
const FETCH_REQUEST_DETAILS = gql`
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

export default function ApplicationRequestPage() {
    const router = useRouter();
    const { uuid } = router.query; // Get the UUID from the URL

    const [fetchRequestDetails, { data, loading, error }] = useLazyQuery(FETCH_REQUEST_DETAILS);

    useEffect(() => {
        if (uuid) {
            fetchRequestDetails({
                variables: {
                    filters: {
                        req_id: {
                            eq: uuid,
                        },
                    },
                },
            });
        }
    }, [uuid, fetchRequestDetails]);

    if (loading) {
        return (
            <div className={styles.section}>
                <div className={styles.container}>
                    <h1 className={styles.heading}>Loading Request Details...</h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.section}>
                <div className={styles.container}>
                    <h1 className={styles.heading}>Error Fetching Request</h1>
                    <p className={styles.paragraph}>{error.message}</p>
                </div>
            </div>
        );
    }

    const request = data?.contctForms?.[0];

    if (!request) {
        return (
            <div className={styles.section}>
                <div className={styles.container}>
                    <h1 className={styles.heading}>Request Not Found</h1>
                    <p className={styles.paragraph}>No request found for the given ID: {uuid}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Request Details</h1>
                <p className={styles.paragraph}>
                    <strong>Request ID:</strong> {request.req_id}
                </p>
                <p className={styles.paragraph}>
                    <strong>Name:</strong> {request.name}
                </p>
                <p className={styles.paragraph}>
                    <strong>Phone:</strong> {request.phone}
                </p>
                <p className={styles.paragraph}>
                    <strong>Message:</strong> {request.message}
                </p>
                <p className={styles.paragraph}>
                    <strong>Status:</strong> {request.req_status}
                </p>
                <p className={styles.paragraph}>
                    <strong>Created At:</strong> {new Date(request.createdAt).toLocaleString()}
                </p>
                <p className={styles.paragraph}>
                    <strong>Updated At:</strong> {new Date(request.updatedAt).toLocaleString()}
                </p>
            </div>
        </div>
    );
}