import type { Metadata } from "next";
import { getAllFilms } from "@/lib/letterboxd";
import { BOOKS } from "@/lib/about-data";

export const metadata: Metadata = {
  title: "Library",
  description: "Films watched and books read.",
};

export default async function LibraryPage() {
  const films = await getAllFilms();

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      {/* Films */}
      <div>
        <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)]">
          Films · {films.length}
        </span>
        {films.length > 0 ? (
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {films.map((film, i) => (
              <a
                key={`${film.title}-${i}`}
                href={film.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                {film.posterUrl ? (
                  <img
                    src={film.posterUrl}
                    alt={film.title}
                    className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full aspect-[2/3] bg-[var(--color-surface)] flex items-center justify-center">
                    <span className="text-xs text-[var(--color-alt)] text-center px-2">
                      {film.title}
                    </span>
                  </div>
                )}
                <p className="mt-1.5 text-xs font-sans truncate group-hover:text-[var(--color-link)] transition-colors">
                  {film.title}
                </p>
                <p className="text-[10px] text-[var(--color-alt)]">
                  {film.year}
                  {film.watchedDate && (
                    <> · {new Date(film.watchedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}</>
                  )}
                </p>
              </a>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-[var(--color-alt)]">No films yet.</p>
        )}
      </div>

      {/* Books */}
      <div className="mt-16">
        <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)]">
          Books
        </span>
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {BOOKS.map((book, i) => (
            <div key={`${book.title}-${i}`} className="group">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <p className="mt-1.5 text-xs font-sans truncate group-hover:text-[var(--color-link)] transition-colors">
                {book.title}
              </p>
              <p className="text-[10px] text-[var(--color-alt)]">
                {book.author}
                {book.current && (
                  <> · Reading</>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
