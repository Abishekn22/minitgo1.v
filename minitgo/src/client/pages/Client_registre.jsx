import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ClientImg from "../../components/images/clientregisterimg.jpg";
import { IoMdSend } from "react-icons/io";
import { IoNewspaper } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Plainheader from "./components/Plain-header";
import Axios from "axios";
import axios from "axios";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { toast } from "react-toastify";
function Client_register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [townDistrict, setTownDistrict] = useState("");
  const [state, setState] = useState("");
  const [gst, setGst] = useState("");
  const [panid, setPanid] = useState("");
  const [bankaccount, setBankaccount] = useState("");
  const [seller, setSeller] = useState("");
  const [shop, setShop] = useState("");
  const [upi, setUpi] = useState("");
  const [profilepic, setProfilepic] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [agreement, setAgrement] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accountName, setAccountName] = useState("");
  //this state is for agreement status to update
  const [agreementstatus, setAgreementstatus] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [locationsnackbarOpen, setLocationSnackbarOpen] = useState(false);
  const [locationsnackbarmessage, setLocationSnackbarmessage] = useState(false);
  const [OTP, setOTP] = useState("");
  const [isValid, setIsValid] = useState(true);
  const handleChange = (e) => {
    const input = e.target.value;
    setPhone(input);

    // Parse and validate phone number
    const phoneNumber = parsePhoneNumberFromString(input, "IN"); // Replace 'IN' with your country code
    if (phoneNumber && phoneNumber.isValid()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  // dis agree buttion

  //snack bar function
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Function for pand card char ristrictions
  function isValidPan() {
    if (panid.length > 10) return alert("Enter valid pan card details");
  }
  const handleSendOTP = async () => {
    console.log("email", email);
    let otp = generateOTP();
    console.log(otp);
    const emailData = {
      from: "minitgo@minitgo.com", // Initialize with an empty string or default if needed
      to: `${email}`,
      // to: `raghabm7@gmail.com`,
      subject: `OTP: ${otp}`,
      text: `OTP: ${otp}`,
    };
    console.log("emil", emailData);
    try {
      const response = await axios.post(
        "http://localhost:3001/send-email",
        emailData
      );
      console.log(response.status);
      if (response.status === 200) {
        toast.success("Message successfully sent", {
          autoClose: 1000,
          hideProgressBar: true,
          onClose: () => {
            // navigate('/'); // Navigate to home page and refresh
          },
        });
      }
    } catch (error) {
      alert("Error sending email: " + error.message);
    }
  };
  function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setOTP(otp);
    //

    console.log("GENERATED OTP:", otp);

    return otp.toString();
  }
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          ``;

          // Google Maps URL
          const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

          //to fetch all details api link (https://ipapi.co/json) use this for future reference
          //consoling the url link
          console.log(googleMapsUrl);
          // Open the URL in a new tab or window
          //window.open(googleMapsUrl, '_blank');
          setCoordinates({ latitude, longitude });

          setLocationSnackbarmessage("location has been updated");
          setLocationSnackbarOpen(true);
        },
        (error) => {
          console.log("Geolocation error:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  console.log("coordinates", coordinates);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  //regesteration form submit function goes here.
  // Agreement function goes here.
  function handleagreement() {
    const msgi = "I";
    const names = { firstName, lastName };
    const msg = "have Agreed All the terms and conditions with Minitgo";
    let fullmsg = `${msgi} ${names.firstName} ${names.lastName} ${msg}`;
    setAgrement(fullmsg);
    console.log(fullmsg);
    setAgreementstatus(true);
    console.log(agreement);
    handleClose();
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [confirmOtp, setConfirmOtp] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    // Define regex patterns for email and phone validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10}$/;

    // Validate phone number
    if (!phonePattern.test(phone)) {
      toast.error("Please enter a valid phone number", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }

    // Validate email
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }

    // Fetch all users to check for existing email and phone number
    axios
      .get("https://minitgo.com/api/fetch_login.php")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const allUsers = response.data;

          const foundUser = allUsers.find((user) => user.email === email);
          const foundUserByPhone = allUsers.find(
            (user) => user.phone_number === phone
          );

          if (foundUser) {
            toast.error(
              "This email is already registered. Please use a different email address.",
              {
                autoClose: 1000,
                hideProgressBar: true,
              }
            );
            return;
          }
          if (foundUserByPhone) {
            toast.error(
              "This phone number is already in use. Please provide a different number.",
              {
                autoClose: 1000,
                hideProgressBar: true,
              }
            );
            return;
          }
        }

        // Validate OTP
        if (confirmOtp !== OTP.toString()) {
          toast.error("OTP does not match!");
          return;
        }

        // Proceed with form submission
        axios
          .post("https://minitgo.com/api/insert.php", {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            phone: phone,
            address: townDistrict,
            pincode: pincode,
            city: city,
            state: state,
            gst: gst,
            panid: panid,
            account: bankaccount,
            seller_name: seller,
            shop_name: shop,
            coordinates: coordinates,
            account_name: accountName,
            ifsc: ifsc,
            upi: upi,
            agreement: agreement,
          })
          .then((response) => {
            console.log(response);
            setSnackbarMessage("Registration successful!");
            setSnackbarOpen(true);

            // Clear the form fields
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setPhone("");
            setTownDistrict("");
            setPincode("");
            setCity("");
            setState("");
            setGst("");
            setPanid("");
            setBankaccount("");
            setSeller("");
            setShop("");
            setOTP("");

            // Set the formSubmitted state to true
            setFormSubmitted(true);
          })
          .catch((error) => {
            console.log(error);
          });

        console.log("Form submitted!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [gstStatus, setGstStatus] = useState('');

  const validateAndAutoFillGST = (gstNumber) => {
    const apiEndpoint = `http://sheet.gstincheck.co.in/check/437f81ba5b0aeed5f3db37fbd75ec786/${gstNumber}`;

    fetch(apiEndpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        if(data.flag === true){
          setGstStatus('✓');
          toast.success("GST number is valid and data has been auto-filled.", {
            autoClose: 3000,
            hideProgressBar: true,
          });
        }else{
          setGstStatus('!');
          toast.error("An error occurred while validating GST number.", {
            autoClose: 3000,
            hideProgressBar: true,
          });
        }
        
      })
      .catch((error) => {
        console.error('Error:', error);
        
      });
  };

  const handleGstChange = (event) => {
    const newGstNumber = event.target.value;
    setGst(newGstNumber);
    validateAndAutoFillGST(newGstNumber);
  };

  return (
    <>
      {/* Location snack bar */}
      <Snackbar
        open={locationsnackbarOpen}
        autoHideDuration={1400}
        onClose={() => {
          setLocationSnackbarOpen(false);
          // Redirect to the login page only if the form has been submitted successfully
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setLocationSnackbarOpen(false)}
          severity="success"
        >
          {locationsnackbarmessage}
        </MuiAlert>
      </Snackbar>

      {/* snack bars */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1400}
        onClose={() => {
          setSnackbarOpen(false);
          // Redirect to the login page only if the form has been submitted successfully
          if (formSubmitted) {
            window.location.href = "https://minitgo.com/pages/sign-in.html";
          }
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      <div
        className="container d-flex justify-content-center align-items-center vh-100 bg-secondary rounded"
        style={{
          marginTop: 310,
          marginBottom: 280,
          backgroundImage:
            "url('https://image.lexica.art/full_webp/61254098-8c8a-4e1f-8c53-6f1e1bce35ec')",
          backgroundSize: "cover",
        }}
      >
        <div className="registration-form bg-white p-4 rounded  border">
          <img
            className="logo-r sm-3 rounded"
            src={ClientImg}
            style={{ width: "100%", height: 150 }}
            alt="client Ad image"
          />

          <Row className="mb-3">
            <Col>
              <h5 className="  fs-1 text-info text-center my-2">
                Become our partner!..{" "}
              </h5>
              <p
                style={{ fontSize: 12.5 }}
                className="text-center text-secondary"
              >
                "Join minitgo", be a part of today's trend's.
              </p>
            </Col>
            {/*   <Col>
                <Form.Group controlId="profile">
                <Form.Label>Profile Pic</Form.Label>
                <Form.Control
                    type="file"
                    placeholder="Enter your shop name"
                    value={profilepic}
                    onChange={(e) => setProfilepic(e.target.value)}
                    required
                  /></Form.Group>

                </Col> */}
          </Row>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  variant="contained"
                  onClick={handleSendOTP}
                  className="ml-2  mt-2 "
                  style={{ backgroundColor: "#1976d" }}
                >
                  Send OTP
                </Button>
              </Col>

              <Col>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone </Form.Label>
              <Row className="align-items-center justify-content-between  ">
                <Col>
                  <Form.Control
                    type="tel"
                    // id="phone"
                    placeholder="+91"
                    value={phone}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    required
                  />
                  {!isValid && (
                    <small style={{ color: "red" }}>
                      Invalid phone number format.
                    </small>
                  )}
                </Col>

                <Col>
                  <Button
                    variant="contained"
                    onClick={handleUseCurrentLocation}
                    disabled={coordinates}
                  >
                    Get Location
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="seller">
                  <Form.Label>Seller name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Seller name"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="shop">
                  <Form.Label>Shop Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your shop name"
                    value={shop}
                    onChange={(e) => setShop(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="city">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Appart: /House: /Flat: "
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="pincode">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="townDistrict">
                  <Form.Label>Town/District</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your town/district"
                    value={townDistrict}
                    onChange={(e) => setTownDistrict(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="gst">
                  <Form.Label>GSITN</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Optional"
                    value={gst}
                    onChange={handleGstChange}
                  />
                  <span
                    id="gstStatus"
                    style={{ color: gstStatus === "✓" ? "green" : "yellow" }}
                  >
                    {gstStatus}
                  </span>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Panid">
                  <Form.Label>Pan Card</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="EX: DPBPA79XXX"
                    value={panid}
                    onChange={(e) => setPanid(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="upi">
                  <Form.Label>UPI</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="70353xxxx@bank name"
                    value={upi}
                    onChange={(e) => setUpi(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Bank">
                  <Form.Label>Account</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Account: 564562358xxxx.."
                    value={bankaccount}
                    onChange={(e) => setBankaccount(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="account name">
                  <Form.Label>Account Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Account name"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="ifsc">
                  <Form.Label>IFSC</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="IFSC code"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formOtp">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    value={confirmOtp}
                    onChange={(e) => setConfirmOtp(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="py-3">
                  <Button
                    onClick={handleOpen}
                    disabled={agreementstatus}
                    variant="contained"
                    endIcon={<IoNewspaper />}
                  >
                    Terms & Conditions / Agreement
                  </Button>

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box className="border rounded shadow" sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h1"
                      >
                        Terms & Conditions
                      </Typography>
                      <hr></hr>
                      <section
                        style={{ maxHeight: "400px", overflowY: "auto" }}
                      >
                        <h2>1. Introduction</h2>
                        <p>
                          Welcome to MinitGo, an e-commerce platform connecting
                          customers with local shopkeepers for convenient
                          shopping and delivery services. By registering with
                          MinitGo and using our platform, you agree to abide by
                          these terms and conditions.
                        </p>

                        <h2>2. Registration and Account</h2>
                        <p>
                          2.1. Shopkeepers must register with MinitGo to create
                          an account and list their products on the platform.
                        </p>
                        <p>
                          2.2. Shopkeepers are responsible for providing
                          accurate and up-to-date information during the
                          registration process.
                        </p>
                        <p>
                          2.3. MinitGo reserves the right to verify the identity
                          and credentials of shopkeepers and may suspend or
                          terminate accounts with incomplete or false
                          information.
                        </p>

                        <h2>3. Product Listings</h2>
                        <p>
                          3.1. Shopkeepers must accurately describe their
                          products, including images, pricing, and availability.
                        </p>
                        <p>
                          3.2. Prohibited items include counterfeit goods,
                          illegal substances, and products infringing on
                          intellectual property rights.
                        </p>
                        <p>
                          3.3. MinitGo reserves the right to remove or suspend
                          listings that violate these terms.
                        </p>

                        <h2>4. Order Processing and Fulfillment</h2>
                        <p>
                          4.1. Shopkeepers are responsible for processing orders
                          promptly and fulfilling them within the agreed-upon
                          timeframe.
                        </p>
                        <p>
                          4.2. MinitGo facilitates payment processing but is not
                          responsible for order fulfillment or product quality.
                        </p>
                        <p>
                          4.3. Shopkeepers must address customer inquiries and
                          complaints in a timely and professional manner.
                        </p>

                        <h2>5. Delivery and Logistics</h2>
                        <p>
                          5.1. MinitGo coordinates delivery logistics using
                          third-party services or in-house delivery teams.
                        </p>
                        <p>
                          5.2. Delivery times and costs vary depending on the
                          location and size of the order.
                        </p>
                        <p>
                          5.3. MinitGo is not liable for delays, damages, or
                          losses during the delivery process.
                        </p>

                        <h2>6. Fees and Payments</h2>
                        <p>
                          6.1. MinitGo may charge shopkeepers transaction fees
                          or subscription fees for using the platform.
                        </p>
                        <p>
                          6.2. Shopkeepers agree to pay all applicable fees and
                          taxes associated with their transactions.
                        </p>
                        <p>
                          6.3. Payment disbursement schedules and methods are
                          determined by MinitGo.
                        </p>

                        <h2>7. Intellectual Property Rights</h2>
                        <p>
                          7.1. Shopkeepers retain ownership of their
                          intellectual property rights, including trademarks and
                          copyrights.
                        </p>
                        <p>
                          7.2. Shopkeepers must respect the intellectual
                          property rights of others and refrain from infringing
                          on third-party rights.
                        </p>
                        <p>
                          7.3. MinitGo reserves the right to remove infringing
                          content from the platform.
                        </p>

                        <h2>8. Privacy and Data Protection</h2>
                        <p>
                          8.1. MinitGo collects and uses personal information in
                          accordance with its Privacy Policy.
                        </p>
                        <p>
                          8.2. Shopkeepers agree to comply with data protection
                          laws and regulations when handling customer data.
                        </p>
                        <p>
                          8.3. MinitGo employs security measures to protect the
                          confidentiality and integrity of user information.
                        </p>

                        <h2>9. Liability and Dispute Resolution</h2>
                        <p>
                          9.1. MinitGo's liability is limited to the extent
                          permitted by law and excludes consequential damages.
                        </p>
                        <p>
                          9.2. Disputes between shopkeepers and customers are
                          subject to mediation or arbitration as outlined in our
                          Dispute Resolution Policy.
                        </p>
                        <p>
                          9.3. MinitGo reserves the right to take appropriate
                          legal action against shopkeepers engaging in
                          fraudulent or unlawful activities.
                        </p>

                        <h2>10. Termination and Suspension</h2>
                        <p>
                          10.1. MinitGo may suspend or terminate shopkeeper
                          accounts for violations of these terms and conditions.
                        </p>
                        <p>
                          10.2. Shopkeepers have the right to appeal account
                          suspensions or terminations within a specified
                          timeframe.
                        </p>
                        <p>
                          10.3. Upon termination, shopkeepers must cease using
                          the platform and remove their listings.
                        </p>

                        <h2>11. Miscellaneous Provisions</h2>
                        <p>
                          11.1. These terms and conditions constitute the entire
                          agreement between MinitGo and shopkeepers and
                          supersede any prior agreements.
                        </p>
                        <p>
                          11.2. Any modifications to these terms must be agreed
                          upon in writing by both parties.
                        </p>
                        <p>
                          11.3. These terms shall be governed by and construed
                          in accordance with the laws of [Jurisdiction], without
                          regard to conflicts of law principles.
                        </p>
                      </section>

                      <br></br>
                      <hr></hr>
                      <Button variant="contained" onClick={handleagreement}>
                        I Agree
                      </Button>
                      <p className="text-muted py-2" style={{ fontSize: 12.5 }}>
                        I agree all the terms & conditions mentioned above
                      </p>
                    </Box>
                  </Modal>
                </div>
              </Col>
            </Row>
            <Row className="md-3 py-3">
              <Col>
                <Button
                  show={agreementstatus}
                  variant="contained"
                  disabled={!agreementstatus}
                  disabled={!coordinates}
                  endIcon={<IoMdSend />}
                  type="submit"
                >
                  Register
                </Button>
                <a href="/signin" className="forgot-password-link  mx-3">
                  Back to login
                </a>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <br></br>
      <br></br>
    </>
  );
}
export default Client_register;
