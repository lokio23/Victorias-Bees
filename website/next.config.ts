import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/Victorias-Bees" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? "/Victorias-Bees" : "",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
