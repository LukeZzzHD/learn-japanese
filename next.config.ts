import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Include kuromoji dictionary files in serverless functions
  outputFileTracingIncludes: {
    "/api/romaji": ["./node_modules/kuromoji/dict/**/*"],
  },
  // Ensure these packages are bundled correctly for serverless
  serverExternalPackages: ["kuroshiro", "kuroshiro-analyzer-kuromoji", "kuromoji"],
};

export default nextConfig;
