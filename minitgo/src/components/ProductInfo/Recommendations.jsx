import React, { useState, useRef, useEffect, useContext } from "react";
import { productData } from "./data";
import ProductCard from "./ProductCard";
import myContext from "../context/MyContext";

function Recommendations() {

  const context=useContext(myContext);

  const {products}=context;


  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [slidesToScroll, setSlidesToScroll] = useState(3);

  const carouselRef = useRef(null);

  const handleNext = () => {
    const newSlide = currentSlide + slidesToScroll;
    setCurrentSlide(newSlide % products.length);
  };

  const handlePrev = () => {
    const newSlide = currentSlide - slidesToScroll;
    setCurrentSlide((newSlide + products.length) % products.length);
  };

  const handleWheelScroll = (e) => {
    if (e.deltaY > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  // Responsive behavior using useEffect
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) { // Adjust breakpoint as needed
        setSlidesToShow(1);
        setSlidesToScroll(1);
      } else if (windowWidth < 992) { // Adjust breakpoint as needed
        setSlidesToShow(3);
        setSlidesToScroll(2);
      } else {
        setSlidesToShow(4);
        setSlidesToScroll(3);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize(); // Call initially to set values based on current screen size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container" onWheel={handleWheelScroll}>
      <div
        id="recommendation"
        className="carousel slide"
        data-bs-ride="carousel"
        ref={carouselRef}
      >
        <div className="carousel-inner">
          {Array.from(
            { length: Math.ceil(products.length / slidesToShow) },
            (_, i) => (
              <div key={i} className={`carousel-item${i === 0 ? " active" : ""}`}>
                <div className="d-flex  justify-content-center gap-4">
                  {products
                    .slice(i * slidesToShow, (i + 1) * slidesToShow)
                    .map((product, index) => (
                      <div key={index} className=" w-75 w-sm-50 w-md-25">
                        <ProductCard product={product} index={index} />
                      </div>
                    ))}
                </div>
              </div>
            )
          )}
        </div>
        <button
          className="carousel-control-prev border rounded bg-secondary"
          type="button"
          data-bs-target="#recommendation"
          data-bs-slide="prev"
          onClick={handlePrev}
          style={{ height: "30px", width: "30px", top: "35%", left: "-5px" }}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button
          className="carousel-control-next border rounded bg-secondary"
          type="button"
          data-bs-target="#recommendation"
          data-bs-slide="next"
          onClick={handleNext}
          style={{ height: "30px", width: "30px", top: "35%", right: "-5px" }}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Recommendations;
