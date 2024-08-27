import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "./StarRatings";
import myContext from "../context/MyContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/Slices/CartSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  showSnackbar,
  hideSnackbar,
  addItemToWishlist,
  hideSnackbarForWishlist,
  showSnackbarForWishlist,
} from "../redux/Slices/CartSlice";
import cartIcon from "../../assets/cart-icon.svg";
import { RxLapTimer } from "react-icons/rx";

function ProductCard({ product, index }) {
  const context = useContext(myContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState({});

  const { products } = context;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Set timeout for 2 seconds

    return () => clearTimeout(timer);
  }, [product]);
  const handleAddToCart = (product, index, selectedSize) => {
    // Ensure that the selected size is used, or default to the first size
    const size = selectedSize || product.product_size.split(",")[0];
    const color = product.product_color1.split(",")[0]; // Assuming color is managed similarly

    const productWithCoordinates = {
      ...product,
      product_size: size,
      product_color1: color,
      // coordinates,
    };

    dispatch(addToCart(productWithCoordinates));
    dispatch(showSnackbar({ message: "Product added successfully!", index }));

    // Wait for 1 second, then hide snackbar
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 1000);
  };
  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prevState) => ({
      ...prevState,
      [productId]: size,
    }));
  };

  // Handle add to cart click
  const handleAddToCartClick = (product, index) => {
    // Get the selected size, or default to the first size
    const selectedSize =
      selectedSizes[product.id] || product.product_size.split(",")[0];
    handleAddToCart(product, index, selectedSize);
  };

  // const handleAddToCart = (product, index) => {
  //   const size = product.product_size.split(",");
  //   const color = product.product_color1.split(",");
  //   const productWithCoordinates = {
  //     ...product,
  //     product_size: size[0],
  //     product_color1: color[0],
  //     // coordinates,
  //   };
  //   dispatch(addToCart(productWithCoordinates));
  //   dispatch(showSnackbar({ message: "Product added successfully!", index }));
  //   console.log("index", index);

  //   // Wait for 1 second, then hide snackbar
  //   setTimeout(() => {
  //     dispatch(hideSnackbar());
  //   }, 1000);
  // };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // for wishlist button
  const [wishlistClicked, setWishlistClicked] = useState(
    Array(products.length).fill(false)
  );
  const handleWishListToCart = (product, index) => {
    const newWishlistClicked = [...wishlistClicked];
    newWishlistClicked[index] = !newWishlistClicked[index];
    setWishlistClicked(newWishlistClicked);

    dispatch(addItemToWishlist(product));
    dispatch(
      showSnackbarForWishlist({ message: "Item added to wishlist!", index })
    );
    setTimeout(() => {
      dispatch(hideSnackbarForWishlist());
    }, 1000); // Hide after 3 seconds
  };

  return (
    <div key={index} className="col-6 col-sm-3 py-2 w-100 ">
      <div className="product-card">
        <a
          href={`/${product.pid}`}
          target="_blank"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <div className="product-image" style={{ position: "relative" }}>
            {loading ? (
              <Skeleton height={200} />
            ) : (
              <img src={product.product_image1} alt="Product 1" />
            )}
            {!loading && (
              <div
                className="offer-tag text-center p-1 text-bold mt-2"
                style={{
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
                }}
              >
                {product.offers === "0" ? "No Offer" : `${product.offers}% Off`}
              </div>
            )}
          </div>

          <div className="product-content d-flex flex-column gap-1 pt-3 px-2">
            <div
              style={{ fontSize: "14px" }}
              className="d-flex justify-content-between"
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  justifyContent: "space-between",
                  // gap:"20px"
                }}
              >
                <span className="line-clamp-1" style={{ width: "50%" }}>
                  {product.client_name}
                </span>
                <span>
                  <RxLapTimer style={{ marginRight: "5px" }} />
                  <span style={{ color: "orange" }}>36 min</span>
                </span>
              </div>
              {/* <div>
                {isNewProduct(product.date) && (
                  <span
                    className="btn  btn-secondary p-0 px-1"
                    style={{ color: "#ffc107", fontSize: "14px" }}
                  >
                    New
                  </span>
                )}
              </div> */}
            </div>

            <div className="flex-container">
              <h6 className="fs-9 text-start">
                <span className="fw-semibold">{product.product_title}</span> |
                <span className="fw-bold"> Color:</span>{" "}
                {product.product_color1} |
                <span className="fw-bold"> {product.material}</span>{" "}
              </h6>
              <h5 className="mt-1 flext-item  ">
                ₹{product.product_price}
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
                  {/* {product.product_stock} */}
                </span>
              </h5>
              <div>
                <span className=" fw-bold" style={{ fontSize: "12px" }}>
                  Available size:
                </span>{" "}
                {product.product_size.includes(",") ? (
                  <select
                    className="px-1"
                    style={{
                      backgroundColor: "#d9725f",
                      fontSize: "0.875rem",
                      borderRadius: "5px",
                    }}
                    onChange={(e) =>
                      handleSizeChange(product.id, e.target.value)
                    }
                    value={
                      selectedSizes[product.id] ||
                      product.product_size.split(",")[0]
                    }
                  >
                    {product.product_size.split(",").map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span
                    className="px-1"
                    style={{
                      backgroundColor: "#d9725f",
                      fontSize: "0.875rem",
                    }}
                  >
                    {product.product_size}
                  </span>
                )}
              </div>
              <div style={{ width: "100%", display: "flex" }}>
                <span
                  className=" fw-bold"
                  style={{
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {product.product_stock <= 1 ? "Only one left" : "In stock"}
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "#d9725f",
                    }}
                  ></div>
                </span>
              </div>
            </div>

            {/* <div className="product-rating text-warning">
              Rating: {loading ? <Skeleton width={50} /> : <StarRatings rating={product.product_ratings} />}
            </div> */}
          </div>
        </a>
        {cart.snackbar.open && cart.snackbar.index === index && (
          <div
            style={{ fontSize: "12px" }}
            className="border text-center rounded w-75 mx-auto"
          >
            {cart.snackbar.message}
          </div>
        )}

        <div className="cart-btn px-1">
          <button
            className="btn btn-secondary"
            onClick={() => handleAddToCartClick(product, index)}
          >
            <img
              className="img-fluid"
              src={cartIcon}
              style={{ height: "20px" }}
            />
          </button>
          <button className="btn btn-primary my-2 ms-2 px-2">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
