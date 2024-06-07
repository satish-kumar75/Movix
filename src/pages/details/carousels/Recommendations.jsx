import React from "react";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Recommendations = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );

  return (
    <>
      <Carousel
        title="Recommendations"
        data={data?.results}
        loading={loading}
        endPoint={mediaType}
      />
    </>
  );
};

export default Recommendations;
