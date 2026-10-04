import axios from "axios";

const BASE_URL = "/api/tmdb";
const ARCHIVE_URL = "/api/archive";

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
    const target = url.startsWith("/archive")
      ? ARCHIVE_URL + url.slice("/archive".length)
      : BASE_URL + url;
    const { data } = await axios.get(target, { params });

    cache[cacheKey] = data;

    return data;
  } catch (err) {
    return err.response?.data ?? err;
  }
};
