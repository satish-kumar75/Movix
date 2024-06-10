/* eslint-disable no-unused-vars */
import React from "react";
import PersonDetails from "./personDetails/PersonDetails";
import Recommendations from "./carousels/Recommendations";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import SimilarMovies from "./carousels/SimilarMovies";

const Person = () => {
  const { personId } = useParams();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch(`/person/${personId}`);
  const { data: movie, loading: movieLoading } = useFetch(
    `/person/${personId}/movie_credits`
  );
  return (
    <div>
      <PersonDetails data={data} loading={loading} url={url} personId={personId} />
      <Recommendations data={movie} loading={movieLoading} />
      <SimilarMovies data={movie} loading={movieLoading} />
    </div>
  );
};

export default Person;
