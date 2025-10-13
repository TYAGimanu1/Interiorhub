/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: '5.imimg.com',
      },
      {
        protocol: 'https',
        hostname: 'thearchitectsdiary.com',
      },
      // 🎯 NEW: Whitelist the domain for the Hero Image
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      // If you are worried about subdomains, use a wildcard like this:
      /*
      {
        protocol: 'https',
        hostname: '*.gstatic.com',
      },
      */
    ],
  },
};

// Ensure you use the ES Module export syntax for .mjs files
export default nextConfig;