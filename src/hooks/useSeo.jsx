import { useEffect } from "react";

const DEFAULT_DESCRIPTION =
  "Discover trending, popular and top-rated movies and TV shows. Browse cast, trailers, ratings and recommendations on Movix.";
const DEFAULT_IMAGE = "/banner.png";

const clip = (value) =>
  value.length > 160 ? `${value.slice(0, 157).trimEnd()}...` : value;

const setTag = (tag, attr, name, content) => {
  let el = document.head.querySelector(`${tag}[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute(tag === "link" ? "href" : "content", content);
};

const useSeo = ({ title, description, image, noindex = false, type = "website" }) => {
  useEffect(() => {
    if (!title) return;

    const { origin, pathname } = window.location;
    const url = origin + pathname;
    const summary = clip(description || DEFAULT_DESCRIPTION);
    const picture = new URL(image || DEFAULT_IMAGE, origin).href;

    document.title = title;
    setTag("link", "rel", "canonical", url);
    setTag("meta", "name", "description", summary);
    setTag(
      "meta",
      "name",
      "robots",
      noindex ? "noindex, follow" : "index, follow, max-image-preview:large"
    );
    setTag("meta", "property", "og:type", type);
    setTag("meta", "property", "og:title", title);
    setTag("meta", "property", "og:description", summary);
    setTag("meta", "property", "og:url", url);
    setTag("meta", "property", "og:image", picture);
    setTag("meta", "name", "twitter:title", title);
    setTag("meta", "name", "twitter:description", summary);
    setTag("meta", "name", "twitter:image", picture);
  }, [title, description, image, noindex, type]);
};

export default useSeo;
