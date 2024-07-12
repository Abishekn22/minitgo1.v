import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Feedback() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const signInData = localStorage.getItem("user");
  const parsedSignInData = JSON.parse(signInData);
  console.log("parsedSignInData", parsedSignInData);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const rating = document.querySelector('input[name="flexRadioDefault"]:checked').nextSibling.textContent.trim();
    const feedback = document.getElementById("feedbackText").value;

    const feedbackData = {
      from: `${parsedSignInData.email}`,
      to: 'minitgo@mintigo.com',
      // to: 'raghabm7@gmail.com',
      subject: `Feedback from user `,
      text: `${rating}\n\n${feedback}  `
    };
    console.log(feedbackData);
    try {
      const response = await axios.post('http://localhost:3001/send-email', feedbackData);
      console.log(response.status);
      if (response.status === 200) {
        toast.success("Message successfully sent", {
          autoClose: 1000,
          hideProgressBar: true,
          onClose: () => {
            navigate('/'); // Navigate to home page and refresh
          }
        });
        // alert("Feedback submitted successfully!");
        
      }
    } catch (error) {
      alert('Error submitting feedback: ' + error.message);
    }
  };

  return (
    <>
     
      <br></br>
      <br></br>
      <br className="d-md-block d-none"></br>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <div className="card bg-light bg-gradient text-dark shadow">
              <div className="card-body">
                <div className="text-center">
                  <i className="far fa-file-alt text-primary fs-2 mb-2"></i>
                  <p>
                    <strong className="fs-3">Your opinion matters</strong>
                  </p>
                  <p>
                    Have some ideas on how to improve our product?
                    <strong className="d-block">Give us your feedback.</strong>
                  </p>
                </div>
                <hr />
                <form className=" px-md-4" action="">
                  <p className="text-start">
                    <strong>Your rating:</strong>
                  </p>
                  <div className=" d-flex justify-content-between ">
                    <div className="form-check">
                      <input
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        className="form-check-input"
                        defaultChecked
                      />
                      <label
                        htmlFor="flexRadioDefault1"
                        className="form-check-label"
                      >
                        Very good
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        className="form-check-input"
                      />
                      <label
                        htmlFor="flexRadioDefault2"
                        className="form-check-label"
                      >
                        Good
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                        className="form-check-input"
                      />
                      <label
                        htmlFor="flexRadioDefault3"
                        className="form-check-label"
                      >
                        Mediocre
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault4"
                        className="form-check-input"
                      />
                      <label
                        htmlFor="flexRadioDefault4"
                        className="form-check-label"
                      >
                        Bad
                      </label>
                    </div>
                    {/* <div className="form-check">
                  <input type="radio" name="flexRadioDefault" id="flexRadioDefault5" className="form-check-input" />
                  <label htmlFor="flexRadioDefault5" className="form-check-label">Very bad</label>
                </div> */}
                  </div>

                  {/* Add text input for feedback */}
                  <div className="mb-3 pt-3">
                    <label htmlFor="feedbackText" className="form-label ">
                      <strong>Your feedback:</strong>
                    </label>
                    <textarea
                      className="form-control mt-2"
                      id="feedbackText"
                      rows="4"
                    ></textarea>
                  </div>

                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      class="btn btn-primary  btn-lg rounded-pill "
                      type="button"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
}
export default Feedback;
