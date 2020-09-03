import React from "react";
import propTypes from "prop-types";
export const Shape = (props) => {
  return (
    <div className={props.wrapperClass}>
      <img src={props.img} className={props.imgClass} />
    </div>
  );
};

Shape.propTypes = {
  img: propTypes.string.isRequired,
  wrapperClass: propTypes.any,
  imgClass: propTypes.any,
};
