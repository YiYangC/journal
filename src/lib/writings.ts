import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Writing, WritingFrontmatter } from "./types";

const WRITINGS_DIR = path.join(process.cwd(), "content", "writings");

export function getWritingSlugs(): string[] {
  if (!fs.existsSync(WRITINGS_DIR)) return [];
  return fs
    .readdirSync(WRITINGS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getWritingBySlug(slug: string): Writing {
  const filePath = path.join(WRITINGS_DIR, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    content,
    readingTime: stats.text,
    ...(data as WritingFrontmatter),
  };
}

export function getAllWritings(): Writing[] {
  return getWritingSlugs()
    .map(getWritingBySlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
