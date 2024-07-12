import React, { useEffect, useMemo, useState } from "react";
// import { io } from "socket.io-client";

function Bot() {
 

  return (
    <div className="d-flex flex-column gap-4   h-100 w-100 ">
      <div className="py-1 bg-primary rounded-top-lg">
        <h2 className="text-white p-1 text-center" style={{fontSize:'20px'}}>BOT</h2>
      </div>
      <div className="p-1 text-center d-flex flex-column gap-4">
        <p>How can I help you?</p>
        
      </div>
    </div>
  );
}

export default Bot;
