import React, { useState } from "react";
import { BiStar } from 'react-icons/bi';

function StarRatings({ rating }) {

  const starStyle = (ratingValue) => ({
    display: 'inline-block',
    color: ratingValue <= rating ? '#ffc107' : '#ccc',
  });

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span key={ratingValue} style={starStyle(ratingValue)}>
            &#9733;
          </span>
        );
      })}
    </div>
  );
  }
  
  export default StarRatings;
  