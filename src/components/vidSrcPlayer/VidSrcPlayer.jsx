/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

import "./style.scss";

const VidSrcPlayer = ({ show, setShow, videoId, setVideoId, mediaType }) => {
  const videoURL = import.meta.env.VITE_APP_VIDSRC_URL;
  const iframeSrc = `${videoURL}/${mediaType}/${videoId}`;
  const hidePopup = () => {
    setShow(false);
    setVideoId(null); // Set videoId to null to unmount the iframe
  };
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="videoPlayer">
        <span className="closeBtn" onClick={hidePopup}>
          Close
        </span>
        {videoId && ( // Conditionally render the iframe only if videoId is not null
          <iframe
            className="player"
            src={iframeSrc}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default VidSrcPlayer;
