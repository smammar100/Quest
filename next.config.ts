import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking — refuse to render this site inside any iframe.
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME-type sniffing — browser must honour the declared Content-Type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Only send the origin (no path) as the Referer on cross-origin requests.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable browser features this site doesn't use.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  skipTrailingSlashRedirect: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
};

export default nextConfig;
