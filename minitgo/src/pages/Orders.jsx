import Header from "../components/header";
import { Link } from "react-router-dom";
import Imgs from "../components/images/men.jpg";
import Footer from "../components/Footer";
import AdsCarousel from "../components/AdsCarousel";
import { productImages } from "../components/ProductInfo/data";
import { useContext, useEffect, useState } from "react";
import myContext from "../components/context/MyContext";
import axios from "axios";
import { FaRegClock } from "react-icons/fa"; // Import the timer icon from Font Awesome

const OrdersPage = () => {
  const [orderData, setOrderData] = useState([]);
  const context = useContext(myContext);
  const { products } = context;
  
  // Retrieve user data from localStorage
  const signInData = localStorage.getItem("user");
  const parsedSignInData = signInData ? JSON.parse(signInData) : null;

  // // testing
  function sortAndReverseByDateTime(arr) {
    // First, sort the array by date and time
    arr.sort((a, b) => {
        const dateTimeA = new Date(a.datetime);
        const dateTimeB = new Date(b.datetime);
        
        return dateTimeA - dateTimeB;
    });

    // Then, reverse the sorted array
    return arr.reverse();
}

// Example usage:
const data = [
    { name: "Event 1", datetime: "2024-07-29T22:30:00" },
    { name: "Event 1", datetime: "2024-07-27T14:30:00" },
    { name: "Event 2", datetime: "2024-07-25T09:15:00" },
    { name: "Event 2", datetime: "2024-07-28T09:15:00" },
    { name: "Event 3", datetime: "2024-07-26T12:00:00" }
];

const sortedAndReversedData = sortAndReverseByDateTime(data);
console.log("sorted data",sortedAndReversedData);


  // Function to fetch and sort order data
  const fetchData = () => {
    if (!parsedSignInData) {
      console.error("No user data found in localStorage");
      return;
    }

    const postData = { user_id: parsedSignInData.userId };
    console.log("post data",postData);
    /////test

    axios.post("https://minitgo.com/api/user_orders.php", postData)
      .then((response) => {
        console.log("data of order", response.data.data);
        if (Array.isArray(response.data.data)) {
          // Sort orders by time in descending order
          const sortedOrders = response.data.data.sort(
            (a, b) => new Date(b.time) - new Date(a.time)
          );
          setOrderData(sortedOrders.reverse());
        } else {
          console.error("Expected an array but got:", response.data.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  // UseEffect to fetch data initially and set up polling
  useEffect(() => {
    fetchData(); // Fetch data immediately
    const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [parsedSignInData?.userId]);

  // Function to get status progress
  const getStatusProgress = (status) => {
    switch (status.toLowerCase()) {
      case "waiting":
        return { width: "99%", message: "Waiting for order confirmation", animate: true };
      case "rejected":
        return { width: "0%", message: "Rejected", animate: false };
      case "out for delivery":
        return { width: "65%", message: "Out for delivery", animate: false };
      case "finding delivery boy":
        return { width: "35%", message: "Finding delivery boy", animate: false };
      case "delivered":
        return { width: "100%", message: "Delivered", animate: false };
      case "accepted":
        return { width: "10%", message: "Accepted", animate: false };
      default:
        return { width: "99%", message: "Waiting for order confirmation", animate: true };
    }
  };

  // Timer logic
  const initialSeconds = localStorage.getItem("timerSeconds") ? parseInt(localStorage.getItem("timerSeconds")) : 5;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(prevSeconds => prevSeconds - 1), 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    localStorage.setItem("timerSeconds", seconds.toString());
  }, [seconds]);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;

  console.log("order data", orderData);

  return (
    <div className="border ">
      <div className=" mt-1  ">
        <div className=" d-flex  flex-wrap justify-content-center  ">
          <div className="  col-12 col-md-8">
            <section className="">
              <div className=" py-3   ">
                <div className="mx-2  mx-md-5 ">
                  <div className=" col-lg-8 col-xl-8 w-100  ">
                    <div
                      className="mt-4 pb-4  "
                      style={{ borderBottom: "1px solid  #c4c4c4" }}
                    >
                      <div className=" ">
                        <div className=" " style={{ padding: 0 }}>
                          <form className="input-group d-flex  gap-2">
                            <input
                              type="search"
                              className="form-control search-box-m rounded "
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
                          <button className="btn btn-primary">Buy Again</button>
                          <button className="btn btn-primary">
                            Cancelled Orders
                          </button>
                        </div>
                      </div> */}
                    </div>

                    {parsedSignInData.userId && orderData.length > 0 && (
                      <div
                        className=" border bg-body-tertiary  mt-3"
                        style={{ borderRadius: "10px" }}
                      >
                        <div className="card-header px-4 py-4 col d-flex flex-column gap-2  ">
                          <div className=" d-flex ">
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

            {parsedSignInData.userId && (
  <section
    className="gradient-custom mb-5"
    style={{ backgroundColor: "" }}
  >
    <div className="">
      <div className="d-flex gap-5 justify-content-start flex-wrap mx-2 mx-md-5">
        <div className="col-lg-8 col-xl-8 w-100">
          {Array.isArray(orderData) && orderData.length > 0
            ? orderData.map((order, index) => {
                const progress = getStatusProgress(order.product_status);
                const totalPaid = order.quantity * order.product_price;
                return (
                  
                    <div
                        key={order.oid}
                      className={`card mt-2 ${
                        order.product_status.toLowerCase() === "rejected"
                        ? "card-disabled"
                        : ""
                      }`}
                      style={{ borderRadius: "10px" }}
                      >
                      <div className="card-body"
                      
                       >
                        <div className="d-flex justify-content-between align-items-center mb-3">
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
                                  Name:
                                </p>
                                <p>{order.product_title}</p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center flex-column">
                                <p className="text-muted mb-0 small">
                                  Color:
                                </p>
                                <p>{order.product_color}</p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center flex-column">
                                <p className="text-muted mb-0 small">
                                  Size:
                                </p>
                                <p>{order.product_size}</p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center flex-column">
                                <p className="text-muted mb-0 small">
                                  Payment:
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
                                  <p className="mb-0">
                                    <span className="fw-bold me-4">
                                      Total:
                                    </span>
                                    {totalPaid} /
                                  </p>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <p className="mb-0">
                                    Invoice:
                                  </p>
                                </div>
                                <div className="d-flex justify-content-between mb-5">
                                  <p className="mb-0">
                                    Order ID : {order.order_id}
                                  </p>
                                  <p className="text-muted">Date: {order.date}</p>
                                  <p className="text-muted">Time: {order.time}</p>
                                </div>
                                {order.product_status.toLowerCase() === "delivered" && (
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
                              <div className="d-flex flex-wrap align-items-center py-3">
                                {/* {order.product_status.toLowerCase() === "delivered" ? (
                                  <Link
                                    to="/"
                                    className="btn btn-disabled mx-1 disabled"
                                    role="button"
                                    aria-disabled=""
                                  >
                                    Cancel Order
                                  </Link>
                                ) : (
                                  <Link
                                    to="/"
                                    className="btn btn-primary mx-1"
                                    role="button"
                                    aria-disabled=""
                                  >
                                    Cancel Order
                                  </Link>
                                )}
                                {formattedTime === "00:00:00" ? (
                                  <Link
                                    to="/"
                                    className="btn btn-light border rounded-pill mx-1 disabled"
                                    role="button"
                                    aria-disabled=""
                                  >
                                    Return
                                  </Link>
                                ) : (
                                  <Link
                                    to="/"
                                    className="btn btn-light border rounded-pill mx-1"
                                    role="button"
                                    aria-disabled=""
                                  >
                                    Return
                                  </Link>
                                )}
                                <Link
                                  to="/"
                                  className="btn btn-light border rounded-pill mx-1"
                                  role="button"
                                  aria-disabled=""
                                >
                                  Replace
                                </Link> */}
                                <Link
                                  to="/contact"
                                  className="btn btn-light border rounded-pill mx-1"
                                  role="button"
                                  aria-disabled=""
                                >
                                  ! Report
                                </Link>
                              </div>
                              <div
                                className="card-footer border-0 px-4 py-2"
                                style={{
                                  backgroundColor: "#E4D6D2",
                                  borderRadius: "50px",
                                }}
                              >
                                <h5 className="d-flex align-items-center justify-content-center text-dark text-uppercase mb-0">
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
                  
                );
              })
            : null}
        </div>
      </div>
    </div>
  </section>
)}

          </div>

          <div
            className="  col-10 col-sm-5 col-md-3  px-2 px-lg-5 "
            style={{ marginBottom: "3.5%" }}
          >
            <div className="sticky-top" style={{ top: "90px" }}>
              <div className="card mt-4">
                <div className="card-header py-2 rounded-pill ">
                  <h5 className="mb-0 fs-6" >Recommended Items</h5>
                </div>
              </div>
              <div
                className=" border rounded   "
                style={{ border: "1px solid", position: "relative" }}
              >
                <AdsCarousel products={products} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
