import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: new URL(supabaseUrl).hostname,
        pathname: "/storage/v1/object/sign/project-images/**",
      },
    ],
  },
  allowedDevOrigins: ["192.169.254.101"],
  cacheComponents: true,
};

export default nextConfig;
