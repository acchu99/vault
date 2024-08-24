/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa';

const nextConfig = withPWA({
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
});

export default nextConfig;
