import React, { useEffect, useState } from "react";
import Logo from "../components/images/minitgo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [emailData, setEmailData] = useState({
    from: 'minitgo@minitgo.com',
    to: 'abishekn222@gmail.com',
    subject: '',
    text: ''
  });
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setPhone(value);
    } else if (name === "email") {
      setEmail(value);
      
    } else {
      setEmailData({
        ...emailData,
        [name]: value,
       
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailDataWithPhone = {
      ...emailData,
      text: `Email: ${email}\n\nPhone: ${phone}\n\n${emailData.text}`
    };

    try {
      const response = await axios.post('http://localhost:3001/send-email', emailDataWithPhone);
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
      alert('Error sending email: ' + error.message);
    }
  };

  return (
    <div className="container py-2 mb-4" style={{ marginTop: "4vh" }}>
      <div className="row">
        <div className="col-md-6 text-dark">
          <h3 className="text-center text-md-start display-5 ">
            <strong>Connect with our team</strong>
          </h3>
          <div className="py-4">
            <p>
              Our Team is happy to answer your questions about our platform.
            </p>
            <ul className="list-unstyled text-secondary">
              <li>
                <i className="bi bi-check text-primary"></i> Discover how our
                ecommerce platform can enhance your business
              </li>
              <li>
                <i className="bi bi-check text-primary"></i> Get pricing
                information tailored to your needs
              </li>
              <li>
                <i className="bi bi-check text-primary"></i> Learn about other
                successful businesses using our ecommerce solutions
              </li>
            </ul>
          </div>
          <div className="border-top py-4">
            <h2 className="text-center text-md-start text-secondary">
              Leading Brands trust us for our services
            </h2>
            <div className="d-flex justify-content-center justify-content-md-start mt-4">
              <img
                src={Logo}
                alt="zendesk"
                className="img-fluid w-25 opacity-75"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 shadow py-4 border rounded">
          <form className="p-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              className="form-control mb-2"
              name="subject"
              value={emailData.subject}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="form-control mb-2"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="form-control mb-2"
              name="phone"
              value={phone}
              onChange={handleChange}
            />
            <textarea
              type="text"
              placeholder="Message"
              className="form-control mb-2"
              name="text"
              value={emailData.text}
              onChange={handleChange}
              required
            />
            <div className="form-check mb-2">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label text-secondary">
                I agree to receive newsletters, product updates, and exclusive
                offers from Vimeo
              </label>
            </div>
            <button className="btn btn-primary" type="submit">Contact</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
