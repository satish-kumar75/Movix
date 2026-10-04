const allowedPath = /^(movie|tv|person|search|discover|trending|genre)(\/[A-Za-z0-9_]+)*$/;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ status_message: "Method not allowed" });
  }

  const { path, ...query } = req.query;

  if (typeof path !== "string" || !allowedPath.test(path)) {
    return res.status(404).json({ status_message: "Not found" });
  }

  const search = new URLSearchParams(query).toString();
  const url = `https://api.themoviedb.org/3/${path}${search ? `?${search}` : ""}`;

  try {
    const upstream = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.VITE_APP_TMDB_TOKEN}` },
    });
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Cache-Control",
      upstream.ok ? "s-maxage=3600, stale-while-revalidate=86400" : "no-store"
    );
    res.status(upstream.status).send(await upstream.text());
  } catch {
    res.status(502).json({ status_message: "TMDB unreachable" });
  }
}
