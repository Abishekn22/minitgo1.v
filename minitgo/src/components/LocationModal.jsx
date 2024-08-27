import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

const LocationModal = ({ show, handleClose, handleAllow, handleDeny }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay1">
      <div className="modal-content1 py-4">
        {/* Close button */}
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          onClick={handleClose}
        >
          &times;
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaLocationDot
            className=""
            style={{ color: "555", width: "40px", height: "40px" }}
          />
          <b>
            For the fastest delivery, <br /> please share your current location.
          </b>
        </div>
        <hr></hr>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <button
            style={{
              width: "10rem",
              height: "30px",
              border: "none",
              borderRadius: "12px",
              backgroundColor: "#f2b057",
            }}
            onClick={handleAllow}
          >
            Allow
          </button>
          <p
            className="rounded-pill bg-light"
            style={{ width: 25, textAlign: "center" }}
          >
            or
          </p>
          <input
            type="text"
            style={{
              width: "10rem",
              height: "30px",
              border: "none",
              borderRadius: "5px",
            }}
            placeholder=" Type here..."
          />
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
