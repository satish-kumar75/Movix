const escape = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const clip = (value = "") =>
  value.length > 160 ? `${value.slice(0, 157).trimEnd()}...` : value;

const headTags =
  /<title>[\s\S]*?<\/title>|<meta (?:name="(?:description|robots|twitter:[^"]*)"|property="og:[^"]*")[^>]*>|<script type="application\/ld\+json">[\s\S]*?<\/script>|<link rel="canonical"[^>]*>/g;

const buildHead = ({ origin, mediaType, id, data }) => {
  const url = `${origin}/${mediaType}/${id}`;

  if (!data) {
    return `<title>Page not found | Movix</title>\n  <meta name="robots" content="noindex, follow" />`;
  }

  const name = data.title || data.name;
  const date = data.release_date || data.first_air_date;
  const title = `${name}${date ? ` (${date.slice(0, 4)})` : ""} | Movix`;
  const description =
    clip(data.overview) ||
    `Details, cast, trailer and recommendations for ${name} on Movix.`;
  const image = data.backdrop_path
    ? `${origin}/tmdb-img/w780${data.backdrop_path}`
    : `${origin}/banner.png`;
  const type = mediaType === "tv" ? "video.tv_show" : "video.movie";

  const schema = {
    "@context": "https://schema.org",
    "@type": mediaType === "tv" ? "TVSeries" : "Movie",
    name,
    url,
    description: data.overview || undefined,
    image,
    datePublished: date || undefined,
    genre: data.genres?.map((genre) => genre.name),
    aggregateRating: data.vote_count
      ? {
          "@type": "AggregateRating",
          ratingValue: Number(data.vote_average.toFixed(1)),
          ratingCount: data.vote_count,
          bestRating: 10,
          worstRating: 0,
        }
      : undefined,
  };

  return [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="Movix" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(title)}" />`,
    `<meta name="twitter:description" content="${escape(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
  ].join("\n  ");
};

export default async function handler(req, res) {
  const { mediaType, id } = req.query;
  const origin = `https://${req.headers.host}`;

  if (!/^(movie|tv)$/.test(mediaType) || !/^[0-9]+$/.test(id)) {
    return res.status(404).send("Not found");
  }

  try {
    const [page, tmdb] = await Promise.all([
      fetch(`${origin}/index.html`),
      fetch(`https://api.themoviedb.org/3/${mediaType}/${id}`, {
        headers: { Authorization: `Bearer ${process.env.VITE_APP_TMDB_TOKEN}` },
      }),
    ]);

    const html = await page.text();

    if (!tmdb.ok && tmdb.status !== 404) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).send(html);
    }

    const data = tmdb.ok ? await tmdb.json() : null;
    const head = buildHead({ origin, mediaType, id, data });

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      data ? "s-maxage=86400, stale-while-revalidate=604800" : "s-maxage=3600"
    );
    res
      .status(data ? 200 : 404)
      .send(
        html.replace(headTags, "").replace("</head>", () => `  ${head}\n</head>`)
      );
  } catch {
    res.status(502).send("Bad gateway");
  }
}
