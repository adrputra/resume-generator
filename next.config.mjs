/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/resume',
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
};

export default nextConfig;
