import { Article } from "@/lib/types";
import MagazineSidebarCard from "./MagazineSidebarCard";
import MagazineFeaturedCard from "./MagazineFeaturedCard";

interface MagazineGridProps {
  articles: Article[];
}

export default function MagazineGrid({ articles }: MagazineGridProps) {
  // Sort: featured first, then by date descending
  const sorted = [...articles].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const featured = sorted[0];
  const remaining = sorted.slice(1);

  // Distribute remaining articles between left and middle columns
  const leftColumn: Article[] = [];
  const middleColumn: Article[] = [];
  remaining.forEach((article, i) => {
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

      {/* Right column — featured */}
      <div className="magazine-col--featured flex flex-col">
        {featured && <MagazineFeaturedCard article={featured} />}
      </div>
    </div>
  );
}
