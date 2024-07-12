import { useContext, useEffect, useState } from "react";
import HomeProducts from "../pages/Products";
import myContext from "./context/MyContext.js";

function Filter({ brand, mobileView }) {
  const context = useContext(myContext);
  const {
    selectedCategory,
    handleCategoryChange,
    handlePriceChange,
    selectedPrice,
    selectedDistance,
    handleDistanceChange,
    accessoriesCategory,
    handleAccessoriesCategoryChange,
    setSelectedCategory,
    offer,
    handleOfferChange,
  } = context;

  useEffect(() => {
    if (selectedCategory === `Men's Fashion`) {
      setSelectedCategory(`Men's Fashion`);
      
    } else if (selectedCategory === `Women's Fashion`) {
      setSelectedCategory(`Women's Fashion`);
    }
  }, [selectedCategory]);

  return (
    <>
      {/* for mobile view  */}
      {mobileView && (
        <div className="col-md-2">
          <div className="container-sm container-md">
            <div className="">
              <form>
                <div className="form-group mt-1">
                  <label htmlFor="priceFilter">Set Distance</label>

                  <select
                    className="form-control rounded-pill mt-1"
                    id="distanceFilter "
                    onChange={handleDistanceChange}
                    value={selectedDistance}
                  >
                    <option value="all">All</option>
                    <option value="5">5 km</option>
                    <option value="10">10 km</option>
                    <option value="15">15 km</option>
                    <option value="20">20 km</option>
                  </select>
                </div>
                <div className="form-group mt-1">
                  <label htmlFor="priceFilter">{brand} Set Price</label>
                  <select
                    className="form-control rounded-pill mt-1"
                    id="priceFilter"
                    onChange={handlePriceChange}
                    value={selectedPrice}
                  >
                    <option value="">All</option>
                    <option value="0-100">0-100</option>
                    <option value="100-200">100-200</option>
                    <option value="200-300">200-300</option>
                    <option value="300-400">300-400</option>
                    <option value="400-500">400-500</option>
                    <option value="500 +">500 +</option>
                  </select>
                </div>
                <div className="form-group mt-1">
                  <label htmlFor="categoryFilter">Category</label>
                  <select
                    className="form-control rounded-pill mt-1"
                    id="categoryFilter"
                    onChange={handleCategoryChange}
                    value={selectedCategory}
                  >
                    <option value="AllCategory">All</option>
                    <option value="Women's Fashion">Womens</option>
                    <option value="Men's Fashion">Mens</option>
                    <option value="Kids Fashion">Kids</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Music">Music</option>
                  </select>
                </div>
                <div className="form-group mt-1">
                  <label htmlFor="accesFilter">Accessories</label>
                  <select
                    className="form-control rounded-pill mt-1"
                    id="accesFilter"
                    onChange={handleAccessoriesCategoryChange}
                    value={accessoriesCategory}
                  >
                    <option value="AllAccessories">All</option>
                    <option value="Mens">Mens</option>
                    <option value="Womens">Womens</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>
                <div className="form-group mt-2">Todays deals</div>
                <div className="form-group mt-1">
                  <label htmlFor="offerFilter">Offers</label>
                  <select
                    className="form-control rounded-pill mt-1"
                    id="offerFilter"
                    onChange={handleOfferChange}
                    value={offer}
                  >
                    <option value="">All</option>
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="20">20%</option>
                    <option value="25">25%</option>
                    <option value="30">30%</option>
                  </select>
                </div>
                <div className="form-group mt-1">Trending</div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="col-md-2 filter-s">
        <div className="container-sm container-md">
          <div className="shadow filter-bg">
            <form>
              <div className="form-group mt-1">
                <h6 htmlFor="distanceFilter">Filter</h6>
                <label htmlFor="priceFilter">Set Distance</label>

                <select
                  className="form-control rounded-pill mt-1"
                  id="distanceFilter "
                  onChange={handleDistanceChange}
                  value={selectedDistance}
                >
                  <option value="all">All</option>
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="15">15 km</option>
                  <option value="20">20 km</option>
                </select>
              </div>
              <div className="form-group mt-1">
                <label htmlFor="priceFilter">{brand} Set Price</label>
                <select
                  className="form-control rounded-pill mt-1"
                  id="priceFilter"
                  onChange={handlePriceChange}
                  value={selectedPrice}
                >
                  <option value="">All</option>
                  <option value="0-100">0-100</option>
                  <option value="100-200">100-200</option>
                  <option value="200-300">200-300</option>
                  <option value="300-400">300-400</option>
                  <option value="400-500">400-500</option>
                  <option value="500 +">500 +</option>
                </select>
              </div>
              <div className="form-group mt-1">
                <label htmlFor="categoryFilter">Category</label>
                <select
                  className="form-control rounded-pill mt-1"
                  id="categoryFilter"
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                >
                  <option value="AllCategory">All</option>
                  <option value="Women's Fashion">Womens</option>
                  <option value="Men's Fashion">Mens</option>
                  <option value="Kids Fashion">Kids</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Music">Music</option>
                </select>
              </div>
              <div className="form-group mt-1">
                <label htmlFor="accesFilter">Accessories</label>
                <select
                  className="form-control rounded-pill mt-1"
                  id="accesFilter"
                  onChange={handleAccessoriesCategoryChange}
                  value={accessoriesCategory}
                >
                  <option value="AllAccessories">All</option>
                  <option value="Mens">Mens</option>
                  <option value="Womens">Womens</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
              <div className="form-group mt-2">Todays deals</div>
              <div className="form-group mt-1">
                <label htmlFor="offerFilter">Offers</label>
                <select
                  className="form-control rounded-pill mt-1"
                  id="offerFilter"
                  onChange={handleOfferChange}
                  value={offer}
                >
                  <option value="">All</option>
                  <option value="10">10%</option>
                  <option value="15">15%</option>
                  <option value="20">20%</option>
                  <option value="25">25%</option>
                  <option value="30">30%</option>
                </select>
              </div>
              <div className="form-group mt-1">Trending</div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
