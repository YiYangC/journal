import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/types";

interface MagazineFeaturedCardProps {
  article: Article;
}

export default function MagazineFeaturedCard({
  article,
}: MagazineFeaturedCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col h-full"
    >
      <div className="p-5 md:p-6 lg:p-8">
        <h2 className="magazine-card__title text-xl md:text-2xl lg:text-3xl">
          {article.title}
        </h2>
        <p className="magazine-card__description text-sm md:text-base mt-3 text-[var(--color-alt)]">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--color-border)]">
          <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-alt)]">
            {article.category} / {article.location}
          </span>
          <time className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-alt)]">
            {formattedDate}
          </time>
        </div>
      </div>
      <div className="flex-1 overflow-hidden min-h-[300px]">
        <Image
          src={article.coverImage}
          alt={article.title}
          width={1200}
          height={800}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.7,1)] group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 49vw, 100vw"
          priority
        />
      </div>
    </Link>
  );
}
