export interface ArticleFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  location: string;
  coordinates?: [number, number]; // [latitude, longitude]
  gallery?: string[];
  featured?: boolean;
  category: "architecture" | "ephemeral" | "selavy";
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}

export interface Location {
  name: string;
  address: string;
  coordinates: [number, number]; // [latitude, longitude]
  visited: boolean;
  visitDate?: string | null;
}

export interface SelavyPhoto {
  image: string;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  date?: string;
}

export interface WritingFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  coverImage?: string;
}

export interface Writing extends WritingFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}
