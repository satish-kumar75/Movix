/* eslint-disable react/prop-types */
import React, { useMemo, useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";
import useFetch from "../../../hooks/useFetch";
import { languageName } from "../../../utils/region";

const VIDEO_LANGUAGES =
  "en,hi,ta,te,ml,kn,bn,mr,pa,gu,ur,ko,ja,zh,es,fr,de,it,pt,ru,tr,th,id,ar,null";

const VideosSection = ({ mediaType, id }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [language, setLanguage] = useState("all");

  const { data, loading } = useFetch(
    `/${mediaType}/${id}/videos?include_video_language=${VIDEO_LANGUAGES}`
  );

  const videos = useMemo(
    () => (Array.isArray(data?.results) ? data.results : []),
    [data]
  );

  const languages = useMemo(
    () => [...new Set(videos.map((video) => video.iso_639_1).filter(Boolean))],
    [videos]
  );

  const visible =
    language === "all"
      ? videos
      : videos.filter((video) => video.iso_639_1 === language);

  const loadingSkeleton = (index) => {
    return (
      <div className="skItem" key={index}>
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  if (!loading && videos.length === 0) return null;

  return (
    <div className="videosSection">
      <ContentWrapper>
        <h2 className="sectionHeading">Official Videos</h2>
        {languages.length > 1 && (
          <div className="languageChips" role="group" aria-label="Video language">
            {["all", ...languages].map((code) => (
              <button
                type="button"
                key={code}
                className={`chip ${language === code ? "active" : ""}`}
                aria-pressed={language === code}
                onClick={() => setLanguage(code)}
              >
                {code === "all" ? "All" : languageName(code)}
              </button>
            ))}
          </div>
        )}
        {!loading ? (
          <div className="videos">
            {visible.map((item) => (
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
                    alt={item.name}
                  />
                  <PlayIcon />
                </div>
                <div className="videoTitle">{item.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {[...Array(5)].map((_, index) => loadingSkeleton(index))}
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
