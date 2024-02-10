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
//   webpack: (config) => {
//     config.resolve.alias.canvas = false;

//     return config;
//   },
};

export default nextConfig;
