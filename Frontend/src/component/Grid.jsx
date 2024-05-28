import React from "react";
import "./Grid.scss";

const Grid = ({ userText, colorChange }) => {
  const getClassName = (color) => {
    switch (color) {
      case "G":
        return "col-1 border border-secondary my-1 mx-1 text-light fs-1 fw-bold greenBG";
      case "Y":
        return "col-1 border border-secondary my-1 mx-1 text-light fs-1 fw-bold yellowBG";
      default:
        return "col-1 border border-secondary my-1 mx-1 text-light fs-1 fw-bold";
    }
  };

  return (
    <div className="row align-items-center justify-content-center text-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={getClassName(colorChange[index])}
          style={{ width: "60px", height: "60px" }}
        >
          {userText.charAt(index).toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default Grid;
