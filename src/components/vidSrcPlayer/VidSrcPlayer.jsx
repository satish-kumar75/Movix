/* eslint-disable react/prop-types */
import "./style.scss";

const VidSrcPlayer = ({ show, setShow, videoId, setVideoId, mediaType }) => {
  const videoURL = import.meta.env.VITE_APP_VIDSRC_URL;
  const iframeSrc = `${videoURL}/${mediaType}/${videoId}`;
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="videoPlayer">
        <span className="closeBtn" onClick={hidePopup}>
          Close
        </span>
        {show && videoId && (
          <iframe
            className="player"
            src={iframeSrc}
            title="Video player"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default VidSrcPlayer;
