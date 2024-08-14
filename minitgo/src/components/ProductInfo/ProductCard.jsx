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

function ProductCard({ product, index }) {
  const context = useContext(myContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);

  const { products } = context;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Set timeout for 2 seconds

    return () => clearTimeout(timer);
  }, [product]);

  const handleAddToCart = (product, index) => {
    const size=product.product_size.split(',')
    const color=product.product_color1.split(',')    
    const productWithCoordinates = {
      ...product,
      product_size: size[0],
      product_color1:color[0],
      // coordinates,
    };
    dispatch(addToCart(productWithCoordinates));
    dispatch(showSnackbar({ message: "Product added successfully!", index }));
    console.log("index", index);

    // Wait for 1 second, then hide snackbar
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 1000);
  };
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
              {loading ? (
                <Skeleton width={80} />
              ) : (
                <span>{product.category}</span>
              )}
            </div>
            {loading ? (
              <Skeleton width={150} />
            ) : ( ""
  //             <a
  //               href={`/${product.product_id}`}
  //               target="_blank"
  //               style={{
  //                 textDecoration: "none",
  //                 color: "black",
  //               }}
  //               className="fw-semibold"
  //             >
  //               {windowWidth <= 1024
  // ? product.product_name && product.product_name.length > 15
  //   ? product.product_name.substring(0, 15) + "..."
  //   : product.product_name
  // : product.product_name && product.product_name.length > 23
  // ? product.product_name.substring(0, 23) + "..."
  // : product.product_name}
  //             </a>
            )}

            <div className="flex-container">
              <h5 className="mt-1 flext-item">
                Price: <sup>&#x20B9;</sup>
                {loading ? (
                  <Skeleton width={50} />
                ) : (
                  `₹${product.product_price}`
                )}
                <span className="text-decoration-line-through text-muted fs-6 fw-light">
                  {loading ? <Skeleton width={30} /> : "599"}
                </span>
                <span
                  className="text-muted"
                  style={{
                    fontSize: "13px",
                  }}
                >
                  {loading ? <Skeleton width={50} /> : product.product_stock}
                </span>
              </h5>
              <div>
                <span className="fw-semibold">Size:</span>{" "}
                {loading ? <Skeleton width={30} /> : <span>{product.product_size}</span>}
              </div>
            </div>
            <div
              className="d-flex justify-content-between"
              style={{ fontSize: "14px" }}
            >
              <div>
                <span className="fw-semibold"></span>{" "}
                {loading ? <Skeleton width={50} /> : <span>{product.material}</span>}
              </div>
              <div>
                <span className="fw-semibold">Color:</span>{" "}
                {loading ? <Skeleton width={30} /> : <span>{product.product_color1}</span>}
              </div>
            </div>
            <div className="mt-1 clamped-text" style={{ textAlign: "justify" }}>
              {loading ? (
                <Skeleton count={2} />
              ) : windowWidth <= 576 ? (
                product.product_discription.length > 20
                  ? product.product_discription.substring(0, 19) + "..."
                  : product.product_discription
              ) : product.product_discription.length > 50 ? (
                product.product_discription.slice(0, 45) + "..."
              ) : (
                product.product_discription
              )}
            </div>
            {/* <div className="product-rating text-warning">
              Rating: {loading ? <Skeleton width={50} /> : <StarRatings rating={product.product_ratings} />}
            </div> */}
            <p className="product-distance text-secondary">
              {loading ? <Skeleton width={100} /> : `Distance: ${product.distance}km away.`}
            </p>
            {cart.snackbar.open && cart.snackbar.index === index && (
              <div
                style={{ fontSize: "12px" }}
                className="border text-center rounded w-75 mx-auto"
              >
                {cart.snackbar.message}
              </div>
            )}
          </div>
        </a>

        <div className="cart-btn px-1">
          <button
            className="btn btn-secondary"
            onClick={() => handleAddToCart(product, index)}
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
