import React, { useEffect } from "react";
import Logo from "../components/images/minitgo.png";

function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-2 mb-4" style={{ marginTop: "4vh"  }}>
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
                // original code
                // className="img-fluid w-25 img-thumbnail opacity-75 "
                // updated code by sonali
                className="img-fluid w-25  opacity-75 "
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 shadow py-4 border rounded">
          <form
            className="p-2"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="First Name"
              className="form-control mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="form-control mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              className="form-control mb-2"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="form-control mb-2"
            />
            <textarea
              type="text"
              placeholder="Message"
              className="form-control mb-2"
            />

            <div className="form-check mb-2">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label text-secondary">
                I agree to receive newsletters, product updates, and exclusive
                offers from Vimeo
              </label>
            </div>
            <button className="btn btn-primary">Contact</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
