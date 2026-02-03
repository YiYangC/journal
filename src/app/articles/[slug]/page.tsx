import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import { getArticleBySlug, getArticleSlugs } from "@/lib/articles";
import TagBadge from "@/components/TagBadge";
import PhotoGrid from "@/components/PhotoGrid";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  return {
    title: `${article.title} | Yi Yang`,
    description: article.excerpt,
  };
}

export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  const { content } = await compileMDX({
    source: article.content,
    options: { parseFrontmatter: false },
  });

  return (
    <article>
      <div className="w-full aspect-[21/9] relative overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <header className="p-[3rem] max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4 mt-8 flex-wrap">
          <span className="text-xs uppercase tracking-widest text-[var(--color-alt)]">
            {article.category}
          </span>
          <span className="text-xs text-[var(--color-alt)]">/</span>
          <span className="text-xs text-[var(--color-alt)]">
            {article.location}
          </span>
          <span className="text-xs text-[var(--color-alt)]">/</span>
          <time className="text-xs text-[var(--color-alt)]">
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <h1 className="text-[clamp(2.5rem,9vw,7.25rem)] font-serif italic font-light leading-[0.85]">
          {article.title}
        </h1>
        <p className="mt-4 text-sm text-[var(--color-alt)]">
          {article.readingTime}
        </p>
        <div className="mt-4 flex gap-2 flex-wrap">
          {article.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </header>

      <div className="p-[3rem] max-w-3xl mx-auto">
        <div className="prose prose-lg max-w-none">{content}</div>
      </div>

      {article.gallery && article.gallery.length > 0 && (
        <section className="mt-16">
          <div className="px-[3rem] mb-6">
            <p className="text-[clamp(1rem,4vw,1.5rem)] text-[var(--color-alt)]">
              <span className="mr-2">&mdash;</span>gallery
            </p>
          </div>
          <PhotoGrid images={article.gallery} columns={3} />
        </section>
      )}
    </article>
  );
}
