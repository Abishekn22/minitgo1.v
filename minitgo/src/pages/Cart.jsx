import { Link } from "react-router-dom";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import myContext from "../components/context/MyContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addQuantity,
  deleteQuantity,
  removeFromCart,
  deleteWishList,
} from "../components/redux/Slices/CartSlice";
import { addToCart } from "../components/redux/Slices/CartSlice.js";
import { selectTotalQuantity } from "../components/redux/Slices/CartSlice.js";
import { useLocation } from "react-router-dom";
import { Col, Modal, Row } from "react-bootstrap";
import Login from "../pages/Signin.jsx";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


const Cart = () => {
  const dispatch = useDispatch();
  const context = useContext(myContext);
  const [loginModal, setLoginModal] = useState(false);
  const locationState = useLocation();
  const openLoginModal = locationState?.state?.openLoginModal;

  useEffect(() => {
    if (openLoginModal) {
      setLoginModal(true);
    }
  }, [openLoginModal]);

  function calculateTotalPrice() {
    let totalPrice = 0;
    cartData.forEach((cartItem) => {
      totalPrice += parseInt(cartItem.product_price) * cartItem.quantity;
    });
    return totalPrice;
  }

  const signInData = localStorage.getItem("user");
  const parsedSignInData = JSON.parse(signInData);
  console.log("userdata", parsedSignInData);

  //redux code start

  const cart = useSelector((state) => state.cart);
  console.log("cart", cart);
  const cartData = cart.items;
  console.log(cartData, "cartData");
  const wishListData = cart.wishList;
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

  // size validation
  function productSizeSelection() {
    handleCheckoutClick()
    if (Array.isArray(cartData)) {
      let notificationShown = false;

      for (let cart_item of cartData) {
        const sizes = cart_item.product_size;

        // Check if sizes is null
        if (sizes === null && !notificationShown) {
          notificationShown = true; // Set the flag to true
          // Add a delay before showing the toast notification
          setTimeout(() => {
            toast.error(`No sizes available for: ${cart_item.product_title}`);
          }, 100); // 100 milliseconds = 0.1 seconds
          break; // Exit the loop after showing the notification
        } else if (Array.isArray(sizes) && sizes.length === 1) {
          console.log(sizes[0], "Single size selected");
        } else if (Array.isArray(sizes) && sizes.length > 1) {
          console.log(sizes.join(", "), "Multiple sizes available");
        }
      }
    } else {
      console.log("cartData is not an array");
    }
  }
  const fetchAreaData = async () => {
    try {
      const response = await axios.get("https://minitgo.com/api/areas.php");
      return response.data;
    } catch (error) {
      console.error("Error fetching area data:", error);
      return [];
    }
  };
  const [isPincodeMatch, setIsPincodeMatch] = useState(false);
  const checkPincode = async () => {
    // Fetch the area data
    const areaData = await fetchAreaData();

    // Fetch the sign-in data from localStorage
    const signInData = localStorage.getItem("user");
    const parsedSignInData = JSON.parse(signInData);
    console.log("here is the data ", parsedSignInData);

    // Check if sign-in data exists and if the address is available
    if (parsedSignInData) {
      const userAddress = parsedSignInData.Address;
      console.log("useraddress", userAddress);

      // Split the address into words and trim any whitespace
      const addressWords = userAddress
        .split(/[\s,]+/)
        .map((word) => word.trim());

      // Iterate through each word and check if it matches any pincode in the area data
      let found = false;
      for (const word of addressWords) {
        const matchingArea = areaData.find((area) => area.pincode === word);

        if (matchingArea) {
          console.log("Found: Matching area found for pincode:", word);
          // toast.warn("Minitgo is not available in this area.");
          // toast.success(`Found: Area with pincode ${word} is available.`);
          // setIsPincodeMatch(true);
          setIsPincodeMatch(true);
          found = true;
          break; // Exit the loop once a match is found
        }
      }

      if (!found) {
        console.log("Not Found: No matching area found in the address.");
        // toast.error("Not Found: No matching pincode found in the address.");
      }
    } else {
      console.error("No address found in the user's sign-in data.");
    }
  };

  // Example usage
  checkPincode();
  const handleCheckoutClick = (event) => {
    if (isPincodeMatch) {
      event.preventDefault(); // Prevent redirection
      // toast.error("Minitgo is not available in this area.");
      console.log("hiii");
      
    }
  };

  return (
    <>
      <section className="h-100 gradient-custom">
        <div className="container h-100">
          <div className="row justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3 rounded-pill">
                  <h5 className="mb-0">Cart - {totalQuantity} items</h5>
                </div>
                <div className="card-body">
                  {cartData?.map((cart_item, index) => {
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
                            <span>{cart_item.client_name}</span>
                          </p>
                          <p className="mb-1">
                            <strong>{cart_item.product_title}</strong>
                          </p>
                          <p className="mb-1">Material: {cart_item.material}</p>
                          <p className="mb-1">
                            Color: {cart_item.product_color1}
                          </p>
                          <p className="mb-1">Size: {cart_item.product_size}</p>
                          <p className="mb-1">
                            Price: {cart_item.product_price}
                          </p>
                          <p className="mb-1">Category: {cart_item.category}</p>
                          <p className="line-clamp-2 mb-0 ">
                            Description: {cart_item.product_discription}
                          </p>
                          <br></br>
                          <button
                            className="btn btn-danger  ml-2 mr-2"
                            onClick={() =>
                              handleRemoveFromCart(cart_item.product_id)
                            }
                          >
                            <BsTrash3 />
                          </button>
                          <button className="btn btn-secondary  mx-2">
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
                              onClick={() => handleAddQty(cart_item.product_id)}
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
              <div className="card mb-4">
                <div className="card-body">
                  <p>
                    <strong>Expected shipping delivery</strong>
                  </p>
                  <p className="mb-0">12.10.2020 - 14.10.2020</p>
                </div>
              </div>
              <div className="card mb-4 mb-lg-0">
                <div className="card-body">
                  <p>
                    <strong>We accept</strong>
                  </p>
                  <img
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa"
                  />
                  <img
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express"
                  />
                  <img
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard"
                  />
                  <img
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                    alt="PayPal acceptance mark"
                  />
                </div>
              </div>

              {/* wistlist */}
              {wishListData?.length > 0 ? (
                <div className="row mt-4">
                  <div className="card">
                    <div className="card-header py-2 rounded-pill">
                      <h5 className="mb-0">WishList Items</h5>
                    </div>
                    <div className="d-flex scrollable-content gap-3  my-3 overflow-y-hidden">
                      <div className="card">
                        <div className="d-flex gap-3   overflow-x-auto my-1">
                          {wishListData.map((prod, index) => (
                            <div
                              key={index}
                              className="col-6 col-sm-3 py-2"
                              style={{ width: "220px" }}
                            >
                              <div className="product-card">
                                <div
                                  className="product-image"
                                  style={{ height: "250px" }}
                                >
                                  <img
                                    src={prod.product_image1}
                                    alt="Product 1"
                                    className="h-100 img-fluid"
                                  />
                                </div>

                                <div className="product-content mt-2">
                                  {/* <h6>{prod.product_name} </h6>
                                  <h5>
                                    Price: <sup>&#x20B9;</sup>
                                    {prod.product_price}
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
                                      {prod.product_stock}
                                    </span>
                                  </h5> */}
                                  <p className="mb-1">
                                    <strong>{prod.client_name}</strong>
                                  </p>
                                  <p className="mb-1">
                                    Material: {prod.material}
                                  </p>
                                  <p className="mb-1">
                                    Color: {prod.product_color1}
                                  </p>
                                  <p className="mb-1">
                                    Size: {prod.product_size}
                                  </p>
                                  <p className="mb-1">
                                    Price: {prod.product_price}
                                  </p>
                                  <p className="mb-1">
                                    Category: {prod.category}
                                  </p>
                                  <p className="line-clamp-1 mb-0 ">
                                    Description: {prod.product_discription}
                                  </p>
                                </div>
                                <div className="cart-btn px-1 ">
                                  <button
                                    className="btn btn-dark "
                                    onClick={() =>
                                      handleDeleteFromWishList(prod.pid)
                                    }
                                  >
                                    <BsTrash3 />
                                  </button>
                                  {/* <button className="btn btn-dark w-100 mx-2 px-5">
                                    <Link
                                      to="/checkout"
                                      style={{
                                        textDecoration: "none",
                                        color: "white",
                                      }}
                                    >
                                      {" "}
                                      Buy
                                    </Link>
                                  </button> */}
                                  <button
                                    onClick={() => handleAddToCart(prod, index)}
                                    className="btn btn-primary my-2  ms-2"
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
                </div>
              ) : null}
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header rounded-pill">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span>{calculateTotalPrice()} RS</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>100 RS</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                        <p className="mb-0">(including VAT)</p>
                      </div>
                      <span>
                        <strong>{calculateTotalPrice() + 100} RS</strong>
                      </span>
                    </li>
                  </ul>
                  {parsedSignInData && cartData?.length > 0 ? (
                    <>
                    <Link to={isPincodeMatch ? "#" : "/checkout"} >
                    {/* // <Link to={"/checkout"}> */}
                      <button
                        className="btn btn-lg btn-block btn-primary"
                        onClick={productSizeSelection}
                        disabled={isPincodeMatch}
                      >
                        Go to checkout
                      </button>
                    </Link>
                     {isPincodeMatch && (
                      <p style={{ color: 'red', display: 'flex', alignItems: 'center' }}>
                      <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '8px' }} />
                      Minitgo is not available in this area.
                    </p>
                    )}
                    </>
                  ) : (
                    <>
                      {!parsedSignInData && (
                        <>
                          <div
                            className="btn btn-lg btn-block btn-primary"
                            onClick={() => setLoginModal(true)}
                          >
                            Login
                          </div>
                          <p>Please Login here</p>

                        </>
                      )}
                     
                    </>
                  )}
                </div>
              </div>
              {/* div for Recomended */}
              {/* <div className="card">
                <div className="card-header py-2 rounded-pill">
                  <h5 className="mb-0">Recommended Items</h5>
                </div>
                <div className="d-flex gap-3   overflow-x-auto my-3">
                  {cartData.map((prod, index) => (
                    <div
                      key={index}
                      className="d-flex  flex-column justify-content-between bg-light  shadow rounded px-4"
                      style={{ height: "430px" }}
                    >
                      <img
                        className="w-100 h-50 rounded"
                        src={prod.product_image1}
                        alt={`Image ${prod.id}`}
                      />
                      <div className="d-flex flex-column justify-content-between p-1">
                        <div className="d-flex flex-column">
                          <h1 className="fs-4">{prod.product_name}</h1>
                          <p className="text-muted fs-6">
                            {prod.product_discription &&
                            prod.product_discription.length > 40
                              ? prod.product_discription.slice(0, 40) + "..."
                              : prod.product_discription || ""}
                          </p>
                          <div className="d-flex justify-content-between flex-wrap">
                            <p className="text-muted">{prod.product_size}</p>
                            <p className="text-muted">{prod.product_price}</p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center fs-4 my-1 pb-1 mt-auto">
                          <button className="btn  btn-dark w-100">❤</button>
                          <div className="d-flex ">
                            <button className="btn btn-dark w-100 mx-2 px-5">
                              Buy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
};

export default Cart;
