import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/types";
import TagBadge from "./TagBadge";

interface ArticleCardProps {
  article: Article;
  variant?: "large" | "standard";
  priority?: boolean;
}

export default function ArticleCard({
  article,
  variant = "standard",
  priority = false,
}: ArticleCardProps) {
  const isLarge = variant === "large";

  return (
    <Link
      href={`/archive/${article.slug}`}
      className="article-card group block"
    >
      <div
        className={`overflow-hidden ${isLarge ? "aspect-[16/10]" : "aspect-[4/3]"}`}
      >
        <Image
          src={article.coverImage}
          alt={article.title}
          width={1200}
          height={isLarge ? 750 : 900}
          className="article-card__image w-full h-full object-cover"
          sizes={
            isLarge
              ? "(min-width: 768px) 50vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          }
          priority={priority}
        />
      </div>
      <div className={isLarge ? "mt-6" : "mt-4"}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs uppercase tracking-widest text-[var(--color-alt)]">
            {article.category}
          </span>
          <span className="text-xs text-[var(--color-alt)]">/</span>
          <span className="text-xs text-[var(--color-alt)]">
            {article.location}
          </span>
        </div>
        <h2
          className={`font-serif italic font-light leading-tight group-hover:text-[var(--color-link-hover)] transition-colors ${
            isLarge
              ? "text-[clamp(1rem,4vw,2.25rem)]"
              : "text-[clamp(1rem,4vw,1.5rem)]"
          }`}
        >
          {article.title}
        </h2>
        <p className="mt-2 text-sm text-[var(--color-alt)] line-clamp-2">
          {article.excerpt}
        </p>
        <div className="mt-3 flex gap-2 flex-wrap">
          {article.tags.slice(0, 3).map((tag) => (
            <TagBadge key={tag} tag={tag} clickable={false} />
          ))}
        </div>
      </div>
    </Link>
  );
}
