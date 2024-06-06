/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";

const Geners = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="genres">
      {data?.map((g) => {
        if (!genres[g]?.name) return;
        return (
          <div key={g} className="genre">
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Geners;
