import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Emailcheck from "./components/Emailcheck.jsx";
import Mystate from "./components/context/MyState.jsx";
// import LoadingSpinner from "./components/LoadingSpinner";
import './App.css';
import LoadingSpinner from "./components/spiner/LoadingSpinner.jsx";

const Home = lazy(() => import("./pages/Home"));
const Notfound = lazy(() => import("./pages/Notfound"));
const Register = lazy(() => import("./pages/Register"));
const OrdersPage = lazy(() => import("./pages/Orders.jsx"));
const GoogleApiWrapper = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
const Feedback = lazy(() => import("./pages/Feedback.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const Client_register = lazy(() => import("./client/pages/Client_registre.jsx"));
const Clientdashboard = lazy(() => import("./client/pages/Client_dashboard.jsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));
const Blog = lazy(() => import("./pages/Blog/Blog.jsx"));
const Profile = lazy(() => import("./components/profile.jsx"));
const ProductInfo = lazy(() => import("./pages/ProductInfo.jsx"));
const AddBlog = lazy(() => import("./pages/Blog/AddBlog.jsx"));
const ReturnPolicy = lazy(() => import("./pages/ReturnPolicy.jsx"));
const Help = lazy(() => import("./pages/Help.jsx"));
const FindNearMe = lazy(() => import("./pages/FindNearMe.jsx"));
const Connect = lazy(() => import("./pages/Connect.jsx"));
const Updates = lazy(() => import("./pages/Updates.jsx"));
const BecomePartner = lazy(() => import("./pages/BecomePartner.jsx"));
const Increase = lazy(() => import("./pages/Increase.jsx"));
const Accessories = lazy(() => import("./pages/Categories/Accessories.jsx"));
const Mens = lazy(() => import("./pages/Categories/Mens.jsx"));
const Womens = lazy(() => import("./pages/Categories/Womens.jsx"));
const Category = lazy(() => import("./pages/Category.jsx"));
const Catlog = lazy(() => import("./components/catlog.jsx"));

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const signInData = localStorage.getItem("user");
  const parsedSignInData = JSON.parse(signInData);

  // Function to determine if header should be shown based on route
  const showHeader = () => {
    return (
      location.pathname !== "/signin" &&
      location.pathname !== "/register" &&
      location.pathname !== "/cdashboard" &&
      location.pathname !== "/clientregister"
    );
  };

  // Function to determine if footer should be shown based on route
  const showFooter = () => {
    return location.pathname !== "/cdashboard";
  };

  useEffect(() => {
    // Simulate a network request
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Mystate>
      <Suspense fallback={<LoadingSpinner />}>
      {showHeader() && <Header />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          {parsedSignInData ? <Route path="/orders" element={<OrdersPage />} /> : ""}
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/feedback" element={<Feedback />} /> */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category" element={<Category />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/mens-category" element={<Mens />} />
          <Route path="/womens-category" element={<Womens />} />
          <Route path="/:id" element={<ProductInfo />} />
          <Route path="/connect" element={<Connect />} />
          <Route exact path="/contact" element={<ContactUs />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/partner" element={<Increase />} />
          <Route path="returns" element={<ReturnPolicy />} />
          <Route path="/help" element={<Help />} />
          <Route path="/near-me" element={<FindNearMe />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/clientregister" element={<Client_register />} />
          <Route path="/cart" element={<GoogleApiWrapper />} />
          <Route exact path="*" element={<Notfound />} />
          <Route exact path="/cdashboard" element={<Clientdashboard />} />
          <Route exact path="/increase" element={<BecomePartner />} />
          <Route exact path="/email" element={<Emailcheck />} />
          
        </Routes>
      </Suspense>
      <ToastContainer />
      {showFooter() && <Footer />}
    </Mystate>
  );
};

export default App;

