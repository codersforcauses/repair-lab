/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "repair-lab-images.s3.ap-southeast-2.amazonaws.com",
      "via.placeholder.com"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
