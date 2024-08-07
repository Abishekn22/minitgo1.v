import React, { useEffect, useState } from "react";
import StarRatings from "./ProductInfo/StarRatings";
import cartIcon from "../assets/cart-icon.svg";
import { Link } from "react-router-dom";

import {
  addToCart,
  showSnackbar,
  hideSnackbar,
  addItemToWishlist,
  hideSnackbarForWishlist,
  showSnackbarForWishlist,
} from "../components/redux/Slices/CartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductInfo/ProductCard";

function AdsCarousel({ products }) {
  console.log("products AdsCarousel", products)
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const handleAddToCart = (product, index) => {
    dispatch(addToCart(product));
    dispatch(showSnackbar({ message: "Product added successfully!", index }));

    // Wait for 1 second, then hide snackbar
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 1000);
  };

  useEffect(() => {
    setCurrentSlide(0); // Reset current slide to the first one
  }, [products]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? products.length - 1 : currentSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide(
      currentSlide === products.length - 1 ? 0 : currentSlide + 1
    );
  };



  return (
    <>
      <div
        id="adsCarousel"
        className="carousel slide v w-100    rounded-2"
        data-bs-ride="carousel"
        style={{ height: "100%" }}
      >
        <div className="carousel-inner rounded h-100">
          {products.map((product, index) => (
            <div
              key={index} // Ensure each carousel item has a unique key
              className={`h-100 carousel-item rounded ${index === currentSlide ? "active" : ""
                }`}
            >
              <div key={index} className=" w-100 ">
                <div className="product-card p-1" style={{ height: "100%" }}>
                  <a
                    href={`/${product.pid}`}
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    {/* code start by ganesh */}
                    <div className="product-image" style={{ position: "relative" }}>
                      <img src={product.product_image1} alt="Product 1" />

                      <div
                        className="offer-tag text-center p-1 text-bold mt-2" style={{
                          position: "absolute",
                          bottom: "15px",
                          right: "15px",
                          fontSize: "0.8rem",
                          padding: "1rem",
                          textDecorationColor: "HighlightText",
                          border: "2px solid",
                          borderRadius: "50px",
                          fontWeight: "bold",
                          backgroundColor: product.offers === "0" ? "" : "#e8d9b7",
                          opacity: product.offers === "0" ? 0 : 0.5,

                        }}>

                        {product.offers === "0" ? "No Offer" : `${product.offers}% Off`}
                      </div>
                    </div>
                    {/* code end by ganesh */}

                    {/* <div className="product-content">
                      {product.product_name.length > 15
                        ? product.product_name.substring(0, 25) + "..."
                        : product.product_name}
                      <h5>
                        Price: <sup>&#x20B9;</sup>
                        {product.product_price}
                        <span className="text-decoration-line-through text-muted fs-6 fw-light">
                          599
                        </span>
                        <span
                          className="text-muted"
                          style={{
                            fontSize: "13px",
                          }}
                        >
                          {" "}
                          {product.product_stock}
                        </span>
                      </h5>
                      <h6>{product.product_title}</h6>
                      <div className="product-rating text-warning">
                        Rating: <StarRatings rating={product.product_ratings} />
                      </div>
                      <p className="product-distance text-secondary ">
                        Distance: {product.distance}km away.
                      </p>
                      {cart.snackbar.open && cart.snackbar.index === index && (
                        <div
                          style={{ fontSize: "12px" }}
                          className="border text-center rounded w-75 mx-auto"
                        >
                          {cart.snackbar.message}
                        </div>
                      )}
                    </div> */}
                    {/* <div className="d-flex flex-column justify-content-between p-1">
                      <div className="d-flex flex-column">
                        <h6>{product.product_name}</h6>
                        <h6>{product.product_title}</h6>
                        <h5>
                          Price: <sup>&#x20B9;</sup>
                          {product.product_price}
                          <span className="text-decoration-line-through text-muted fs-6 fw-light">
                            599
                          </span>
                          <span
                            className="text-muted"
                            style={{
                              fontSize: "13px",
                            }}
                          >
                            {" "}
                            {product.product_stock}
                          </span>
                        </h5>
                        <p className="text-muted fs-6">  {product.product_discription.length > 40
                          ? product.product_discription.slice(0, 40) + "..."
                          : product.product_discription}</p>

                        <span className="text-muted">Size: {product.product_size}</span>


                        <div className="product-rating text-warning">
                          Rating: <StarRatings rating={product.product_ratings} />
                        </div>
                        <p className="product-distance text-secondary ">
                          Distance: {product.distance}km away.
                        </p>
                      </div>
                    </div> */}
                      <div className="product-content d-flex flex-column gap-1 pt-3  px-1 pb-3  ">
                        <div
                          className=""
                          style={{
                            height: "40px",
                            fontSize: "14px",
                            gap: "2px",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="text-sm line-clamp-1">
                            {" "}
                            {product.category}
                          </div>
                          <div className="line-clamp-1">
                            {product.client_name}
                          </div>
                        </div>
                        <a
                          href={`/${product.product_id}`}
                          target="_blank"
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
{windowWidth <= 1024
  ? product.product_name && product.product_name.length > 15
    ? product.product_name.substring(0, 15) + "..."
    : product.product_name
  : product.product_name && product.product_name.length > 23
  ? product.product_name.substring(0, 23) + "..."
  : product.product_name}
                        </a>

                        <h5 className="mt-1">
                          <sup>&#x20B9;</sup>
                          {product.product_price}
                          <span className="text-decoration-line-through text-muted fs-6 fw-light">
                            599
                          </span>
                          <span
                            className="text-muted"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            {product.product_stock}
                          </span>
                        </h5>

                        <div className="d-flex flex-column flex-sm-row justify-content-between ">
                          <h6>
                            Size: <span>{product.product_size}</span>
                          </h6>
                          <h6 className="">
                            Color: <span>{product.product_color1}</span>
                          </h6>
                        </div>

                        <div className="clamped-text">
                          {product.product_discription.length > 40
                            ? product.product_discription.slice(0, 40) + "..."
                            : product.product_discription}
                        </div>

                        {/* <div className="product-rating text-warning d-flex ">
                          Rating:{" "}
                          <StarRatings rating={product.product_ratings} />
                        </div> */}
                        <div className="product-distance text-secondary ">
                          Distance: {product.distance}km away.
                        </div>
                      </div>
                    {cart.snackbar.open && cart.snackbar.index === index && (
                      <div
                        style={{ fontSize: "12px" }}
                        className="border text-center rounded w-75 mx-auto"
                      >
                        {cart.snackbar.message}
                      </div>
                    )}
                  </a>

                  <div className="cart-btn d-flex justify-content-end px-2">
                    <button
                      className="btn btn-secondary text-dark"
                      onClick={() => handleAddToCart(product, index)}
                    >
                      Add To Cart
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev rounded-circle p-2 ms-1"
          type="button"
          data-bs-target="#adsCarousel" // Correct data-bs-target
          data-bs-slide="prev"
          style={{
            height: "30px",
            top: "35%",
            width: "35px",
            backgroundColor: "#b3b3b4",
          }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next rounded-circle p-2 me-1"
          type="button"
          data-bs-target="#adsCarousel" // Correct data-bs-target
          data-bs-slide="next"
          style={{
            height: "30px",
            top: "35%",
            width: "35px",
            backgroundColor: "#b3b3b4",
          }}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </button>
      </div>
      <br />
      <br />
    </>
  );
}

export default AdsCarousel;
