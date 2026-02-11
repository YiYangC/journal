import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Yi Yang",
  description: "Selected projects by Yi Yang.",
};

const PROJECTS = [
  {
    slug: "concrete-memories",
    title: "Concrete Memories",
    description:
      "For a material that takes the form of its form, that contours the texture from the surface of what it forms against, Concrete was never brutal, nor rough to me.",
    year: "2022",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="p-[3rem] min-h-[40vh] flex flex-col justify-end">
        <p className="text-[clamp(1rem,4vw,1.5rem)] text-[var(--color-alt)] mb-4">
          <span className="mr-2">&mdash;</span>selected work
        </p>
        <h1 className="text-[clamp(2.5rem,9vw,7.25rem)] font-serif italic font-light leading-[0.8]">
          Projects
        </h1>
      </section>

      <section className="p-[3rem]">
        {PROJECTS.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block py-8 border-b border-[var(--color-border)]"
          >
            <div className="flex items-baseline justify-between gap-4 mb-3">
              <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-serif italic font-light leading-tight group-hover:text-[var(--color-link-hover)] transition-colors">
                {project.title}
              </h2>
              <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)] shrink-0">
                {project.year}
              </span>
            </div>
            <p className="text-sm text-[var(--color-alt)] max-w-2xl font-serif italic leading-relaxed">
              {project.description}
            </p>
          </Link>
        ))}
      </section>
    </>
  );
}
