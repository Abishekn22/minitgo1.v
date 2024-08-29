import { useState, useEffect, useContext } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { RxLapTimer } from "react-icons/rx";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import $ from "jquery"; // Import jQuery
import myContext from "./context/MyContext";
import { Link } from "react-router-dom";
import StarRatings from "./ProductInfo/StarRatings";
import { useDispatch, useSelector } from "react-redux";
import {
  showSnackbar,
  hideSnackbar,
  addItemToWishlist,
  addToCart,
  showSnackbarForWishlist,
  hideSnackbarForWishlist,
} from "./redux/Slices/CartSlice";
import zIndex from "@mui/material/styles/zIndex";

const HomeProducts = () => {
  const [selectedSizes, setSelectedSizes] = useState({});

  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState("");
  const context = useContext(myContext);
  const { products, isNewProduct } = context;
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [distanceValue, setDistanceValue] = useState("all");

  function shuffleArray(array) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
  // useEffect(() => {
  //   setFilteredProducts(products);
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000); // Adjust time as needed
  //   return () => clearTimeout(timer);

  // }, [products]);
  useEffect(() => {
    const shuffledProducts = shuffleArray(products);
    setFilteredProducts(shuffledProducts);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, [products]);
  console.log("products", products);

  useEffect(() => {
    // Extracting image URLs from products data and updating the images state
    const productImages = filteredProducts?.map((product) => ({
      id: product.product_id,
      images: [
        product.product_image1,
        product.product_image2,
        product.product_image3,
        product.product_image4,
        product.product_image5,
        product.product_image6,
      ].filter((url) => url),
    }));

    setImages(productImages);
  }, [filteredProducts]);
  // code start by ganesh
  // const handleAddToCart = (product, index) => {
  //   const size = product.product_size.split(",");
  //   const color = product.product_color1.split(",");
  //   const productWithCoordinates = {
  //     ...product,
  //     product_size: size[0],
  //     product_color1: color[0],
  //     coordinates,
  //   };

  //   console.log("Product to add: ", product);
  //   console.log("Coordinates: ", coordinates);
  //   console.log("Product with coordinates: ", productWithCoordinates);

  //   // alert("Adding product to cart");
  //   dispatch(addToCart(productWithCoordinates));
  //   console.log("Product added to cart", productWithCoordinates);

  //   dispatch(showSnackbar({ message: "Product added successfully!", index }));
  //   setTimeout(() => {
  //     dispatch(hideSnackbar());
  //   }, 1000);
  // };
  const handleAddToCart = (product, index, selectedSize) => {
    // Ensure that the selected size is used, or default to the first size
    const size = selectedSize || product.product_size.split(",")[0];
    const color = product.product_color1.split(",")[0]; // Assuming color is managed similarly

    const productWithCoordinates = {
      ...product,
      product_size: size,
      product_color1: color,
      coordinates,
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

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    handleUseCurrentLocation();
  }, []);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Google Maps URL
          const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

          // Consoling the URL link
          console.log(googleMapsUrl);

          // Set coordinates state
          setCoordinates(googleMapsUrl);
        },
        (error) => {
          console.log("Geolocation error:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (coordinates !== "") {
      // Check if coordinates are not empty
      const recordVisit = () => {
        var visits = {
          url: window.location.href,
          timestamp: new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          }),
          userAgent: navigator.userAgent,
          location: coordinates,
        };

        $.ajax({
          url: "https://minitgo.com/api/live_traffic.php",
          type: "post",
          data: visits,
          success: function (data, status) {
            console.log(visits);
          },
        });
      };

      recordVisit();
    }
  }, [coordinates]); // Run the effect whenever coordinates change

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

  const handleDistanceSelect = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const range =
      distanceValue && distanceValue === "all" ? "10" : distanceValue || "10";

    const productsWithoutCoordinates = products.filter(
      (product) => !product.lat || !product.log
    );

    const newFilteredProducts = products.filter((product) =>
      range === "20"
        ? calculateDistance(...userCords, product.lat, product.log) >=
          Number(range)
        : calculateDistance(...userCords, product.lat, product.log) <=
          Number(range)
    );

    newFilteredProducts.push(...productsWithoutCoordinates);
    setFilteredProducts(newFilteredProducts);
  };

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
  const [isActive, setIsActive] = useState(null);

  const handleClick = (index) => {
    setIsActive(index);
  };

  return (
    <>
      <div className="container">
        <h3>
          {" "}
          <BiSolidCategory className="fs-2 p-1" />
          Top Category's
        </h3>
        <p className="px-2">Explore our top category's</p>

        <div className="row">
          <div className="col-6 col-md-3">
            <div className="subs-cat  d-flex flex-column justify-content-center">
              <h4>Men's Fashion</h4>
              <Link
                to={{
                  pathname: "/mens-category",
                  search: `?category=Men's Fashion`,
                }}
              >
                <button className="btn btn-outline-light rounded-pill">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="subs-cat-2  d-flex flex-column justify-content-center">
              <h4>Women Fashion</h4>
              <Link
                to={{
                  pathname: "/womens-category",
                  search: `?category=Women's Fashion`,
                }}
              >
                <button className="btn btn-outline-light rounded-pill">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="subs-cat-3  d-flex flex-column justify-content-center">
              <h4>Fashion Accessories</h4>
              <Link
                to={{
                  pathname: "/accessories",
                  search: `?category=Accessories`,
                }}
              >
                <button className="btn btn-outline-light rounded-pill">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="subs-cat-4  d-flex flex-column justify-content-center">
              <h4>Kitchen</h4>
              <Link>
                <button className="btn btn-outline-light rounded-pill">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      {/* code start by ganesh */}
      <div className="container p-3 ">
        {/* code end by ganesh */}
        {/* row remove */}
        <div className="row">
          <div className="col-md-3 col-4 col-xl-3 p-0">
            <h3>
              <FaLocationDot className="fs-2 p-1" />
              Nearby
            </h3>
          </div>

          <div className="col-md-3 col-4 col-xl-3 d-lg-none p-0 distance ">
            <div className="select-wrapper" id="distanceDropdownWrapper">
              <select
                className="form-control rounded  "
                id="distanceFilter"
                onChange={handleDistanceSelect}
              >
                <option value="all" className="">
                  Distance
                </option>
                <option value="5">5 Km</option>
                <option value="10">10 km</option>
                <option value="15">15 km</option>
                <option value="20">20 km</option>
              </select>
            </div>
          </div>
        </div>
        {/* row remove */}
        <div className="row">
          <p className="  " style={{ fontSize: "13.5" }}>
            Increase distance for more products!{" "}
          </p>
          <div className="col-md-2 filter-s  ">
            <div className="shadow filter-bg">
              <form>
                <div className="form-group ">
                  {/* Code change start by isha */}
                  {/* <h6>Filter</h6> */}
                  <div className="FilterHeadingCss">Filter</div>
                  {/* Code change end by isha */}
                  <label htmlFor="priceFilter" className="FilterInnerHeading">
                    Distance
                  </label>

                  <select
                    className="form-control rounded-pill"
                    id="distanceFilter"
                    onChange={handleDistanceSelect}
                  >
                    <option value="all">All</option>
                    <option value="5">5 Km</option>
                    <option value="10">10 km</option>
                    <option value="15">15 km</option>
                    <option value="20">20 km</option>
                  </select>
                </div>
                {/* <div className="form-group">
                  
                  <label htmlFor="priceFilter" className="FilterInnerHeading">
                    Set Price
                  </label>
               
                  <select
                    className="form-control rounded-pill "
                    id="priceFilter"
                  >
                    <option value="">All</option>
                    <option value="$10.99">Below: 500</option>
                    <option value="$19.99">500 - 1000</option>
                    <option value="$19.99">5000 - 10000</option>
                    <option value="Null"> </option>
                  </select>
                </div> */}
              </form>
            </div>
          </div>

          <div className="col-md-10 p-2">
            {/* row remove */}
            <div className="row">
              {loading
                ? Array.from({ length: 8 }).map((_, index) => (
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
                : filteredProducts?.slice(0, 16).map((product, index) => (
                    <div
                      key={index}
                      className="col-6 col-sm-4 col-md-6 col-lg-4 col-xl-3 py-2 px-2 "
                      id="sections"
                    >
                      <div className="product-card ">
                        {/* original code */}
                        {/* <div className="product-image " > */}
                        {/* change done by sonali */}
                        <div
                          className="product-image "
                          style={{ position: "relative" }}
                        >
                          <div
                            id={`carouselExampleIndicators${index}`}
                            className=" carousel slide v w-100  rounded-2"
                            data-bs-ride="carousel"
                            //
                            style={{ height: "100%" }}
                          >
                            <div className="carousel-inner rounded   h-100">
                              {images[index]?.images.map((img, imgIndex) => (
                                <div
                                  key={imgIndex}
                                  className={` h-100  carousel-item${
                                    imgIndex === 0 ? " active" : ""
                                  }`}
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
                                      className="d-block w-100"
                                      src={img}
                                      alt={`Slide ${imgIndex}`}
                                    />
                                  </a>
                                </div>
                              ))}
                            </div>
                            <button
                              className="carousel-control-prev   rounded-circle p-2  bg-secondary"
                              type="button"
                              data-bs-target={`#carouselExampleIndicators${index}`}
                              data-bs-slide="prev"
                              style={{
                                height: "29px",
                                top: "50%",
                                width: "29px",
                                zIndex: "0",
                              }}
                            >
                              <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                              ></span>
                              <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                              className="carousel-control-next  rounded-circle p-2  bg-secondary "
                              type="button"
                              data-bs-target={`#carouselExampleIndicators${index}`}
                              data-bs-slide="next"
                              style={{
                                height: "29px",
                                top: "50%",
                                width: "29px",
                                zIndex: "0",
                              }}
                            >
                              <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                              ></span>
                              <span className="visually-hidden">Next</span>
                            </button>
                          </div>
                          {/* Code change start by isha */}
                          {/* <div
                          className={`offer-tag bg-warning rounded-pill text-center p-1 text-light ${product.offers === "0" && "invisible"
                            }`}
                        > */}
                          {/* original code */}
                          {/* <div
                          className={`offer-tag bg-warning rounded-pill text-center p-1 text-light mt-2
                           ${product.offers === "0" && "invisible"}`}
                        > */}
                          {/* changes done by sonali */}
                          {/* update code for responsive offer section by ganesh */}
                          {isActive === index && (
                <div
                  className="border px-1 rounded responsive-div bg-body-secondary md:py-0"
                  style={{
                    position: 'absolute',
                    bottom: '-7px',
                    left: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="active-content text-gray-700">
                    Active now
                  </span>
                </div>
              )}
                          <div>
                            <div
                              className="offer-tag text-center p-1 text-bold mt-2"
                              style={{
                                position: "absolute",
                                bottom: "15px",
                                right: "10px",
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
                            <div
                              className="offer-tag text-center p-1 text-bold mt-2"
                              style={{
                                position: "absolute",
                                bottom: "20px",
                                left: "10px",
                                fontSize: "0.8rem",
                                padding: "1rem",
                                textDecorationColor: "HighlightText",
                                border: "none",
                                borderRadius: "50px",
                                fontWeight: "bold",
                                backgroundColor: "#40f858",
                                width: "0.938rem", // Size of the dot
                                height: "0.938rem",
                              }}
                              onClick={() => handleClick(index)}
                            ></div>
                          </div>
                        </div>

                        <div className="product-content d-flex flex-column gap-1 pt-3  px-2">
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
                              <span
                                className="line-clamp-1"
                                style={{ width: "50%" }}
                              >
                                {product.client_name}
                              </span>
                              <span>
                                <RxLapTimer style={{ marginRight: "5px" }} />
                                <span style={{ color: "orange" }}>36 min</span>
                              </span>
                            </div>
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
                          {/* code start by ganesh */}
                          <div className="flex-container ">
                            <h6 className="fs-9 text-start">
                              <span className="fw-semibold">
                                {product.product_title}
                              </span>{" "}
                              |<span className="fw-bold"> Color:</span>{" "}
                              {product.product_color1} |
                              <span className="fw-bold">
                                {" "}
                                {product.material}
                              </span>{" "}
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
                            {/* code end by ganesh */}
                            <div>
                              <span
                                className=" fw-bold"
                                style={{ fontSize: "12px" }}
                              >
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
                                  {product.product_size
                                    .split(",")
                                    .map((size, index) => (
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
                            <div
                              className="instock"
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <span
                                className=" fw-bold"
                                style={{
                                  fontSize: "12px",
                                  display: "flex",
                                  alignItems: "center",
                                  // justifyContent: "center",
                                  gap: "3px",
                                }}
                              >
                                {product.product_stock <= 1
                                  ? "One left"
                                  : "In stock"}
                                <div
                                  style={{
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    background: "#d9725f",
                                  }}
                                ></div>
                              </span>
                              <span style={{ fontSize: "12px" }}>
                                open now - close at 8pm
                              </span>
                            </div>
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

                          <div className=" cart-btn ">
                            <button
                              onClick={() =>
                                handleAddToCartClick(product, index)
                              }
                              className="btn btn-primary my-2  "
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
                              onClick={() =>
                                handleWishListToCart(product, index)
                              }
                            >
                              ❤
                            </button>
                          </div>
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

export default HomeProducts;
