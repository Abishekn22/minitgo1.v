import "../components/Profile.css";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link, redirect, useNavigate } from "react-router-dom";
import Imgs from "../components/images/men.jpg";
import { MdMenuOpen } from "react-icons/md";
import { HiMenu, HiMenuAlt1 } from "react-icons/hi";
import { toast } from "react-toastify";

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

        const userId = JSON.parse(localStorage.getItem("user"))?.userId;

        const user = results.find((user) => user.id === userId);
        if (!user) {
          navigate("/", { state: { openLoginModal: true } });
        }
        setuserData(user);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [navigate]);

  // for update the data
  // Function to handle the API request
  const updateProfile = async () => {
    try {
      const response = await fetch("https://minitgo.com/api/update_user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Assuming data contains the updated profile information
      });
      const result = await response.json();
      // Handle the response as needed
      console.log("Profile updated successfully:", result);
      toast.success(result.message);
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
          <div
            className={`custom-sidebar-item fs-5 bg-light ${
              section === "2fa" && "active"
            }`}
            onClick={() => setSection("2fa")}
            data-section="2fa"
          >
            Two-Factor Authentication
          </div>
          <div
            className={`custom-sidebar-item fs-5 bg-light ${
              section === "orders" && "active"
            }`}
            onClick={() => setSection("orders")}
            data-section="orders"
          >
            Your Orders
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
            <div
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
            </div>
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
                        <input
                          type="email"
                          id="email"
                          placeholder="Enter your email"
                        />
                        <button className="custom-update-password bg-dark">
                          Send link
                        </button>
                      </div>
                    )}
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
        {section === "2fa" && (
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
        )}

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
                        className=" border bg-body-tertiary  "
                        style={{ borderRadius: "10px" }}
                      >
                        <div className="card-header px-4 py-4 col d-flex flex-column gap-2  ">
                          <div className=" d-flex ">
                            <h5 className="text-muted mb-0  ">
                              Thanks for your Order,{" "}
                              <span style={{ color: "black" }}>
                                Hemang Krishna Chaitanya
                              </span>
                              !
                            </h5>
                          </div>
                        </div>
                      </div>

                      <div
                        className="mt-4 pb-4"
                        style={{ borderBottom: "1px solid  #c4c4c4" }}
                      >
                        <div className="mobile-menu-logo">
                          <div
                            className="mobile-search "
                            style={{ padding: 0 }}
                          >
                            <form className="input-group d-flex  gap-2">
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

                        <div className="mt-3">
                          <div className="d-flex gap-3  ">
                            <button className="btn btn-primary ">Orders</button>
                            <button className="btn btn-primary">
                              Buy Again
                            </button>
                            <button className="btn btn-primary">
                              Cancelled Orders
                            </button>
                          </div>
                        </div>
                      </div>
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
              </section>

              <section
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
              </section>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
