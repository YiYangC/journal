import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/types";

interface MagazineSidebarCardProps {
  article: Article;
}

export default function MagazineSidebarCard({
  article,
}: MagazineSidebarCardProps) {
  return (
    <Link
      href={`/archive/${article.slug}`}
      className="group block"
    >
      <div className="overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.title}
          width={600}
          height={800}
          className="w-full h-auto object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.7,1)] group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="p-3 md:p-5">
        <h2 className="magazine-card__title text-xs md:text-base">
          {article.title}
        </h2>
        <p className="magazine-card__description text-xs md:text-sm mt-1 md:mt-2 text-[var(--color-alt)] line-clamp-2 md:line-clamp-none">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
