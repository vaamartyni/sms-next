/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true, // Включение поддержки styled-components
    },
    i18n: {
        locales: ["en", "ru"], // List of supported languages (e.g., English, Russian)
        defaultLocale: "en", // Default language
    },
    images: {
        domains: ["encrypted-tbn0.gstatic.com"], // Добавьте домен хоста изображения
    },
    // output: "export",  // <=== enables static exports
    // basePath: "/sms-next",
};

export default nextConfig;
