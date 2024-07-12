import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MdLocalOffer } from "react-icons/md";
import img from './images/product.png'
const DiscountProduct = () => {
  const products = [
    {
      name: 'Product 1',
      price: 100,
      discount: 10,
      image: 'https://example.com/product1.jpg'
    },
     
  ];

  return (
    <>
    <hr>
    </hr>
    <br></br>
   <div className="container">
    <h3>Today Deal's<MdLocalOffer className='fs-2 p-1'/></h3>
    <p className=''>Best deal from our sellers</p>
  <div className="row">
    <div className=" col-md-3 ">
      <div className="best-cat">
        <h4>Upto 50% Off Men's Fashion</h4>
        {/* <button className="btn btn-outline-light bg-warning rounded-pill border-0">Shop Now</button> */}
        {/*code started by isha */}
        <button className="btn btn-outline-light bg-warning rounded-pill border-0 mx-3" >Shop Now</button>
        {/*code end by isha */}
      </div>
    </div>
    <div className=" col-md-3">
      <div className="best-cat-2">
        <h4>Upto 60% Off On Women's Fashion</h4>
        {/* <button className="btn btn-outline-light bg-warning rounded-pill border-0">Shop Now</button> */}
         {/*code started by isha */}
         <button className="btn btn-outline-light bg-warning rounded-pill border-0 mx-3" >Shop Now</button>
        {/*code end by isha */}
      </div>
    </div>
    <div className="  col-md-3">
      <div className="best-cat-3">
        <h4>Upto 50% Off Fashion Accessories</h4>
        {/* <button className="btn btn-outline-light bg-warning rounded-pill border-0">Shop Now</button> */}
         {/*code started by isha */}
         <button className="btn btn-outline-light bg-warning rounded-pill border-0 mx-3" >Shop Now</button>
        {/*code end by isha */}
      </div>
    </div>
    <div className="col-md-3">
      <div className="best-cat-4">
        <h4> Upto 50% Off On Kitchen & Home Appliances</h4>
        {/* <button className="btn btn-outline-light bg-warning rounded-pill border-0">Shop Now</button> */}
         {/*code started by isha */}
         <button className="btn btn-outline-light bg-warning rounded-pill border-0 mx-3" >Shop Now</button>
        {/*code end by isha */}
      </div>
    </div>
  </div>
</div>
<br></br>
<br></br>
<hr></hr>

    </>
  );
};

export default DiscountProduct;
