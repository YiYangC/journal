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
      {/* Hero — latest selavy photograph */}
      {latestSelavy && (
        <Link href="/selavy" className="block w-full aspect-[3/1] relative overflow-hidden max-h-[50vh]">
          <Image
            src={latestSelavy.image}
            alt={latestSelavy.location}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </Link>
      )}
      {latestSelavy && (
        <Link href="/selavy" className="flex items-baseline gap-2 px-6 pt-2 hover:text-[var(--color-link)] transition-colors">
          <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)]">
            Latest Photograph
          </span>
          {latestSelavy.location !== "FILL_IN" && (
            <span className="text-xs text-[var(--color-alt)] font-serif italic">
              {latestSelavy.location}
            </span>
          )}
        </Link>
      )}

      {/* Content blocks — 2x2 grid */}
      <section className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {/* Bio */}
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)]">
              About
            </span>
            <p className="mt-3 text-lg font-serif italic leading-relaxed">
              Last seen in {BIO.lastSeenCity}. Currently working at{" "}
              <span className="font-sans font-bold not-italic">
                {BIO.currentWork}
              </span>
              .
            </p>
          </div>

          {/* Film + Book */}
          <div className="flex flex-col gap-8">
            {latestFilm && (
              <div>
                <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)]">
                  Recently Watched
                </span>
                <div className="mt-3 flex items-start gap-4">
                  {latestFilm.posterUrl && (
                    <img
                      src={latestFilm.posterUrl}
                      alt={latestFilm.title}
                      className="w-16 h-auto shrink-0"
                    />
                  )}
                  <div>
                    <a
                      href={latestFilm.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-sans font-bold hover:text-[var(--color-link)] transition-colors"
                    >
                      {latestFilm.title}
                    </a>
                    <p className="text-xs text-[var(--color-alt)] mt-1">
                      {latestFilm.year}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)]">
                Currently Reading
              </span>
              <div className="mt-3 flex items-start gap-4">
                <img
                  src={CURRENT_BOOK.coverUrl}
                  alt={CURRENT_BOOK.title}
                  className="w-16 h-auto shrink-0"
                />
                <div>
                  <p className="text-sm font-sans font-bold">
                    {CURRENT_BOOK.title}
                  </p>
                  <p className="text-xs text-[var(--color-alt)] mt-1">
                    {CURRENT_BOOK.author}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Writing */}
          {latestWriting && (
            <div>
              <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)]">
                Latest Writing
              </span>
              <Link
                href={`/writings/${latestWriting.slug}`}
                className="block mt-3 group"
              >
                <h3 className="font-serif italic font-light text-xl group-hover:text-[var(--color-link)] transition-colors">
                  {latestWriting.title}
                </h3>
                <time className="text-xs text-[var(--color-alt)] mt-2 block">
                  {new Date(latestWriting.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </time>
                <p className="mt-2 text-sm text-[var(--color-alt)] line-clamp-2">
                  {latestWriting.excerpt}
                </p>
              </Link>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
