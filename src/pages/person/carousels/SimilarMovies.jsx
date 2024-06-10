/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Carousel from "../../../components/carousel/Carousel";

const SimilarMovies = ({ data, loading }) => {
  const sortedCrew = data?.crew?.sort(
    (a, b) => b.vote_average - a.vote_average
  );

  return (
    <>
      <Carousel
        title="Known For Production Roles"
        data={sortedCrew}
        loading={loading}
        endPoint={"movie"}
      />
    </>
  );
};

export default SimilarMovies;
