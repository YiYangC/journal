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
};

export default nextConfig;
