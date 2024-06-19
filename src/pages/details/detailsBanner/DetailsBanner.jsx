/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Geners.jsx";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../PlayIcon.jsx";
import VideoPopup from "../../../components/videoPopup/VideoPopup.jsx";
import VidSrcPlayer from "../../../components/vidSrcPlayer/VidSrcPlayer.jsx";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [isTrailer, setIsTrailer] = useState(true);
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");

  const writer = crew?.filter(
    (f) => f.job === "Writer" || f.job === "Screenplay" || f.job === "Story"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const handleTrailerClick = () => {
    setShow(true);
    setVideoId(video.key);
    setIsTrailer(true);
  };

  const handleMovieClick = () => {
    setShow(true);
    setVideoId(video.key);
    setIsTrailer(false);
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.poster + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data?.name || data.title} (${dayjs(
                        data.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div className="playbtn" onClick={handleTrailerClick}>
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                      <div className="playbtn" onClick={handleMovieClick}>
                        <PlayIcon />
                        <span className="text">
                          Watch {mediaType === "tv" ? "TV Show" : "Movie"}
                        </span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM, D ,YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <div className="text">
                          {director.map((d, index) => (
                            <span key={index}>
                              {d.name}
                              {director.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <div className="text">
                          {writer.map((d, index) => (
                            <span key={index}>
                              {d.name}
                              {writer.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <div className="text">
                          {data?.created_by.map((d, index) => (
                            <span key={index}>
                              {d.name}
                              {data?.created_by.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {isTrailer ? (
                  <VideoPopup
                    show={show}
                    setShow={setShow}
                    videoId={videoId}
                    setVideoId={setVideoId}
                  />
                ) : (
                  <VidSrcPlayer
                    show={show}
                    setShow={setShow}
                    videoId={id}
                    mediaType={mediaType}
                    setVideoId={setVideoId}
                  />
                )}
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
