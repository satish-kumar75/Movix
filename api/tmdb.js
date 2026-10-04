export default async function handler(req, res) {
  const { path, ...query } = req.query;
  const search = new URLSearchParams(query).toString();
  const url = `https://api.themoviedb.org/3/${path}${search ? `?${search}` : ""}`;

  try {
    const upstream = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.VITE_APP_TMDB_TOKEN}` },
    });
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.status(upstream.status).send(await upstream.text());
  } catch {
    res.status(502).json({ status_message: "TMDB unreachable" });
  }
}
