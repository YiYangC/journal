export interface LetterboxdFilm {
  title: string;
  year: string;
  link: string;
  posterUrl: string;
  watchedDate: string;
}

export async function getLatestFilm(): Promise<LetterboxdFilm | null> {
  const username = process.env.NEXT_PUBLIC_LETTERBOXD_USER;
  if (!username) return null;

  try {
    const res = await fetch(`https://letterboxd.com/${username}/rss/`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const xml = await res.text();

    const itemMatch = xml.match(/<item>([\s\S]*?)<\/item>/);
    if (!itemMatch) return null;
    const item = itemMatch[1];

    const title =
      item.match(/<letterboxd:filmTitle>(.*?)<\/letterboxd:filmTitle>/)?.[1] ??
      "";
    const year =
      item.match(/<letterboxd:filmYear>(.*?)<\/letterboxd:filmYear>/)?.[1] ??
      "";
    const link = item.match(/<link>(.*?)<\/link>/)?.[1] ?? "";
    const watchedDate =
      item.match(
        /<letterboxd:watchedDate>(.*?)<\/letterboxd:watchedDate>/
      )?.[1] ?? "";

    const description =
      item.match(/<description>([\s\S]*?)<\/description>/)?.[1] ?? "";
    const posterUrl =
      description.match(/src=(?:"|&quot;)(https:\/\/[^"&]*?)(?:"|&quot;)/)?.[1] ?? "";

    if (!title) return null;

    return { title, year, link, posterUrl, watchedDate };
  } catch {
    return null;
  }
}
