const result = require("dotenv").config({ path: ".env.local" });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  env: result.parsed,
  transpilePackages: ["@dfns/sdk-webauthn"],
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;
