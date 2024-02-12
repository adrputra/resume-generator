/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/resume',
  // distDir: 'build',
  async rewrites() {
    return [{ source: "/resume-gen/api/:path*", destination: "/api/:path*" }];
  },
};

export default nextConfig;
// async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/resume",
  //       permanent: true,
  //     },
  //   ];
  // },