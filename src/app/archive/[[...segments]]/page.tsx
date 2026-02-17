import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import {
  getAllArticles,
  getArticleBySlug,
  getArticleSlugs,
  getArticlesByCategory,
  getAllCategories,
} from "@/lib/articles";
import MagazineGrid from "@/components/MagazineGrid";
import ArticleCard from "@/components/ArticleCard";
import TagBadge from "@/components/TagBadge";
import PhotoGrid from "@/components/PhotoGrid";
import type { Metadata } from "next";

const CATEGORIES = new Set(["architecture", "ephemeral"]);

export async function generateStaticParams() {
  const slugs = getArticleSlugs().map((slug) => ({ segments: [slug] }));
  const categories = getAllCategories().map((cat) => ({
    segments: [cat],
  }));
  return [{ segments: [] }, ...categories, ...slugs];
}

export async function generateMetadata(props: {
  params: Promise<{ segments?: string[] }>;
}): Promise<Metadata> {
  const { segments } = await props.params;

  if (!segments || segments.length === 0) {
    return { title: "Archive | Yi Yang" };
  }

  const [segment] = segments;

  if (CATEGORIES.has(segment) || getAllCategories().includes(segment)) {
    return { title: `${segment.charAt(0).toUpperCase() + segment.slice(1)} | Yi Yang` };
  }

  const article = getArticleBySlug(segment);
  return {
    title: `${article.title} | Yi Yang`,
    description: article.excerpt,
  };
}

export default async function ArchivePage(props: {
  params: Promise<{ segments?: string[] }>;
}) {
  const { segments } = await props.params;

  // No segments → magazine grid (homepage)
  if (!segments || segments.length === 0) {
    const articles = getAllArticles();
    return <MagazineGrid articles={articles} />;
  }

  const [segment] = segments;

  // Category filter
  if (CATEGORIES.has(segment) || getAllCategories().includes(segment)) {
    const articles = getArticlesByCategory(segment);
    return (
      <>
        <section className="p-[3rem] min-h-[40vh] flex flex-col justify-end">
          <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-serif italic font-light leading-tight">
            {segment}
          </h1>
          <p className="mt-4 text-sm text-[var(--color-alt)]">
            {articles.length} article{articles.length !== 1 ? "s" : ""}
          </p>
        </section>

        <section className="p-[3rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      </>
    );
  }

  // Article detail
  const article = getArticleBySlug(segment);
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
