import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../ResetPassword/PasswordReset.css";
import Logo2 from "../../images/logo.jpg";
import { useForm } from "react-hook-form";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import classNames from "classnames";
import { GetHeaders, appUrl, companyId } from "../../utils";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

  let paramas = useLocation();
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);
  let [confirmPassword, setConfirmPassword] = useState(false);
  let [password, setPassword] = useState(false);
  let [errorMsg , setErrorMsg] = useState("");
  let [successMsg,setSuccessMsg] = useState("");
  let [confirmMessage, setConfirmMessage] = useState("")
  const [token, setToken] = useState();
  useEffect(() => {
    if (paramas && paramas.search) {
      let searchItem = paramas.search
        .substr(1)
        .split("&")
        .reduce((obj, item) => {
          const [key, value] = item.split("=");
          obj[key] = value;
          return obj;
        }, {});
      setToken(searchItem.ticketKey);
    }
  }, []);

  const {
    register,
    handleSubmit: handleResetPassword,
    formState: { errors: regErrors },
  } = useForm({});

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

  let emptymsg =() =>{
    setTimeout(() => {
     setErrorMsg("");
     setSuccessMsg(""); 
     navigate("/")
    
  }, 3000)
  }

  const onSubmit = async (e) => {
    localStorage.getItem("");
    let resetPasswordPayloadCopy = {};
    let payload = Object.assign(e, resetPasswordPayloadCopy);
    setIsLoading(true);
    if (payload.password === payload.confirmPassword) {
      let url = `${appUrl}o/mha-headless/commerce/updatepassword/${companyId}?ticketKey=${token}&password1=${payload.password}&password2=${payload.password}`;
      try {
        let response = await axios.post(url, {}, GetHeaders());
        if (response) {
          if(response.status == 200 && response.data == "Password Updated Successfully." ) {
          setIsLoading(false)
          setSuccessMsg("Password updated successfully.")
          emptymsg()
          }
         else if(response.status == 200 && response.data == "Password reset link expired."){
          setErrorMsg("Password reset link expired, please regenrate the pasword link.")          
          emptymsg()
        } else{
          setErrorMsg("Somthing went wrong, please try again");
          emptymsg()
        }
      }
      } catch (error) {
        console.log(error);
      }
    } else {
      setConfirmMessage("Password and Confirm Password do not match");
      //emptyMessage()
      setIsLoading(false);
    }
  };

 

  return (
    <>
      <section className="password-reset-single-page">
        
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="password-reset-colors">                
                <div className="d-flex justify-content-center align-items-center">
                  <div className="password-reset-section">
                    <form onSubmit={handleResetPassword(onSubmit)}>
                    <div className="password-reset-logo">
                  <div className="logo-image" onClick={() => navigate("/")}>
                    <img className="img-fluid" src={Logo2} alt="" />
                  </div>
                  <h1 className="">Reset Password</h1>
                </div>
                      <div className="form-group col-lg-12 col-md-12">
                        <label htmlFor="password" className="form-label asterisk">
                          Password
                        </label>
                        <div className="eye-wrap">
                          <input
                            type={password ? "text" : "password"}
                            name="password"
                            onFocus={(e) => {
                              (e.target.placeholder = "")
                              setConfirmMessage()
                            }
                            }
                            className={classNames("form-control", {
                              "is-invalid": regErrors && regErrors.password,
                            })}
                            {...register("password", {
                              required: "This field is required",
                              pattern: {
                                value:
                                  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                message:
                                  "Passwords must have 8 characters, contains both uppercase and lowercase,  at least one number and a special character.",
                              },
                            })}
                          />
                          
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
                          {regErrors && regErrors.password && (
                            <div className="invalid-feedback">
                              {regErrors.password.message}
                            </div>
                          )}
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
                              "is-invalid":
                                regErrors && regErrors.confirmPassword,
                            })}
                            onFocus={
                              (e) => {
                                (e.target.placeholder = "")
                                setConfirmMessage()
                              }
                              
                            }
                            {...register("confirmPassword", {
                              required: "This field is required",
                            })}
                          />
                          

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
                          {regErrors && regErrors.confirmPassword && (
                            <div className="invalid-feedback">
                              {regErrors.confirmPassword.message}
                            </div>
                          )}
                          {
                            confirmMessage && <p className="text-danger">
                            {confirmMessage}
                          </p>
                          }
                        </div>
                      </div>
                      <div className="reset-btn mt-3">
                        <button className="login-btn" type="submit">
                          {isLoading ? "Resetting" : "Reset"}
                        </button>
                      </div>
                      <div>
                        {successMsg ?  <p className="text-success">{successMsg}</p> : errorMsg ?
                        <p className="text-danger">{errorMsg}</p> : "" }
                    
                  </div>
                    </form>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </section>
    </>
  );
};

export default ResetPassword;
