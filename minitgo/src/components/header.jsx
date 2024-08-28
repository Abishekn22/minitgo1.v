import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { FaLocationDot, FaResearchgate, FaSearchengin } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import {
  FaHome,
  FaInfoCircle,
  FaListAlt,
  FaBoxOpen,
  FaPhoneAlt,
  FaSearch,
  FaHandshake,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.css";
import Logo from "../components/images/minitgo.png";
import profileIcon from "../assets/profile.svg";

import {
  FaBox,
  FaCartShopping,
  FaCommentDots,
  FaLink,
  FaLocationCrosshairs,
  FaRegNewspaper,
} from "react-icons/fa6";
import { CiLocationArrow1 } from "react-icons/ci";

// import { BiCartAlt } from "react-icons/bi";
import cartIcon from "../assets/cart-icon.svg";
import { BiLogIn } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BiMenuAltRight } from "react-icons/bi";
import Catlog from "./catlog.jsx";
import Offcanvas from "react-bootstrap/Offcanvas"; // Import Offcanvas
import { useContext } from "react";
import myContext from "../components/context/MyContext.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectTotalQuantity,
  showSnackbar,
} from "../components/redux/Slices/CartSlice.js";
import Login from "../pages/Signin.jsx";
import { Col, Modal, Row } from "react-bootstrap";
import SignUp from "../pages/SignUp.jsx";

import { IoHome } from "react-icons/io5";
import { FaCircleInfo, FaUserPlus, FaListCheck } from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";
import { MdContactSupport, MdHelp, MdOutlineUpdate } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { PiHandshakeBold } from "react-icons/pi";
import location from "../assets/redDot.png";
import "./header.css";
import "../index.css";
import ResetPassword from "./ResetPassword.jsx";
import { toast } from "react-toastify";
import TemperatureRegulator from "./TemperatureRegulator.jsx";
import axios from "axios";

