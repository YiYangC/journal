import { compileMDX } from "next-mdx-remote/rsc";
import { getWritingBySlug, getWritingSlugs } from "@/lib/writings";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getWritingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const writing = getWritingBySlug(slug);
  return {
    title: `${writing.title} | Yi Yang`,
    description: writing.excerpt,
  };
}

export default async function WritingPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const writing = getWritingBySlug(slug);
  const { content } = await compileMDX({
    source: writing.content,
    options: { parseFrontmatter: false },
  });

  return (
    <article>
      <header className="p-[3rem] max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4 mt-8">
          <time className="text-xs text-[var(--color-alt)]">
            {new Date(writing.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </time>
          <span className="text-xs text-[var(--color-alt)]">/</span>
          <span className="text-xs text-[var(--color-alt)]">
            {writing.readingTime}
          </span>
        </div>
        <h1 className="text-[clamp(2.5rem,9vw,5rem)] font-serif italic font-light leading-[0.85]">
          {writing.title}
        </h1>
        <p className="mt-6 text-[clamp(1rem,3vw,1.25rem)] text-[var(--color-alt)] font-serif italic leading-relaxed">
          {writing.excerpt}
        </p>
      </header>

      <div className="p-[3rem] max-w-3xl mx-auto">
        <div className="prose prose-lg max-w-none">{content}</div>
      </div>
    </article>
  );
}
