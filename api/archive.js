const normalize = (value = "") =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({});
  }

  const { title, original, year } = req.query;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    title.length > 120 ||
    !/^[0-9]{4}$/.test(year)
  ) {
    return res.status(400).json({});
  }

  const wanted = [title, original]
    .filter((value) => typeof value === "string" && value.trim())
    .map(normalize);

  const query = `title:("${title.replace(/["\\]/g, " ")}") AND collection:feature_films AND year:${year}`;
  const params = new URLSearchParams({
    q: query,
    rows: "10",
    output: "json",
  });
  params.append("fl[]", "identifier");
  params.append("fl[]", "title");
  params.append("sort[]", "downloads desc");

  try {
    const upstream = await fetch(
      `https://archive.org/advancedsearch.php?${params}`
    );

    if (!upstream.ok) {
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json({});
    }

    const { response } = await upstream.json();
    const match = (response?.docs || []).find((doc) => {
      const found = normalize(doc.title);
      return wanted.some((name) => name && found.startsWith(name));
    });

    res.setHeader(
      "Cache-Control",
      "s-maxage=86400, stale-while-revalidate=604800"
    );
    res.status(200).json(match ? { identifier: match.identifier } : {});
  } catch {
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({});
  }
}
