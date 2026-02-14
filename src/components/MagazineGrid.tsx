import { Article } from "@/lib/types";
import MagazineSidebarCard from "./MagazineSidebarCard";
import MagazineFeaturedCard from "./MagazineFeaturedCard";

interface MagazineGridProps {
  articles: Article[];
}

export default function MagazineGrid({ articles }: MagazineGridProps) {
  // Sort by date descending
  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Distribute articles between left and middle columns
  const leftColumn: Article[] = [];
  const middleColumn: Article[] = [];
  sorted.forEach((article, i) => {
    if (i % 2 === 0) {
      leftColumn.push(article);
    } else {
      middleColumn.push(article);
    }
  });

  return (
    <div className="magazine-grid">
      {/* Left column */}
      <div className="flex flex-col">
        {leftColumn.map((article) => (
          <MagazineSidebarCard key={article.slug} article={article} />
        ))}
      </div>

      {/* Middle column */}
      <div className="flex flex-col">
        {middleColumn.map((article) => (
          <MagazineSidebarCard key={article.slug} article={article} />
        ))}
      </div>

      {/* Right column — black panel with expandable list (hidden on mobile) */}
      <div className="magazine-col--featured hidden md:flex flex-col">
        <MagazineFeaturedCard article={sorted[0]} articles={sorted} />
      </div>
    </div>
  );
}
