import React, { useEffect } from "react";
import buildingIcon from "../assets/building.svg";
import moneyIcon from "../assets/money.svg";
import tablelist from "../assets/tablelist.svg";
import videoplaybak from "../assets/videoplayback.mp4";
import { Link } from 'react-router-dom';
const fileUrl = "";

function BecomePartner() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownloadVideo = () => {
    try {
      const link = document.createElement("a");
      link.href = videoplaybak;
      link.setAttribute("download", "videoplayback.mp4");
      document.body.appendChild(link);
      alert("Downloading Started");
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
  

      <div className="container my-lg-3 border border-1 rounded-2 p-3 mb-5 bg-white rounded">
        <nav class=" d-flex rounded-2 py-2 ">
          <div className="container-fluid d-flex flex-row mr-5 ">
            <p
              className=" col md-4 my-2  fw-bold  "
              style={{ fontSize: "38px" }}
              href="#"
            >
              Sell with Minitgo.com
            </p>

            <div className="">
            <Link to="/clientregister" className="btn rounded-3 btn-primary py-2">
        Start Selling
      </Link>
            </div>
          </div>
        </nav>

        <div className="col md-12 display-flex flex-column pt-3 border-top ">
          <span className="fs-2">
            {" "}
            Become a Seller on <br></br> Minitgo{" "}
          </span>
          <br></br>

          <p className="mt-2 fs-4">
            Maximise your visibility and reach a diverse audience by selling on
            Minitgo.com.
          </p>
        </div>
        <div className="d-flex gap-3 ">
          <button
            type="button"
            className="btn btn-md rounded-4"
            style={{ border: "3px solid #d9dfab" }}
          >
            Start Selling
          </button>
          <button
            type="button"
            className="btn   btn-md rounded-4"
            onClick={handleDownloadVideo}
            style={{ border: " 3px solid #d9dfab" }}
          >
            Download free beginners guide
          </button>
        </div>

        <div className="container mt-4 ">
          <div className="small-box dark-box mx-auto "></div>
          <div className="box">
            <div className="small-box dark-box mx-auto"></div>
            <div className="d-flex justify-content-center">
              <span className="fs-3 fw-bold">
                {" "}
                What you require to start selling{" "}
              </span>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-center py-4   ">
            <div className="col-3 d-flex flex-column align-items-center gap-2">
              <img src={moneyIcon} style={{ width: "50px" }} />
              <span style={{ fontSize: "18px" }}>GST</span>
            </div>
            <div className="col-3 d-flex flex-column align-items-center gap-2">
              <img src={buildingIcon} style={{ width: "50px" }} />
              <span style={{ fontSize: "18px" }}>Active bank account</span>
            </div>
            <div className="col-3 d-flex flex-column align-items-center gap-2">
              <img src={tablelist} style={{ width: "50px" }} />
              <span style={{ fontSize: "18px" }}>
                Product info and <br /> images to create listing
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 ">
          <span className="fs-3">Why sell on Minitgo?</span>
        </div>
        <div class="mt-3 mb-3">
          <div class="container">
            <div class="row justify-content-center gap-5">
              <div
                class="col-md-3 col-sm-6 card fs-4 text-white"
                style={{
                  height: "250px",
                  backgroundColor: "rgb(235, 233, 205)",
                  cursor: "pointer",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <span
                  class="fs-3 fw-bold"
                  style={{ color: "rgb(238, 161, 135)" }}
                >
                  Easy integration
                </span>
                <div class="mt-1">
                  <span class="fw-bold fs-6 text-secondary">
                    You can seamlessly incorporate MinitGo's features into your
                    platform with ease.
                  </span>
                </div>
              </div>
              <div
                class="col-md-3 col-sm-6 card fs-4 text-white"
                style={{
                  height: "250px",
                  backgroundColor: " rgb(235, 233, 205)",
                  cursor: "pointer",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <span
                  class="fs-3 fw-bold"
                  style={{ color: "rgb(238, 161, 135)" }}
                >
                  Benefits of selling on MinitGo
                </span>
                <div class="mt-1">
                  <span class="fw-bold fs-6 text-secondary">
                    Adding MinitGo to your product lineup diversifies your
                    offerings, potentially attracting new customers.
                  </span>
                </div>
              </div>
              <div
                class="col-md-3 col-sm-6 card fs-4 text-white"
                style={{
                  height: "250px",
                  backgroundColor: "rgb(235, 233, 205)",
                  cursor: "pointer",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <span
                  class="fs-3 fw-bold "
                  style={{ color: "rgb(238, 161, 135)" }}
                >
                  Fee and payments
                </span>
                <div class="mt-1">
                  <span class="fw-bold fs-6 text-secondary">
                    Discover hassle-free payments with our flexible fee
                    structure. We offer transparent pricing and convenient
                    payment options.
                  </span>
                </div>
              </div>
            </div>

            <div class="row mt-5 mb-5 border-top pt-5">
              <div class="col mt-1">
                <span
                  class="fs-2"
                  style={{ letterSpacing: "3px", wordSpacing: "3px" }}
                >
                  From five members to fifteen, a little trust can go a long way
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BecomePartner;
