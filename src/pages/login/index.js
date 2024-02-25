import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import classNames from "classnames";
import { RiCloseCircleLine } from "react-icons/ri";
import Loader from "../../Components/loader";
import Logo from "../../images/logo.jpg";
import "../../css/registration.css";
import * as ACTIONS from "./action";
import * as AUTH_ACTIONS from "../../pages/userregister/action";
import * as CART_ACTIONS from "../../pages/cart/action";
import { GetHeaders, appUrl, groupId, companyId } from "../../utils";

let LoginPage = (props) => {
 
  let { currentModal, productId, skuId } = props;
  const state = useSelector((state) => state.LoginReducer);
  const registrationState = useSelector((state) => state.RegisterReducer);
  let [loginPayload] = useState({});
  let [forgetPasswordSection, setForgetPasswordSection] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [loginErrorMessage, setShowLoginerrorMessage] = useState("");
  

  let [password, setPassword] = useState(false);
  let [confirmPassword, setConfirmPassword] = useState(false);
  let [confirmMessage, setConfirmMessage] = useState("");
  let [successMessage, setSuccessMessage] = useState("");
  let [registerPayload] = useState({
    externalReferenceCode: "giks-mha",
  });
  let [resetPassword] = useState("");

  let dispatch = useDispatch();
  let [showLoginModal, setShowLoginModal] = useState(true);
  let [showSignUpModal, setShowSignUpModal] = useState(false);
  let [forgetPassMsg, setForgetPassMsg] = useState("")  

  const {
    register,
    handleSubmit,    
    reset : resetLoginForm,
    formState: { errors },
   
  } = useForm({
    
  });
  const {
    register: register2,    
    handleSubmit: handleSubmit2,    
    formState: { errors: errors2 },
    reset : resetForgetPassword,
  } = useForm({
    
  });

  const {
    register : handleRegistration,
    handleSubmit : handleSubmitRegistration,
    reset : resetRegisterationForm,
    formState : {errors: regErrors},
  } = useForm({
    mode : "all"
  })

  useEffect(() => {
    setIsLoading(false);
    if (
      state.userLoginSuccess &&
      state.userLoginSuccess.login_data[0].statusCode == 200
    ) {
      if (state.userLoginSuccess.login_data[0].openOrderId > 0) {
        let cartId = state.userLoginSuccess.login_data[0].openOrderId;
        dispatch(CART_ACTIONS.getCartDetails(cartId));
        localStorage.removeItem("cartId");
        localStorage.setItem("cartItems", 0);
        localStorage.setItem(
          "cartId",
          state.userLoginSuccess.login_data[0].openOrderId
        );
      } else if(state.userLoginSuccess.login_data[0].openOrderId == 0 && localStorage.getItem("cartId")){
        
        let cartId = localStorage.getItem("cartId");
        dispatch(CART_ACTIONS.getCartDetails(cartId));
      }
      let body = document.getElementById("body");
      body.classList.remove("position-relative");
      body.classList.remove("random");
      localStorage.setItem(
        "userInfo",
        JSON.stringify(state.userLoginSuccess.login_data[0])
      );
      dispatch(ACTIONS.resetToInitialState());
    } else if (
      state.userLoginSuccess &&
      state.userLoginSuccess.login_data[0].statusCode == 404
    ) {
      if(state.userLoginSuccess.login_data[0].message == "User you are trying to login is inactive.Please contact customer care support"){
        setShowLoginerrorMessage(state.userLoginSuccess.login_data[0].message)
        emptyErrorMessage();
      }else{
        setShowLoginerrorMessage("Invalid email or password. Please check your credentials and try again.");
        emptyErrorMessage();
      }
      
    }
    // }
   // currentModal({modal:'LoginModal'})  //guest wishlist flow was not working so we commented current modal
  }, [state.userLoginSuccess]);

  let emptyErrorMessage = () => {
    setTimeout(() => {
      setShowLoginerrorMessage("");
      dispatch(ACTIONS.resetToInitialState());
    }, 3000);
  };

  useEffect(() => {
    if (state.userLoginFailure) {
      setIsLoading(false);      
    }
  }, [state.userLoginFailure]);

  let userLoginRequest = (e) => {
    let loginPayloadCopy = { ...loginPayload };
    let payload = Object.assign(e, loginPayloadCopy);
    if (payload.email && payload.password) {
      setIsLoading(true);
      if (localStorage.getItem("cartId")) {
        payload.orderId = localStorage.getItem("cartId");
      } else {
        payload.orderId = 0;
      }
      if (productId && skuId) {
        let groupId = groupId;
        dispatch(ACTIONS.appLogin(payload, productId, skuId, groupId));
      } else {
        dispatch(ACTIONS.appLogin(payload));
      }
    }
  };

  let handleResetPassword = async (e) => {
    let resetPasswordCopy = { ...resetPassword };
    let payload = Object.assign(e, resetPasswordCopy)
    let url = `${appUrl}o/mha-headless/commerce/sendpasswordlink/${companyId}?emailAddress=${payload.email}`
    try {
      let response = await axios.post(url, {}, GetHeaders() );
      if (response && response.status == 200 && response.data != "") {    
           
        setForgetPassMsg("Please check your email to reset password.")
        emptySuccessMessage()
      }else{
        setForgetPassMsg("Invalid Email")
        emptySuccessMessage()
      }
    } catch (error) {
      console.log(error)
    }
  };

  let backToLoginHandler = () => {
    resetLoginForm()
    resetForgetPassword()
    setShowLoginModal(true);
    setForgetPasswordSection(false);
    // currentModal({ modal: "LoginModal" });
  };

  let signUpHandler = () => {
    resetLoginForm()
    resetForgetPassword()
    setShowLoginModal(false);
    setShowSignUpModal(true);
    // currentModal({ modal: "signupModal" });  //commented on 13 sept becoz it was giving error when closing signup modal from wishlist
  };

  let onCancilHandler = () => {
    props.onClose();
  };

  // ================user Registration Page===========

  useEffect(() => {
    if (registrationState.userRegisterSuccess) {
      setIsLoading(false);
      if (registrationState.userRegisterSuccess.signup_data[0].statusCode == 404) {
        setConfirmMessage(registrationState.userRegisterSuccess.signup_data[0].message);
        emptyMessage()        
      } else if (registrationState.userRegisterSuccess.signup_data[0].statusCode == 200) {
         resetRegisterationForm()
        setSuccessMessage("Your account has been created successfully, Please use your Email & Password to login")
        emptySuccessMessage()
        dispatch(AUTH_ACTIONS.resetToInitialState());
        
      } 
    }
  }, [registrationState.userRegisterSuccess]);

  let emptySuccessMessage = () => {
    setTimeout(() => {
      setForgetPassMsg("")
        setSuccessMessage("");   
        setForgetPasswordSection(false)
        setShowLoginModal(true);
        setShowSignUpModal(false);
        currentModal({ modal: "LoginModal" });

      
    }, 3000)
  }

  let emptyMessage = () => {
    setTimeout(() => {
      setConfirmMessage("")      
    }, 3000)
  }

  useEffect(() => {
    if (registrationState.userRegisterFailure) {
      setIsLoading(false);
      setConfirmMessage("Somthing went wrong")      
    }
  }, [registrationState.userRegisterFailure]);

  let showPassword = (checkPasswordType) => {
    if (checkPasswordType === "password") {
      setPassword(true);
    } else {
      setConfirmPassword(true);
    }
  };

  let hidePassword = (checkPasswordType) => {
    if (checkPasswordType === "password") {
      setPassword(false);
    } else {
      setConfirmPassword(false);
    }
  };

  const onSubmit = (e) => {
    let registerPayloadCopy = { ...registerPayload };
    let payload = Object.assign(e, registerPayloadCopy);
    setIsLoading(true);
    if (payload.password === payload.confirmPassword) {
      if (payload.firstName !== payload.lastName) {
        dispatch(AUTH_ACTIONS.appRegistration(payload));
      } else {
        setConfirmMessage("First Name and Last Name must not be same");
        emptyMessage()
        setIsLoading(false);
      }
    } else {
      setConfirmMessage("Password and Confirm Password do not match");
      emptyMessage()
      setIsLoading(false);
    }
  };

  let backToLogin = () => {
    resetRegisterationForm()
    setForgetPasswordSection(false)
    setShowLoginModal(true);
    setShowSignUpModal(false);
    currentModal({ modal: "LoginModal" });
  };

  return (
    <>
      <Loader loading={isLoading} />
      <section className="auth-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="authantication-sidebar">
                <div className="authentication-logo">
                  <img src={Logo} alt="" className="img-fluid" />
                </div>
                {showLoginModal && (
                  <>
                    {!forgetPasswordSection && (
                      <>
                        <div className="authantication-heading">
                          <h4>Login</h4>
                        </div>

                        <form
                          className="input-wrap increasing-width"
                          onSubmit={handleSubmit(userLoginRequest)}
                        >
                          <div className="user-login-change-1">
                            <label htmlFor="email" className="asterisk">
                              E-mail
                            </label>
                            <input
                              type="email"
                              name="email"
                              onFocus={(e) => (e.target.placeholder = "")}
                              className={classNames("form-control autofocus", {
                                "is-invalid": errors && errors.email,
                              })}
                              {...register("email", {
                                required: "Email field is required",
                              })}
                            />
                            {errors && errors.email && (
                              <div className="invalid-feedback">
                                {errors.email.message}
                              </div>
                            )}
                          </div>

                          <div className="user-login-change-1">
                            <label htmlFor="password" className="asterisk">
                              Password
                            </label>
                            <input
                              type="password"
                              name="password"
                              onFocus={(e) => (e.target.placeholder = "")}
                              className={classNames("form-control autofocus", {
                                "is-invalid": errors && errors.password,
                              })}
                              {...register("password", {
                                required: "Password field is required",
                              })}
                            />
                            {errors && errors.password && (
                              <div className="invalid-feedback">
                                {errors.password.message}
                              </div>
                            )}

                            <div
                              className="forget-password-wrapper"
                            >
                              <span 
                              onClick={() => setForgetPasswordSection(true)}
                              style={{ cursor: "pointer" }}>
                                Forgot password?
                              </span>
                            </div>
                          </div>

                          <div className="auth-submit-btn">
                            <button className="login-btn" type="submit">
                              {isLoading ? "submitting" : "Submit"}
                            </button>
                          </div>
                          {loginErrorMessage && (
                            <p className="text-error-msg">
                              {loginErrorMessage}
                            </p>
                          )}
                          <div className="auth-header">
                            <span className="not-a-member">Not a member? </span>
                            <p className="mb-0"
                              style={{ cursor: "pointer" }}
                              onClick={() => signUpHandler()}
                            >
                              Sign up now
                            </p>
                          </div>
                        </form>
                      </>
                    )}

                    {forgetPasswordSection && (
                      <>
                        <div className="authantication-heading">
                          <h4 className="pt-2">Forgot Password</h4>
                        </div>
                        <div className="row">
                          <div className="col-md-12 screen-size">
                            <form
                              className="input-wrap increasing-width"
                              onSubmit={handleSubmit2(handleResetPassword)}
                            >
                              <div className="user-login-change-1">
                                <label htmlFor="email" className="pt-3">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  onFocus={(e) => (e.target.placeholder = "")}
                                  className={classNames(
                                    "form-control autofocus",
                                    {
                                      "is-invalid": errors2 && errors2.email,
                                    }
                                  )}
                                  {...register2("email", {
                                    required: "Email field is required",
                                  })}
                                />
                                {errors2 && errors2.email && (
                                  <div className="invalid-feedback">
                                    {errors2.email.message}
                                  </div>
                                )}
                              </div>

                              <div className="auth-submit-btn">
                                <button className="login-btn" type="submit">
                                  {/* {isLoading ? "submitting" : "Submit"} */}
                                  Submit
                                </button>
                              </div>

                              {forgetPassMsg && forgetPassMsg == "Invalid Email" ? (
                                   <p className="text-danger text-center mt-2"> {forgetPassMsg} </p>
                              ) : (
                        <p className="text-success mt-2"> {forgetPassMsg} </p>
                      )}

                              <div className="auth-header">
                                <span
                                  className="mb-0"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => backToLoginHandler()}
                                >
                                  Back to Login
                                </span>
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => signUpHandler()}
                                >
                                  Sign up now
                                </span>
                              </div>
                            </form>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                {showSignUpModal && (
                  <>
                    <div className="authantication-heading mt-1">
                      <h4 className="mb-2">Sign up</h4>
                    </div>
                    <form
                      className="increasing-width row"
                      onSubmit={handleSubmitRegistration(onSubmit)}
                    >
                      <div className="form-group col-lg-12 col-md-12">
                        <label
                          htmlFor="firstName"
                          className="form-label asterisk"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className={classNames("form-control", {
                            "is-invalid": regErrors && regErrors.firstName,
                          })}
                          name="firstName"
                          onFocus={(e) => (e.target.placeholder = "")}
                          //onBlur={(e) => (e.target.placeholder = "Enter your first name")}

                          {...handleRegistration("firstName", {
                            required: "This field is required",
                            pattern: /^[a-zA-Z ]+$/
                          })}
                        />
                       {regErrors && regErrors.firstName && (
                          <div className="invalid-feedback">
                            {regErrors.firstName.message}
                          </div>
                        )}
                        {regErrors && regErrors.firstName && regErrors.firstName.type === "pattern" && (
                          <div className="invalid-feedback">
                          <p>Invalid first name</p>
                        </div>
                        )}
                      </div>

                      <div className="form-group col-lg-12 col-md-12">
                        <label
                          htmlFor="lastName"
                          className="form-label asterisk"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          className={classNames("form-control", {
                            "is-invalid": regErrors && regErrors.lastName,
                          })}
                          name="lastName"
                          onFocus={(e) => (e.target.placeholder = "")}
                          {...handleRegistration("lastName", {
                            required: "This field is required",
                            pattern: /^[a-zA-Z ]+$/
                          })}
                        />
                        {regErrors && regErrors.lastName && (
                          <div className="invalid-feedback">
                            {regErrors.lastName.message}
                          </div>
                        )}
                         {regErrors && regErrors.lastName && regErrors.lastName.type === "pattern" && (
                          <div className="invalid-feedback">
                          <p>Invalid last Name</p>
                        </div>
                        )}
                      </div>

                      <div className="form-group col-lg-12 col-md-12">
                        <label htmlFor="email" className="form-label asterisk">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          onFocus={(e) => (e.target.placeholder = "")}
                          className={classNames("form-control", {
                            "is-invalid": regErrors && regErrors.email,
                          })}
                          {...handleRegistration("email", {
                            required: "This field is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                              message: "Please enter valid email address",
                            },
                          })}
                        />
                        {regErrors && regErrors.email && (
                          <div className="invalid-feedback">
                            {regErrors.email.message}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-lg-12 col-md-12">
                        <label htmlFor="password" className="form-label asterisk">
                          Password
                        </label>
                        <div className="eye-wrap">
                          <input
                            type={password ? "text" : "password"}
                            name="password"
                            onFocus={(e) => (e.target.placeholder = "")}
                            className={classNames("form-control", {
                              "is-invalid": regErrors && regErrors.password,
                            })}
                            {...handleRegistration("password", {
                              required: "This field is required",
                              pattern: {
                                value:
                                  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                message:
                                  "Passwords must have 8 characters, contains both uppercase and lowercase,  at least one number and a special character."
                              },
                            })}
                          />
                          {regErrors && regErrors.password && (
                            <div className="invalid-feedback">
                              {regErrors.password.message}
                            </div>
                          )}
                          <span className="eye-wrapper">
                            {" "}
                            {password ? (
                              <IoMdEye
                                onClick={() => hidePassword("password")}
                              />
                            ) : (
                              <IoMdEyeOff
                                onClick={() => showPassword("password")}
                              />
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="form-group col-lg-12 col-md-12">
                        <label
                          htmlFor="confirmPassword"
                          className="form-label asterisk"
                        >
                          Confirm Password
                        </label>
                        <div className="eye-wrap">
                          <input
                            type={confirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            className={classNames("form-control", {
                              "is-invalid": regErrors && regErrors.confirmPassword,
                            })}
                            onFocus={(e) => (e.target.placeholder = "")}
                            {...handleRegistration("confirmPassword", {
                              required: "This field is required",
                            })}
                          />
                          {regErrors && regErrors.confirmPassword && (
                            <div className="invalid-feedback">
                              {regErrors.confirmPassword.message}
                            </div>
                          )}

                          <span className="eye-wrapper">
                            {" "}
                            {confirmPassword ? (
                              <IoMdEye
                                onClick={() => hidePassword("confirmPassword")}
                              />
                            ) : (
                              <IoMdEyeOff
                                onClick={() => showPassword("confirmPassword")}
                              />
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="auth-submit-btn mt-3">
                        <button className="login-btn" type="submit">
                          {isLoading ? "submitting" : "Submit"}{" "}
                          <FaLongArrowAltRight />
                        </button>
                      </div>
                      {confirmMessage && (
                        <p className="text-danger mt-2"> {confirmMessage} </p>
                      )}
                      {successMessage && (
                        <p className="text-success mt-2"> {successMessage} </p>
                      )}
                      <div className="auth-header1">
                        <span>Already have an Account?</span>
                        <p className="mb-0"
                          onClick={() => backToLogin()}
                          style={{ cursor: "pointer" }}
                        >
                          Login
                        </p>
                      </div>
                    </form>
                  </>
                )}

                <button
                  className="react-responsive-modal-closeButton modal-close-btn"
                  onClick={() => onCancilHandler()}
                >
                  <div className="modal-closed">
                    <RiCloseCircleLine />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
