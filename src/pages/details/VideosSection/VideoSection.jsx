/* eslint-disable react/prop-types */
import React, { useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = (index) => {
    return (
      <div className="skItem" key={index}>
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos">
            {data?.results?.map((item) => (
              <div
                key={item.id}
                className="videoItem"
                onClick={() => {
                  setShow(true);
                  setVideoId(item.key);
                }}
              >
                <div className="videoThumbnail">
                  <Img
                    src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
                  />
                  <PlayIcon />
                </div>
                <div className="videoTitle">{item.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {[...Array(5)].map((_, index) => {
              loadingSkeleton(index);
            })}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
