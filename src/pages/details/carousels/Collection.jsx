/* eslint-disable react/prop-types */
import { useMemo } from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Collection = ({ collection, currentId }) => {
  const { data, loading } = useFetch(
    collection ? `/collection/${collection.id}` : null
  );

  const parts = useMemo(
    () =>
      (Array.isArray(data?.parts) ? data.parts : [])
        .filter(
          (part) =>
            part.id !== currentId &&
            typeof part.vote_average === "number" &&
            Array.isArray(part.genre_ids)
        )
        .sort((a, b) => (a.release_date || "").localeCompare(b.release_date || "")),
    [data, currentId]
  );

  if (!collection || (!loading && parts.length === 0)) return null;

  return (
    <Carousel
      title={`More from ${collection.name}`}
      data={parts}
      loading={loading}
      endPoint="movie"
    />
  );
};

export default Collection;
