import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../../../css/profile.css";
import axios from "axios";
import { GetHeaders, appUrl, companyId } from "../../../utils";

const Profile = () => {  
  const [userInfo, setUserInfo] = useState(null);
  let [updateMsg, setUpdateMsg] = useState(undefined)

  useEffect(() => {
    if (JSON.parse(JSON.stringify(localStorage.getItem("userInfo")))) {
    getUserProfileData();
  }
  }, [])

  const getUserProfileData = async() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"))
      
    // let url = `${appUrl}o/mha-headless/update/users/${data.emailAddress}?companyId=${companyId}&firstName=${data.firstName}&lastName=${data.lastName}&mobileNumber=${data.phoneNumber}`
    let url = `https://admin.modernhouseofantiques.com/o/mha-headless/get/user/${userInfo.emailAddress}/20096`
    try {
      let response =  await axios.post(url, {}, GetHeaders());
      if (response) {
        
        let userData = response.data.user_data[0]
        setUserInfo(userData)
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (userInfo) {
      let userInfoData = JSON.parse(localStorage.getItem("userInfo"))
      setValue("firstName", userInfo.firstName);
    setValue("lastName", userInfo.lastName);
    setValue("emailAddress", userInfo.emailAddress ? userInfo.emailAddress : userInfoData.emailAddress );
    setValue("phoneNumber", userInfo.mobileNumber);
    }
  }, [userInfo]);

  const {
    register,
    handleSubmit,
    setValue,
   
    formState: { errors },
  } = useForm({   defaultValues: {
    firstName: userInfo ? userInfo.firstName : "",
    lastName: userInfo ? userInfo.lastName : "",
    emailAddress: userInfo ? userInfo.emailAddress : "",
    phoneNumber: userInfo ? userInfo.mobileNumber : ""
  } ,
  mode : "all",});

  const profileDataOnSubmit = async(data) => {
    let url = `${appUrl}o/mha-headless/update/users/${data.emailAddress}?companyId=${companyId}&firstName=${data.firstName}&lastName=${data.lastName}&mobileNumber=${data.phoneNumber}`
    try {
    // let payload = JSON.stringify(data)
      let response = await axios.post(url, {}, GetHeaders());
      if (response) {
        getUserProfileData();
        let userData = response.data.user_data[0]
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        JSON.stringify(userInfo)
        // setUserInfo(userInfo)
        userInfo.firstName = userData.firstName;
        userInfo.lastName = userData.lastName;      
        localStorage.setItem("userInfo",JSON.stringify(userInfo));  
        setUpdateMsg("Profile updated successfully")        
       setTimeout(()=>{
        setUpdateMsg(undefined)
       } ,3000)
      }
    } catch (error) {
      console.log(error);
    }
  };


  

  return (
    <>
      <section className="profile-wrapper">
        <div className="profile-sidebar">
          <div className=" profile-section">
            <div className="container p-0">
              <div className="row">
                <div className="">
                  <h4>Welcome {userInfo && userInfo.firstName}</h4>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <form onSubmit={handleSubmit(profileDataOnSubmit)}>
                      <div className="row">
                        <div className="col-md-4 col-lg-4 col-6">
                          <div className="py-2">
                            <label htmlFor="firstName" className="asterisk">
                              First Name
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              {...register("firstName",
                               { required: true ,  pattern: /^[a-zA-Z ]+$/
                                }
                               )}
                              className={`form-control ${
                                errors.firstName ? "is-invalid" : ""
                              }`}
                            />
                            {errors.firstName && (
                              <span className="error-message">
                              {errors.firstName.type === "required"
                                ? "This field is required"
                                : "Please enter a valid first name"}
                            </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-6">
                          <div className="py-2">
                            <label htmlFor="lastName" className="asterisk">
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              {...register("lastName", { required: true ,  pattern: /^[a-zA-Z ]+$/})}
                              className={`form-control ${
                                errors.lastName ? "is-invalid" : ""
                              }`}
                            />
                            {errors.lastName && (
                              <span className="error-message">
                              {errors.lastName.type === "required"
                                ? "This field is required"
                                : "Please enter a valid last name"}
                            </span>
                            )}
                          </div>
                        </div>

                        <div className="col-md-4 col-lg-4 col-6">
                          <div className="py-2">
                            <label htmlFor="emailAddress" className="asterisk">
                              Email
                            </label>
                            <input
                              type="email"
                              id="emailAddress"
                              disabled
                              {...register("emailAddress",)}
                              className={`form-control ${
                                errors.emailAddress ? "is-invalid" : ""
                              }`}
                            />
                           
                          </div>
                        </div>

                        <div className="col-md-4 col-lg-4 col-6">
                          <div className="py-2">
                            <label htmlFor="phoneNumber">Mobile Number</label>
                            <input
                              type="number"
                              id="phoneNumber"
                              {...register("phoneNumber", {minLength : 10})}
                              className={`form-control ${
                                errors.phoneNumber ? "is-invalid" : ""
                              }`}
                              onInput={(e) => {
                                if (e.target.value.length > e.target.maxLength) {
                                  e.target.value = e.target.value.slice(0, e.target.maxLength);
                                }
                              }}
                              maxLength={12}
                            />                           
                          </div>
                          {errors.phoneNumber && (
                              <span className="error-message">
                              {errors.phoneNumber 
                                ? "Please enter a valid number"
                                : ""}
                            </span>
                            )}
                        </div>
                      </div>
                      <div className="profile-submit-btn">
                        <button className="form-control full-address-btn">update</button>
                      </div>
                    </form>
                    { updateMsg && <p className="text-success">{updateMsg}</p>}
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

export default Profile;
