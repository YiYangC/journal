import MagazineGrid from "@/components/MagazineGrid";
import { getAllArticles } from "@/lib/articles";

export default function HomePage() {
  const articles = getAllArticles();

  return <MagazineGrid articles={articles} />;
}
