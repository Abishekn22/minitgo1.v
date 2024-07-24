import { useEffect } from "react";
import "../components/Increase.css";
import { Link } from 'react-router-dom';
const Increase = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className="container d-flex flex-column gap-3 w-100 p-3"
      style={{ marginBlock: "5vh" }}
    >
      <div className="row">
      <div className=" partner w-100 d-flex justify-between  p-3 border border-2 rounded rounded-lg m-0">
        <div className="d-flex flex-column justify-content-center ">
          <h1 className="fw-bold fs-3">
            Increace sales in local and become a local king
          </h1>
          <p className=" fs-5">Growing your business made simple</p>
        </div>
        <div className="d-flex flex-column justify-content-center  w-full">

        <Link to="/clientregister" className="btn rounded-3 btn-primary px-1 py-2 " style={{width:'150px',height:"40px"}}>
        Start Selling
      </Link>
        </div>
      </div>
      </div>
     

      {/* <div className="w-100 d-flex justify-content-between rounded rounded-xl border border-3 mb-3 overflow-x-hidden">
        <div className="d-flex flex-column gap-3 p-3">
          <div
            onClick={() => {
              document.getElementById("section-1")?.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }}
            className="p-3 rounded rounded-2 border border-2 fw-semibold fs-5 increase-items "
          >
            Get the Elite Badge
          </div>
          <div
            onClick={() => {
              document.getElementById("section-2")?.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }}
            className="p-3 rounded rounded-2 border border-2 fw-semibold fs-5 increase-items "
          >
            Advertise Your Products
          </div>
          <div
            onClick={() => {
              document.getElementById("section-3")?.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }}
            className="p-3 rounded rounded-2 border border-2 fw-semibold fs-5 increase-items "
          >
            Boost sales of your products
          </div>
          <div
            onClick={() => {
              document.getElementById("section-4")?.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }}
            className="p-3 rounded rounded-2 border border-2 fw-semibold fs-5 increase-items "
          >
            Reduce Returns through customer feedback
          </div>
          <div
            onClick={() => {
              document.getElementById("section-5")?.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }}
            className="p-3 rounded rounded-2 border border-2 fw-semibold fs-5 increase-items "
          >
            Manage your Business on the go with minitgo Seller App
          </div>
          <div
            onClick={() => {
              document.getElementById("section-6")?.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }}
            className="p-3 rounded rounded-2 border border-2 fw-semibold fs-5 increase-items "
          >
            Get help anytime
          </div>
        </div>
        <img src="/man-working.jpg"  width={500} height={500}></img>
      </div> */}

      {/* new design */}
      <div className="row border border-2 rounded rounded-lg">
        <div className=" p-3 col-md-6 order-2 order-md-1">
          <div
            onClick={() => {
              document.getElementById("section-1")?.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }}
            className="p-3 rounded rounded-2 border border-2 fw-semibold fs-5 increase-items m-2"
          >
            <span className="p-3"> Get the Elite Badge</span>
          </div>
          <div
            onClick={() => {
              document.getElementById("section-2")?.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }}
            className="p-3 rounded rounded-2 border border-2 fw-semibold fs-5 increase-items  m-2"
          >
            <span className="p-3"> Advertise Your Products</span>
          </div>
          <div
            onClick={() => {
              document.getElementById("section-3")?.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }}
            className="p-3 rounded rounded-2 border border-2 fw-semibold fs-5 increase-items  m-2"
          >
            <span className="p-3">Boost sales of your products</span>
          </div>
          <div
            onClick={() => {
              document.getElementById("section-4")?.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }}
            className="p-3 rounded rounded-2 border border-2 fw-semibold fs-5 increase-items  m-2"
          >
            <span className="p-3">
              Reduce Returns through customer feedback
            </span>
          </div>
          <div
            onClick={() => {
              document.getElementById("section-5")?.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }}
            className=" p-3 rounded rounded-2 border border-2 fw-semibold fs-5 increase-items  m-2"
          >
            <span className="p-3">
              Manage your Business on the go with minitgo Seller App
            </span>
          </div>
          <div
            onClick={() => {
              document.getElementById("section-6")?.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }}
            className="p-3 rounded rounded-2 border border-2 fw-semibold fs-5 increase-items  m-2"
          >
            <span className="p-3">Get help anytime</span>
          </div>
        </div>
        <div className="col-md-6 order-1 order-md-2">
          <img
            src="/man-working.jpg"
            className="img-fluid my-3"
            width={500}
            height={200}
          ></img>
        </div>
      </div>

      <div
        id="section-1"
        className="d-flex flex-column my-2 px-4 py-5 gap-3 shadow shadow-1 border border-2 rounded rounded-3"
      >
        <h2 className="fw-bold fs-4"> Get the Elite Badge</h2>

        <div className="d-flex flex-column gap-2">
          <h3 className="fs-5 fw-semibold">Fulfillment by MinitGo (FBM)</h3>
          <p>
            When you use FBM, we will come to your store to make a quelity check
            on your products and we will take care of the rest. Once an order is
            received, we will deliver your products to the buyer and also manage
            customer queries. With FBM you will receive benefits like:
          </p>
          <ui>
            <li>Sellers with Elite Badge have up to 3X higher sales</li>
            <li>Increased chances of getting the Buybox</li>
            <li>
              Hassle-free operations (Minitgo manages inventory and delivery),
              with free and fast shipping for our users
            </li>
            <li>
              Products with Elite Badge are visited more by customers and tend
              to have higher conversions
            </li>
            <li>Minitgo handles customer support and returns</li>
          </ui>
        </div>
      </div>
      <div
        id="section-2"
        className="d-flex flex-column my-2 px-4 py-5 gap-3 shadow shadow-1 border border-2 rounded rounded-3"
      >
        <h2 className="fw-bold fs-4"> Advertise Your Products</h2>

        <div className="d-flex flex-column gap-2">
          <h3 className="fs-5 fw-semibold">Sponsored Products (SP)</h3>
          <p>
            Create targeted ads through SP so that your products can be easily
            found by customers. You can start bidding from ₹1 and pay per click.
            With SP you will receive benefits like:
          </p>
          <ui>
            <li>
              Chance to get on page 1 of minitgo.com Search results thereby
              making your product gets high visibility
            </li>
            <li>Pay only when your ad is clicked</li>
            <li>Chances of boosting sales by targeting relevant customers</li>
            <li>Real-time reports to measure impact</li>
            <li>
              Get SP credits worth 2000 free when you launch your business
            </li>
          </ui>
        </div>
      </div>
      <div
        id="section-3"
        className="d-flex flex-column my-2 px-4 py-5 gap-3 shadow shadow-1 border border-2 rounded rounded-3"
      >
        <h2 className="fw-bold fs-4"> Boost sales of your products</h2>

        <div className="d-flex flex-column gap-2">
          <ui className="fs-6">
            <li>
              Automate Pricing Set rules and automatically adjust the prices of
              your products and increase the chances of winning the Offer
              Display.
            </li>
            <li>
              Coupons Make your customers excited by creating special offers on
              your products through Coupons to get more orders.
            </li>
            <li>
              Deals Boost sales with limited-period promotional offers on your
              products and appear on the Todays Deals page.
            </li>
          </ui>
        </div>
      </div>
      <div
        id="section-4"
        className="d-flex flex-column my-2 px-4 py-5 gap-3 shadow shadow-1 border border-2 rounded rounded-3"
      >
        <h2 className="fw-bold fs-4">
          {" "}
          Reduce Returns through customer feedback
        </h2>

        <div className="d-flex flex-column gap-2">
          <h3 className="fs-5 fw-semibold">Voice of Customer Dashboards</h3>
          <p className="fs-6">
            View customer feedback on your products, understand how customers
            are responding to your products, and optimize your inventory. With
            this dashboard, you can reduce returns and negative feedback and
            increase profitability.
          </p>
        </div>
      </div>
      <div
        id="section-5"
        className="d-flex flex-column my-2 px-4 py-5 gap-3 shadow shadow-1 border border-2 rounded rounded-3"
      >
        <h2 className="fw-bold fs-4">
          {" "}
          Manage your Business on the go with minitgo Seller App
        </h2>

        <div className="d-flex flex-column gap-2">
          <ui className="fs-6">
            <li>
              Go Mobile with the Minitgo Seller App Use the Minitgo Seller App
              to manage your business on the go.
            </li>
            <li>Easily research products and list your offer</li>
            <li>Create listings and edit product photos</li>
            <li>Track your sales and inventory</li>
            <li>Manage offers and returns</li>
            <li>{"Respond quickly to buyers' messages"}</li>
            <li>Get help and support at any time</li>
          </ui>
        </div>
      </div>
      <div
        id="section-6"
        className="d-flex flex-column my-2 px-4 py-5 gap-3 shadow shadow-1 border border-2 rounded rounded-3"
      >
        <h2 className="fw-bold fs-4"> Get help anytime</h2>

        <div className="d-flex flex-column gap-2">
          <h3 className="fs-5 fw-semibold">Contact Seller Support</h3>
          <p className="fs-6">
            Whether you have just registered, or you have been selling for
            years, Minitgo Seller Support helps you to resolve your issues. Our
            trained seller support team is available all day long to assist you
          </p>
        </div>
      </div>

      <div className="partner w-100 d-flex  mt-5 p-3 border border-2 rounded rounded-lg">
        <div className="d-flex flex-column justify-content-center">
          <h1 className="fw-bold fs-3">Start selling today</h1>
          <p className=" fs-5">
            Put your products in front of the millions of customers who search
            minitgo.com every day.
          </p>
        </div>
        <div className="d-flex flex-column justify-content-center">

        <button className="btn btn-primary" style={{width:'150px',height:"40px",left:"5px"}}>
          Start Selling
        </button>
        </div>
      </div>
    </div>
  );
};

export default Increase;
