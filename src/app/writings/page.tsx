import Link from "next/link";
import { getAllWritings } from "@/lib/writings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writings | Yi Yang",
  description: "Essays on architecture, technology, media, and design.",
};

export default function WritingsPage() {
  const writings = getAllWritings();

  return (
    <>
      <section className="p-[3rem] min-h-[40vh] flex flex-col justify-end">
        <p className="text-[clamp(1rem,4vw,1.5rem)] text-[var(--color-alt)] mb-4">
          <span className="mr-2">&mdash;</span>essays
        </p>
        <h1 className="text-[clamp(2.5rem,9vw,7.25rem)] font-serif italic font-light leading-[0.8]">
          Writings
        </h1>
      </section>

      <section className="p-[3rem] max-w-3xl">
        <div className="flex flex-col">
          {writings.map((writing) => (
            <Link
              key={writing.slug}
              href={`/writings/${writing.slug}`}
              className="group py-6 border-b border-[var(--color-border)] block"
            >
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h2 className="text-lg md:text-xl font-bold uppercase tracking-[0.02em] leading-tight group-hover:text-[var(--color-link-hover)] transition-colors">
                  {writing.title}
                </h2>
                <time className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-alt)] shrink-0">
                  {new Date(writing.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </time>
              </div>
              <p className="text-sm text-[var(--color-alt)] font-serif italic leading-relaxed">
                {writing.excerpt}
              </p>
              <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-alt)] mt-2 inline-block">
                {writing.readingTime}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
