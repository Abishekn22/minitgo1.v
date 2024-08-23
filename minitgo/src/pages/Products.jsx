import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Filter from "../components/Filter";
import Ban from "../components/images/product.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StarRatings from "../components/ProductInfo/StarRatings.jsx";
import cartIcon from "../assets/cart-icon.svg";
import { useContext } from "react";
import myContext from "../components/context/MyContext.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  addToCart,
  showSnackbar,
  hideSnackbar,
  addItemToWishlist,
  hideSnackbarForWishlist,
  showSnackbarForWishlist,
} from "../components/redux/Slices/CartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Slider from "../components/Addslider.jsx";

const HomeProducts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFiltered, setCategoryFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [recommendedHeading, setRecommendedHeading] = useState(false);

  const context = useContext(myContext);
  const {
    selectedCategory,
    setSelectedCategory,
    accessoriesCategory,
    handleSearchInputChange,
    setAccessoriesCategory,
    products,
    selectedPrice,
    selectedDistance,
    searchQuery,
    offer,
    setOffers,
    isNewProduct,
  } = context;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const suggestedData = queryParams.get("suggestion");
  const category = queryParams.get("category");

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const handleAddToCart = (product, index) => {
    const size = product.product_size.split(",");
    const color = product.product_color1.split(",");
    const productWithCoordinates = {
      ...product,
      product_size: size[0],
      product_color1: color[0],
      // coordinates,
    };
    dispatch(addToCart(productWithCoordinates));
    dispatch(showSnackbar({ message: "Product added successfully!", index }));

    // Wait for 1 second, then hide snackbar
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 1000);
  };

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

  if (selectedCategory !== "") {
    const url = `/category?selectedCategory=${encodeURIComponent(
      selectedCategory
    )}`;
    navigate(url);
  }

  if (accessoriesCategory !== "") {
    const url = `/accessories?selectedCategory=${encodeURIComponent(
      accessoriesCategory
    )}`;
    navigate(url);
  }

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

    return distanceInKm.toFixed(2);
  };

  useEffect(() => {
    setAccessoriesCategory("");
    setSelectedCategory("");
    setTimeout(() => setLoading(false), 2000);
    // setLoading(true)
    // Adjust time as needed

    // Apply price filtering
    let productsToFilter = products;

    // Distance filtering
    console.log(selectedDistance);
    if (selectedDistance !== "all" && localStorage.getItem("user")) {
      console.log(productsToFilter);
      const user = JSON.parse(localStorage.getItem("user"));
      const userCords = [user.lat, user.log];
      const range = selectedDistance || "5";

      const productsWithoutCoordinates = productsToFilter.filter(
        (product) => !product.lat || !product.log
      );
      let productsLeft = products.filter(
        (product) =>
          calculateDistance(...userCords, product.lat, product.log) >
          Number(range)
      );

      const uniqueCategories = {};
      const newFilteredProducts = [];

      products.forEach((product) => {
        if (
          calculateDistance(...userCords, product.lat, product.log) <=
          Number(range)
        ) {
          if (!uniqueCategories[product.category]) {
            newFilteredProducts.push(product);
            uniqueCategories[product.category] = true;
          } else {
            productsLeft.push(product);
          }
        }
      });

      productsToFilter = [
        ...newFilteredProducts,
        ...productsWithoutCoordinates,
        ...productsLeft,
      ];
    }

    if (selectedPrice !== "" && selectedPrice !== "500 +") {
      console.log("SELCTED", selectedPrice);
      console.log("below 500");
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

      productsToFilter = filteredByOffer;
    }
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    const normalizedQuery = lowerCaseSearchQuery.replace(/[^a-zA-Z0-9 ]/g, "");
    console.log("lowercase", lowerCaseSearchQuery);
    if (lowerCaseSearchQuery.trim() !== "") {
      const filtered = productsToFilter.filter((product) => {
        // Normalize the product fields for comparison
        const normalizedCategory = product.category
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 ]/g, "");
        const normalizedProductTitle = product.product_title
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 ]/g, "");
        const productName = product.product_title || "";
        const normalizedProductName = productName
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 ]/g, "");
        const normalizedDescription =
          product.description?.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "") ||
          "";
        const normalizedBrand =
          product.brand?.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "") || "";
        const normalizedClientName =
          product.client_name?.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "") ||
          "";

        return (
          normalizedCategory.includes(normalizedQuery) ||
          normalizedProductTitle.includes(normalizedQuery) ||
          normalizedProductName.includes(normalizedQuery) ||
          normalizedDescription.includes(normalizedQuery) ||
          normalizedBrand.includes(normalizedQuery) ||
          normalizedClientName.includes(normalizedQuery)
        );
      });
      console.log("filtered productspage ", filtered);
      if (filtered.length > 0) {
        setFilteredProducts(filtered);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
      } else {
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

          productsToFilter = [...combinedProducts, ...remainingProducts];
        }

        if (selectedPrice === "500 +") {
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

          productsToFilter = filteredByOffer;
        }

        // setFilteredProducts(productsToFilter);
        const shuffledProducts = shuffleArray(productsToFilter);
        setFilteredProducts(shuffledProducts);

        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    } else {
      // setFilteredProducts(productsToFilter);
      const shuffledProducts = shuffleArray(productsToFilter);
      setFilteredProducts(shuffledProducts);

      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
      // setFilteredProducts([])
    }
    // return () => clearTimeout(timer);
  }, [
    products,
    searchQuery,
    selectedPrice,
    offer,
    selectedCategory,
    selectedDistance,
  ]);
  function shuffleArray(array) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
  console.log(products);
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

  return (
    <>
      <br></br>
      {/* we are coming soon */}
      <div className="container">
        <h6>
          |<FaLocationDot className="fs-3 p-1" />
          Find Near You{" "}
        </h6>
        <div className="row">
          <Filter brand="Test" />

          <div className="col-md-10">
            <div className="row">
              {loading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="col-6 col-sm-4 col-md-6 col-lg-4 col-xl-3 py-2"
                  >
                    <Skeleton height={200} />
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={20} width="60%" />
                    <Skeleton height={20} width="40%" />
                    <Skeleton height={20} width="30%" />
                  </div>
                ))
              ) : filteredProducts?.length === 0 ? (
                <div
                  className="col-12 py-2 text-center fs-4 fw-semibold"
                  id="sections"
                >
                  No Products Found
                </div>
              ) : (
                filteredProducts.map((product, index) => (
                  <div key={index} className="col-6 col-sm-3 py-2">
                    <div className="product-card">
                      <div
                        className="product-image"
                        style={{ position: "relative" }}
                      >
                        <a
                          href={`/${product.pid}`}
                          target="_blank"
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          <img
                            src={product.product_image1}
                            style={{ width: "100%" }}
                            alt="Product 1"
                          />
                        </a>
                        <span
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            background: "yellow",
                            padding: "5px",
                            fontSize: "10px",
                          }}
                        >
                          Live Image
                        </span>
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
                          {product.offers}% Off
                        </div>
                      </div>

                      <div className="product-content d-flex flex-column gap-1 pt-3  px-1 pb-3  ">
                        <div
                        style={{ fontSize: "14px" }}
                            className="d-flex justify-content-between"
                          // className=""
                          // style={{
                          //   height: "40px",
                          //   fontSize: "14px",
                          //   gap: "2px",
                          //   display: "flex",
                          //   justifyContent: "space-between",
                          // }}
                        >
                          <div
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <span className="">{product.client_name}</span>
                              <span style={{ color: "orange" }}>36 min</span>
                            </div>
                          {isNewProduct(product.date) && (
                            <span className="ms-4" style={{ color: "#ffc107" }}>
                              New
                            </span>
                          )}
                          
                        </div>
                        {/* <a
                          href={`/${product.product_id}`}
                          target="_blank"
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          {windowWidth <= 1024
                            ? product.product_title &&
                              product.product_title.length > 15
                              ? product.product_title.substring(0, 15) + "..."
                              : product.product_title
                            : product.product_title &&
                              product.product_title.length > 23
                            ? product.product_title.substring(0, 23) + "..."
                            : product.product_title}
                        </a> */}
                        <a
                            href={`/${product.product_id}`}
                            target="_blank"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                            className="fw-semibold"
                          >
                            {windowWidth <= 1024
                              ? product.product_name &&
                                product.product_name.length > 15
                                ? product.product_name.substring(0, 15) + "..."
                                : product.product_name
                              : product.product_name &&
                                product.product_name.length > 23
                              ? product.product_name.substring(0, 23) + "..."
                              : product.product_name}
                          </a>
                        <div className="flex-container ">
                            <h6 className="fs-9 text-start">
                              <span className="fw-semibold">
                                {product.product_title}
                              </span>{" "}
                              
                              |<span className="fw-bold"> Color:</span>{" "}
                              {product.product_color1} {" "}| 
                              <span className="fw-bold">{" "}
                                {product.material}
                              </span>{" "}
                            </h6>
                              
                            <h5 className="mt-1 flext-item  " style={{fontSize:"1rem"}}>
                              ₹{product.product_price}
                              <span className="text-decoration-line-through text-muted  fw-light" style={{fontSize:"0.813rem"}}>
                                599
                              </span>
                              <span
                                className="text-muted"
                                style={{
                                  fontSize: "10px",
                                }}
                              >
                                {" "}
                                {/* {product.product_stock} */}
                              </span>
                            </h5>
                            {/* code end by ganesh */}
                            <div>
                              <span className=" fw-bold" style={{fontSize:"0.875rem"}}>Available size:</span>{" "}
                              <span className="px-1" style={{backgroundColor:"#d9725f",fontSize:"0.875rem"}}>{product.product_size}</span>
                            </div>
                          </div>

                        {/* <h5 className="mt-1">
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
                        </h5> */}
{/* 
                        <div className="d-flex flex-column flex-sm-row justify-content-between ">
                          <h6>
                            Size: <span>{product.product_size}</span>
                          </h6>
                          <h6 className="">
                            Color: <span>{product.product_color1}</span>
                          </h6>
                        </div> */}

                        {/* <div className="clamped-text">
                          {product.product_discription.length > 40
                            ? product.product_discription.slice(0, 40) + "..."
                            : product.product_discription}
                        </div> */}

                        {/* <div className="product-rating text-warning d-flex ">
                          Rating:{" "}
                          <StarRatings rating={product.product_ratings} />
                        </div> */}
                        {/* <div className="product-distance text-secondary ">
                          Distance: {product.distance}km away.
                        </div> */}
                        {/* {cart.snackbar.open &&
                          cart.snackbar.index === index && (
                            <div
                              style={{ fontSize: "12px" }}
                              className="border text-center rounded w-75 mx-auto"
                            >
                              {cart.snackbar.message}
                            </div>
                          )} */}
                      </div>

                      {/* Buttons */}
                      <div className="cart-btn px-1">
                      <button
                          className="btn btn-primary my-2  ms-2 px-2 "
                          onClick={() => handleAddToCart(product, index)}
                        >
                          Add to cart
                        </button>
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
                        
                        {/* <button className="btn btn-primary my-2  ms-2 ">
                          <Link
                            to="/checkout"
                            style={{ textDecoration: "none", color: "#000" }}
                          >
                            Buy Now
                          </Link>
                        </button> */}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <Slider />
        </div>
      </div>
      <br></br>
    </>
  );
};

export default HomeProducts;
