import React, { useEffect, useState } from "react";
import LeftSection from "../components/ProductInfo/LeftSection";
import RightSection from "../components/ProductInfo/RightSection";
import { useParams } from "react-router-dom";
import BestSeller from "../components/ProductInfo/BestSeller";
import Recommendations from "../components/ProductInfo/Recommendations";
import Banner from "../components/banner";

function ProductInfo() {
  const { id } = useParams();

  const scrollToReviews = () => {
    const reviewsSection = document.getElementById("reviews-section");
    if (reviewsSection) {
      reviewsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  //code for review
  const [reviews, setReviews] = useState([
    { id: 1, name: "Ajay", text: "Products are really good" },
    { id: 2, name: "Rohit", text: "Good" },
    { id: 3, name: "Vikrant", text: "Quality awesome with affordable price." },
    { id: 4, name: "User123", text: "Sustainable" },
  ]);

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [reviewText, setReviewText] = useState({});

  const handleReviewEdit = (id) => {
    setEditingReviewId(id);
    setReviewText({
      ...reviewText,
      [id]: reviews.find((review) => review.id === id).text,
    });
  };

  const handleReviewChange = (e, id) => {
    setReviewText({ ...reviewText, [id]: e.target.value });
  };

  const handleReviewSave = (id) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id ? { ...review, text: reviewText[id] || "" } : review
    );
    console.log("Updated review:", reviewText[id]);
    setReviews(updatedReviews); // Update the reviews state with the edited text
    setEditingReviewId(null);
  };

  return (
    <main className="min-vh-100 py-4  px-md-5 mt-2">
      <div className="container-fluid  px-md-5  d-flex flex-column gap-4">
        <div className="row  gap-2 px-md-5 ">
          <div className="col ">
            <LeftSection productId={id} scrollToReviews={scrollToReviews} />
          </div>
          <div className="col my-2 my-md-0">
            <RightSection productId={id} />
          </div>
        </div>
        <br></br>
        <br></br>

        <div className="container w-100 px-md-4">
          <div className="row py-2 px-md-4">
            <div className="py-4 d-flex flex-column gap-2 ">
              <h2 className=" fs-5 text-center text-md-start">Best Sellers</h2>
              <BestSeller />
            </div>
            <div className="py-4 d-flex flex-column gap-2 ">
              <h2 className=" fs-5 text-center text-md-start ">
                Recommendations
              </h2>
              <Recommendations />
            </div>
          </div>

          {/* <div className=" d-flex  flex-column flex-md-row  gap-3  mb-2">
            
            <div id="reviews-section " className="w-100  reviews-w-md">
              <div className="h-120px w-100 d-flex flex-column gap-1 pt-2 ">
                <h3 className="m-2">Reviews</h3>
                <div style={{}}>
                  <ul
                    className="border rounded p-2 h-100"
                    style={{
                      scrollbarWidth: "thin",
                      fontSize: "16px",
                      listStyle: "none",
                    }}
                  >
                    {reviews.map((review) => (
                      <li className="border-top py-1" key={review.id}>
                        {editingReviewId === review.id ? (
                          <div>
                            <input
                              type="text"
                              value={reviewText[review.id] || ""}
                              onChange={(e) => handleReviewChange(e, review.id)}
                              className="w-50 p-1"
                            />
                            <button
                              className="btn btn-primary my-2 px-5 mx-3"
                              onClick={() => handleReviewSave(review.id)}
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="">
                              <span className="fw-semibold">{review.name}</span>:  <span style={{fontSize:'15px'}}>{review.text}</span>
                            </div>
                            <button
                              className="btn btn-primary my-2 px-5"
                              onClick={() => handleReviewEdit(review.id)}
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="  h-100 d-flex flex-column w-100  mt-md-5 pt-3 comments-w-md ">
              <div className=" position-relative  comments-height" >
                <textarea
                  className=" h-100 w-100 rounded p-2"
                  rows="5"
                  placeholder="Enter comments"
                  style={{ resize: "none", outline: "none" }}
                ></textarea>
              </div>
              <div className="w-100 d-flex justify-content-end mt-1  ">
                <button
                  className="py-1 px-5  bg-body-secondary  rounded "
                  style={{ border: "solid 1px", borderColor: "#a29898" }}
                >
                  Send
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <Banner/>
    </main>
  );
}

export default ProductInfo;
