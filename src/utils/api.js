import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMBD_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
  Authorization: "Bearer " + TMBD_TOKEN,
};

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
    const { data } = await axios.get(BASE_URL + url, { headers, params });

    cache[cacheKey] = data;

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
