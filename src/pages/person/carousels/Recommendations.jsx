/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Carousel from "../../../components/carousel/Carousel";

const Recommendations = ({ data, loading }) => {


  const sortedCast = data?.cast?.sort(
    (a, b) => b.vote_average - a.vote_average
  );


  return (
    <>
      <Carousel
        title="Known For Acting Roles"
        data={sortedCast}
        loading={loading}
        endPoint={"movie"}
      />
    </>
  );
};

export default Recommendations;
