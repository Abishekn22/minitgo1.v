import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Add from "./images/shop.jpg";
import Add2 from "../assets/ads1.png"
import Add3 from "./images/best-deal3.jpg"
import { BiInfoCircle } from "react-icons/bi";
import myContext from "./context/MyContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Carousel from "react-bootstrap/Carousel";
// import Add from "./images/shop.jpg"; // You can add more images as needed


/* banner */
export default function Banner() {
  const [loading, setLoading] = useState(true);
  // const context = useContext(myContext);
  // const { setSearchQuery } = context;
  useEffect(() => {
    // Simulating data fetching
    setTimeout(() => setLoading(false), 2000);
  }, []);
  const navigate = useNavigate();

  function handleNavigateToProducts() {
    navigate("/products");
    // setSearchQuery("");
  }
  return (
    <>
      <div className="container " style={{ marginTop: "30px" }}>
        <Row>
          <div className="custom-bg p-0 ">
            <Col className="left-box ">
              <br />
              {loading ? (
                <>
                  <Skeleton height={40} width={300} />
                  <Skeleton
                    height={30}
                    width={150}
                    style={{ marginTop: "15px" }}
                  />
                  <Skeleton
                    height={40}
                    width={150}
                    style={{ marginTop: "15px" }}
                  />
                  <Skeleton
                    height={20}
                    width={250}
                    style={{ marginTop: "15px" }}
                  />
                </>
              ) : (
                <>
                  <h1 className="typing-text">
                    Get Delivery In{" "}
                    <span className="" style={{ color: "#5F6D79" }}>
                      {" "}
                      <br />
                      Minutes
                    </span>{" "}
                    <span className="cursor">&nbsp;</span>
                  </h1>
                  <br />
                  <Button
                    className="buynow "
                    onClick={handleNavigateToProducts}
                  >
                    Buy now{" "}
                  </Button>
                  <Button
                    className="find-btn"
                    onClick={handleNavigateToProducts}
                  >
                    Find near me
                  </Button>
                  <p style={{ marginTop: "16px" }}>
                    {" "}
                    <BiInfoCircle style={{ fontSize: "10pt" }} /> Get the
                    products from nearest & trusted stores
                  </p>
                </>
              )}
            </Col>
            <Col xs={6} sm={6} className="right-box">
              {loading ? (
                <Skeleton height={200} width={200} />
              ) : (
                <Carousel className="custom-carousel ">
                  <Carousel.Item>
                    <img
                      className="imgs "
                      src={Add}
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                       className="imgs "
                      src={Add2}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                       className="imgs "
                      src={Add3}
                      alt="Third slide"
                    />
                  </Carousel.Item>
                </Carousel>
                // <img className="imgs " src={Add} />
              )}
            </Col>
          </div>
        </Row>
      </div>
      <br />
    </>
  );
}
