/* eslint-disable react/prop-types */
import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Geners";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;
  return (
    <Link
      className="movieCard"
      to={`/${data.media_type || mediaType}/${data.id}`}
    >
      <div className="posterBlock">
        <Img
          className="posterImg"
          src={posterUrl}
          alt={data.title || data.name}
        />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating rating={data.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </React.Fragment>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {data.release_date || data.first_air_date
            ? dayjs(data.release_date || data.first_air_date).format("MMM D, YYYY")
            : "Not Released"}
        </span>
      </div>
    </Link>
  );
};

export default MovieCard;
