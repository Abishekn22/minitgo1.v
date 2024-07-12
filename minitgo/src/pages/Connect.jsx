import React, { useEffect } from "react";

function Connect() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="d-flex flex-column justify-content-between py-3">
      <main className=" d-flex justify-content-center w-100">
        <div
          className="  d-flex flex-column justify-content-between px-2"
          style={{ width: "700px" }}
        >
          <div className="py-3">
            <h3>World's First AI Software Engineer is Launched</h3>
          </div>
          <div className="object-fit" style={{ height: "370px" }}>
            <iframe
              src="https://www.youtube.com/embed/jUS6XxoSq3E?si=TZAbO9TAx5CQLr1n"
              title="YouTube video player"
              // frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ width: "100%", height: "100%" }}
            ></iframe>
          </div>
          {/* <div className="py-2 mt-3 overflow-scroll overflow-x-hidden" style={{ height: "120px",textAlign:"justify" , scrollbarWidth: "thin"}}> */}
          <div className="py-2 mt-3" style={{ textAlign: "justify" }}>
            <p>
              Cognition, a U.S.-based startup, has introduced Devin, the world's
              first AI software engineer. Devin is an innovative AI assistant
              capable of transforming simple commands into fully functioning
              websites or software programs. The company emphasizes that Devin
              is not intended to replace human engineers but rather to
              collaborate with them. Cognition highlights that Devin has
              successfully passed practical engineering interviews conducted by
              leading AI companies
            </p>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-lg btn-primary  rounded">Connect</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Connect;
