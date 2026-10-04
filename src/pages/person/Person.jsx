/* eslint-disable no-unused-vars */
import React from "react";
import PersonDetails from "./personDetails/PersonDetails";
import Recommendations from "./carousels/Recommendations";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import useSeo from "../../hooks/useSeo";
import PageNotFound from "../404/PageNotFound";
import SimilarMovies from "./carousels/SimilarMovies";

const Person = () => {
  const { personId } = useParams();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch(`/person/${personId}`);
  const { data: movie, loading: movieLoading } = useFetch(
    `/person/${personId}/movie_credits`
  );

  useSeo({
    title: data?.name
      ? `${data.name} - Biography & Filmography | Movix`
      : undefined,
    description: data?.biography,
    image:
      url.profile && data?.profile_path
        ? url.profile + data.profile_path
        : undefined,
    type: "profile",
  });

  if (data?.status_code === 34) {
    return <PageNotFound />;
  }

  return (
    <div>
      <PersonDetails data={data} loading={loading} url={url} personId={personId} />
      <Recommendations data={movie} loading={movieLoading} />
      <SimilarMovies data={movie} loading={movieLoading} />
    </div>
  );
};

export default Person;
