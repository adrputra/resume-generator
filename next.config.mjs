/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/resume",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [{ source: "/resume-gen/api/:path*", destination: "/api/:path*" }];
  },
  output: 'standalone',
};

export default nextConfig;
