import Link from "next/link";
import { getAllWritings } from "@/lib/writings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studies | Yi Yang",
  description: "Selected projects and essays on architecture, technology, media, and design.",
};

const PROJECTS = [
  {
    slug: "concrete-memories",
    title: "Concrete Memories",
    description:
      "For a material that takes the form of its form, that contours the texture from the surface of what it forms against, Concrete was never brutal, nor rough to me.",
    year: "2022",
    type: "project" as const,
  },
];

export default function StudiesPage() {
  const writings = getAllWritings().map((w) => ({ ...w, type: "writing" as const }));

  // Combine and sort by date
  const allStudies = [
    ...PROJECTS.map(p => ({ ...p, date: `${p.year}-01-01` })),
    ...writings
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <section className="p-[3rem] min-h-[40vh] flex flex-col justify-end">
        <p className="text-[clamp(1rem,4vw,1.5rem)] text-[var(--color-alt)] mb-4">
          <span className="mr-2">&mdash;</span>selected work
        </p>
        <h1 className="text-[clamp(2.5rem,9vw,7.25rem)] font-serif italic font-light leading-[0.8]">
          Studies
        </h1>
      </section>

      <section className="p-[3rem] max-w-3xl">
        <div className="flex flex-col">
          {allStudies.map((item) => {
            const isProject = item.type === "project";
            const href = isProject ? `/projects/${item.slug}` : `/writings/${item.slug}`;

            return (
              <Link
                key={item.slug}
                href={href}
                className="group py-6 border-b border-[var(--color-border)] block"
              >
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h2 className="text-lg md:text-xl font-bold uppercase tracking-[0.02em] leading-tight group-hover:text-[var(--color-link-hover)] transition-colors">
                    {item.title}
                  </h2>
                  <time className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-alt)] shrink-0">
                    {isProject
                      ? item.year
                      : new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                  </time>
                </div>
                <p className="text-sm text-[var(--color-alt)] font-serif italic leading-relaxed">
                  {isProject ? (item as any).description : (item as any).excerpt}
                </p>
                {!isProject && (
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-alt)] mt-2 inline-block">
                    {item.readingTime}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
