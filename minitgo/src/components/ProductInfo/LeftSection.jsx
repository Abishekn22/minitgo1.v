import React, { useContext, useEffect, useState } from "react";
import CarouselComponent from "./CarouselComponent";
import StarRatings from "./StarRatings";
import storeIcon from "../../assets/store.svg";
import axios from "axios";
import myContext from "../context/MyContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LeftSection({ productId, scrollToReviews }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageIndexCounter, setImageIndexCounter] = useState(0);

  const { handleImageClick, selectedImageIndex } = useContext(myContext);

  useEffect(() => {
    axios
      .get("https://minitgo.com/api/fetch_products.php")
      .then((response) => {
        const products = response.data.data;
        // console.log("products",products);
        const foundProduct = products.find(
          (product) => product.pid === productId
        );
        console.log("foundproduct", foundProduct);
        if (foundProduct) {
          setProduct(foundProduct);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [productId]);
  console.log("product", product);

  return (
    <>
      {loading ? (
        <div className="w-100 md:w-50 d-flex flex-column gap-4 position-relative px-md-4 h-100">
          <div className="w-100 rounded-lg position-relative d-flex justify-between">
            <div className="col-2 d-flex flex-column gap-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  height={80}
                  className="border rounded-2"
                />
              ))}
            </div>
            <div className="col-10 ps-3" style={{ height: "500px" }}>
              <Skeleton height="100%" />
            </div>
          </div>
          <div className="d-flex">
            <div className="border rounded d-flex flex-column w-100 px-md-4 gap-2 px-1">
              <div
                className="d-flex flex-row justify-content-between align-items-center pt-2"
                style={{ height: "40px" }}
              >
                <div
                  className="d-flex align-items-center justify-content-start"
                  style={{ width: "120px" }}
                >
                  <Skeleton circle width={35} height={35} />
                  <div className="fs-6" style={{ fontWeight: "bold" }}>
                    <Skeleton width={80} />
                  </div>
                </div>
                <div className="d-flex gap-1 gap-md-4">
                  <Skeleton width={60} height={20} />
                  <Skeleton width={60} height={20} />
                  <Skeleton width={60} height={20} />
                </div>
              </div>
              <div
                className="d-flex justify-content-between align-items-center border-top pt-2"
                style={{ fontSize: "12px" }}
              >
                <Skeleton width={100} />
                <Skeleton width={100} />
              </div>
            </div>
          </div>
          <div
            className="d-flex flex-column py-3 rounded gap-4"
            onClick={scrollToReviews}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex flex-column gap-1 border rounded px-4 pt-3">
              <h2 className="fs-4 text-start mt-1">
                <Skeleton width={150} />
              </h2>
              <div className="d-flex">
                <div className="w-50 d-flex flex-column gap-2">
                  <Skeleton width={50} height={50} />
                  <Skeleton width={100} />
                  <Skeleton width={80} />
                </div>
                <div className="w-50 py-2">
                  <ul className="list-unstyled h-100 d-flex flex-column gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <li className="d-flex gap-1" key={index}>
                        <Skeleton width={20} />
                        <div className="w-100 d-flex justify-content-center align-items-center pl-1">
                          <Skeleton width="100%" height={10} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        product && (
          <section className="w-100 md:w-50 d-flex flex-column gap-4 position-relative px-md-4 h-100">
            <div className="w-100 rounded-lg position-relative d-flex justify-between">
              <div className="col-2 d-flex flex-column gap-3">
                {Array.from({ length: 5 }).map(
                  (_, index) =>
                    product[`product_image${index + 1}`] && ( // Check if product image URL exists
                      <div
                        key={index}
                        className="border rounded-2"
                        style={{ height: "80px", cursor: "pointer" }}
                        onClick={() => handleImageClick(index)}
                      >
                        <img
                          src={product[`product_image${index + 1}`]}
                          alt={`Image ${index + 1}`}
                          style={{ width: "100%", height: "100%" }}
                          className="rounded-2"
                        />
                      </div>
                    )
                )}
              </div>
              <div className="col-10 ps-3" style={{ height: "500px" }}>
                <CarouselComponent
                  productId={productId}
                  selectedImageIndex={selectedImageIndex}
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="border rounded d-flex flex-column w-100 px-md-4 gap-2 px-1">
                <div
                  className="d-flex flex-row justify-content-between align-items-center "
                  style={{ height: "40px" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-start"
                    style={{ width: "120px" }}
                  >
                    <img src={storeIcon} alt="logo" style={{ width: "35px" }} />
                    <div className="fs-6" style={{ fontWeight: "bold" }}>
                      {product.product_brand}
                    </div>
                  </div>
                  {/* <div className="d-flex gap-1 gap-md-4">
                    <div
                      className="bg-body-secondary d-flex align-items-center justify-content-center rounded py-1"
                      style={{ width: "60px", fontSize: "12px" }}
                    >
                      Shirts
                    </div>
                    <div
                      className="bg-body-secondary d-flex align-items-center justify-content-center rounded py-1"
                      style={{ width: "60px", fontSize: "12px" }}
                    >
                      Jackets
                    </div>
                    <div
                      className="bg-body-secondary d-flex align-items-center justify-content-center rounded py-1"
                      style={{ width: "60px", fontSize: "12px" }}
                    >
                      Hoodies
                    </div>
                  </div> */}
                </div>
                {/* <div
                  className="d-flex justify-content-between align-items-center border-top pt-2"
                  style={{ fontSize: "12px" }}
                >
                  <p>100+ Positive Feedback</p>
                  <p>Missing Information</p>
                </div> */}
              </div>
            </div>
            {/* <div
              className="d-flex flex-column py-3 rounded gap-4"
              onClick={scrollToReviews}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex flex-column gap-1 border rounded px-4 pt-3">
                <h2 className="fs-4 text-start mt-1">Ratings & Reviews</h2>
                <div className="d-flex">
                  <div className="w-50 d-flex flex-column gap-2">
                    <span className="fs-1">{product.product_ratings}</span>
                    <StarRatings rating={product.product_ratings} />
                    <span style={{ fontSize: "14px" }}>40 Ratings</span>
                  </div>
                  <div className="w-50 py-2">
                    <ul className="list-unstyled h-100 d-flex flex-column gap-1">
                      <li className="d-flex gap-1">
                        <span>5</span>
                        <div className="w-100 d-flex justify-content-center align-items-center pl-1">
                          <div className="w-100 bg-body-secondary">
                            <div
                              className="border bg-black w-75"
                              style={{ padding: "1px" }}
                            ></div>
                          </div>
                        </div>
                      </li>
                      <li className="d-flex gap-1">
                        <span>4</span>
                        <div className="w-100 d-flex justify-content-center align-items-center pl-1">
                          <div className="w-100 bg-body-secondary">
                            <div
                              className="border bg-black w-50"
                              style={{ padding: "1px" }}
                            ></div>
                          </div>
                        </div>
                      </li>
                      <li className="d-flex gap-1">
                        <span>3</span>
                        <div className="w-100 d-flex justify-content-center align-items-center pl-1">
                          <div className="w-100 bg-body-secondary">
                            <div
                              className="border bg-black w-50"
                              style={{ padding: "1px" }}
                            ></div>
                          </div>
                        </div>
                      </li>
                      <li className="d-flex gap-1">
                        <span>2</span>
                        <div className="w-100 d-flex justify-content-center align-items-center pl-1">
                          <div className="w-100 bg-body-secondary">
                            <div
                              className="border bg-black w-75"
                              style={{ padding: "1px" }}
                            ></div>
                          </div>
                        </div>
                      </li>
                      <li className="d-flex gap-1">
                        <span>1</span>
                        <div className="w-100 d-flex justify-content-center align-items-center pl-1">
                          <div className="w-100 bg-body-secondary">
                            <div
                              className="border bg-black w-25"
                              style={{ padding: "1px" }}
                            ></div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="d-flex flex-column gap-1">
              <h2 className="fs-4 text-start">Description</h2>
              <ul className="list-unstyled d-flex flex-column gap-1 fs-6">
                <h1 className="fs-5 fw-medium">{product.product_name}</h1>
                <h1 className="fs-5 fw-medium">{product.client_name}</h1>
                <p className="fs-6 fw-light">{product.category}</p>
                <div className="d-flex justify-content-between flex-wrap">
                  <p className="fs-6 fw-light">
                    Price: {product.product_price}
                  </p>
                  <p className="fs-6 fw-light">Material: {product.material}</p>
                </div>

                <div className="d-flex justify-content-between flex-wrap">
                  <p className="fs-6 fw-light">
                    Color: {product.product_color1}
                  </p>
                  <p className="fs-6 fw-light">Size: {product.product_size}</p>
                </div>
                <p className="fs-6 line-clamp-2 fw-light">
                  {product.product_discription}
                </p>
              </ul>
            </div> */}
          </section>
        )
      )}
    </>
  );
}

export default LeftSection;
