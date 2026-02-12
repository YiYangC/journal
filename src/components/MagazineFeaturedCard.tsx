"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Article } from "@/lib/types";

interface MagazineFeaturedCardProps {
  article: Article;
  articles?: Article[];
}

export default function MagazineFeaturedCard({
  articles = [],
}: MagazineFeaturedCardProps) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const items = articles.length > 0 ? articles : [];

  return (
    <div className="h-full bg-[var(--color-surface)] text-[var(--color-text)] overflow-y-auto">
      {items.map((article) => {
        const isExpanded = expandedSlug === article.slug;
        const formattedDate = new Date(article.date).toLocaleDateString(
          "en-US",
          { year: "numeric", month: "short" }
        );

        return (
          <div
            key={article.slug}
            className="border-b border-[var(--color-border)]"
          >
            <button
              onClick={() =>
                setExpandedSlug(isExpanded ? null : article.slug)
              }
              className="w-full text-left px-5 py-4 md:px-6 md:py-5 flex items-baseline justify-between gap-4 hover:bg-[var(--color-bg)] transition-colors cursor-pointer"
            >
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.02em] leading-tight">
                {article.title}
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-alt)] shrink-0">
                {formattedDate}
              </span>
            </button>

            {isExpanded && (
              <div className="px-5 pb-5 md:px-6 md:pb-6">
                <Link href={`/archive/${article.slug}`} className="block group">
                  <div className="overflow-hidden">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.7,1)] group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 49vw, 100vw"
                    />
                  </div>
                  <p className="mt-3 text-sm text-[var(--color-alt)] font-serif italic leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border)]">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-alt)]">
                      {article.category} / {article.location}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-alt)] group-hover:text-[var(--color-text)] transition-colors">
                      Read &rarr;
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
