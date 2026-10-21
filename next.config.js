// GitHub Pages serves the repo under /<repo>, so the workflow sets
// NEXT_PUBLIC_BASE_PATH=/Temp-Shop. Locally it stays empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  // /about -> /about/index.html, which GitHub Pages serves without extra config.
  trailingSlash: true,
  images: {
    // No image optimization server on a static host.
    unoptimized: true,
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
