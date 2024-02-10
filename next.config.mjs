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
//   webpack: (config) => {
//     config.resolve.alias.canvas = false;

//     return config;
//   },
};

export default nextConfig;
