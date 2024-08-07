

import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Filter from "../components/Filter";
import Ban from "../components/images/product.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StarRatings from "../components/ProductInfo/StarRatings.jsx";
import { useContext } from "react";
import myContext from "../components/context/MyContext.js";
import { addToCart } from "../components/redux/Slices/CartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import cartIcon from "../assets/cart-icon.svg";

import {
  showSnackbar,
  hideSnackbar,
} from "../components/redux/Slices/CartSlice.js";

const Category = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [recommendedHeading, setRecommendedHeading] = useState(false);

  const context = useContext(myContext);
  const {
    selectedCategory,
    setSelectedCategory,
    accessoriesCategory,
    setAccessoriesCategory,
    products,
    selectedPrice,
    setSearchQuery,
    offer,
    isNewProduct
  } = context;

  const dispatch = useDispatch();
  const handleAddToCart = (product, index) => {
    dispatch(addToCart(product));
    dispatch(showSnackbar({ message: "Product added successfully!", index }));

    // Wait for 1 second, then hide snackbar
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 1000);
  };
  const cart = useSelector((state) => state.cart);

  if (accessoriesCategory !== "") {
    const url = `/accessories?selectedCategory=${encodeURIComponent(
      accessoriesCategory
    )}`;
    navigate(url);
  }
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

  useEffect(() => {
    if (selectedCategory !== "") {
      const url = `/category?selectedCategory=${encodeURIComponent(
        selectedCategory
      )}`;
      navigate(url);
    }
  }, [selectedCategory, navigate]);

  useEffect(() => {
    setSearchQuery("");
    setAccessoriesCategory("");
    let productsToFilter = products;
    if (selectedCategory !== "" && selectedCategory !== "AllCategory") {
      console.log("CATEGORY", selectedCategory);
      setSelectedCategory(selectedCategory);

      const lowerCaseSelectedCategory = selectedCategory.toLowerCase();

      const filteredByCategory = products.filter((product) => {
        const lowerCaseProductCategory = product.category.toLowerCase();
        return lowerCaseProductCategory === lowerCaseSelectedCategory;
      });

      if (filteredByCategory.length > 0) {
        productsToFilter = filteredByCategory;
        let filtered = [...productsToFilter]; // Copy the accessories products array

        if (selectedPrice !== "" && selectedPrice !== "500 +") {
          const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

          const withinRangeProducts = filtered.filter((product) => {
            const price = parseInt(product.product_price);
            return price >= minPrice && price <= maxPrice;
          });

          const aboveRangeProducts = filtered.filter((product) => {
            const price = parseInt(product.product_price);
            return price > maxPrice;
          });

          let combinedProducts = [
            ...withinRangeProducts,
            ...aboveRangeProducts,
          ];

          combinedProducts.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
          );

          const remainingProducts = productsToFilter.filter((product) => {
            if (selectedPrice !== "") {
              const [minPrice] = selectedPrice.split("-").map(Number);
              const price = parseInt(product.product_price);
              return price < minPrice;
            } else {
              return true; // Include all products if no price range is selected
            }
          });

          remainingProducts.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
          );

          filtered = [...combinedProducts, ...remainingProducts];
        }

        if (selectedPrice === "500 +") {
          console.log("Before", filtered);
          console.log("above 500");
          const above500Products = filtered.filter((product) => {
            const price = parseInt(product.product_price);
            return price >= 500;
          });

          above500Products.sort(
            (a, b) => parseFloat(b.product_price) - parseFloat(a.product_price)
          );

          const remainingProducts = productsToFilter.filter((product) => {
            if (selectedPrice !== "") {
              let minPrice = 500;
              const price = parseInt(product.product_price);
              return price < minPrice;
            } else {
              return true; // Include all products if no price range is selected
            }
          });

          remainingProducts.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
          );

          filtered = [...above500Products, ...remainingProducts];
        }

        if (offer !== "") {
          const selectedOffer = parseInt(offer);

          const filteredByOffer = filtered.filter((product) => {
            // Assuming 'product_offer' is the property containing offer percentage
            const offerPercentage = parseInt(product.offers);
            return offerPercentage >= selectedOffer;
          });

          filteredByOffer.sort(
            (a, b) => parseFloat(a.offers) - parseFloat(b.offers)
          );

          filtered = filteredByOffer;
        }

        if (filtered.length === 0) {
          filtered = [...productsToFilter];
          filtered.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
          );
        }

        setFilteredProducts(filtered);
      } else {
        productsToFilter = products;
        let filtered = [...productsToFilter];
        if (selectedPrice !== "" && selectedPrice !== "500 +") {
          const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

          const withinRangeProducts = filtered.filter((product) => {
            const price = parseInt(product.product_price);
            return price >= minPrice && price <= maxPrice;
          });

          const aboveRangeProducts = filtered.filter((product) => {
            const price = parseInt(product.product_price);
            return price > maxPrice;
          });

          let combinedProducts = [
            ...withinRangeProducts,
            ...aboveRangeProducts,
          ];

          combinedProducts.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
          );

          const remainingProducts = productsToFilter.filter((product) => {
            if (selectedPrice !== "") {
              const [minPrice] = selectedPrice.split("-").map(Number);
              const price = parseInt(product.product_price);
              return price < minPrice;
            } else {
              return true; // Include all products if no price range is selected
            }
          });

          remainingProducts.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
          );

          filtered = [...combinedProducts, ...remainingProducts];
        }

        if (selectedPrice === "500 +") {
          console.log("above 500");
          const above500Products = filtered.filter((product) => {
            const price = parseInt(product.product_price);
            return price >= 500;
          });

          above500Products.sort(
            (a, b) => parseFloat(b.product_price) - parseFloat(a.product_price)
          );

          const remainingProducts = productsToFilter.filter((product) => {
            if (selectedPrice !== "") {
              let minPrice = 500;
              const price = parseInt(product.product_price);
              return price < minPrice;
            } else {
              return true; // Include all products if no price range is selected
            }
          });

          remainingProducts.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
          );
          filtered = [...above500Products, ...remainingProducts];
        }

        if (offer !== "") {
          const selectedOffer = parseInt(offer);

          const filteredByOffer = filtered.filter((product) => {
            // Assuming 'product_offer' is the property containing offer percentage
            const offerPercentage = parseInt(product.offers);
            return offerPercentage >= selectedOffer;
          });

          filteredByOffer.sort(
            (a, b) => parseFloat(a.offers) - parseFloat(b.offers)
          );

          filtered = filteredByOffer;
        }

        // If no products match the filters, set filtered products to all accessories of the selected category
        if (filtered.length === 0) {
          filtered = [...productsToFilter];
          console.log("length :", filtered);
          filtered.sort(
            (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
          );
        }

        setFilteredProducts(filtered);
      }
    } else {
      console.log("ELSE CATEGORY:", selectedCategory);
      productsToFilter = products;

      if (selectedPrice !== "" && selectedPrice !== "500 +") {
        const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

        const withinRangeProducts = productsToFilter.filter((product) => {
          const price = parseInt(product.product_price);
          return price >= minPrice && price <= maxPrice;
        });

        const aboveRangeProducts = productsToFilter.filter((product) => {
          const price = parseInt(product.product_price);
          return price > maxPrice;
        });

        let combinedProducts = [...withinRangeProducts, ...aboveRangeProducts];

        combinedProducts.sort(
          (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
        );

        const remainingProducts = productsToFilter.filter((product) => {
          if (selectedPrice !== "") {
            const [minPrice] = selectedPrice.split("-").map(Number);
            const price = parseInt(product.product_price);
            return price < minPrice;
          } else {
            return true; // Include all products if no price range is selected
          }
        });

        remainingProducts.sort(
          (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
        );

        productsToFilter = [...combinedProducts, ...remainingProducts];
      }

      if (selectedPrice === "500 +") {
        console.log("above 500");
        const above500Products = productsToFilter.filter((product) => {
          const price = parseInt(product.product_price);
          return price >= 500;
        });

        above500Products.sort(
          (a, b) => parseFloat(b.product_price) - parseFloat(a.product_price)
        );

        const remainingProducts = productsToFilter.filter((product) => {
          if (selectedPrice !== "") {
            let minPrice = 500;
            console.log("ELSE MIN", minPrice);
            const price = parseInt(product.product_price);
            return price < minPrice;
          } else {
            return true; // Include all products if no price range is selected
          }
        });
        console.log("ELSE REMAINING PROD", remainingProducts);

        remainingProducts.sort(
          (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
        );

        productsToFilter = [...above500Products, ...remainingProducts];
      }
      if (offer !== "") {
        const selectedOffer = parseInt(offer);

        const filteredByOffer = productsToFilter.filter((product) => {
          // Assuming 'product_offer' is the property containing offer percentage
          const offerPercentage = parseInt(product.offers);
          return offerPercentage >= selectedOffer;
        });

        filteredByOffer.sort(
          (a, b) => parseFloat(a.offers) - parseFloat(b.offers)
        );

        if (filteredByOffer.length === 0) {
          console.log("LENGTH 0", productsToFilter);
          productsToFilter = productsToFilter;
        } else {
          productsToFilter = filteredByOffer;
        }
      }
      setFilteredProducts(productsToFilter);
    }
  }, [selectedCategory, selectedPrice, products, offer]);

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



  const user = JSON.parse(localStorage.getItem("user"));
  const userCords = user ? [user.lat, user.log] : null;
const calculateDistance = (startLat, startLng, destLat, destLng) => {
    if (!startLat || !startLng || !destLat || !destLng) return Infinity;

    const degToRad = (degrees) => {
      return (degrees * Math.PI) / 180;
    };

    const startLatRad = degToRad(Number(startLat));
    const startLngRad = degToRad(Number(startLng));
    const destLatRad = degToRad(Number(destLat));
    const destLngRad = degToRad(Number(destLng));

    const earthRadius = 6371; // Radius of the Earth in kilometers

    const latDiffRad = destLatRad - startLatRad;
    const lngDiffRad = destLngRad - startLngRad;

    const a =
      Math.sin(latDiffRad / 2) * Math.sin(latDiffRad / 2) +
      Math.cos(startLatRad) *
        Math.cos(destLatRad) *
        Math.sin(lngDiffRad / 2) *
        Math.sin(lngDiffRad / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceInKm = earthRadius * c;

    console.log(
      `UserLat: ${startLat}, UserLong: ${startLng}, ProductLat: ${destLat}, ProductLong: ${destLng}`
    );
    console.log(distanceInKm.toFixed(2));
    return distanceInKm.toFixed(2);
  };

  return (
    <>
      <br />
      <br />
      {/* we are coming soon */}
      <div className="container">
        <h6>
          |<FaLocationDot className="fs-3 p-1" />
          Find Near You{" "}
        </h6>
        <div className="row">
          <Filter brand="Test" />

          <div className="col-md-10">
            <div className="row ">
              {filteredProducts?.map((product, index) => (
                <div
                  key={index}
                  className="col-6 col-sm-4 col-md-6 col-lg-4 col-xl-3 py-2 "
                >
                  <div className="product-card ">
                    <a
                      href={`/${product.product_id}`}
                      target="_blank"
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      {/* update code by ganesh */}
                      <div
                        className="product-image"
                        style={{ position: "relative" }}
                      >
                        <img src={product.product_image1} alt="Product 1" />
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
                            backgroundColor:
                              product.offers === "0" ? "" : "#e8d9b7",
                            opacity: product.offers === "0" ? 0 : 0.5,
                          }}
                        >
                          {product.offers === "0"
                            ? "No Offer"
                            : `${product.offers}% Off`}
                        </div>
                      </div>
                      {/* code end by ganesh */}

                      <div className="product-content d-flex flex-column gap-1 pt-3  px-2">
                        <div
                          style={{ fontSize: "14px" }}
                          className="d-flex justify-content-between"
                        >
                          <span>{product.category}</span>
                          <div>
                            {isNewProduct(product.date) && (
                              <span
                                className="btn  btn-secondary p-0 px-1"
                                style={{ color: "#ffc107", fontSize: "14px" }}
                              >
                                New
                              </span>
                            )}
                          </div>
                        </div>
                        <a
                          href={`/${product.product_id}`}
                          target="_blank"
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                          className="fw-semibold "
                        >
                           {windowWidth <= 1024
  ? product.product_name && product.product_name.length > 15
    ? product.product_name.substring(0, 15) + "..."
    : product.product_name
  : product.product_name && product.product_name.length > 23
  ? product.product_name.substring(0, 23) + "..."
  : product.product_name}
                        </a>
                        {/* code start by ganesh */}
                        <div className="flex-container">
                          <h5 className="mt-1 flext-item ">
                            {/* code end by ganesh */}₹{product.product_price}
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
                          <div>
                            <span className="fw-semibold">Size:</span>{" "}
                            <span>{product.product_size}</span>
                          </div>
                        </div>

                        <div
                          className="d-flex justify-content-between "
                          style={{ fontSize: "14px" }}
                         >
                          <div>
                            <span className="fw-semibold"></span>{" "}
                            <span>{product.material}</span>
                          </div>
                          <div className="">
                            <span className="fw-semibold">Color:</span>{" "}
                            <span>{product.product_color1}</span>
                          </div>
                        </div>
                        {/* code start by gaensh */}
                        <div
                          className="mt-1 clamped-text"
                          style={{ textAlign: "justify" }}
                         >
                          {/* code end by ganesh */}
                          {windowWidth <= 576
                            ? product.product_discription.length > 20
                              ? product.product_discription.substring(0, 19) +
                                "..."
                              : product.product_discription
                            : product.product_discription.length > 50
                            ? product.product_discription.slice(0, 45) + "..."
                            : product.product_discription}

                          {/* {product.product_discription.length > 50
                              ? product.product_discription.slice(0, 45) + "..."
                              : product.product_discription} */}
                        </div>

                        <div className="d-flex justify-content-between mt-1">
                          {/* <div className="product-rating text-warning d-flex ">
                            <StarRatings rating={product.product_ratings} />
                          </div> */}
                          {userCords && (
                            <div className="product-distance text-secondary ">
                              {product.distance ||
                                calculateDistance(
                                  ...userCords,
                                  product.lat,
                                  product.log
                                )}
                              km away.
                            </div>
                          )}
                        </div>

                        {cart.snackbar.open &&
                          cart.snackbar.index === index && (
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
                            className={`btn ${
                              wishlistClicked[index]
                                ? "btn-success"
                                : "btn-primary"
                            } w-21 my-2`}
                            // style={{ height: "20px", fill: "white" }}
                            onClick={() => handleWishListToCart(product, index)}
                          >
                            ❤
                          </button>
                      <button
                        onClick={() => handleAddToCart(product, index)}
                        className="btn btn-primary my-2  ms-2 px-2 "
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;




