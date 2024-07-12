import { Container, Carousel, Row, Col, Button } from "react-bootstrap";
import Img from "./images/bg1.jpg";
import Imgss from "./images/b.png";
import Img3 from "./images/best-deal3.jpg"; // Add other images as needed
import "bootstrap/dist/css/bootstrap.min.css";
import "./slider.css";
import { BiInfoCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const imageData = [
  { src: Img, alt: "First slide" },
  { src: Imgss, alt: "Second slide" },
  { src: Img, alt: "Third slide" },
  { src: Imgss, alt: "Fourth slide" },
];

const Slider = () => {
  return (
    <>
      <div className="container">
        <p className="p-2 sponor">
          Sponsored <BiInfoCircle className="fa-1" />
        </p>
        {/* <Row>
          <Link to="/products" className=" ">
            <Col className="col-sm-12 add sponsor d-flex justify-content-center align-items-center" 
            style={{border:"1px solid red",backgroundImage:`url(${Img})`}}></Col>
          </Link>
        </Row> */}
         
        
        <Carousel indicators={true} controls={true} className="carousel-custom">
          {imageData.map((image, index) => (
            <Carousel.Item key={index}>
              <Row>
                <Link to="/products" className="w-100">
                  <Col className="col-sm-12 add d-flex justify-content-center align-items-center">
                    <img className="carousel-img " src={image.src} alt={image.alt} />
  
                  </Col>
                </Link>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <hr />
      <br />
      <br />
    </>
  );
};

export default Slider;
