import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
// import './LocationModal.css'; // Optional for styling

const LocationModal = ({ show, handleClose, handleAllow, handleDeny }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent:"center"
          }}>
        <FaLocationDot className="" style={{ color: "black", width: "30px",height:"30px" }} />
        <p>
          For the fastest delivery, <br /> please share your current location.
        </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <button style={{width:"10rem",height:"30px",border:"none",borderRadius:"12px",backgroundColor:"#f2b057"}} onClick={handleAllow}>Allow</button>
          <button style={{width:"10rem",height:"30px",border:"none",borderRadius:"12px"}} onClick={handleDeny}>Don't Allow</button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
