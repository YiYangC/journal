import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Article, ArticleFrontmatter } from "./types";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getArticleBySlug(slug: string): Article {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    content,
    readingTime: stats.text,
    ...(data as ArticleFrontmatter),
  };
}

export function getAllArticles(): Article[] {
  return getArticleSlugs()
    .map(getArticleBySlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((a) => a.featured);
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((a) =>
    a.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllArticles().forEach((a) => a.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter(
    (a) => a.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  const cats = new Set<string>();
  getAllArticles().forEach((a) => cats.add(a.category));
  return Array.from(cats).sort();
}
