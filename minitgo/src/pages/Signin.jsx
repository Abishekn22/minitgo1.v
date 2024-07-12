import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Minitgo from "../components/images/minitgo.png";
import axios from "axios";
import { toast } from "react-toastify";
import myContext from "../components/context/MyContext";
import { Link } from "react-router-dom";
import SignUp from "../pages/SignUp.jsx";

const Login = ({ closeLoginModal }) => {
  // Shubham- Login functionality starts here
 
  const [rememberMe, setRememberMe] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [userid, setUserID] = useState("");
  const [password, setPassword] = useState("");


  const context=useContext(myContext)

  const {forgetPasswordModal, setForgetPasswordModal,setShowModal}=context;

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };


  function handleForgetPasswordModal(){
    setForgetPasswordModal(true);
    closeLoginModal();
  }




  // code start by younus ansari

  function handleSubmit(e) {
    e.preventDefault();
   
    console.log(userid);
    console.log(password);
   
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{7,15}$/;
 
    if (userid === "" || password === "") {
      toast.error("All fields are required", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    } else if (!emailPattern.test(userid) && !phonePattern.test(userid)) {
      toast.error("Please enter a valid email or phone number", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    } else if (password.length < 8 || password.length > 12) {
      toast.error("Password must be between 8 and 12 characters long", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    } else {
      console.log("USER ID:", userid);
      console.log("PASS:", password);
 
      const data = {
        userid: userid,
        password: password,
      };
 
      axios
        .get("https://minitgo.com/api/fetch_login.php")
        .then((response) => {
          if (response.data && response.data.length > 0) {
            const allUsers = response.data;
           
            // Check if the userid is an email or a phone number
            const foundUser = allUsers.find(
              (user) => user.email === data.userid || user.phone_number === data.userid
            );
 
            if (foundUser) {
              // User with the provided email or phone number is found
              if (foundUser.password === data.password) {
                console.log("Login successful");
                closeLoginModal();
                toast.success("Login successful", {
                  autoClose: 1000,
                  hideProgressBar: true,
                });
                window.location.reload();
 
                const userData = {
                  userId: foundUser.id,
                  fullName: foundUser.full_name,
                  phoneNumber: foundUser.phone_number,
                  email: foundUser.email,
                  address: foundUser.Address,
                  officeAddress: foundUser.office_address,
                  lat: foundUser.lat,
                  log: foundUser.log,
                };
 
                localStorage.setItem("user", JSON.stringify(userData));
 
                console.log("FOUND USER:", userData);
 
                setUserID("");
                setPassword("");
              } else {
                toast.error("Invalid Password", {
                  autoClose: 1000,
                  hideProgressBar: true,
                });
                console.log("Invalid password");
              }
            } else {
              toast.error("Invalid Email or Phone Number", {
                autoClose: 1000,
                hideProgressBar: true,
              });
              console.log("Invalid email or phone number");
            }
          } else {
            toast.error("Server Error", {
              autoClose: 1000,
              hideProgressBar: true,
            });
          }
          // window.location.reload();
        })
        .catch((error) => {
          console.error("Failed to fetch user information:", error);
        });
    }
  }


  // code end by ansari
  // Shubham- Login Functionality ends here

  //  Login Functionality ends here 

  return (
    <>
      <br></br>

      {/* SignIn starts here */}

      <div className=" w-100  ">
        <div className="card-b  px-4 border   py-5   m-0 ">
          <div className="text-center">
            <h4 style={{ fontWeight: "bold", fontSize: "30px" }}>Sign in</h4>
          </div>
          <div className="card-body  mt-4   ">
            <form>
              <div className="form-group mb-3">
                <label htmlFor="email" className="ps-1 mb-1">
                  Email or Phone
                </label>
                <input
                  type="email"
                  className="form-control rounded-5 w-100"
                  id="email"
                  onChange={(e) => setUserID(e.target.value)}
                  placeholder="Enter email or phone"
                />
              </div>
              <div className="form-group ">
                <label htmlFor="password" className="ps-1 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control rounded-5 w-100"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="form-check c-box mb-2 mt-3 ">
                <input
                  type="checkbox"
                  className="form-check-input "
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label className="form-check-label  " htmlFor="rememberMe">
                  Keep me logged in
                </label>
              </div>
              <div className=" d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-l px-5 rounded-5"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>

              <div className="fs-6 d-flex justify-content-center d-flex align-items-center gap-2 signInFold">
                <div onClick={handleForgetPasswordModal} style={{ color:'#297efc',cursor:'pointer'}} className=" d-flex align-items-center ">
                  Forgot Password?
                </div>
                <div>
                  {/* signup modal */}
                <Link  className=" d-flex align-items-center "  onClick={() => setShowModal(true)}>
                  Create an Account!
                </Link>
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </div>
      

      

      {/* SignIn Ends here */}



     

      <br></br>
      <br></br>
      <br></br>
    </>
  );
};


export default Login;
