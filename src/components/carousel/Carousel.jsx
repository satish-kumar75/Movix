/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";

import "./style.scss";
import Geners from "../genres/Geners";

const Carousel = ({ data, loading, endPoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigation = (dir) => {
    const container = carouselContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = (index) => {
    return (
      <div className="skeletonItem" key={index}>
        <div className="posterBlock skeleton" />
        <div className="textBlock">
          <div className="title skeleton" />
          <div className="date skeleton" />
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <h2 className="carouselTitle">{title}</h2>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div ref={carouselContainer} className="carouselItems">
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <Link
                  key={item.id}
                  className="carouselItem"
                  to={`/${item.media_type || endPoint}/${item.id}`}
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} alt={item.title || item.name} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Geners data={item.genre_ids.slice(0, 3)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {item.release_date || item.first_air_date
                        ? dayjs(item.release_date || item.first_air_date).format(
                            "MMM D, YYYY"
                          )
                        : "Not Released"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {[...Array(5)].map((_, index) => skItem(index))}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
