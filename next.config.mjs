/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
    const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, ''); // Extract repo name
    assetPrefix = `/${repo}/`;
    basePath = `/${repo}`;
}

const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    i18n: {
        locales: ["en", "ru"],
        defaultLocale: "en",
    },
    images: {
        unoptimized: true, // Required for static exports
    },
    output: 'export', // Required for GitHub Pages
    assetPrefix,
    basePath,
    trailingSlash: true,
};

export default nextConfig;
