import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { IoMdCash } from "react-icons/io";
import { FaGooglePay } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import { IoHome } from "react-icons/io5";
import { HiBuildingOffice } from "react-icons/hi2";
import axios from "axios";
import { toast } from "react-toastify";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

import { useDispatch } from "react-redux";
import {
  addQuantity,
  deleteQuantity,
  removeFromCart,
  deleteWishList,
} from "../components/redux/Slices/CartSlice";
import { selectTotalQuantity } from "../components/redux/Slices/CartSlice.js";
import { Toast } from "bootstrap";
export const Checkout = () => {
  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const signInData = localStorage.getItem("user");
  const parsedSignInData = JSON.parse(signInData);
  console.log("parsedSignInData", parsedSignInData);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [selectedAddress, setSelectedAddress] = useState({
    type: "Home Address",
    location: `${parsedSignInData ? parsedSignInData.address : ""}`,
  });
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [additionalFields, setAdditionalFields] = useState({
    // Define additional fields here
    street: "",
    city: "",
    country: "",
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isLocationFetched, setIsLocationFetched] = useState(false);
  const [location, setLocation] = useState({ lat: null, log: null });
  const [userLocation, setuserLocation] = useState("");
  console.log("userlocation", userLocation);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Assuming mobile screen width is less than 768px
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function calculateTotalPrice() {
    let totalPrice = 0;
    cart?.forEach((cartItem) => {
      totalPrice += parseInt(cartItem.product_price);
    });

    return totalPrice;
  }
  // code start by ganesh
  const totalQuantity = useSelector(selectTotalQuantity);
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ product_id: productId }));
  };

  const handleAddQty = (productId) => {
    dispatch(addQuantity({ product_id: productId }));
  };

  const DeleteQty = (productId) => {
    dispatch(deleteQuantity({ product_id: productId }));
  };

  const handleDeleteFromWishList = (productId) => {
    dispatch(deleteWishList({ product_id: productId }));
  };
  const handleCloseModal = () => {
    if (modalRef.current) {
      const bootstrapModal = new window.bootstrap.Modal(modalRef.current);
      bootstrapModal.hide();
    }
  };
  const [confirmingOrder, setConfirmingOrder] = useState(false);

  const handleConfirmOrder = async () => {
    setConfirmingOrder(true);
    const orderItems = cart.map((item) => {
      return {
        product_id: item.pid,
        order_id: "78455",
        product_name: item.product_name,
        quantity: item.quantity,
        payment_mode: paymentMethod,
        transition_id: "1452",
        payment_status: paymentMethod,
        cid: item.cid,
        client_name: item.client_name,
        client_coordinates: item.lat + "." + item.log,
        user_name: parsedSignInData.fullName,
        user_id: parsedSignInData.userId,
        user_coordinates: `${location.lat},${location.log}`,
        user_address: parsedSignInData.address,
        product_color:
          item.product_color1 ||
          item.product_color2 ||
          item.product_color3 ||
          item.product_color4,
        product_price: item.product_price,
        product_image:
          item.product_image1 ||
          item.product_image2 ||
          item.product_image3 ||
          item.product_image4 ||
          item.product_image5 ||
          item.product_image6,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toISOString(),
        user_phonenumber: parsedSignInData.phoneNumber,
        product_description: item.product_discription,
        total_amount: calculateTotalPrice() + 350,
        product_status: "waiting",
      };
    });
    console.log("orderItems", orderItems);
    const sendOrderItem = async (orderItem) => {
      console.log("orderitem", orderItem);
      try {
        const response = await axios.post(
          "https://minitgo.com/api/insert_order.php",
          orderItem
        );
        console.log("response", response.data);
        return response.data.status === true;
      } catch (error) {
        console.error("Error placing order:", error);
        return false;
      }
    };
    const results = await Promise.all(orderItems.map(sendOrderItem));

    if (results.every((result) => result === true)) {
      toast.success("Order successfully placed", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } else {
      alert("Failed to place order. Please try again.");
      window.location.reload()
      
    }
    setConfirmingOrder(false);
  };
  // console.log("showmoal",showModal);
  console.log("cart data", cart);
  // code end by ganesh
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7614.91157113474!2d${location.lat}!3d${location.log}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1721060362402!5m2!1sen!2sin`;

  //   // Set the src attribute of the iframe
  //   document.getElementById("map").src = mapUrl;
  // }, []);

  const handleUseCurrentLocation = () => {
    setLoading(true); // Set loading state to true when fetching starts
    // setButtonText("Fetching current location...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            log: position.coords.longitude,
          };
          // Update cart items with the new location
          const updatedCart = cart.map((item) => ({
            ...item,
            coordinates: `${newLocation.lat},${newLocation.log}`,
          }));
          // Update cart state with new coordinates
          updatedCart.forEach((item) => {
            item.coordinates = `${newLocation.lat},${newLocation.log}`;
          });
          // setSelectedAddress({
          //   type: "Current Address",
          //   location: `${newLocation.lat},${newLocation.log}`,
          // });
          setLocation({
            lat: `${newLocation.lat}`,
            log: `${newLocation.log}`,
          });

          toast.success("Location fetched successfully", {
            autoClose: 1000,
            hideProgressBar: true,
          });
          setLoading(false); // Set loading state to false after fetching
          setIsLocationFetched(true)
        },
        (err) => {
          setLoading(false); // Set loading state to false on error
          setError(err.message);
          toast.error("Failed to fetch location: " + err.message, {
            autoClose: 1000,
            hideProgressBar: true,
          });
        }
      );
    } else {
      setLoading(false); // Set loading state to false if geolocation is not supported
      setError("Geolocation is not supported by this browser.");
      toast.error("Geolocation is not supported by this browser.", {
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };
  // const mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7614.91157113474!2d${location.log}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1721060362402!5m2!1sen!2sin&markers=${location.lat},${location.log}`;
  // const mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7614.91157113474!2d${location.log}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1721060362402!5m2!1sen!2sin&markers=${location.lat},${location.log}`;
  // const mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7614.91157113474!2d${location.log}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1721060362402!5m2!1sen!2sin&markers=${location.lat},${location.log}`;
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7614.91157113474!2d${location.log}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1721060362402!5m2!1sen!2sin&markers=${location.lat},${location.log},color:red`;

  // const mapUrl = `https://www.google.com/maps/embed/v1/view?!1m14!1m12!1m3!1d7614.91157113474!2d${location.log}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1721060362402!5m2!1sen!2sin&center=${location.lat},${location.log}&zoom=15&markers=${location.lat},${location.log}`;
  const handleAddAddress = () => {
    setShowAdditionalFields(true);
  };

  const handleAdditionalFieldsChange = (e) => {
    setSelectedAddress({
      type: "Address",
      location: e.target.value,
    });
  };
  // const handleAddressTypeChange = (addressType) => {
  //   // Handle radio button change for address types
  //   setSelectedAddress(null); // Reset selectedAddress when changing address type
  //   setIsLocationFetched(false); // Reset location fetched state
  //   setShowAdditionalFields(false); // Hide additional fields when changing address type
  // };
  // const [selectedAddress, setSelectedAddress] = useState({
  //   type: '',
  //   location: '',
  // });
  const [newAddressInputVisible, setNewAddressInputVisible] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  const handleAddNewAddress = () => {
    setNewAddressInputVisible(true);
  };

  const handleNewAddressInputChange = (event) => {
    setNewAddress(event.target.value);
  };
  const [address, setAddress] = useState(false);
  const handleSaveNewAddress = () => {
    setSelectedAddress({
      type: "Add adress",
      location: newAddress,
    });
    setNewAddressInputVisible(false);
    setNewAddress("");
    setAddress(true);
  };
  console.log(selectedAddress);
  console.log("location", location);
  console.log(selectedAddress);
  console.log("cart", cart);
  return (
    <>
      <div
        className="container mt-5 border border-1 p-0"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="card">
          <div className="card-body">
            {/*Shafeeq updated to display order recap section on top in mobile view and in right side in medium screen */}

            <div className="d-md-none">
              <div
                className="rounded  d-flex flex-column p-2"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="p-2 me-3">
                  <h4>Order Recap</h4>
                </div>
                <div className="p-2 d-flex">
                  <div className="col-8">Contracted Price</div>
                  <div className="ms-auto">{calculateTotalPrice()} RS</div>
                </div>
                <div className="p-2 d-flex">
                  <div className="col-8">TAX Amount</div>
                  <div className="ms-auto">0.00</div>
                </div>
                <div className="p-2 d-flex">
                  <div className="col-8">TAX Amount</div>
                  <div className="ms-auto">0.00</div>
                </div>
                <div className="p-2 d-flex">
                  <div className="col-8">TAX Amount</div>
                  <div className="ms-auto">0.00</div>
                </div>
                <div className="border-top px-2 mx-2"></div>
                <div className="p-2 d-flex pt-3">
                  <div className="col-8">Total TAX Amount</div>
                  <div className="ms-auto">50 RS</div>
                </div>
                <div className="p-2 d-flex">
                  <div className="col-8">Discount</div>
                  <div className="ms-auto">0.00</div>
                </div>
                <div className="border-top px-2 mx-2"></div>
                <div className="p-2 d-flex pt-3">
                  <div className="col-8">shipping</div>
                  <div className="ms-auto">
                    <b>100 RS</b>
                  </div>
                </div>

                <div className="border-top px-2 mx-2"></div>
                <div className="p-2 d-flex pt-3">
                  <div className="col-8">
                    <b>Total</b>
                  </div>
                  <div className="ms-auto">
                    <b className="text-success">
                      {calculateTotalPrice() + 350} RS
                    </b>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center pb-5">
              <div className="col-md-7 col-xl-5 mb-4 mb-md-0">
                <div className="py-4 d-flex flex-row">
                  <h5>
                    <span className="check-square"></span>
                    <b>ELIGIBLE</b> |
                  </h5>
                  <span className="ps-2">Pay</span>
                </div>
                <div className="card mb-4">
                  <div className="card-header py-3 rounded-pill">
                    <h5 className="mb-0">Cart - {totalQuantity} items</h5>
                  </div>
                  <div className="card-body">
                    {cart?.map((cart_item, index) => {
                      return (
                        <div className="row my-2" key={index}>
                          <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                            <div className="bg-image rounded hover-zoom hover-overlay">
                              <img
                                src={cart_item.product_image1}
                                className="w-100"
                                alt="Product"
                              />
                              <a href="#!">
                                <div
                                  className="mask"
                                  style={{
                                    backgroundColor: "rgba(251, 251, 251, 0.2)",
                                  }}
                                ></div>
                              </a>
                            </div>
                          </div>
                          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                          <p className="mb-1">
                            <strong>{cart_item.client_name}</strong>
                          </p>
                          <p className="mb-1">Material: {cart_item.material}</p>
                          <p className="mb-1">Color: {cart_item.product_color1}</p>
                          <p className="mb-1">Size: {cart_item.product_size}</p>
                          <p className="mb-1">Price: {cart_item.product_price}</p>
                          <p className="mb-1">Category: {cart_item.category}</p>
                          <p className="line-clamp-1 mb-0 ">Description: {cart_item.product_discription
                          }</p>
                            <div
                              className="mt-1 line-clamp-1"
                              style={{ textAlign: "justify" }}
                            >
                              {/* code end by ganesh */}
                              {cart_item.product_discription}
                            </div>
                            <br></br>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={() =>
                                handleRemoveFromCart(cart_item.product_id)
                              }
                            >
                              <BsTrash3 />
                            </button>
                            <button className="btn btn-secondary">
                              {" "}
                              <AiOutlineHeart />
                            </button>
                          </div>
                          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div
                              className="d-flex mb-4"
                              style={{ maxWidth: "300px" }}
                            >
                              <button
                                className="btn btn-primary px-3 me-2"
                                onClick={() => DeleteQty(cart_item.product_id)}
                              >
                                <i className="minus"> - </i>
                              </button>
                              <div
                                className="form-control text-center"
                                placeholder="Quantity"
                              >
                                {cart_item.quantity}
                              </div>
                              <button
                                className="btn btn-primary px-3 ms-2 "
                                onClick={() =>
                                  handleAddQty(cart_item.product_id)
                                }
                              >
                                <i className="plus"> + </i>
                              </button>
                            </div>
                            <p className="text-start text-md-center">
                              <strong>
                                {cart_item.quantity} * {cart_item.product_price}
                              </strong>
                            </p>
                          </div>
                          <hr className="my-2" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="pt-2">
                  <div className="d-flex pb-2">
                    <div>
                      <p>
                        <b>
                          Patient Balance{" "}
                          <span className="text-success">1,350 RS</span>
                        </b>
                      </p>
                    </div>
                    <div className="ms-auto">
                      <p className="text-primary">
                        <Link
                          to="/"
                          className="btn mx-1"
                          role="button"
                          border
                          border-dark
                        >
                          Add payment card
                        </Link>
                      </p>
                    </div>
                  </div>
                  <p>
                    This is an estimate for the portion of your order due today.
                    review, refunds and/or balances will reconcile
                    automatically.
                  </p>
                  <div className="d-flex flex-row pb-3">
                    <div className="d-flex align-items-center pe-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        id="cashOnDelivery"
                        checked={paymentMethod === "Cash On Delivery"}
                        onChange={() => setPaymentMethod("Cash On Delivery")}
                      />
                    </div>
                    <div className="rounded border d-flex w-100 p-3 align-items-center">
                      <p className="mb-0 fw-semibold">
                        <IoMdCash
                          className="me-2"
                          style={{ width: "1.8rem", height: "1.8rem" }}
                        />
                        Cash On Delivery
                      </p>
                      {/* <div className="ms-auto">************3456</div> */}
                    </div>
                  </div>
                  <div className="d-flex flex-row pb-3">
                    <div className="d-flex align-items-center pe-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        id="onlinePayment"
                        checked={paymentMethod === "Paytm / GPay"}
                        onChange={() => setPaymentMethod("Paytm / GPay")}
                      />
                    </div>
                    <div className="rounded border d-flex w-100 p-3 align-items-center">
                      pay after arrived via
                      <p className="mb-0 fw-semibold">
                        <SiPaytm
                          className="me-2"
                          style={{ height: "3rem", width: "3rem" }}
                        />
                        {"/"}
                        <FaGooglePay
                          className="mx-2"
                          style={{ height: "3rem", width: "3rem" }}
                        />
                      </p>
                      {/* <div className="ms-auto">************1038</div>ss */}
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex flex-column pb-3">
                    <h2 className="fw-semibold mt-1 mb-3">Select Address</h2>
                    <div className="d-flex flex-row pb-3">
                      <div className="d-flex align-items-center pe-2">
                        <input
                          type="radio"
                          name="address"
                          id="homeAddress"
                          checked={selectedAddress.type === "Home Address"}
                          onChange={() =>
                            setSelectedAddress({
                              type: "Home Address",
                              location: parsedSignInData.address,
                            })
                          }
                        />
                      </div>
                      <div className="rounded border d-flex w-100 p-3 align-items-center">
                        <p className="mb-0 fw-semibold">
                          <IoHome
                            className="me-2"
                            style={{ width: "1.5rem", height: "1.5rem" }}
                          />
                          Home Address
                        </p>
                        <span className="ms-auto fs-6">
                          {parsedSignInData ? parsedSignInData.address : ""}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-row pb-3">
                      <div className="d-flex align-items-center pe-2">
                        <input
                          type="radio"
                          name="address"
                          id="officeAddress"
                          checked={selectedAddress.type === "Office Address"}
                          onChange={() =>
                            setSelectedAddress({
                              type: "Office Address",
                              location: parsedSignInData.officeAddress,
                            })
                          }
                        />
                      </div>
                      <div className="rounded border d-flex w-100 p-3 align-items-center">
                        <p className="mb-0 fw-semibold">
                          {" "}
                          <HiBuildingOffice
                            className="me-2"
                            style={{ width: "1.5rem", height: "1.5rem" }}
                          />
                          Office Address
                        </p>
                        <span className="ms-auto fs-6">
                          {parsedSignInData
                            ? parsedSignInData.officeAddress
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-row pb-3">
                      <div className="d-flex align-items-center pe-2">
                        <input
                          type="radio"
                          name="address"
                          id="currentAddress"
                          checked={
                            selectedAddress.type === "Current Address" ||
                            selectedAddress.type === "Add adress"
                          }
                          onChange={() =>
                            setSelectedAddress({
                              type: "Current Address",
                              location: "Not Available",
                            })
                          }
                        />
                      </div>
                      <div className="rounded border current-location  w-100 p-3 align-items-center gap-5">
                        <div className="w-full flex justify-between gap-5">
                          <button
                            className="mb-0 fw-semibold btn btn-primary"
                            onClick={handleUseCurrentLocation}
                            disabled={
                              !selectedAddress.type === "Current Address"
                            }
                            style={{
                              opacity:
                                selectedAddress.type === "Current Address"
                                  ? 1
                                  : 0.5,
                            }}
                          >
                            {loading ? "Fetching..." : "Use Current Address"}
                          </button>
                          {loading || !isLocationFetched ? (
                            ""// Or display a loading indicator
                          ) : (
                            <iframe
                              id="map"
                              width="400"
                              height="300"
                              style={{ border: 0 }}
                              loading="lazy"
                              allowFullScreen
                              referrerPolicy="no-referrer-when-downgrade"
                              src={mapUrl}
                            />
                            
                          )}
                        </div>
                        <div>
                          <div className=" mt-3 mb-4 d-flex gap-5 items-center justify-center">
                            <button
                              type="button"
                              className="mb-0 fw-semibold btn btn-primary"
                              onClick={handleAddNewAddress}
                            >
                              Add Address
                            </button>
                          </div>
                          {newAddressInputVisible && (
                            <div className="d-flex flex-row pb-3">
                              <div className="d-flex align-items-center pe-2">
                                <input
                                  type="text"
                                  // className="form-control"
                                  placeholder="Enter new address"
                                  value={newAddress}
                                  onChange={handleNewAddressInputChange}
                                />
                              </div>
                              <div className="d-flex align-items-center">
                                <button
                                  className="btn btn-primary"
                                  onClick={handleSaveNewAddress}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          )}
                          {address && (
                            <div className="d-flex mt-3 ">
                              <h6>{selectedAddress.type}:</h6>
                              <h6>
                                {selectedAddress.location},{location.lat},
                                {location.log}
                              </h6>
                            </div>
                          )}
                        </div>

                        {/* <span className="ms-auto fs-6">
                          {"Street #4, City 59 , India"}
                        </span> */}
                      </div>
                    </div>
                  </div>

                  {/* Add New Address Button */}

                  <div className="place-button mx-4">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      data-bs-toggle="modal"
                      data-bs-target="#placeOrderModal"
                      // disabled={!isLocationFetched}
                      // disabled={!selectedAddress.type && !isLocationFetched}
                      disabled={
                        !selectedAddress ||
                        (selectedAddress.type === "Current Address" &&
                          !isLocationFetched)
                      }
                    >
                      Place Order
                    </button>
                  </div>

                  <div
                    className="modal fade"
                    id="placeOrderModal"
                    tabIndex="-1"
                    aria-labelledby="placeOrderModal"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="placeOrderModal">
                            Order Confirmation
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body bg-light">
                          <h3 className="mb-0 mx-3 text-start">Items:</h3>
                          <hr />
                          <div className="product-section my-2">
                            {cart?.map((item, index) => (
                              <div
                                key={index}
                                className="col-12 mx-md-auto px-3 my-2 product-item d-flex justify-content-start gap-4"
                              >
                                <img
                                  src={item.product_image1}
                                  alt="Product"
                                  width={70}
                                  height={70}
                                  className="border rounded p-1"
                                />
                                <div className="d-flex flex-column">
                                  <h5>{item.client_name}</h5>
                                  <p className="fs-5">{item.product_price}₹</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <hr />
                          <div className="px-3 payment-info">
                            <h4>Payment Information</h4>
                            <div className="mt-3 d-flex justify-content-between">
                              <h5>Method:</h5> <h6>{paymentMethod}</h6>
                            </div>
                          </div>
                          <hr />
                          <div className="px-3 address-info">
                            <h4>Shipping Information</h4>
                            <div className="mt-3 d-flex justify-content-between">
                              <h5>Location:</h5>{" "}
                              <h6>{selectedAddress.location}</h6>
                            </div>
                          </div>
                          <hr />
                          <div className="px-3 total-amount d-flex justify-content-between align-items-center">
                            <h3>Total Amount:</h3>
                            <h5 className="text-success">
                              {calculateTotalPrice()} RS
                            </h5>
                          </div>
                          <hr />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-primary mx-auto"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={handleConfirmOrder}
                            disabled={confirmingOrder}
                          >
                            {confirmingOrder
                              ? "Confirming..."
                              : "Confirm Order"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-xl-4 offset-xl-1 order-md-1">
                {" "}
                {/* Order first on medium and up screens */}
                <div className="py-4 d-flex justify-content-end">
                  <h6>
                    <Link to="/cart">Cancel and return to website</Link>
                  </h6>
                </div>
                {/*Shafeeq added this section to hide the order recap section in bottom of the screen in mobile view*/}
                <div
                  className={`rounded  d-flex flex-column p-2 ${
                    isMobile ? "d-none d-sm-block" : ""
                  }`}
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="p-2 me-3">
                    <h4>Order Recap</h4>
                  </div>
                  <div className="p-2 d-flex">
                    <div className="col-8">Contracted Price</div>
                    <div className="ms-auto">{calculateTotalPrice()} RS</div>
                  </div>
                  <div className="p-2 d-flex">
                    <div className="col-8">TAX Amount</div>
                    <div className="ms-auto">0.00</div>
                  </div>
                  <div className="p-2 d-flex">
                    <div className="col-8">TAX Amount</div>
                    <div className="ms-auto">0.00</div>
                  </div>
                  <div className="p-2 d-flex">
                    <div className="col-8">TAX Amount</div>
                    <div className="ms-auto">0.00</div>
                  </div>
                  <div className="border-top px-2 mx-2"></div>
                  <div className="p-2 d-flex pt-3">
                    <div className="col-8">Total TAX Amount</div>
                    <div className="ms-auto">50 RS</div>
                  </div>
                  <div className="p-2 d-flex">
                    <div className="col-8">Discount</div>
                    <div className="ms-auto">0.00</div>
                  </div>
                  <div className="border-top px-2 mx-2"></div>
                  <div className="p-2 d-flex pt-3">
                    <div className="col-8">shipping</div>
                    <div className="ms-auto">
                      <b>100 RS</b>
                    </div>
                  </div>

                  <div className="border-top px-2 mx-2"></div>
                  <div className="p-2 d-flex pt-3">
                    <div className="col-8">
                      <b>Total</b>
                    </div>
                    <div className="ms-auto">
                      <b className="text-success">{calculateTotalPrice()} RS</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </>
  );
};

export default Checkout;
