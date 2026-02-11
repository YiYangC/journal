"use client";

import { useState } from "react";
import ArticleCard from "./ArticleCard";
import { Article } from "@/lib/types";

const CATEGORIES = ["all", "architecture", "ephemeral"] as const;

interface ArticlesContentProps {
  articles: Article[];
}

export default function ArticlesContent({ articles }: ArticlesContentProps) {
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all"
      ? articles
      : articles.filter((a) => a.category === active);

  return (
    <>
      <section className="px-[3rem] py-4 flex gap-6 border-b border-[var(--color-border)]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-sm uppercase tracking-widest transition-colors cursor-pointer ${
              active === cat
                ? "text-[var(--color-text)]"
                : "text-[var(--color-alt)] hover:text-[var(--color-text)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      <section className="p-[3rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-[var(--color-alt)] text-center py-16">
            No articles in this category yet.
          </p>
        )}
      </section>
    </>
  );
}
