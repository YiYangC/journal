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
