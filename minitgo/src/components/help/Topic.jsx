import React from "react";

function Topic({ imgPath, title, description }) {
  return (
    <div className="rounded-lg  md:w-350 d-flex flex-column align-items-center justify-content-center bg-white border" style={{height:'150px', width:'350px'}}>
      <div className="d-flex flex-column align-items-center py-4 gap-2">
        <div>
          <img src={imgPath} alt="accounts" style={{width:'40px'}}/>
        </div>
        <p className="fw-semibold"><a href="/">{title}</a></p>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}

export default Topic;
