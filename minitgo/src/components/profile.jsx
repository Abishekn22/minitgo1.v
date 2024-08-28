import "../components/Profile.css";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link, redirect, useNavigate } from "react-router-dom";
import Imgs from "../components/images/men.jpg";
import { MdMenuOpen } from "react-icons/md";
import { HiMenu, HiMenuAlt1 } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";

const Profile = () => {
  const [section, setSection] = useState("profile");
  const fullNameRef = useRef(null);
  // const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const officeAddressRef = useRef(null);
  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);

  const [profilePic, setProfilePic] = useState(null);

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const [otpCode, setOtpCode] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  });

  useEffect(() => {
    if (!localStorage.getItem("user"))
      navigate("/", { state: { openLoginModal: true } });
  }, [navigate]);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setProfilePic(URL.createObjectURL(acceptedFiles[0]));
    }
  }, [acceptedFiles]);

  // - FEtch API start
  const [userData, setuserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://minitgo.com/api/fetch_login.php");
        const results = await response.json();
        console.log("results", results);

        const userId = JSON.parse(localStorage.getItem("user"))?.userId;
        console.log("userid",userId);
        

        const user = results.find((user) => user.id === userId);
        if (!user) {
          navigate("/", { state: { openLoginModal: true } });
        }
        setuserData(user);
        console.log("userdata----", userData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [navigate]);
  const fetchAreaData = async () => {
    try {
      const response = await axios.get("https://minitgo.com/api/areas.php");
      return response.data;
    } catch (error) {
      console.error("Error fetching area data:", error);
      return [];
    }
  };

  // for update the data
  // Function to handle the API request
  const updateProfile = async () => {
    // const areaData = await fetchAreaData();
    // console.log("areadata", areaData);

    // const matchingArea = areaData.find(
    //   (area) => {
    //     console.log(area.pincode);
    //     console.log(area.colony);
    //     const inputAddress = addressRef.current.value; // Get the input address value
    //     const addressParts = inputAddress.split(",").map(part => part.trim());  // Split the address into words for matching
    //     console.log("Address words:", addressParts);
    //   }
    //   // area.pincode === fetchedAddress.pincode &&
    //   // area.colony.toLowerCase() === fetchedAddress.neighbourhood.toLowerCase()
    //   // console.log(area.pincode);
    // );

    // if (matchingArea) {
    //   toast.error("Minitgo is not available in this area.");
    // } else {
    //   // Process the fetched address as needed
    //   // console.log("Fetched address:", fetchedAddress);
    // }

    try {
      const areaData = await fetchAreaData();
      console.log("areadata", areaData);
  
      // Get the input address and split it by comma
      const inputAddress = addressRef.current.value; // Get the input address value
      const addressParts = inputAddress.split(",").map(part => part.trim()); // Split and trim parts
      console.log("Address parts:", addressParts);
  
      // Check if any part of the address matches the area data
      const matchingArea = areaData.find((area) => {
        const pincodeMatch = addressParts.includes(area.pincode);
        // const colonyMatch = addressParts.some(part =>
        //   part.toLowerCase() === area.colony.toLowerCase()
        // );
        return pincodeMatch ;
      });
  
      if (!matchingArea) {
        toast.error("Minitgo is not available in this area.");
        // console.log("Minitgo is not available in this area.");
        
        return; // Exit the function if the area matches
      } else {
        // Process the fetched address if no matching area is found
        console.log("Fetched address:", inputAddress);
      }
      const response = await fetch("https://minitgo.com/api/update_user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Assuming data contains the updated profile information
      });
      const result = await response.json();
      console.log("result", result);
      if (result.status === true) {
        localStorage.setItem("user", JSON.stringify(userData));
        // Handle the response as needed
        console.log("Profile updated successfully:", result);
        toast.success(result.message);
      } else {
        console.error("Failed to update profile:", result.message);
        toast.error(result.message);
      }
      // Handle the response as needed
    } catch (error) {
      setError(error);
      console.error("Error updating profile:", error);
    }
  };

  function handleUpdateProfile() {
    updateProfile(); // Call the updateProfile function to make the API request
    console.log("user updated data", userData);
  }

  // On focus out functionality
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // user data
  const signInData = localStorage.getItem("user");
  const parsedSignInData = JSON.parse(signInData);
  // console.log("parsedSignInData", parsedSignInData);

  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
  useEffect(() => {
    // Check local storage for user data
    const signInData = localStorage.getItem("user");
    if (signInData) {
      const parsedSignInData = JSON.parse(signInData);
      const userCoordinates = parsedSignInData.user_coordinates;

      if (userCoordinates) {
        // Handle coordinates if available
        // Example: "12.908139760299258.77.61097406490475"
        // Adjust the delimiter as needed based on actual format
        const coordsArray = userCoordinates.split("."); // Split by period (.)
        if (coordsArray.length >= 2) {
          const lat = parseFloat(coordsArray[0]);
          const lon = parseFloat(coordsArray[1]);
          setCoordinates({ lat, lon });
        } else {
          console.error("Unexpected coordinates format.");
          getCurrentCoordinates(); // Fallback to current coordinates
        }
      } else {
        getCurrentCoordinates(); // Fallback if no coordinates found
      }
    } else {
      getCurrentCoordinates(); // Fallback if no user data
    }
  }, []);

  const getCurrentCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentCoordinates = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setCoordinates(currentCoordinates);
          localStorage.setItem(
            "coordinates",
            JSON.stringify(currentCoordinates)
          );
        },
        (error) => {
          console.error("Error getting current position:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  const mapUrl =
    coordinates.lat && coordinates.lon
      ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lon}&z=15&output=embed`
      : "";
  //for order section
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      const postData = { user_id: parsedSignInData.userId };
      console.log("postdata", postData);

      axios
        .post("https://minitgo.com/api/user_orders.php", postData)
        .then((response) => {
          console.log(response.data.data);
          if (Array.isArray(response.data.data)) {
            setOrderData(response.data.data);
          } else {
            console.error("Expected an array but got:", response.data.data);
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the data!", error);
        });
    };

    fetchData(); // Fetch data immediately

    const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [parsedSignInData.userId]);

  const getStatusProgress = (status) => {
    switch (status.toLowerCase()) {
      case "waiting":
        return {
          width: "99%",
          message: "Waiting for order confirmation",
          animate: true,
        };
      case "rejected":
        return { width: "0%", message: "Rejected", animate: false };
      case "out for delivery":
        return { width: "65%", message: "Out for delivery", animate: false };
      case "finding delivery boy":
        return {
          width: "35%",
          message: "Finding delivery boy",
          animate: false,
        };
      case "delivered":
        return { width: "100%", message: "Delivered", animate: false };
      case "accepted":
        return { width: "10%", message: "Accepted", animate: false };
      default:
        return {
          width: "99%",
          message: "Waiting for order confirmation",
          animate: true,
        };
    }
  };

  const initialSeconds = localStorage.getItem("timerSeconds")
    ? parseInt(localStorage.getItem("timerSeconds"))
    : 5;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    // Store the seconds in localStorage
    localStorage.setItem("timerSeconds", seconds.toString());
  }, [seconds]);

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Format the timer display
  const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  const [showModal, setShowModal] = useState(false);
  const [OTP, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setOTP(otp);
    //

    console.log("GENERATED OTP:", otp);

    return otp.toString();
  }

  const resetPassword = async () => {
    handleShow();
    let otp = generateOTP();
    console.log(otp);
    const emailData = {
      from: "minitgo@minitgo.com", // Initialize with an empty string or default if needed
      to: `${parsedSignInData.email}`,
      // to: `raghabm7@gmail.com`,
      subject: `OTP: ${otp}`,
      text: `OTP: ${otp}`,
    };
    console.log("emil", emailData);
    try {
      const response = await axios.post(
        "http://localhost:3001/send-email",
        emailData
      );
      console.log(response.status);
      if (response.status === 200) {
        toast.success("Message successfully sent", {
          autoClose: 1000,
          hideProgressBar: true,
          onClose: () => {
            // navigate('/'); // Navigate to home page and refresh
          },
        });
      }
    } catch (error) {
      alert("Error sending email: " + error.message);
    }
  };
  const [confirmOtp, setConfirmOtp] = useState("");
  const handleSubmit = async () => {
    if (confirmOtp !== OTP.toString()) {
      toast.error("OTP does not match!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    // Handle the password reset logic here
    const updatedData = { ...userData, password };
    try {
      const response = await fetch("https://minitgo.com/api/update_user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Password reset successfully!");
        handleClose();
        setPassword("");
        setConfirmOtp("");
        setConfirmPassword("");
        // Clear user data and logout
        localStorage.removeItem("user");
        navigate("/");
      } else {
        toast.error("Error updating password: " + result.message);
      }
    } catch (error) {
      toast.error("Error updating password: " + error.message);
    }
  };

  return (
    <>
      <br className="d-lg-block d-none"></br>
      <br className="d-lg-block d-none"></br>
      <div className="custom-container">
        {/* Sidebar for larger screens */}
        <div className="custom-sidebar d-none d-lg-flex">
          <span className="fs-4 fw-bold mx-3 border-bottom w-100 pb-2">
            Profile
          </span>

          <div
            className={`custom-sidebar-item fs-5 bg-light ${
              section === "profile" && "active"
            }`}
            onClick={() => setSection("profile")}
            data-section="profile"
          >
            Profile Settings
          </div>
          {/* <div
            className={`custom-sidebar-item fs-5 bg-light ${
              section === "2fa" && "active"
            }`}
            onClick={() => setSection("2fa")}
            data-section="2fa"
          >
            Two-Factor Authentication
          </div> */}
          <div
            className={`custom-sidebar-item fs-5 bg-light ${
              section === "orders" && "active"
            }`}
            onClick={() => setSection("orders")}
            data-section="orders"
          >
            Your Orders
          </div>
          <div className={`custom-sidebar-item fs-5 bg-light `}>
            {mapUrl && (
              <iframe
                // className="map"
                id="map"
                width="200px"
                height="150"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapUrl}
              />
            )}
          </div>
        </div>
        {/* Hamburger menu for smaller screens */}
        <div className="d-lg-none" ref={menuRef}>
          <div className="btn border mb-3" onClick={toggleMenu}>
            {showMenu ? (
              <HiMenu style={{ width: "2rem", height: "2rem" }} />
            ) : (
              <HiMenuAlt1 style={{ width: "2rem", height: "2rem" }} />
            )}
            <span className="fs-4 fw-bold mx-3">Your Profile</span>
          </div>

          <div
            className={`custom-sidebar gap-4 mobile-sidebar px-4 border py-4 mt-2 bg-light shadow shadow-2 ${
              showMenu ? "active" : ""
            } position-absolute w-75 rounded`}
            style={{ zIndex: 100, marginTop: "-1rem" }}
          >
            <div
              className={`custom-sidebar-item fs-5 fw-semibold bg-light ${
                section === "profile" && "active"
              }`}
              onClick={() => {
                setSection("profile");
                setShowMenu(false);
              }}
              data-section="profile"
            >
              Profile Settings
            </div>
            {/* <div
              className={`custom-sidebar-item fs-5 fw-semibold bg-light ${
                section === "2fa" && "active"
              }`}
              onClick={() => {
                setSection("2fa");
                setShowMenu(false);
              }}
              data-section="2fa"
            >
              Two-Factor Authentication
            </div> */}
            <div
              className={`custom-sidebar-item fs-5 fw-semibold bg-light ${
                section === "orders" && "active"
              }`}
              onClick={() => {
                setSection("orders");
                setShowMenu(false);
              }}
              data-section="orders"
            >
              Your Orders
            </div>
          </div>
        </div>
        {section === "profile" && (
          <div className="custom-content">
            <div className="custom-header">
              <h1>Profile Settings</h1>
              <button
                className="custom-save-button bg-dark"
                onClick={handleUpdateProfile}
              >
                Update
              </button>
            </div>
            <div className="custom-profile-body">
              {/*Pooja - need to remove pic */}
              {/* <div className="custom-profile-picture">
                {acceptedFiles?.length === 1 ? (
                  <img
                    src={
                      acceptedFiles?.length === 1
                        ? URL.createObjectURL(acceptedFiles[0])
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNecYl9YXMoBpmcLr0YVeuWdowILghYUzJ0Tu4qaY9aTA3XcrZ4hKrYSTiH-E7CftMRrY&usqp=CAU"
                    }
                    alt={acceptedFiles[0].path}
                    className="border rounded-3 p-2 md:w-[230px] w-[150px]"
                  />
                ) : (
                  <img
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNecYl9YXMoBpmcLr0YVeuWdowILghYUzJ0Tu4qaY9aTA3XcrZ4hKrYSTiH-E7CftMRrY&usqp=CAU"
                    }
                    alt="Profile pic not found"
                    className="border rounded-3 p-2 md:w-[230px] w-[150px]"
                  />
                )}
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p className="custom-change-picture">Change Profile Picture</p>
                </div>
              </div> */}

              <div className="custom-profile-details mt-2">
                <div className="row">
                  <div className="col-md-2"></div>
                  <div className="col-md-8">
                    <label htmlFor="full_name" className="mt-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      className="mt-1"
                      placeholder="Enter your full name"
                      value={
                        userData && userData.full_name ? userData.full_name : ""
                      }
                      ref={fullNameRef}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setuserData((prevState) => ({
                          ...prevState,
                          full_name: newValue,
                        }));
                      }}
                    />

                    <label htmlFor="email mt-1" className="mt-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1"
                      value={userData && userData.email ? userData.email : ""}
                      ref={emailRef}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setuserData((prevState) => ({
                          ...prevState,
                          email: newValue,
                        }));
                      }}
                      readOnly // Added readOnly attribute here
                    />
                    <label htmlFor="address" className="mt-2">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="mt-1"
                      placeholder="Enter your address"
                      value={
                        userData && userData.Address ? userData.Address : ""
                      }
                      ref={addressRef}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setuserData((prevState) => ({
                          ...prevState,
                          Address: newValue,
                        }));
                      }}
                    />
                    <label htmlFor="address" className="mt-2">
                      Office Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="mt-1"
                      placeholder="Office address"
                      value={
                        userData && userData.office_address
                          ? userData.office_address
                          : ""
                      }
                      ref={officeAddressRef}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setuserData((prevState) => ({
                          ...prevState,
                          office_address: newValue,
                        }));
                      }}
                    />
                    <div className="mt-2">
                      <iframe
                        className="map1"
                        id="map"
                        width="200px"
                        height="150"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={mapUrl}
                      />
                    </div>
                    <div className="text-center">
                      <button
                        className="custom-update-password bg-dark"
                        onClick={() =>
                          setShowPasswordFields(!showPasswordFields)
                        }
                      >
                        Reset Password
                      </button>
                    </div>
                    {/* Pooja -  replace with email and button */}
                    {showPasswordFields && (
                      <div className="custom-password-fields">
                        <label htmlFor="email">Email</label>
                        {/* <input
                          type="email"
                          id="email"
                          placeholder="Enter your email"
                        /> */}
                        <p>{parsedSignInData ? parsedSignInData.email : ""}</p>
                        <button
                          className="custom-update-password bg-dark"
                          onClick={resetPassword}
                        >
                          Send link
                        </button>
                      </div>
                    )}
                    <Modal show={showModal} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Reset Password</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group controlId="formOtp">
                            <Form.Label>Enter OTP</Form.Label>
                            <Form.Control
                              type="text"
                              value={confirmOtp}
                              onChange={(e) => setConfirmOtp(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group
                            controlId="formConfirmPassword"
                            className="mt-3"
                          >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type="password"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                          Submit
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {section === "notifications" && (
          <div className="custom-content">
            <div className="custom-header">
              <h1>Notifications Section</h1>
            </div>
          </div>
        )}
        {/* {section === "2fa" && (
          <div className="custom-content d-md-block d-flex flex-column align-items-center ">
            <div className="custom-header">
              <h1>Two-Factor Authentication Section</h1>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="my-5 mx-md-5 w-75  "
            >
              <div className="mb-3">
                <label htmlFor="phone-number" className="form-label fw-bold">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone-number"
                  className="form-control fw-semibold border-2"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="otp-code" className="form-label fw-bold">
                  OTP Code
                </label>
                <input
                  type="text"
                  id="otp-code"
                  className="form-control fw-semibold border-2"
                  placeholder="Enter OTP code"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary custom-authenticate-button"
                type="submit"
              >
                Authenticate
              </button>
            </form>
          </div>
        )} */}

        {section === "orders" && (
          <div className="custom-content">
            <div className="custom-header">
              <h1>Your Orders Section</h1>
            </div>
            <div className="  col-12">
              <section className="">
                <div className=" py-3   ">
                  <div className="mx-2  mx-md-5 ">
                    <div className=" col-lg-8 col-xl-8 w-100  ">
                      <div
                        className="mt-4 pb-4 mobile-section"
                        style={{ borderBottom: "1px solid  #c4c4c4" }}
                      >
                        <div className="mobile-menu-logo">
                          <div
                            className="mobile-search "
                            style={{ padding: 0 }}
                          >
                            <form className="input-group d-flex  gap-2 flex-wrap">
                              <input
                                type="search"
                                className="form-control search-box-m rounded"
                                style={{
                                  border: "2px solid #d4e26b",
                                  marginLeft: 0,
                                }}
                                placeholder="Ex: T-Shirt near me"
                                aria-label="Search"
                              />
                              <button
                                type="submit"
                                className="btn btn-outline-success rounded "
                              >
                                Go
                              </button>
                            </form>
                          </div>
                        </div>

                        {/* <div className="mt-3">
                          <div className="d-flex gap-3  ">
                            <button className="btn btn-primary ">Orders</button>
                            <button className="btn btn-primary">
                              Buy Again
                            </button>
                            <button className="btn btn-primary">
                              Cancelled Orders
                            </button>
                          </div>
                        </div> */}
                      </div>
                      {parsedSignInData.userId && orderData.length > 0 && (
                        <div
                          className=" border bg-body-tertiary  mt-3 "
                          style={{ borderRadius: "10px" }}
                        >
                          <div className="card-header px-4 py-4 col d-flex flex-column gap-2 ">
                            <div className=" d-flex flex-wrap">
                              <h5 className="text-muted mb-0  ">
                                Thanks for your Order,{" "}
                                <span style={{ color: "black" }}>
                                  {parsedSignInData.fullName}
                                </span>
                                !
                              </h5>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section
                className=" gradient-custom mb-5"
                style={{ backgroundColor: "" }}
              >
                <div className=" ">
                  <div className="d-flex  gap-5  justify-content-start  flex-wrap mx-2  mx-md-5">
                    <div className="col-lg-8 col-xl-8  w-100">
                      {/* <div className="card  " style={{ borderRadius: "10px" }}>
                        <div className="card-body  ">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <p
                              className="lead fw-normal mb-0"
                              style={{ color: "#d8dfab" }}
                            >
                              Receipt
                            </p>
                            <p className="small text-muted mb-0">
                              Receipt Voucher : 1KAU9-84UIL
                            </p>
                          </div>

                          <div className=" card shadow-0 border ">
                            <div className="card-body">
                              <div className=" row">
                                <div className="col-md-2">
                                  <img
                                    src={Imgs}
                                    className="img-fluid"
                                    alt="Phone"
                                  />
                                </div>
                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0">Item Name</p>
                                </div>
                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0 small">
                                    Item clor
                                  </p>
                                </div>
                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0 small">
                                    Item fabric
                                  </p>
                                </div>
                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0 small">
                                    Qty: 1
                                  </p>
                                </div>
                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0 small">
                                    599 RS
                                  </p>
                                </div>
                              </div>
                              <hr
                                className="mb-4"
                                style={{
                                  backgroundColor: "#e0e0e0",
                                  opacity: 1,
                                }}
                              />

                              <div className="row">
                                <div className="col-md-2">
                                  <p className="text-muted small">
                                    Track Order
                                  </p>
                                </div>
                                <div className="col-md-10">
                                  <div
                                    className="progress"
                                    style={{
                                      height: "6px",
                                      borderRadius: "16px",
                                    }}
                                  >
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{
                                        width: "65%",
                                        borderRadius: "16px",
                                        backgroundColor: "#E4D6D2",
                                      }}
                                    ></div>
                                  </div>
                                  <div className="d-flex justify-content-between mb-1">
                                    <p className="">Out for delivery</p>
                                    <p className="">Delivered</p>
                                  </div>

                                  <div className="d-flex justify-content-between pt-2">
                                    <p className="fw-bold mb-0">
                                      Order Details
                                    </p>
                                    <p className="text-muted mb-0">
                                      <span className="fw-bold me-4">
                                        Total
                                      </span>{" "}
                                      1,198.00
                                    </p>
                                  </div>

                                  <div className="d-flex justify-content-between pt-2">
                                    <p className="text-muted mb-0">
                                      Invoice Number : 788152
                                    </p>
                                    <p className="text-muted mb-0">
                                      <span className="fw-bold me-4">
                                        Discount
                                      </span>{" "}
                                      300.00
                                    </p>
                                  </div>

                                  <div className="d-flex justify-content-between">
                                    <p className="text-muted mb-0">
                                      Invoice Date : 22 Dec, 2019
                                    </p>
                                    <p className="text-muted mb-0">
                                      <span className="fw-bold me-4">
                                        GST 18%
                                      </span>{" "}
                                      150 RS
                                    </p>
                                  </div>

                                  <div className="d-flex justify-content-between mb-5">
                                    <p className="text-muted mb-0">
                                      Receipt Voucher : 18KU-62IIK
                                    </p>
                                    <p className="text-muted mb-0">
                                      <span className="fw-bold me-4">
                                        Delivery Charges
                                      </span>{" "}
                                      Free
                                    </p>
                                  </div>
                                </div>

                                <div className="d-flex flex-wrap align-items-center py-3">
                                  <Link
                                    to="/"
                                    className="btn btn-primary mx-1"
                                    role="button"
                                    aria-disabled=""
                                  >
                                    Track
                                  </Link>

                                  <Link
                                    to="/"
                                    className="btn btn-light border rounded-pill mx-1"
                                    role="button"
                                    aria-disabled=""
                                  >
                                    Feedback
                                  </Link>

                                  <Link
                                    to="/"
                                    className="btn btn-light border rounded-pill mx-1"
                                    role="button"
                                    aria-disabled=""
                                  >
                                    Return
                                  </Link>

                                  <Link
                                    to="/"
                                    className="btn btn-light border rounded-pill mx-1"
                                    role="button"
                                    aria-disabled=""
                                  >
                                    Review
                                  </Link>
                                </div>

                                <div
                                  className="card-footer border-0 px-4 py-2"
                                  style={{
                                    backgroundColor: "#E4D6D2",
                                    borderRadius: "50px",
                                  }}
                                >
                                  <h5 className="d-flex align-items-center justify-content-end text-dark text-uppercase mb-0">
                                    Total paid:{" "}
                                    <span className="h2 mb-0 ms-2">
                                      1,048 RS
                                    </span>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      {Array.isArray(orderData) && orderData.length > 0
                        ? orderData.map((order, index) => {
                            const progress = getStatusProgress(
                              order.product_status
                            );
                            const totalPaid =
                              order.quantity * order.product_price;
                            return (
                              <>
                                <div
                                  className={`card mt-2 ${
                                    order.product_status.toLowerCase() ===
                                    "rejected"
                                      ? "card-disabled"
                                      : ""
                                  }`}
                                  style={{ borderRadius: "10px" }}
                                >
                                  <div className="card-body">
                                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                                      <p
                                        className="lead fw-normal mb-0"
                                        style={{ color: "#d8dfab" }}
                                      >
                                        Receipt
                                      </p>
                                      <p className="small text-muted mb-0">
                                        Order ID : {order.order_id}
                                      </p>
                                    </div>
                                    <div className="card shadow-0 border">
                                      <div className="card-body">
                                        <div className="row">
                                          <div className="col-md-2">
                                            <img
                                              src={order.product_image}
                                              className="img-fluid"
                                              alt="Product"
                                            />
                                          </div>
                                          <div className="col-md-2 text-center d-flex flex-column justify-content-center align-items-center">
                                            <p className="text-muted mb-0">
                                              Item Name:
                                            </p>
                                            <p>{order.product_name}</p>
                                          </div>
                                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center flex-column">
                                            <p className="text-muted mb-0 small">
                                              Item Color:
                                            </p>
                                            <p>{order.product_color}</p>
                                          </div>
                                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center flex-column">
                                            <p className="text-muted mb-0 small">
                                              Payment Mode:
                                            </p>
                                            <p>{order.payment_mode}</p>
                                          </div>
                                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0 small">
                                              Qty: {order.quantity}
                                            </p>
                                          </div>

                                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0 small">
                                              {order.product_price}
                                            </p>
                                          </div>
                                        </div>
                                        <hr
                                          className="mb-4"
                                          style={{
                                            backgroundColor: "#e0e0e0",
                                            opacity: 1,
                                          }}
                                        />

                                        <div className="row">
                                          <div className="col-md-2">
                                            <p className="text-muted small">
                                              Track Order
                                            </p>
                                          </div>
                                          <div className="col-md-10">
                                            <div
                                              className="progress"
                                              style={{
                                                height: "6px",
                                                borderRadius: "16px",
                                              }}
                                            >
                                              <div
                                                className={`progress-bar ${
                                                  progress.animate
                                                    ? "progress-animated"
                                                    : ""
                                                }`}
                                                role="progressbar"
                                                style={{
                                                  width: progress.width,
                                                  borderRadius: "16px",
                                                  backgroundColor: "#FFA500",
                                                }}
                                              ></div>
                                            </div>

                                            <div className="d-flex justify-content-between mb-1">
                                              <p>{progress.message}</p>
                                              {order.product_status.toLowerCase() ===
                                              "delivered" ? (
                                                <p>Delivered</p>
                                              ) : (
                                                ""
                                              )}
                                            </div>

                                            <div className="d-flex justify-content-between pt-2">
                                              <p className="fw-bold mb-0">
                                                Order Details
                                              </p>
                                              <p className="text-muted mb-0">
                                                <span className="fw-bold me-4">
                                                  Total
                                                </span>
                                                {totalPaid}
                                              </p>
                                            </div>

                                            <div className="d-flex justify-content-between">
                                              <p className="text-muted mb-0">
                                                Invoice Date : {order.date}
                                              </p>
                                            </div>

                                            <div className="d-flex justify-content-between mb-5">
                                              <p className="text-muted mb-0">
                                                Order ID : {order.order_id}
                                              </p>
                                            </div>

                                            {order.product_status.toLowerCase() ===
                                              "delivered" && (
                                              <div className="timer d-flex justify-content-end flex-wrap">
                                                <p className="fs-5">
                                                  <FaRegClock
                                                    style={{
                                                      marginRight: "10px",
                                                    }}
                                                  />
                                                  {formattedTime}
                                                </p>
                                              </div>
                                            )}
                                          </div>

                                          <div className="d-flex flex-wrap py-3">
                                            {order.product_status.toLowerCase() ===
                                            "delivered" ? (
                                              <Link
                                                to="/"
                                                className="btn btn-disabled mx-1 disabled"
                                                role="button"
                                                aria-disabled=""
                                              >
                                                <span className="order-button">
                                                  Cancel Order
                                                </span>
                                              </Link>
                                            ) : (
                                              <Link
                                                to="/"
                                                className="btn btn-primary mx-1"
                                                role="button"
                                                aria-disabled=""
                                              >
                                                <span className="order-button">
                                                  Cancel Order
                                                </span>
                                              </Link>
                                            )}

                                            <Link
                                              to="/"
                                              className="btn btn-light border rounded-pill mx-1"
                                              role="button"
                                              aria-disabled=""
                                            >
                                              <span className="order-button">
                                                {" "}
                                                Feedback
                                              </span>
                                            </Link>
                                            {formattedTime === "00:00:00" ? (
                                              <Link
                                                to="/"
                                                className="btn btn-light border rounded-pill mx-1 disabled"
                                                role="button"
                                                aria-disabled=""
                                              >
                                                <span className="order-button">
                                                  {" "}
                                                  Return
                                                </span>
                                              </Link>
                                            ) : (
                                              <Link
                                                to="/"
                                                className="btn btn-light border rounded-pill mx-1"
                                                role="button"
                                                aria-disabled=""
                                              >
                                                <span className="order-button">
                                                  {" "}
                                                  Return
                                                </span>
                                              </Link>
                                            )}
                                            <Link
                                              to="/"
                                              className="btn btn-light border rounded-pill mx-1"
                                              role="button"
                                              aria-disabled=""
                                            >
                                              <span className="order-button">
                                                Review
                                              </span>
                                            </Link>
                                          </div>

                                          <div
                                            className="card-footer border-0 px-4 py-2"
                                            style={{
                                              backgroundColor: "#E4D6D2",
                                              borderRadius: "50px",
                                            }}
                                          >
                                            <h5 className="d-flex align-items-center justify-content-end text-dark text-uppercase mb-0 paid-data">
                                              Total paid:{" "}
                                              <span className="h2 mb-0 ms-2">
                                                {totalPaid} RS
                                              </span>
                                            </h5>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </div>
              </section>

              {/* <section
                className=" gradient-custom mb-5"
                style={{ backgroundColor: "" }}
              >
                <div className=" ">
                  <div className="d-flex  gap-5  justify-content-start  flex-wrap mx-2  mx-md-5">
                    <div className="col-lg-8 col-xl-8  w-100">
                      <div className="card  " style={{ borderRadius: "10px" }}>
                        <div className="card-body  ">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <p
                              className="lead fw-normal mb-0"
                              style={{ color: "#d8dfab" }}
                            >
                              Receipt
                            </p>
                            <p className="small text-muted mb-0">
                              Receipt Voucher : 1KAU9-84UIL
                            </p>
                          </div>

                          <div className=" card shadow-0 border ">
                            <div className="card-body">
                              <div className=" row">
                                <div className="col-md-2">
                                  <img
                                    src={Imgs}
                                    className="img-fluid"
                                    alt="Phone"
                                  />
                                </div>
                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0">Item Name</p>
                                </div>
                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0 small">
                                    Item clor
                                  </p>
                                </div>
                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0 small">
                                    Item fabric
                                  </p>
                                </div>
                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0 small">
                                    Qty: 1
                                  </p>
                                </div>
                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0 small">
                                    599 RS
                                  </p>
                                </div>
                              </div>
                              <hr
                                className="mb-4"
                                style={{
                                  backgroundColor: "#e0e0e0",
                                  opacity: 1,
                                }}
                              />

                              <div className="row">
                                <div className="col-md-2">
                                  <p className="text-muted small">
                                    Track Order
                                  </p>
                                </div>
                                <div className="col-md-10">
                                  <div
                                    className="progress"
                                    style={{
                                      height: "6px",
                                      borderRadius: "16px",
                                    }}
                                  >
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{
                                        width: "65%",
                                        borderRadius: "16px",
                                        backgroundColor: "#E4D6D2",
                                      }}
                                    ></div>
                                  </div>
                                  <div className="d-flex justify-content-between mb-1">
                                    <p className="">Out for delivery</p>
                                    <p className="">Delivered</p>
                                  </div>

                                  <div className="d-flex justify-content-between pt-2">
                                    <p className="fw-bold mb-0">
                                      Order Details
                                    </p>
                                    <p className="text-muted mb-0">
                                      <span className="fw-bold me-4">
                                        Total
                                      </span>{" "}
                                      1,198.00
                                    </p>
                                  </div>

                                  <div className="d-flex justify-content-between pt-2">
                                    <p className="text-muted mb-0">
                                      Invoice Number : 788152
                                    </p>
                                    <p className="text-muted mb-0">
                                      <span className="fw-bold me-4">
                                        Discount
                                      </span>{" "}
                                      300.00
                                    </p>
                                  </div>

                                  <div className="d-flex justify-content-between">
                                    <p className="text-muted mb-0">
                                      Invoice Date : 22 Dec, 2019
                                    </p>
                                    <p className="text-muted mb-0">
                                      <span className="fw-bold me-4">
                                        GST 18%
                                      </span>{" "}
                                      150 RS
                                    </p>
                                  </div>

                                  <div className="d-flex justify-content-between mb-5">
                                    <p className="text-muted mb-0">
                                      Receipt Voucher : 18KU-62IIK
                                    </p>
                                    <p className="text-muted mb-0">
                                      <span className="fw-bold me-4">
                                        Delivery Charges
                                      </span>{" "}
                                      Free
                                    </p>
                                  </div>
                                </div>

                                <div className="d-flex flex-wrap align-items-center py-3">
                                  <Link
                                    to="/"
                                    className="btn btn-primary mx-1"
                                    role="button"
                                    aria-disabled=""
                                  >
                                    Track
                                  </Link>

                                  <Link
                                    to="/"
                                    className="btn btn-light border rounded-pill mx-1"
                                    role="button"
                                    aria-disabled=""
                                  >
                                    Feedback
                                  </Link>

                                  <Link
                                    to="/"
                                    className="btn btn-light border rounded-pill mx-1"
                                    role="button"
                                    aria-disabled=""
                                  >
                                    Return
                                  </Link>

                                  <Link
                                    to="/"
                                    className="btn btn-light border rounded-pill mx-1"
                                    role="button"
                                    aria-disabled=""
                                  >
                                    Review
                                  </Link>
                                </div>

                                <div
                                  className="card-footer border-0 px-4 py-2"
                                  style={{
                                    backgroundColor: "#E4D6D2",
                                    borderRadius: "50px",
                                  }}
                                >
                                  <h5 className="d-flex align-items-center justify-content-end text-dark text-uppercase mb-0">
                                    Total paid:{" "}
                                    <span className="h2 mb-0 ms-2">
                                      1,048 RS
                                    </span>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
