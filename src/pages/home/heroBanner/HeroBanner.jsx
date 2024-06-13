import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img";
import { PlayIcon } from "../../details/PlayIcon";
import Geners from "../../../components/genres/Geners";
import CircleRating from "../../../components/circleRating/CircleRating";
import dayjs from "dayjs";

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbnailBorderRef = useRef(null);

  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  const handleThumbnailClick = (index) => {
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
  };

  if (loading && !data) {
    return (
      <div className="banner" ref={carouselRef}>
        <div className="contentS">
          <div className="titleS skeleton"></div>
          <div className="genereDiv">
            {[1, 2, 3, 4].map((_, index) => (
              <div className="genereS skeleton" key={index}></div>
            ))}
          </div>
          <div className="desS skeleton"></div>
          <div className="rowS">
            <div className="circle skeleton"></div>
            <div className="buttonS skeleton"></div>
          </div>
        </div>
        <div className="thumbnail" ref={thumbnailBorderRef}>
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div className="item skeleton" key={index}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="banner" ref={carouselRef}>
        <div className="list" ref={sliderRef}>
          {data?.results?.map((item, index) => (
            <div
              className={`item
                ${index === currentIndex ? "active slide-in" : ""}
                ${index === prevIndex ? "slide-out" : ""}`}
              key={index}
            >
              <Img
                src={url.backdrop + item.backdrop_path}
                alt={`img${index + 1}`}
              />
              <div className="content">
                <h1 className="title">
                  {" "}
                  {`${item.name || item.title} (${dayjs(
                    item.release_date
                  ).format("YYYY")})`}
                </h1>
                <Geners data={item.genre_ids} />
                <div className="des">{item.overview}</div>
                <div className="row">
                  <CircleRating rating={item.vote_average.toFixed(1)} />
                  <div
                    className="playbtn"
                    onClick={() => navigate(`/movie/${item.id}`)}
                  >
                    <PlayIcon />
                    <span className="text">Watch Now</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="thumbnail" ref={thumbnailBorderRef}>
          {data?.results?.map((item, index) => (
            <div
              className={`item ${index === currentIndex ? "active" : ""}`}
              key={index}
              onClick={() => handleThumbnailClick(index)}
            >
              <Img
                src={url.poster + item.poster_path}
                alt={`thumbnail${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="opacity-layer"></div>
    </>
  );
};

export default HeroBanner;
