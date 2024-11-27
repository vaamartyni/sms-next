import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en", // Fallback to English if no language is found
        debug: process.env.NODE_ENV === "development", // Enable debug in development mode
        interpolation: {
            escapeValue: false, // React already escapes values
        },
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to translation files
        },
        react: {
            useSuspense: false, // Disable suspense for server-side rendering
        },
    });

export default i18n;
