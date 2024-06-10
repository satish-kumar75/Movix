/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import dayjs from "dayjs";

import "./style.scss";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import PosterFallback from "../../../assets/no-poster.png";
import useFetch from "../../../hooks/useFetch";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const PersonDetails = ({ data, loading, url, personId }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const { data: social, loading: socialLoading } = useFetch(
    `/person/${personId}/external_ids`
  );
  console.log("https://www.facebook.com/", social?.facebook_id);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const biography = useMemo(() => {
    if (!data?.biography) return "";
    return isReadMore
      ? data.biography
      : data.biography.slice(0, 400) +
          (data.biography.length > 400 ? "..." : "");
  }, [data?.biography, isReadMore]);

  if (loading) {
    return (
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
    );
  }

  if (!data) return null;

  return (
    <div className="personContainer">
      <ContentWrapper>
        <div className="content">
          <div className="left">
            <Img
              className="posterImg"
              src={
                data.profile_path
                  ? url.profile + data.profile_path
                  : PosterFallback
              }
            />
          </div>
          <div className="right">
            <p className="title">{data.name}</p>
            <div className="socialIcons">
              {social?.facebook_id && (
                <a
                  href={`https://www.facebook.com/${social.facebook_id}`}
                  className="icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </a>
              )}
              {social?.instagram_id && (
                <a
                  href={`https://www.instagram.com/${social.instagram_id}`}
                  className="icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              )}
              {social?.twitter_id && (
                <a
                  href={`https://twitter.com/${social.twitter_id}`}
                  className="icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </a>
              )}
            </div>
            <div className="overview">
              <div className="heading">Biography</div>
              <p className="description">
                {biography.split("\n").map((paragraph, index) => (
                  <React.Fragment key={index}>
                    {paragraph}
                    <br />
                  </React.Fragment>
                ))}
              </p>
              {data.biography?.length > 400 && (
                <div className="readMoreBtn">
                  <button onClick={toggleReadMore}>
                    {isReadMore ? "Read Less" : "Read More"}
                  </button>
                </div>
              )}
            </div>

            <div className="info">
              {data.birthday && (
                <div className="infoItem">
                  <span className="text bold">Birth Date: </span>
                  <span className="text">
                    {dayjs(data.birthday).format("MMM, D , YYYY")}
                  </span>
                </div>
              )}
              {data.place_of_birth && (
                <div className="infoItem">
                  <span className="text bold">Place of Birth: </span>
                  <span className="text">{data.place_of_birth}</span>
                </div>
              )}
              {data.known_for_department && (
                <div className="infoItem">
                  <span className="text bold">Known For: </span>
                  <span className="text">{data.known_for_department}</span>
                </div>
              )}
            </div>
            {data.also_known_as?.length > 0 && (
              <div className="info info2">
                <span className="text bold">Also Known As: </span>
                <div className="aliasContainer text">
                  {data.also_known_as.map((alias, index) => (
                    <ul key={index}>
                      <li>{alias}</li>
                    </ul>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default PersonDetails;