function Header() {
  const hasShownToast = useRef(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [townDistrict, setTownDistrict] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const signInData = localStorage.getItem("user");
  const parsedSignInData = JSON.parse(signInData);
  console.log("parsedSignInData", parsedSignInData);
  const [activeLink, setActiveLink] = useState("/");

  const fetchLocation = () => {
    navigate("/profile");
  };
  const handleClick = (path) => {
    setActiveLink(path);
    // Close offcanvas menu or other actions
    setShowOffcanvas(false);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  // const navigate = useNavigate();
  const totalQuantity = useSelector(selectTotalQuantity);
  const [loginModal, setLoginModal] = useState(false);

  // State to manage the dropdown title
  const locations = (
    <>
      <CiLocationArrow1 /> Hyderabad
    </>
  );
  const [dropdownTitle, setDropdownTitle] = useState(locations);

  // Function to handle the dropdown item click
  const handleDropdownItemClick = (option) => {
    // Update the dropdown title based on the selected item
    setDropdownTitle(option);
  };
  // State to manage Offcanvas visibility
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showLeftSideOffcanvas, setShowLeftSideOffcanvas] = useState(false);

  // context code add
  const context = useContext(myContext);
  const {
    searchQuery,
    setSearchQuery,
    handleSearchInputChange,
    products,
    setSelectedCategory,
    showModal,
    setShowModal,
    forgetPasswordModal,
    addressStore,
    setAddressStore,
    setOfficeAddressStore,
  } = context;

  let productsToFilter = products;
  // code for serach
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const focusSearchInput = () => {
    const searchInput = document.querySelector(".search-box");
    if (searchInput) {
      searchInput.focus();
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api");
        const data = await response.json();
        const userData = data.results[0];

        const userName = ` ${userData.name.first} ${userData.name.last}`;
        const userNumber = userData.cell;
        const userLocation = `${userData.location.country}, ${userData.location.state}`;

        const responseAvatar = await fetch(
          `https://ui-avatars.com/api/?name=${userName}&background=FFCCBC`
        );
        const dataAvatar = await responseAvatar.blob();
        const userImage = URL.createObjectURL(dataAvatar);

        setUser({
          name: userName,
          image: userImage,
          number: userNumber,
          location: userLocation,
          address: userLocation, // Assuming userLocation is the address
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    console.log("uss", userData);

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData && userData.address) {
      setAddressStore(userData.address);
    }
    if (userData && userData.officeAddress) {
      setOfficeAddressStore(userData.officeAddress);
    }
  }, [user]);

  useEffect(() => {
    if (searchQuery !== "") {
      setSelectedCategory("");

      const normalizedQuery = searchQuery
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "");

      const suggestions = products.filter((product) => {
        // product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
        const productName = product.product_name || "";
        // Normalize the product name for comparison
        const normalizedProductName = productName
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 ]/g, "");
        return normalizedProductName.includes(normalizedQuery);
      });
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery, products]);

  const handleGoButton = () => {
    // const lowerCaseSearchQuery = searchQuery.searchQuery
    // .toLowerCase()
    // .replace(/[^a-zA-Z0-9 ]/g, "");
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
        const productName = product.product_name || "";
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
      if (filtered.length > 0) {
        // setFilteredProducts(filtered);
        // alert("yes")
        navigate("/products", { state: { data: searchSuggestions } });
      } else {
        toast.error(`Result not found! for ${searchQuery}`);
        navigate("/products");
      }
    }
    // if (searchQuery !== "") {
    //   navigate("/products", { state: { data: searchSuggestions } });
    // } else {
    //   navigate("/products");
    // }
    setSearchSuggestions([]);
  };

  const handleSuggestionClick = (productName) => {
    setSearchQuery(productName);
  };

  const handleKeyPress = (event, productName) => {
    if (event.key === "Enter") {
      handleGoButton();
    }
  };

  const locationState = useLocation();
  const openLoginModal = locationState?.state?.openLoginModal;

  useEffect(() => {
    if (openLoginModal) {
      setLoginModal(true);
    }
  }, [openLoginModal]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  // useEffect(() => {
  //   // Function to request geolocation
  //   const requestGeolocation = () => {
  //     if ('geolocation' in navigator) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           setLocation({
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           });
  //           // window.location.reload();
  //         },
  //         (error) => {
  //           switch (error.code) {
  //             case error.PERMISSION_DENIED:
  //               setError('User denied the request for Geolocation.');
  //               toast.error('For fastest delivery, please share your current location.');
  //               // setLocation(null)
  //               setLocation({ latitude: null, longitude: null });
  //               break;
  //             case error.POSITION_UNAVAILABLE:
  //               setError('Location information is unavailable.');
  //               break;
  //             case error.TIMEOUT:
  //               setError('The request to get user location timed out.');
  //               break;
  //             case error.UNKNOWN_ERROR:
  //               setError('An unknown error occurred.');
  //               break;
  //             default:
  //               setError('An unknown error occurred.');
  //           }
  //         }
  //       );
  //     } else {
  //       setError('Geolocation is not supported by this browser.');
  //     }
  //   };

  //   // Automatically request geolocation on component mount
  //   requestGeolocation();
  // }, []);

  useEffect(() => {
    // Function to request geolocation
    const requestGeolocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            // setLocation({ latitude: lat, longitude: lng });
            // const lat = 17.3964438; // Latitude for the test location
            // const lng = 78.4485763; // Longitude for the test location

            setLocation({ latitude: lat, longitude: lng });

            // Fetch address and check area availability
            const fetchedAddress = await fetchAddress(lat, lng);
            console.log("fetchedAddrresss", fetchedAddress);

            if (fetchedAddress) {
              const areaData = await fetchAreaData();
              console.log("areaaaa data", areaData);

              const matchingArea = areaData.find(
                (area) =>
                  // console.log("area",area);
                  // console.log("areapincode",area.pincode);
                  // console.log("fetchedpincode",fetchedAddress.pincode);

                  area.pincode === fetchedAddress.pincode
                // area.colony.toLowerCase() ===
                // fetchedAddress.neighbourhood.toLowerCase()
              );

              if (!matchingArea) {
                if (!hasShownToast.current) {
                  toast.warn("Minitgo is not available in this area.");
                  hasShownToast.current = true; // Mark that the toast has been shown
                }
              } else {
                console.log("Fetched address:", fetchedAddress);
                // You can process the address further here
              }
            }
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                setError("User denied the request for Geolocation.");
                toast.error(
                  "For fastest delivery, please share your current location."
                );
                setLocation({ latitude: null, longitude: null });
                break;
              case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                setError("The request to get user location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                setError("An unknown error occurred.");
                break;
              default:
                setError("An unknown error occurred.");
            }
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    requestGeolocation();
  }, []);
  const fetchAreaData = async () => {
    try {
      const response = await axios.get("https://minitgo.com/api/areas.php");
      return response.data;
    } catch (error) {
      console.error("Error fetching area data:", error);
      return [];
    }
  };

  const fetchAddress = async (lat, lng) => {
    const apiKey = "cF25ivfihp3P9dJIhL3mUOTgeCqKjAhb";
    const url = `https://api.geocodify.com/v2/reverse?api_key=${apiKey}&lat=${lat}&lng=${lng}`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log("data", data);

      if (
        data &&
        data.response &&
        data.response.features &&
        data.response.features.length > 0
      ) {
        for (const feature of data.response.features) {
          const address = feature.properties;

          if (address.postalcode) {
            return {
              name: address.name || "",
              label: address.label || "",
              street: address.street || "",
              pincode: address.postalcode || "",
              country: address.country || "",
              county: address.county || "",
              region: address.region || "",
              locality: address.locality || "",
            };
          }
        }
      }

      console.log("No postal code found in any of the address objects.");
    } catch (error) {
      console.error("Error fetching address:", error);
    }

    return null;
  };

  // return <div>Location Component</div>;

  // const handleUseCurrentLocation = () => {
  //   // Use browser geolocation API to get the current location
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         const { latitude, longitude } = position.coords;
  //         try {
  //           const response = await fetch(
  //             `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=AIzaSyCMG4GzxbEmqfSZ-uaDOhF55sgxi9sumc4`
  //           ); // Replace 'YOUR_API_KEY' with your actual API key
  //           const data = await response.json();
  //           if (data.results.length > 0) {
  //             const { components } = data.results[0];
  //             setAddress(components.road || "");
  //             setCity(
  //               components.city || components.town || components.village || ""
  //             );
  //             setPincode(components.postcode || "");
  //             setTownDistrict(components.town || components.district || "");
  //             setState(components.state || "");
  //           }
  //         } catch (error) {}
  //       },
  //       (error) => {
  //         return;
  //       }
  //     );
  //   } else {
  //   }
  // };

  //code for location
  {
    /*code started by isha */
  }
  const [temperature, setTemperature] = useState(null);
  const circleRef = useRef(null);

  const radius = 90;
  const circumference = Math.PI * radius;

  const [locationForWeather, setLocationForWeather] = useState({
    latitude: 17.385044,
    longitude: 78.486671,
  });
  const [cityAccordingToLocation, setCityAccordingToLocation] = useState("");
  const [error, setError] = useState(null);
  const API_KEY = "cdbf68f3afc557e674b97c9f52536ab6";
  const [weatherData, setWeatherData] = useState(null);
  const formattedWeatherData = Math.round(parseFloat(weatherData));
  const formattedWeatherData1 = Math.round(parseFloat(temperature));
  useEffect(() => {
    if (locationForWeather.latitude && locationForWeather.longitude) {
      const fetchWeatherData = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${locationForWeather.latitude}&lon=${locationForWeather.longitude}&appid=${API_KEY}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }
          const data = await response.json();
          setWeatherData((data?.main?.temp - 273.15).toFixed(2));
          setTemperature((data?.main?.temp - 273.15).toFixed(2));
          setCityAccordingToLocation(data?.name);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchWeatherData();
    }
  }, [locationForWeather]);
  {
    /*code end by isha */
  }

  const userData = JSON.parse(localStorage.getItem("user"));

  const fullName = userData ? userData.fullName : null;
  const userLocation = userData ? userData.address : null;
  const phoneNumber = userData ? userData.phoneNumber : null;

  // function getInitials(fullName) {
  //   return fullName
  //     .split(" ")
  //     .map((name) => name.charAt(0))
  //     .join("");
  // }
  const getInitials = (fullName) => {
    return fullName ? fullName.charAt(0).toUpperCase() : "";
  };
  const login = fullName ? (
    <span>
      <div className="intial-profile1">{getInitials(fullName)}</div>
    </span>
  ) : (
    <span
      className=""
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
      }}
    >
      {/* <BiLogIn /> */}
      <BiUser
        size={20}
        color="black"
        style={{
          backgroundColor: "white",
          padding: "0.2rem",
          borderRadius: "50%",
        }}
      />
      Signin
    </span>
  );

  const getInitial = (fullName) => {
    return fullName ? fullName.charAt(0).toUpperCase() : "";
  };

  // const formattedWeatherData = Math.round(parseFloat(weatherData));

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="fixed-top flex-wrap shadow "
        style={{ background: "#e8d9b7" }}
      >
        <Container className="justify-content-between ">
          <Navbar.Brand className="d-flex  navbar-brand">
            <Link to="/">
              {/* sonali  */}
              {/* code start by ganesh */}
              <img
                className="minitgo-logo"
                src={Logo}
                style={{ width: "100px", marginRight: "10px" }}
              />
              {/* code end by ganesh */}
              {/* original code */}
              {/* <img className="minitgo-logo" src={Logo} style={{ width: "90px" }} /> */}
            </Link>

            {/* <div className="mobile-menu-logo d-lg-none d-flex profile-data justify-content-between"> */}

            <div className="mobile-menu-logo d-lg-none d-flex profile-data justify-content-between">
              {/* <span
                  className="profile align-items-centrer  d-flex flex-column "
                  onClick={() => setShowLeftSideOffcanvas(true)}
                >

                  <CgProfile
                    className="profile-icon "
                    style={{ width: "2.5rem", height: "1.4rem" }}
                  />
                  {fullName && (
                    <span style={{ fontSize: "13px", marginLeft: "1px" }}>
                      {fullName.length > 10
                        ? fullName.substring(0, 12) + "..."
                        : fullName}
                    </span>
                  )}
                </span> */}

              {/* <CgProfile className="profile-icon " style={{ width: "2.5rem",height:"1.4rem" }} />
                {fullName && (
                  <span style={{ fontSize: "13px", marginLeft: '1px' }}>{fullName.length > 10 ? fullName.substring(0, 12) + '...' : fullName}</span>
                )} */}

              {/* {parsedSignInData ? (
                <span onClick={() => setShowLeftSideOffcanvas(true)}>
                  <div className="intial-profile">{getInitial(fullName)}</div>
                </span>
              ) : (
                <div className="h-100 w-100">
                  <div
                    className="d-flex flex-column"
                    onClick={() => setShowLeftSideOffcanvas(true)}
                  >
                    <CgProfile
                      className="profile-icon"
                      style={{ width: "2.5rem", height: "1.4rem" }}
                    />
                    <span className="" style={{ fontSize: "0.8rem" }}>
                      Sign In
                    </span>
                  </div>
                </div>
              )} */}
              {parsedSignInData ? (
                <span onClick={() => setShowLeftSideOffcanvas(true)}>
                  <div className="intial-profile">{getInitial(fullName)}</div>
                </span>
              ) : (
                <div className="h-100 w-100">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    onClick={() => setShowLeftSideOffcanvas(true)}
                  >
                    <div className="user-profile">
                      {/* <img className="img-fluid mb-1 p-1" src={User} alt="user" style={{ width: "28px" }} /> */}
                      <i
                        className="bi bi-person p-1"
                        style={{ fontSize: "22px" }}
                      ></i>
                    </div>

                    <span
                      className="mt-1"
                      style={{ fontSize: "0.8rem", paddingLeft: "4px" }}
                    >
                      Sign In
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* </div> */}
          </Navbar.Brand>

          {/* for mobile vieww */}
          <div className="mobile-menu-logo d-lg-none d-flex align-items-center">
            {/* weather add in mobile view */}

            {/* <div className="d-flex flex-column align-items-center temp-block px-1">
              <div className="d-flex  align-items-center justify-content-center">
                <span className="dot"></span>
                <div className="fw-semibold" style={{ fontSize: "13px" }}>
                  {weatherData}&deg;C
                </div>
              </div>
              <div>
                <div style={{ fontSize: "10px" }}>
                  {cityAccordingToLocation}
                </div>
              </div>
            </div> */}
            {/* <div style={{ textAlign: "center" }}>
              <div
                style={{
                  position: "relative",
                  width: "55px",
                  height: "33px",
                  overflow: "hidden",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "40px",
                    height: "40px",
                    border: "3px solid white",
                    borderRadius: "50%",
                    borderBottom: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {formattedWeatherData}
                </div>
              </div>
            </div> */}
            <div className="regulator-container pt-2 ">
              <svg
                width="70"
                height="40"
                viewBox="0 0 200 170"
                className="circular-slider pt-1"
                // onClick={handleSliderChange}
              >
                <path
                  d={`M 10,100 A ${radius},${radius} 0 0,1 190,100`}
                  fill="transparent"
                  //   stroke="#DDDDDD"
                  stroke="white"
                  strokeWidth="15"
                />
                <path
                  ref={circleRef}
                  d={`M 10,100 A ${radius},${radius} 0 0,1 190,100`}
                  fill="transparent"
                  //   stroke="#FF4B4B"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={
                    circumference - (temperature / 100) * circumference
                  }
                />
                <circle
                  cx={100 + radius * Math.cos((temperature / 100) * Math.PI)}
                  cy={100 - radius * Math.sin((temperature / 100) * Math.PI)}
                  r="10"
                  fill="black"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
              <div
                className="temperature-display"
                style={{ position: "absolute", top: "11px", fontSize: "9px" }}
              >
                {formattedWeatherData}&deg;C
                {parsedSignInData ? (
                  <h6
                    style={{
                      position: "absolute",
                      top: "11px",
                      left: "-22px",
                      fontSize: "9px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaLocationDot
                      className=""
                      style={{ color: "black", width: "15px" }}
                    />
                    Hyderabad
                  </h6>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* cart button */}
            {/* <Link to="/cart" className="px-2" style={{ color: "#000" }}> */}
            {/* <Link
              to="/cart" className="px-2" style={{ color: "#000" }}

            >
              <div
                className="nav-link cat-nav d-lg-none d-block text-center "
                style={{ position: "relative" }}
              >
                <img
                  className="cartIcon"
                  src={cartIcon}
                  alt="Cart"
                  style={{ height: "2rem", width: "2rem" }}
                />
                <h6
                  className="QTYValue"
                  style={{
                    position: "absolute",
                    top: "-0.3rem",
                    left: "0.8rem",
                  }}
                >
                  {totalQuantity}
                </h6>
              </div>
            </Link> */}
            <Link
              to="/cart"
              className="text-secondary position-relative "
              style={{
                textDecoration: "none",
                width: "35px",
                height: "34px",
              }}
            >
              <div className="bg-white p-1 rounded cart-head w-100 h-100  d-flex flex-column justify-content-center align-items-center">
                <img
                  src={cartIcon}
                  alt="Cart"
                  className="w-100 mx-auto "
                  style={{
                    height: "30px",
                    // marginRight: "50px",
                    // marginLeft: "20px",
                  }}
                />
                <h6
                  className="   position-absolute text-center "
                  id="cartNo"
                  style={{
                    color: "black",
                    width: "0.8rem",
                    top: "0px",
                    left: "13px",
                    fontSize: "12px",
                    backgroundColor: "orange",
                    borderRadius: "50%",
                  }}
                >
                  {totalQuantity}
                </h6>
              </div>
            </Link>

            <BiMenuAltRight
              className="mobile-menu-logo d-lg-none hamIcon"
              onClick={() => setShowOffcanvas(true)}
              style={{ fontSize: "44px", paddingLeft: "5px", height: "35px" }}
            />
          </div>

          <Navbar.Collapse id="responsive-navbar-nav ">
            <Nav className="me-auto  ">
              <NavDropdown
                title={dropdownTitle}
                id="collasible-nav-dropdown"
                // updated sonali

                style={{
                  border: "2.6px solid #d8dfab",
                  borderRadius: "70px",
                  marginLeft: "3px",
                  background: "#f2b057",
                }}
                // style={{ border: "2.6px solid #d8dfab", borderRadius: "13px" }}
              >
                <NavDropdown.Item
                  onClick={() => {
                    setLocationForWeather({
                      latitude: 17.385044,
                      longitude: 78.486671,
                    });
                    handleDropdownItemClick("Hyderabad");
                  }}
                >
                  <FaLocationCrosshairs /> Hyderabad
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    setLocationForWeather({
                      latitude: 19.075983,
                      longitude: 72.877655,
                    });
                    handleDropdownItemClick("Mumbai");
                  }}
                >
                  Mumbai
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    setLocationForWeather({
                      latitude: 28.70406,
                      longitude: 77.102493,
                    });
                    handleDropdownItemClick("Delhi");
                  }}
                >
                  Delhi
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    setLocationForWeather({
                      latitude: 12.971599,
                      longitude: 77.594566,
                    });
                    handleDropdownItemClick("Bangalore");
                  }}
                >
                  Bangalore
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <Form.Group
              style={{
                position: "relative",
                width: "100%",
                margin: "0 -40px 0 32px",
              }}
            >
              <FaSearch
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "12px",
                  transform: "translateY(-50%)",
                  color: "gray",
                  pointerEvents: "none", // Prevents the icon from blocking input interaction
                  zIndex: 1,
                }}
              />
              <Form.Control
                style={{
                  paddingLeft: "35px", // Adds padding to create space for the search icon
                  borderRadius: "13px",
                }}
                type="search"
                placeholder="Search"
                className="search-box"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyPress={handleKeyPress}
              />
            </Form.Group>
            <Button
              className="search-btn"
              style={{ borderRadius: "13px", marginLeft: "16px" }}
              variant="outline-success"
              onClick={handleGoButton}
            >
              Go
            </Button>

            {/* </div> */}

            <div
              className="suggestion position-absolute"
              style={{ width: "760px" }}
            >
              <div
                className="container position-absolute"
                style={{
                  marginLeft: "165px",
                  marginTop: "20px",
                  background: "rgb(217, 223, 175",
                }}
              >
                {searchSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.product_id}
                    onKeyDown={(event) =>
                      handleKeyPress(event, suggestion.product_name)
                    }
                    tabIndex={0}
                  >
                    <span
                      style={{ cursor: "Pointer" }}
                      onClick={() =>
                        handleSuggestionClick(suggestion.product_name)
                      }
                    >
                      <span className="py-2 px-2 m-1 fs-6">
                        {suggestion.product_name}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* updates sonali */}
            <div className="spacing  ">
              {/* <Nav> */}
              <NavDropdown
                title={login}
                // id="collasible-nav-dropdown"
                // className=" "
              >
                {fullName && (
                  <>
                    <NavDropdown.Item>
                      <Link to="/profile" className="text-decoration-none ">
                        {" "}
                        Profile{" "}
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/profile" className="text-decoration-none ">
                        {" "}
                        Address change{" "}
                      </Link>
                    </NavDropdown.Item>
                  </>
                )}
                {fullName ? (
                  <NavDropdown.Item>
                    <div
                      onClick={() => {
                        localStorage.removeItem("user");
                        window.location.reload();
                      }}
                      style={{ color: "red" }}
                    >
                      <BiLogIn className="me-2" />
                      Logout
                    </div>
                  </NavDropdown.Item>
                ) : (
                  <>
                    <NavDropdown.Item>
                      <div
                        onClick={() => setShowModal(true)}
                        style={{ color: "blue" }}
                      >
                        SignUp
                      </div>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <div
                        onClick={() => setLoginModal(true)}
                        style={{ color: "blue" }}
                      >
                        Login
                      </div>
                    </NavDropdown.Item>
                  </>
                )}

                {/* Shubham- Desktop Login modal ends here */}

                <NavDropdown.Divider />
              </NavDropdown>
              {parsedSignInData ? (
                <Link
                  to="/orders"
                  className=" text-decoration-none text-dark "
                  style={{ fontSize: "1.2rem" }}
                >
                  Orders
                </Link>
              ) : (
                ""
              )}

              <Link
                to="/cart"
                className="text-secondary position-relative   "
                style={{
                  textDecoration: "none",
                  width: "40px",
                }}
              >
                <div className="bg-white p-1 rounded cart-head w-100 h-100  d-flex flex-column justify-content-center align-items-center">
                  <img
                    src={cartIcon}
                    alt="Cart"
                    className="w-100 mx-auto "
                    style={{
                      height: "35px",
                      // marginRight: "50px",
                      // marginLeft: "20px",
                    }}
                  />
                  <h6
                    className="  position-absolute text-center "
                    id="cartNo"
                    style={{
                      width: "16px",
                      top: "1px",
                      left: "15px",
                      fontSize: "14px",
                      backgroundColor: "orange",
                      borderRadius: "50%",
                    }}
                  >
                    {totalQuantity}
                  </h6>
                </div>
              </Link>

              {/* weather add in desktop view */}
              {/* <div className="d-flex flex-column align-items-center  gap-x-5 pt-1">
                <div className="d-flex  align-items-center justify-content-center">
                  <span className="dot"></span>
                  <span className="fw-semibold">{weatherData}&deg;C</span>
                </div>
                <div>
                  <p style={{ fontSize: "10px" }}>{cityAccordingToLocation}</p>
                </div>
              </div> */}
              {/* <div className="temp"  >
                <div className="inr-temp"
                
                >
                  <div className="temp-add"
                  >
                    {formattedWeatherData}&deg;C
                  </div>
                  <div>
                    <p style={{ fontSize: "10px", position: "relative", top: "29px", zIndex: "2000", left: "-2px" }}>{cityAccordingToLocation}</p>
                  </div>
                </div>
                
              </div> */}
              <div className="regulator-container">
                <svg
                  width="70"
                  height="50"
                  viewBox="0 0 200 150"
                  className="circular-slider"
                  // onClick={handleSliderChange}
                >
                  <path
                    d={`M 10,100 A ${radius},${radius} 0 0,1 190,100`}
                    fill="transparent"
                    //   stroke="#DDDDDD"
                    stroke="white"
                    strokeWidth="15"
                  />
                  <path
                    ref={circleRef}
                    d={`M 10,100 A ${radius},${radius} 0 0,1 190,100`}
                    fill="transparent"
                    //   stroke="#FF4B4B"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={
                      circumference - (temperature / 100) * circumference
                    }
                  />
                  <circle
                    cx={100 + radius * Math.cos((temperature / 100) * Math.PI)}
                    cy={100 - radius * Math.sin((temperature / 100) * Math.PI)}
                    r="10"
                    fill="black"
                    stroke="black"
                    strokeWidth="2"
                  />
                </svg>
                <div
                  className="temperature-display"
                  style={{ position: "absolute", top: "4px", fontSize: "12px" }}
                >
                  {formattedWeatherData}&deg;C
                  {parsedSignInData ? (
                    <h6
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "-22px",
                        fontSize: "11px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FaLocationDot
                        className=""
                        style={{ color: "black", width: "15px" }}
                      />
                      Hyderabad
                    </h6>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* <TemperatureRegulator/> */}
            </div>
          </Navbar.Collapse>
        </Container>
        <div className="mobile-menu-logo d-lg-none w-100  ">
          <div className="mobile-search mt-2 container">
            {/* <Form.Control
              type="search"
              placeholder="search"
              className=" search-box  "
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
              style={{ width: "100%" }}
            />

            <Form />

            <Button
              className=" search-btn"
              variant="outline-success"
              onClick={handleGoButton}
            >
              Go
            </Button> */}
            <Form.Group style={{ position: "relative", width: "100%" }}>
              <FaSearch
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "12px",
                  transform: "translateY(-50%)",
                  color: "gray",
                  pointerEvents: "none", // Prevents the icon from blocking input interaction
                  zIndex: 1,
                }}
              />
              <Form.Control
                type="search"
                placeholder="search"
                className=" search-box  "
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyPress={handleKeyPress}
                style={{ width: "100%", paddingLeft: "35px" }}
              />
            </Form.Group>
            <Button
              className="search-btn"
              // style={{ borderRadius: "13px", marginLeft: "16px" }}
              variant="outline-success"
              onClick={handleGoButton}
            >
              Go
            </Button>
            <div
              className="suggestion position-absolute"
              style={{ width: "350px" }}
            >
              <div
                className="container position-absolute"
                style={{ marginTop: "50px", background: "rgb(217, 223, 175" }}
              >
                {searchSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.product_id}
                    onKeyDown={(event) =>
                      handleKeyPress(event, suggestion.product_name)
                    }
                    tabIndex={0}
                  >
                    <span
                      style={{ cursor: "Pointer" }}
                      onClick={() =>
                        handleSuggestionClick(suggestion.product_name)
                      }
                    >
                      <span className=" px-2 m-1 fs-6">
                        {suggestion.product_name}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Navbar>

      <Catlog latitude={location.latitude} longitude={location.longitude} />

      {showModal && (
        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
          }}
          // dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          className="p-0"
        >
          <Modal.Body
            className="p-0 d-flex w-max flex-lg-row flex-column   "
            style={{ minWidth: "10rem", backgroundColor: "#fff5f5" }}
          >
            <Modal.Header closeButton className="d-block d-lg-none" />

            <SignUp />
          </Modal.Body>
        </Modal>
      )}

      {/* Login Modal */}

      <Modal
        show={loginModal}
        onHide={() => setLoginModal(false)}
        aria-labelledby="example-custom-modal-styling-title"
        className=" bg-opacity"
      >
        <Modal.Body
          className="p-0 rounded-4 d-flex w-max "
          style={{ minWidth: "100%" }}
        >
          <Login closeLoginModal={() => setLoginModal(false)} />
        </Modal.Body>
      </Modal>

      {forgetPasswordModal && (
        <ResetPassword setLoginModal={() => setLoginModal(true)} />
      )}

      {/* Offcanvas Sidebar */}

      {/* Mobile view starts here */}

      {/* this is right side */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
        // className="bg-beige-100"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img
              src="/src/components/images/minitgo.png"
              width={100}
              height={30}
            />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="py-0">
          <div
            className="   px-0 rounded-md shadow-md mb-4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              className="flex items-center gap-1"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* < className="text-red-500 " /> */}
              {parsedSignInData ? (
                <>
                  <FaMapMarkerAlt className="text-red-500" />
                  <span
                    id="addressDisplay"
                    className="fw-bold"
                    style={{ color: "black", fontSize: "0.8rem" }}
                  >
                    {" "}
                    {parsedSignInData.Address.length > 10
                      ? parsedSignInData.Address.substring(0, 12) + "..."
                      : parsedSignInData.Address}
                  </span>
                </>
              ) : (
                <>
                  <FaMapMarkerAlt className="text-red-500" />
                  <span
                    id="addressDisplay"
                    className="fw-bold"
                    style={{ color: "#fff", fontSize: "0.8rem" }}
                  ></span>
                </>
              )}
              {/* <span>{parsedSignInData.address ? parsedSignInData.address : ""}</span> */}
            </div>
            {parsedSignInData ? (
              <button
                style={{
                  backgroundColor: "#f4d9d8",
                  border: "none",
                  borderRadius: "20px",
                }}
                className="text-pink-600 px-3 py-1 rounded-md"
                onClick={fetchLocation}
              >
                + Address
              </button>
            ) : (
              <button
                style={{
                  backgroundColor: "#f4d9d8",
                  border: "none",
                  borderRadius: "20px",
                }}
                className="text-pink-600 px-3 py-1 rounded-md"
                onClick={() => setShowModal(true)}
              >
                Sign Up
              </button>
            )}
          </div>
          <div
            className="d-flex flex-column justify-content-center align-items-center  my-2"
            style={{ height: "150px", borderRadius: "15px" }}
          >
            <img
              src="man-working.jpg"
              alt="IMG"
              className="w-100 h-100"
              style={{ borderRadius: "12px" }}
            />
          </div>
          <div
            className="d-flex justify-content-center my-3 border py-1"
            style={{ borderRadius: "15px", backgroundColor: "white" }}
          >
            <form className="w-100 bg-transparent" role="search">
              <div className="input-group bg-transparent">
                <span className="input-group-text  border-0 bg-transparent">
                  <FaSearch />
                </span>
                <input
                  className="form-control w-full border-0 bg-transparent px-0"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  style={{
                    boxShadow: "none", // Remove shadow if any
                  }}
                />
              </div>
            </form>
          </div>
          <div
            className="px-2 rounded-md shadow-md mb-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              className="flex items-center gap-1"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>Menu</span>
            </div>
            <BsThreeDots style={{ width: "50px", height: "40px" }} />
          </div>

          {/* Sidebar content goes here */}
          <Nav className="flex-column w-100">
            <Link
              to="/"
              className="py-3 fw-semibold px-2"
              style={{
                textDecoration: "none",
                color: "black",
                backgroundColor: activeLink === "/" ? "white" : "transparent",
                borderRadius: "15px",
              }}
              onClick={() => handleClick("/")}
            >
              <IoHome
                className="me-3"
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                  color: "#E4AAAA",
                }}
              />
              Home
            </Link>

            <Link
              to="/about"
              className="py-3 fw-semibold px-2"
              style={{
                textDecoration: "none",
                color: "black",
                backgroundColor:
                  activeLink === "/about" ? "white" : "transparent",
                borderRadius: "15px",
              }}
              onClick={() => handleClick("/about")}
            >
              <FaCircleInfo
                className="me-3"
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                  color: "#E4AAAA",
                }}
              />
              About
            </Link>

            <Link
              to="/orders"
              className="py-3 fw-semibold px-2"
              style={{
                textDecoration: "none",
                color: "black",
                backgroundColor:
                  activeLink === "/orders" ? "white" : "transparent",
                borderRadius: "15px",
              }}
              onClick={() => handleClick("/orders")}
            >
              <FaListCheck
                className="me-3"
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                  color: "#E4AAAA",
                }}
              />
              Orders
            </Link>

            <Link
              to="/products"
              className="py-3 fw-semibold px-2"
              style={{
                textDecoration: "none",
                color: "black",
                backgroundColor:
                  activeLink === "/products" ? "white" : "transparent",
                borderRadius: "15px",
              }}
              onClick={() => handleClick("/products")}
            >
              <FaBox
                className="me-3"
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                  color: "#E4AAAA",
                }}
              />
              Products
            </Link>

            <Link
              to="/contact"
              className="py-3 fw-semibold px-2"
              style={{
                textDecoration: "none",
                color: "black",
                backgroundColor:
                  activeLink === "/contact" ? "white" : "transparent",
                borderRadius: "15px",
              }}
              onClick={() => handleClick("/contact")}
            >
              <MdContactSupport
                className="me-3"
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                  color: "#E4AAAA",
                }}
              />
              Contact Us
            </Link>

            <div
              className="px-2 rounded-md shadow-md mb-2 mt-2"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                className="flex items-center gap-1"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>Become Partner</span>
              </div>
              <BsThreeDots style={{ width: "50px", height: "40px" }} />
            </div>

            <Link
              to="/connect"
              className="py-3 fw-semibold px-2"
              style={{
                textDecoration: "none",
                color: "black",
                backgroundColor:
                  activeLink === "/connect" ? "white" : "transparent",
                borderRadius: "15px",
              }}
              onClick={() => handleClick("/connect")}
            >
              <FaLink
                className="me-3"
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                  color: "#E4AAAA",
                }}
              />
              Connect
            </Link>

            <Link
              to="/blog"
              className="py-3 fw-semibold px-2"
              style={{
                textDecoration: "none",
                color: "black",
                backgroundColor:
                  activeLink === "/blog" ? "white" : "transparent",
                borderRadius: "15px",
              }}
              onClick={() => handleClick("/blog")}
            >
              <FaRegNewspaper
                className="me-3"
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                  color: "#E4AAAA",
                }}
              />
              Blog
            </Link>

            <Link
              to="/updates"
              className="py-3 fw-semibold px-2"
              style={{
                textDecoration: "none",
                color: "black",
                backgroundColor:
                  activeLink === "/updates" ? "white" : "transparent",
                borderRadius: "15px",
              }}
              onClick={() => handleClick("/updates")}
            >
              <MdOutlineUpdate
                className="me-3"
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                  color: "#E4AAAA",
                }}
              />
              Updates
            </Link>

            <Link
              to="/partner"
              className="py-3 fw-semibold px-2"
              style={{
                textDecoration: "none",
                color: "black",
                backgroundColor:
                  activeLink === "/partner" ? "white" : "transparent",
                borderRadius: "15px",
              }}
              onClick={() => handleClick("/partner")}
            >
              <PiHandshakeBold
                className="me-3"
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                  color: "#E4AAAA",
                }}
              />
              Become a Partner
            </Link>

            <Link
              to="/help"
              className="py-3 fw-semibold px-2"
              style={{
                textDecoration: "none",
                color: "black",
                backgroundColor:
                  activeLink === "/help" ? "white" : "transparent",
                borderRadius: "15px",
              }}
              onClick={() => handleClick("/help")}
            >
              <MdHelp
                className="me-3"
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                  color: "#E4AAAA",
                }}
              />
              Help
            </Link>
          </Nav>
          <br />
          <br />
        </Offcanvas.Body>
        <br />
      </Offcanvas>

      {/* this is left side */}
      <Offcanvas
        show={showLeftSideOffcanvas}
        onHide={() => setShowLeftSideOffcanvas(false)}
        placement="start"
        className="offcanvas-custom"
      >
        <Offcanvas.Header closeButton className="custom-offcanvas-header">
          <Offcanvas.Title>
            <img
              src="/src/components/images/minitgo.png"
              width={100}
              // code start by ganesh
              height={30}
              // code end by ganesh
            />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {fullName && (
            <div className="d-flex flex-column justify-content-center align-items-center border rounded  py-4 my-2">
              <div
                className="rounded rounded-circle  border-2 border-primary "
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  height: "60px",
                  width: "60px",
                }}
              >
                {getInitials(fullName)}
              </div>

              <h2 className="mt-2">{fullName}</h2>
              <h5>{phoneNumber}</h5>
              <p>
                <span className="fw-bold">Location:</span> {userLocation}
              </p>
            </div>
          )}

          {/* Sidebar content goes here */}
          <div className="btn-block">
            {fullName && <></>}

            {fullName ? (
              <div>
                <div className=" py-3 px-2 w-100 ">
                  <Link
                    to="/profile"
                    className="border-bottom py-3 fw-semibold  d-block w-100 "
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                    onClick={() => setShowLeftSideOffcanvas(false)}
                  >
                    <BsPersonCircle
                      className="me-3 "
                      style={{
                        width: "1.3rem",
                        height: "1.3rem",
                        color: "#E4AAAA",
                      }}
                    />
                    Profile
                  </Link>
                </div>

                <div
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.reload();
                  }}
                  style={{ color: "red" }}
                  className=" py-3 px-2"
                >
                  <BiLogIn className="me-3" />
                  Logout
                </div>
              </div>
            ) : (
              <>
                <div
                  className="border-bottom py-3 fw-semibold px-2 "
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => {
                    setShowLeftSideOffcanvas(false);
                    setShowModal(true);
                    console.log(true, showModal);
                  }}
                >
                  <FaUserPlus
                    className="me-3 "
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                      color: "#E4AAAA",
                    }}
                  />
                  SignUp
                </div>

                <div
                  className="border-bottom py-3 fw-semibold px-2  "
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => {
                    setShowLeftSideOffcanvas(false);
                    setLoginModal(true);
                  }}
                >
                  <FiLogIn
                    className="me-3 "
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                      color: "#E4AAAA",
                    }}
                  />
                  Login
                </div>
              </>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
