/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true, // Включение поддержки styled-components
    },
    i18n: {
        // These are the locales supported in the application
        locales: ['en', 'ru'],
        // This is the default locale used when visiting non-prefixed paths
        defaultLocale: 'en',
        localeDetection: false,
        // If you need domain-based locale routing, you can configure it here
        domains: [
            {
                domain: 'example.com', // Default domain
                defaultLocale: 'en',
            },
            {
                domain: 'example.ru', // Russian-specific domain
                defaultLocale: 'ru',
            },
        ],
    },
    images: {
        domains: ["encrypted-tbn0.gstatic.com"], // Добавьте домен хоста изображения
    },
    // output: "export",  // <=== enables static exports
    // basePath: "/sms-next",
};

export default nextConfig;
