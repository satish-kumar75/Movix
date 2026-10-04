const lists = [
  { type: "movie", path: "movie/popular" },
  { type: "movie", path: "movie/top_rated" },
  { type: "tv", path: "tv/popular" },
  { type: "tv", path: "tv/top_rated" },
];
const pages = [1, 2, 3];

const fetchList = async (path, page) => {
  const res = await fetch(`https://api.themoviedb.org/3/${path}?page=${page}`, {
    headers: { Authorization: `Bearer ${process.env.VITE_APP_TMDB_TOKEN}` },
  });
  if (!res.ok) return [];
  return (await res.json()).results || [];
};

export default async function handler(req, res) {
  const origin = `https://${req.headers.host}`;
  const urls = new Set([
    "/",
    "/explore/movie",
    "/explore/tv",
    "/about",
    "/privacy",
  ]);

  const results = await Promise.all(
    lists.flatMap(({ type, path }) =>
      pages.map(async (page) => ({ type, items: await fetchList(path, page) }))
    )
  );

  results.forEach(({ type, items }) =>
    items.forEach((item) => urls.add(`/${type}/${item.id}`))
  );

  const body = [...urls]
    .map((path) => `  <url><loc>${origin}${path}</loc></url>`)
    .join("\n");

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");
  res.status(200).send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`
  );
}
