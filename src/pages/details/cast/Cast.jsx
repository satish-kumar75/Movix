/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";
import { Link } from "react-router-dom";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = (index) => {
    return (
      <div className="skItem" key={index}>
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  if (!loading && !data?.length) return null;

  return (
    <div className="castSection">
      <ContentWrapper>
        <h2 className="sectionHeading">Top Cast</h2>
        {!loading ? (
          <div className="listItems">
            {data?.map((item) => {
              let imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : avatar;
              return (
                <Link
                  className="listItem"
                  key={item.id}
                  to={`/person/${item.id}`}
                >
                  <div className="profileImg">
                    <Img src={imgUrl} alt={item.name} />
                  </div>
                  <div className="name">{item.name}</div>
                  <div className="character">{item.character}</div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {[...Array(6)].map((_, index) => skeleton(index))}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
