import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Yi Yang",
  description:
    "Exploring intersection between tech and design. Obsessed with the nature of media.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero image */}
      <div className="w-full aspect-[21/9] relative overflow-hidden">
        <Image
          src="https://ik.imagekit.io/mrdwtdivtag/Writings/IMG_0198_RmcYghXe0.png?updatedAt=1683443722972"
          alt="Yi Yang"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <section className="p-[3rem] min-h-[30vh] flex flex-col justify-end">
        <p className="text-[clamp(1rem,4vw,1.5rem)] text-[var(--color-alt)] mb-4">
          <span className="mr-2">&mdash;</span>about
        </p>
        <h1 className="text-[clamp(2.5rem,9vw,7.25rem)] font-serif italic font-light leading-[0.8]">
          Yi Yang
        </h1>
      </section>

      <section className="p-[3rem] max-w-3xl section--numbered">
        <p className="text-[clamp(1rem,4vw,1.9rem)] leading-relaxed mb-8">
          Exploring intersection between tech and design. Obsessed with the
          nature of media.
        </p>
        <p className="text-[clamp(1rem,4vw,1.5rem)] text-[var(--color-alt)] leading-relaxed">
          Yi Yang is a designer and writer based between New York and Tokyo. Her
          work explores the intersection of architecture, materiality, and
          place.
        </p>
      </section>

      <section className="p-[3rem] max-w-3xl section--numbered">
        <p className="text-[clamp(1rem,4vw,1.5rem)] text-[var(--color-alt)] leading-relaxed mb-8">
          Architecture, design, and travel through the lens of material and
          memory. This journal documents encounters with the built environment
          across continents, tracing the quiet presence of concrete, stone,
          wood, and light.
        </p>
        <nav className="flex flex-wrap gap-6">
          <Link
            href="/archive"
            className="text-sm uppercase tracking-[0.15em] text-[var(--color-alt)] hover:text-[var(--color-text)] transition-colors"
          >
            Archive
          </Link>
          <Link
            href="/projects/concrete-memories"
            className="text-sm uppercase tracking-[0.15em] text-[var(--color-alt)] hover:text-[var(--color-text)] transition-colors"
          >
            Concrete Memories
          </Link>
          <Link
            href="/writings"
            className="text-sm uppercase tracking-[0.15em] text-[var(--color-alt)] hover:text-[var(--color-text)] transition-colors"
          >
            Writings
          </Link>
        </nav>
      </section>
    </>
  );
}
