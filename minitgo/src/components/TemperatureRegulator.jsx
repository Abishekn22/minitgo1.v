// src/TemperatureRegulator.js
import React, { useState, useRef, useEffect } from 'react';
import './Temp.css';

const TemperatureRegulator = () => {
    // console.log("formattedWeatherData",formattedWeatherData);
  const [temperature, setTemperature] = useState(10);
  const circleRef = useRef(null);
  

  const radius = 90;
  const circumference = Math.PI * radius;
// const circumference = (252 / 360) * 2 * Math.PI * radius; 

  return (
    <div className="regulator-container">
      <svg
        width="70"
        height="50"
        viewBox="0 0 200 150"
        className="circular-slider"
        // onClick={handleSliderChange}
       >
        <path
          d={`M 10,100 A ${radius},${radius} 0 0,1 190,100`}
          fill="transparent"
        //   stroke="#DDDDDD"
        stroke='white'
          strokeWidth="15"
        />
        <path
          ref={circleRef}
          d={`M 10,100 A ${radius},${radius} 0 0,1 190,100`}
          fill="transparent"
        //   stroke="#FF4B4B"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (temperature / 100) * circumference}
        />
        <circle
          cx={100 + radius * Math.cos((temperature / 100) * Math.PI)}
          cy={100 - radius * Math.sin((temperature / 100) * Math.PI)}
          r="10"
          fill="#FFF"
          stroke="black"
          strokeWidth="3"
        />
      </svg>
      <div className="temperature-display" style={{position:"absolute"}}>
      {/* {formattedWeatherData}&deg;C */}
      </div>
    </div>
  );
};

export default TemperatureRegulator;
