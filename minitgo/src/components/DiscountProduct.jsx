import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MdLocalOffer } from "react-icons/md";
import img from './images/product.png'
import { useNavigate } from 'react-router-dom';
const DiscountProduct = () => {
  const products = [
    {
      name: 'Product 1',
      price: 100,
      discount: 10,
      image: 'https://example.com/product1.jpg'
    },
     
  ];
  const navigate = useNavigate(); // Initialize the navigate function from react-router-dom

  const handleMenFashionClick = () => {
    navigate('/mens-category');
  };

  // Handler function for navigating to Women's Fashion category
  const handleWomenFashionClick = () => {
    navigate('/womens-category');
  };

  // Handler function for navigating to Fashion Accessories category
  const handleAccessoriesClick = () => {
    navigate('/accessories');
  };

  // Handler function for navigating to Kitchen & Home Appliances category
  const handleAppliancesClick = () => {
    // navigate('/kitchen-home-appliances');
  };



  return (
    <>
    <hr />
      <br />
      <div className="container">
        <h3>Today Deal's<MdLocalOffer className='fs-2 p-1'/></h3>
        <p className=''>Best deal from our sellers</p>
        <div className="row">
          <div className="col-md-3">
            <div className="best-cat">
              <h4>Upto 50% Off Men's Fashion</h4>
              <button className="btn btn-outline-light bg-warning rounded-pill border-0 mx-3" onClick={handleMenFashionClick}>Shop Now</button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="best-cat-2">
              <h4>Upto 60% Off On Women's Fashion</h4>
              <button className="btn btn-outline-light bg-warning rounded-pill border-0 mx-3" onClick={handleWomenFashionClick}>Shop Now</button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="best-cat-3">
              <h4>Upto 50% Off Fashion Accessories</h4>
              <button className="btn btn-outline-light bg-warning rounded-pill border-0 mx-3" onClick={handleAccessoriesClick}>Shop Now</button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="best-cat-4">
              <h4>Upto 50% Off On Kitchen & Home Appliances</h4>
              <button className="btn btn-outline-light bg-warning rounded-pill border-0 mx-3" onClick={handleAppliancesClick}>Shop Now</button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <hr />

    </>
  );
};

export default DiscountProduct;
