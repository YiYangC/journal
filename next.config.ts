import type { NextConfig } from "next";

const useCloudinary = !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const nextConfig: NextConfig = {
  images: useCloudinary
    ? {
        loader: "custom",
        loaderFile: "./src/lib/image-loader.ts",
      }
    : {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "ik.imagekit.io",
          },
        ],
      },
  async redirects() {
    return [
      {
        source: "/articles/:slug",
        destination: "/archive/:slug",
        permanent: true,
      },
      {
        source: "/articles",
        destination: "/archive",
        permanent: true,
      },
      {
        source: "/tags/:tag",
        destination: "/archive/:tag",
        permanent: true,
      },
      {
        source: "/studies",
        destination: "/artifacts",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
