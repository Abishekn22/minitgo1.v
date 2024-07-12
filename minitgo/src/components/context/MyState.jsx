


import React, { useState, useEffect } from "react";
import myContext from "./MyContext.js";
import axios from "axios";

const Mystate = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setselectedPrice] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("all");
  const [accessoriesCategory, setAccessoriesCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [offer, setOffers] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showfilterModal, setShowFilterModal] = useState(false);

  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);
  const [addressStore,setAddressStore] = useState('')
  
  const [officeAddressStore,setOfficeAddressStore] = useState('')

  useEffect(() => {
    axios
      .get("https://minitgo.com/api/fetch_products.php")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAccessoriesCategoryChange = (event) => {
    setAccessoriesCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setselectedPrice(event.target.value);
    setShowFilterModal(false);
  };

  const handleDistanceChange = (event) => {
    setSelectedDistance(event.target.value);
    setShowFilterModal(false);
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOfferChange = (event) => {
    setOffers(event.target.value);
  };

  const handleImageClick = (index) => {
    console.log("imageclicked");
    setSelectedImageIndex(index); // Update the selected image index
  };

  function isNewProduct(dateString) {
    const productDate =
      dateString instanceof Date ? dateString : new Date(dateString);
    const currentDate = new Date();
    const fiveDaysAgo = new Date(currentDate);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    const timeDifference = Math.abs(
      productDate.getTime() - fiveDaysAgo.getTime()
    );

    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference <= 5;
  }

  return (
    <div>
      <myContext.Provider
        value={{
          selectedCategory,
          setSelectedCategory,
          handleCategoryChange,
          accessoriesCategory,
          setAccessoriesCategory,
          handleAccessoriesCategoryChange,
          products,
          handlePriceChange,
          setselectedPrice,
          selectedPrice,
          searchQuery,
          setSearchQuery,
          handleSearchInputChange,
          offer,
          setOffers,
          handleOfferChange,
          selectedImageIndex,
          setSelectedImageIndex,
          handleImageClick,
          showModal,
          setShowModal,
          showfilterModal,
          selectedDistance,
          handleDistanceChange,
          forgetPasswordModal,
          setForgetPasswordModal,
          isNewProduct,
          addressStore,setAddressStore,    //Shafeeq added this for deliver to dropdown
          officeAddressStore,setOfficeAddressStore,   //Shafeeq added this for deliver to dropdown
        }}
      >
        {props.children}
      </myContext.Provider>
    </div>
  );
};

export default Mystate;




