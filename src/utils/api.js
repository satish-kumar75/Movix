import axios from "axios";

// Same-origin proxy (api/tmdb.js on Vercel, Vite proxy in dev).
// The TMDB token is only read server-side, never in the browser bundle.
const BASE_URL = "/api/tmdb";

const cache = {};

const generateCacheKey = (url, params) => {
  const paramStr = params ? JSON.stringify(params) : "";
  return `${url}?${paramStr}`;
};

export const fetchDataFromApi = async (url, params) => {
  const cacheKey = generateCacheKey(url, params);

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    const { data } = await axios.get(BASE_URL + url, { params });

    cache[cacheKey] = data;

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
