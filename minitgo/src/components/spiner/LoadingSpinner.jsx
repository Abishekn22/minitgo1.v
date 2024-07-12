// LoadingSpinner.js
import React from "react";
import { Circles } from "react-loader-spinner";
import "./spiner.css";

const LoadingSpinner = () => {
  return (
    <div className="background">
      <div className="body1">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="base1">
          <span></span>
          <div className="face1"></div>
        </div>
      </div>
      <div className="longfazers1">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1>get delivery in minits</h1>
    </div>
  );
};

export default LoadingSpinner;
