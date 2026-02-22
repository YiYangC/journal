import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllWritings } from "@/lib/writings";
import { getLatestFilm } from "@/lib/letterboxd";
import { BIO, CURRENT_BOOK } from "@/lib/about-data";
import { SelavyPhoto } from "@/lib/types";
import selavyData from "@/../content/selavy.json";

export const metadata: Metadata = {
  title: "About",
  description:
    "Exploring intersection between tech and design. Obsessed with the nature of media.",
};

export default async function AboutPage() {
  const latestFilm = await getLatestFilm();
  const writings = getAllWritings();
  const latestWriting = writings[0] ?? null;
  const selavyPhotos = (selavyData as SelavyPhoto[])
    .filter((p) => p.date)
    .sort((a, b) => b.date!.localeCompare(a.date!));
  const latestSelavy = selavyPhotos[0] ?? null;

  return (
    <>
      {/* Hero image */}
      <div className="w-full aspect-[3/1] relative overflow-hidden max-h-[50vh]">
        <Image
          src="https://ik.imagekit.io/mrdwtdivtag/Writings/IMG_0198_RmcYghXe0.png?updatedAt=1683443722972"
          alt="About"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* LAYOUT_PLACEHOLDER */}
    </>
  );
}
