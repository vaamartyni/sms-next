import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const loadLocaleData = async (locale: string) => {
    const response = await fetch(`/locales/${locale}/common.json`);
    if (!response.ok) {
        throw new Error("Failed to load locale data");
    }
    return response.json();
};

export const useTranslation = () => {
    const { locale } = useRouter();
    const [translations, setTranslations] = useState<Record<string, never>>({});

    useEffect(() => {
        const loadTranslations = async () => {
            try {
                const data = await loadLocaleData(locale || "ru");
                setTranslations(data);
            } catch (error) {
                console.error("Error loading translations:", error);
            }
        };
        loadTranslations();
    }, [locale]);

    return { t: translations };
};