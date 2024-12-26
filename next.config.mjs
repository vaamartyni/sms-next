/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true, // Включение поддержки styled-components
    },
    i18n: {
        locales: ["ru", "en"], // Доступные языки
        defaultLocale: "ru",   // Язык по умолчанию
    },
    images: {
        domains: ["encrypted-tbn0.gstatic.com", "localhost"], // Добавьте домен хоста изображения
    },
};

export default nextConfig;
