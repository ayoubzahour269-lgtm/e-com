/** @type {import('next').NextConfig} */
const nextConfig = {
  // Les packages du studio sont en TS source → Next les transpile.
  transpilePackages: ["@studio/core", "@studio/agents", "@studio/policy"],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config) => {
    // Les packages du studio sont en ESM/TS avec imports ".js" → mapper vers les sources ".ts".
    config.resolve.extensionAlias = { ".js": [".ts", ".tsx", ".js", ".jsx"] };
    return config;
  },
};
export default nextConfig;
