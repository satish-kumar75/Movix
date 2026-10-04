/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
const useFetch = (url, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null);
    setError(null);

    if (!url) {
      setLoading(false);
      return;
    }

    let active = true;
    setLoading("loading...");

    fetchDataFromApi(url, params)
      .then((res) => {
        if (!active) return;
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        if (!active) return;
        setLoading(false);
        setError("Something went wrong!");
      });

    return () => {
      active = false;
    };
  }, [url, params]);

  return { data, loading, error };
};

export default useFetch;
