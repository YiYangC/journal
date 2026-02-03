import { getAllArticles } from "@/lib/articles";
import PhotoGrid from "@/components/PhotoGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Yi Yang",
};

export default function GalleryPage() {
  const articles = getAllArticles();
  const allImages = articles.flatMap((a) => a.gallery || []);

  return (
    <>
      <section className="p-[3rem] min-h-[40vh] flex flex-col justify-end">
        <p className="text-[clamp(1rem,4vw,1.5rem)] text-[var(--color-alt)] mb-4">
          <span className="mr-2">&mdash;</span>photography
        </p>
        <h1 className="text-[clamp(2.5rem,9vw,7.25rem)] font-serif italic font-light leading-[0.8]">
          gallery
        </h1>
      </section>

      <PhotoGrid images={allImages} columns={4} />
    </>
  );
}
