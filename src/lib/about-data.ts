export const BIO = {
  lastSeenCity: "San Francisco",
  currentWork: "exa.ai",
};

export const CURRENT_BOOK = {
  title: "Orbital",
  author: "Samantha Harvey",
  coverUrl: "https://covers.openlibrary.org/b/isbn/9780802161543-L.jpg",
  startedDate: "2026-02-01",
};

export interface Book {
  title: string;
  author: string;
  coverUrl: string;
  startedDate?: string;
  finishedDate?: string;
  current?: boolean;
}

export interface TopFilm {
  title: string;
  year: string;
  letterboxdSlug: string;
}

export const TOP_FILMS: TopFilm[] = [
  { title: "2001: A Space Odyssey", year: "1968", letterboxdSlug: "2001-a-space-odyssey" },
  { title: "宇宙探索编辑部", year: "2023", letterboxdSlug: "journey-to-the-west-2021" },
  { title: "路边野餐", year: "2015", letterboxdSlug: "kaili-blues" },
  { title: "Tampopo", year: "1985", letterboxdSlug: "tampopo" },
  { title: "8½", year: "1963", letterboxdSlug: "8-half" },
  { title: "Vertigo", year: "1958", letterboxdSlug: "vertigo" },
  { title: "椒麻堂会", year: "2021", letterboxdSlug: "a-new-old-play" },
  { title: "Princess Mononoke", year: "1997", letterboxdSlug: "princess-mononoke" },
  { title: "Perfect Blue", year: "1997", letterboxdSlug: "perfect-blue" },
  { title: "Yi Yi", year: "2000", letterboxdSlug: "yi-yi" },
];

export const BOOKS: Book[] = [
  {
    title: "Orbital",
    author: "Samantha Harvey",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780802161543-L.jpg",
    startedDate: "2026-02-01",
    current: true,
  },
  {
    title: "Men Without Women",
    author: "Haruki Murakami",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780451494627-L.jpg",
    finishedDate: "2025-12-01",
  },
  {
    title: "Kafka on the Shore",
    author: "Haruki Murakami",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781400079278-L.jpg",
    finishedDate: "2025-12-01",
  },
];
