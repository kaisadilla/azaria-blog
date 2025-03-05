import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: cfg => {
        cfg.resolve.alias = {
            ...cfg.resolve.alias,
            '@src': path.resolve(__dirname, 'src'),
        }

        return cfg;
    }
};

export default nextConfig;
