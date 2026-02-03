import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Yi Yang",
};

export default function AboutPage() {
  return (
    <>
      <section className="p-[3rem] min-h-[40vh] flex flex-col justify-end">
        <p className="text-[clamp(1rem,4vw,1.5rem)] text-[var(--color-alt)] mb-4">
          <span className="mr-2">&mdash;</span>about
        </p>
        <h1 className="text-[clamp(2.5rem,9vw,7.25rem)] font-serif italic font-light leading-[0.8]">
          Yi Yang
        </h1>
      </section>

      <section className="p-[3rem] max-w-3xl section--numbered">
        <p className="text-[clamp(1rem,4vw,1.9rem)] leading-relaxed mb-8">
          Architecture, design, and travel through the lens of material and
          memory. This journal documents encounters with the built environment
          across continents, tracing the quiet presence of concrete, stone,
          wood, and light.
        </p>
        <p className="text-[clamp(1rem,4vw,1.5rem)] text-[var(--color-alt)] leading-relaxed">
          Yi Yang is a designer and writer based between New York and Tokyo.
          Her work explores the intersection of architecture, materiality, and
          place.
        </p>
      </section>
    </>
  );
}
