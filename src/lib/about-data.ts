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
  posterUrl: string;
}

export const TOP_FILMS: TopFilm[] = [
  { title: "2001: A Space Odyssey", year: "1968", letterboxdSlug: "2001-a-space-odyssey", posterUrl: "https://a.ltrbxd.com/resized/film-poster/5/1/9/8/7/51987-2001-a-space-odyssey-0-230-0-345-crop.jpg?v=a69c46a272" },
  { title: "宇宙探索编辑部", year: "2023", letterboxdSlug: "journey-to-the-west-2021", posterUrl: "https://a.ltrbxd.com/resized/film-poster/7/6/6/3/1/4/766314-journey-to-the-west-0-230-0-345-crop.jpg?v=fbbae971e9" },
  { title: "Tampopo", year: "1985", letterboxdSlug: "tampopo", posterUrl: "https://a.ltrbxd.com/resized/sm/upload/k3/go/u7/hd/faozWWMAM4aK0C4uRUAR1jzkJio-0-230-0-345-crop.jpg?v=f6c50539a6" },
  { title: "8½", year: "1963", letterboxdSlug: "8-half", posterUrl: "https://a.ltrbxd.com/resized/sm/upload/qt/2y/ms/4w/5pQlc8dp5dXzWg1yM70DZrsDpOl-0-230-0-345-crop.jpg?v=17965d9ac6" },
  { title: "Vertigo", year: "1958", letterboxdSlug: "vertigo", posterUrl: "https://a.ltrbxd.com/resized/sm/upload/q9/3o/ng/om/obhM86qyv8RsE69XSMTtT9FdE0b-0-230-0-345-crop.jpg?v=1403a5e003" },
  { title: "椒麻堂会", year: "2021", letterboxdSlug: "a-new-old-play", posterUrl: "https://a.ltrbxd.com/resized/film-poster/4/4/2/9/3/2/442932-a-new-old-play-0-230-0-345-crop.jpg?v=a9beefbbfd" },
  { title: "Princess Mononoke", year: "1997", letterboxdSlug: "princess-mononoke", posterUrl: "https://a.ltrbxd.com/resized/sm/upload/fu/5h/fp/mj/mNqZOtJIQfFQPjo3hmYLIn8Qqhf-0-230-0-345-crop.jpg?v=aae03975f7" },
  { title: "Yi Yi", year: "2000", letterboxdSlug: "yi-yi", posterUrl: "https://a.ltrbxd.com/resized/sm/upload/7s/h0/6e/0f/hhsYCYVPy1V0eTjkGNGdvpDO2qk-0-230-0-345-crop.jpg?v=f8d5b0fe80" },
  { title: "Perfect Blue", year: "1997", letterboxdSlug: "perfect-blue", posterUrl: "https://a.ltrbxd.com/resized/film-poster/4/6/1/7/5/46175-perfect-blue-0-230-0-345-crop.jpg?v=1ed5878cce" },
  { title: "Pain and Glory", year: "2019", letterboxdSlug: "pain-and-glory", posterUrl: "https://a.ltrbxd.com/resized/film-poster/4/4/8/4/4/5/448445-pain-and-glory-0-230-0-345-crop.jpg?v=3e99d7fc67" },
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
  {
    title: "少年來了",
    author: "韓江 (Han Kang)",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781101906743-L.jpg",
    finishedDate: "2024-10-28",
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg",
    finishedDate: "2024-01-02",
  },
  {
    title: "老派少女购物路线",
    author: "洪爱珠",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9789573289982-L.jpg",
    finishedDate: "2023-12-03",
  },
  {
    title: "Crying in H Mart",
    author: "Michelle Zauner",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780525657746-L.jpg",
    finishedDate: "2023-12-03",
  },
  {
    title: "Yellowface",
    author: "R.F. Kuang",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780063250833-L.jpg",
    finishedDate: "2023-12-03",
  },
  {
    title: "Babel",
    author: "R.F. Kuang",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780063021426-L.jpg",
    finishedDate: "2023-12-03",
  },
  {
    title: "東京製造",
    author: "Made in Tokyo",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9784767804545-L.jpg",
    finishedDate: "2020-12-29",
  },
  {
    title: "乡土中国",
    author: "费孝通",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9787208146617-L.jpg",
    finishedDate: "2021-07-25",
  },
  {
    title: "Ways of Seeing",
    author: "John Berger",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780141035796-L.jpg",
    finishedDate: "2021-06-20",
  },
  {
    title: "心",
    author: "夏目漱石 (Natsume Soseki)",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780143106036-L.jpg",
    finishedDate: "2020-12-29",
  },
  {
    title: "梦十夜",
    author: "夏目漱石 (Natsume Soseki)",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780486797106-L.jpg",
    finishedDate: "2020-08-28",
  },
  {
    title: "Nine Stories",
    author: "J.D. Salinger",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780316769501-L.jpg",
    finishedDate: "2020-06-07",
  },
  {
    title: "神经漫游者",
    author: "William Gibson",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780441569595-L.jpg",
    finishedDate: "2020-02-01",
  },
  {
    title: "Project Japan",
    author: "Rem Koolhaas & Hans-Ulrich Obrist",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9783836525084-L.jpg",
    finishedDate: "2022-01-03",
  },
  {
    title: "Exercises in Style",
    author: "Raymond Queneau",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780811207898-L.jpg",
    finishedDate: "2022-01-02",
  },
  {
    title: "As Found Houses",
    author: "John Lin & Sony Devabhaktuni",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781951541538-L.jpg",
    finishedDate: "2021-12-12",
  },
];
