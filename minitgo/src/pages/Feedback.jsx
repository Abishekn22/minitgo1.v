import axios from "axios";
import { useEffect, useState } from "react";
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

  const [feedbackData, setFeedbackData] = useState({
    from: parsedSignInData.email,
    // to: 'minitgo@mintigo.com',
    to: 'raghabm7@gmail.com',
    subject: 'Feedback from user',
    text: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({
      ...feedbackData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rating = document.querySelector('input[name="flexRadioDefault"]:checked').nextSibling.textContent.trim();
    const feedback = document.getElementById("feedbackText").value;
    const feedbackDataWithRating = {
      ...feedbackData,
      text: `${rating}\n\n${feedback}`
    };
    console.log(feedbackDataWithRating);

    try {
      const response = await axios.post('http://localhost:3001/send-email', feedbackDataWithRating);
      console.log(response.status);
      if (response.status === 200) {
        toast.success("Message successfully sent", {
          autoClose: 1000,
          hideProgressBar: true,
          onClose: () => {
            navigate('/');
          }
        });
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
      <div className="container py-2 mb-4" style={{ marginTop: "4vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-6 shadow py-4 border rounded">
          <div className="text-center">
            <i className="far fa-file-alt text-primary fs-2 mb-2"></i>
            <p><strong className="fs-3">Your opinion matters</strong></p>
            <p>Have some ideas on how to improve our product? <strong className="d-block">Give us your feedback.</strong></p>
          </div>
          <hr />
          <form className="px-md-4" onSubmit={handleSubmit}>
            <p className="text-start"><strong>Your rating:</strong></p>
            <div className="d-flex justify-content-between mb-3">
              {['Very good', 'Good', 'Mediocre', 'Bad'].map((label, index) => (
                <div className="form-check" key={index}>
                  <input
                    type="radio"
                    name="flexRadioDefault"
                    id={`flexRadioDefault${index + 1}`}
                    className="form-check-input"
                    defaultChecked={index === 0}
                  />
                  <label
                    htmlFor={`flexRadioDefault${index + 1}`}
                    className="form-check-label"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>
            <div className="mb-3">
              <label htmlFor="feedbackText" className="form-label">
                <strong>Your feedback:</strong>
              </label>
              <textarea
                className="form-control"
                id="feedbackText"
                name="text"
                rows="4"
                value={feedbackData.text}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button className="btn btn-primary btn-lg rounded-pill" type="submit">
              Submit
            </button>
          </form>
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
