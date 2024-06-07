import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const SimilarMovies = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV shows" : "Similar Movies";

  return (
    <>
      <Carousel
        title={title}
        data={data?.results}
        loading={loading}
        endPoint={mediaType}
      />
    </>
  );
};

export default SimilarMovies;
