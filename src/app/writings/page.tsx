import WritingsMenu from "@/components/WritingsMenu";
import { getAllWritings } from "@/lib/writings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writings | Yi Yang",
  description: "Essays on architecture, technology, media, and design.",
};

const CATEGORY_MAP: Record<string, string> = {
  "where-did-the-wires-go": "product",
  "theater-sets-redux": "design",
  "choreography-and-city": "architecture",
  "hitchcockian-threshold": "film",
  "all-the-worlds-a-stage": "design",
  "customers-and-users": "product",
  "museum-as-an-archive": "architecture",
  "curated-by-grandpa": "design",
};

const CURATED_ORDER = [
  "where-did-the-wires-go",
  "what-is-archive",
  "theater-sets-redux",
  "choreography-and-city",
  "hitchcockian-threshold",
  "all-the-worlds-a-stage",
  "customers-and-users",
  "museum-as-an-archive",
  "curated-by-grandpa",
];

export default function WritingsPage() {
  const allWritings = getAllWritings();
  const writingsBySlug = new Map(allWritings.map((w) => [w.slug, w]));

  const items = CURATED_ORDER.map((slug) => writingsBySlug.get(slug)!)
    .filter(Boolean)
    .map((w) => ({
      slug: w.slug,
      title: w.title,
      href: `/writings/${w.slug}`,
      category: CATEGORY_MAP[w.slug],
    }));

  return <WritingsMenu items={items} />;
}
