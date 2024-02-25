import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import Loader from "../../Components/loader";
import { errorCheckHandler, GetHeaders, appUrl, companyId } from "../../utils";
import LoginPage from "../login";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import * as ACTIONS from "./action";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/checkout.css";
import Footer from "../../Components/Footer/Footer";
import { BsPlusLg } from "react-icons/bs";
import * as CARTACTIONS from "../cart/action"



function CheckOut() {
  let location = useLocation();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const state = useSelector((state) => state.ProceedCheckoutReducer);
  let loginState = useSelector((state) => state.LoginReducer);
  let [showLoginModal, setShowLoginModal] = useState(false);  
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(undefined);
  const [totalPrice, setTotalPrice] = useState();
  const [report, setReport] = useState(false);
  const [accountId, setAccountId] = useState("-1");
  const [cartId, setCartId] = useState();
  const [countries, setCountries] = useState(null);
  const [region, setRegion] = useState();
  const [userData,  setUserData] = useState()
  const [isChecked, setIsChecked] = useState(undefined);
  let [userAddress, setUserAddress] = useState(undefined);
 
  let { addToast } = useToasts();
  let [chekoutPayload, setCheckoutPayload] = useState({
    name: "",
    addressId: "",
    phoneNumber: "",
    street1: "",
    emailAddress: "",
    city: "",
    street2: "",
    zip: "",
    regionISOCode: "",
    countryISOCode: "IN",
    defaultBilling: true,
    defaultShipping: true,
  });
  let [checkoutPayloadError, setCheckoutPayloadError] = useState();
  // let [showCheckout, setShowCheckout] = useState(false)
  let cartState = useSelector((state) => state.CartDetailsReducer);
  let [cartItems,setCartItems] = useState([])
  // let [error, setError] = useState(true);
  let [userToken, setUserToken] = useState(undefined);
  let [guestUserId, setGuestUserId] = useState(0);
  let [guestAccountId, setGuestAccountId] = useState('')




useEffect(()=> {
  setUserToken(localStorage.getItem("token"))
},[])


//user info is getting undefined ovefr here at time of guest checkout

  const checkoutService = async() => {
    let payload = {
      userId : userInfo && userInfo.userId ? userInfo.userId : guestUserId,
      accountId : userInfo && userInfo.accountId ? userInfo.accountId : guestAccountId, 
      order : JSON.stringify(cartItems),
      orderId : cartId,
      address : chekoutPayload,
      userToken : userToken

    }
   let url = "https://modernhouseofantiques.com/app//api/mhaOrder/create-checkout-session"
  //  let url = "http://154.26.132.124:5380/api/mhaOrder/create-checkout-session"
  //  let url = "http://localhost:5380/api/mhaOrder/create-checkout-session"

  
    try {
      let response = await axios.post(url,payload);
      if (response) {
        setLoading(false)
       window.location.href=response.data.url       
      }
    } catch (error) {
      console.log(error)
    }
}



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);  

  // ======================== Getting UserInfo from local storage ========================
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      let chekoutPayloadCopy = { ...chekoutPayload };
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUserInfo(userInfo);
      chekoutPayloadCopy.name =
        userInfo.firstName.trim() + " " + userInfo.lastName;
      chekoutPayloadCopy.emailAddress = userInfo.emailAddress;
      chekoutPayloadCopy.phoneNumber = userInfo.mobileNumber;
      setAccountId(userInfo.accountId);
      setCheckoutPayload(chekoutPayloadCopy);
    }
    if (JSON.parse(localStorage.getItem("cartId"))) {
      let cartId = JSON.parse(localStorage.getItem("cartId"));
      
      setCartId(cartId);
    }
  },[]);
  

   // =========================Get Cart Details API by cart Id ===================================
   useEffect(() => {
    if (JSON.parse(localStorage.getItem("cartId"))) {
      dispatch(
        CARTACTIONS.getCartDetails(JSON.parse(localStorage.getItem("cartId")))
      );
    }
  }, []);

  // ==========================Response of Get cart details ==========================

  useEffect(() => {
    if (cartState.cartDetailsSuccess && cartState.cartDetailsSuccess.items) {
      let response = cartState.cartDetailsSuccess.items;
      let cartItems = []      
      for(let item of response){
        if(item.name || item.quantity || item.price){
          let lineItem = {            
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.price.finalPrice * 100,
            image: `${appUrl}${item.thumbnail}`
          };    
          cartItems.push(lineItem)
      }      
    }
   setCartItems(cartItems)
  }
  }, [cartState.cartDetailsSuccess]);

   // ================== Success Response of Exixting Shipping Address ==================================
   useEffect(() => {
    if (state.getShippingDetailsSuccess) {      
      setRegionName(state.getShippingDetailsSuccess.items);
      // setUserAddress(state.getShippingDetailsSuccess.items)
    }
  }, [state.getShippingDetailsSuccess]);

  // =================Success Response of Save Shipping address ====================================
  useEffect(() => {
    if (state.saveShippingDetailSuccess) {
      if (state.saveShippingDetailSuccess.Address_Data.statusCode == 200 || state.saveShippingDetailSuccess.Address_Data.statusCode ==400) {        
        checkoutService()
        if(userInfo && !chekoutPayload.addressId > 0){
          chekoutPayload.id = chekoutPayload.addressId;
          delete chekoutPayload.addressId
          dispatch(ACTIONS.saveUserAddress(chekoutPayload, userInfo.accountId));
        }
      }
    }
  }, [state.saveShippingDetailSuccess]);

// =================Failure Response of Save Shipping address ====================================
  useEffect(() => {
    if (state.saveShippingDetailFailure) {
      setLoading(false);
      addToast("error!", {
        appearance: "error",
        content: errorCheckHandler(state.saveShippingDetailFailure),
      });
    }
  }, [state.saveShippingDetailFailure]);

  // ===================== Get User Existing Address=======================
  useEffect(() => {
    if(userInfo) {
      getExistingAddress()
    }    
  }, [userInfo])

  let getExistingAddress = () => {    
      dispatch(ACTIONS.getShippingDetails(userInfo.accountId));
  };
 

  // ================Country Api==================================================
  useEffect(() => {
    if (report === false) {
      getCountries();
    }
  }, []);

  let getCountries = async () => {
    let url = `${appUrl}api/jsonws/country/get-countries`;
    try {
      let countriesResponse = await axios.get(url, GetHeaders());
      if (countriesResponse) {
        setReport(true);
        getRegion("20567");
        setCountries(countriesResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =================Region Api====================================
  let getRegion = async (countryId) => {
    let url = `${appUrl}api/jsonws/region/get-regions/country-id/${countryId}`;
    try {
      let regionResponse = await axios.get(url, { countryId }, GetHeaders());
      setRegion(regionResponse.data);
      if (regionResponse) {
        setRegion(regionResponse.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  let setRegionName = (address) => {
    if (region) {
      address.map((item) => {
        for (let el of region) {
          if (el.regionCode == item.regionISOCode) {
            item["regionName"] = el.title;
            item["countryName"] = "India";
            break;
          }
        }
      });
    }
    setUserAddress(address);
  };
// ===================== Success of Login Response ========================================
  useEffect(() => {
    if (loginState.userLoginSuccess) {
      setShowLoginModal(false);
      if(location && location.pathname == "/checkout"){
        navigate("/cart")
      }
    }
  }, [loginState.userLoginSuccess]);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUserInfo(userInfo);
      getUserProfileData();
      // let payload = {
      //   name: userInfo.firstName +" "+ userInfo.lastName,
      //   phoneNumber: "",
      //   street1: "",
      //   emailAddress: userInfo.emailAddress,
      //   city: "",
      //   street2: "",
      //   zip: "",
      //   regionISOCode: "",
      //   countryISOCode: "IN",
      //   defaultBilling: true,
      //   defaultShipping: true,
      // };
      // setCheckoutPayload(payload);
    }
  }, [loginState.userLoginSuccess]);

  const getUserProfileData = async() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"))
      
    // let url = `${appUrl}o/mha-headless/update/users/${data.emailAddress}?companyId=${companyId}&firstName=${data.firstName}&lastName=${data.lastName}&mobileNumber=${data.phoneNumber}`
    let url = `https://admin.modernhouseofantiques.com/o/mha-headless/get/user/${userInfo.emailAddress}/20096`
    try {
      let response =  await axios.post(url, {}, GetHeaders());
      if (response) {        
        let userData = response.data.user_data[0]
        setUserData(userData)
        let payload = {
        name: userData.firstName +" "+ userData.lastName,
        phoneNumber: userData.mobileNumber,
        street1: "",
        emailAddress: userInfo.emailAddress,
        city: "",
        street2: "",
        zip: "",
        regionISOCode: "",
        countryISOCode: "IN",
        defaultBilling: true,
        defaultShipping: true,
      };
      setCheckoutPayload(payload);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (location && location.state) {
      setTotalPrice(location.state);
    }
  }, [location.state]);

  const onChangeHandler =  (e) => {
    let chekoutPayloadCopy = { ...chekoutPayload };
    let checkoutPayloadErrorCopy = { ...checkoutPayloadError };
    let regName = /^[a-zA-Z ]+$/;
    if (e.target.id === "country") {
      getRegion("20567");
      let res = countries && countries.find((item) => item.countryId === e.target.value);
      if(res){
        chekoutPayloadCopy.countryISOCode = res.a2;
      }
     
    } else if (e.target.id === "region") {
      chekoutPayloadCopy.region = e.target.value;
    } else {
      chekoutPayloadCopy[e.target.id] = e.target.value;
      if (e.target.id === "name") {
        if(regName.test(e.target.value)){
          checkoutPayloadErrorCopy.nameError = "";
        } else {
          checkoutPayloadErrorCopy.nameError = "Please enter a valid name";
        }
      } else {
        checkoutPayloadErrorCopy.nameError = "";
      }
      if (e.target.id === "emailAddress") {
        e.target.id.toLowerCase();
        checkoutPayloadErrorCopy.emailError = "";
      }

      if (e.target.id === "street1") {
        checkoutPayloadErrorCopy.street1Error = "";
      }
      if (e.target.id === "city") {
        checkoutPayloadErrorCopy.cityError = "";
      }
      if (e.target.id === "regionISOCode") {
        checkoutPayloadErrorCopy.stateError = "";
      }
      
      if (e.target.id === "zip") {
        checkoutPayloadErrorCopy.zipError = "";
      }
      if (e.target.id === "phoneNumber") {
        checkoutPayloadErrorCopy.phoneNumberError = "";
      }
      setCheckoutPayloadError(checkoutPayloadErrorCopy);
    }

    setCheckoutPayload(chekoutPayloadCopy);
  };

  let validateFormFields = () => {
    let isValid = true;
    let chekoutPayloadCopy = { ...chekoutPayload };

    let errors = {};
    let regName = /^[a-zA-Z ]+$/;
    if (chekoutPayloadCopy.name === "") {
      errors["nameError"] = "This field is required";
      isValid = false;
      setCheckoutPayloadError(errors);
    }
    if(chekoutPayload.name && !regName.test(chekoutPayload.name)){
      errors["nameError"] = "Please enter the valid name";
      isValid = false;
      setCheckoutPayloadError(errors);
    }

    if (chekoutPayload.emailAddress === "") {
      errors["emailError"] = "This field is required";
      isValid = false;
      setCheckoutPayloadError(errors);
    }
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      chekoutPayload.emailAddress &&
      chekoutPayload.emailAddress.length > 0 &&
      !regEmail.test(chekoutPayload.emailAddress)
    ) {
      errors["emailError"] = "Please enter the valid email";
      isValid = false;
      setCheckoutPayloadError(errors);
    }

    if (chekoutPayload.city === "") {
      errors["cityError"] = "This field is required";
      isValid = false;
      setCheckoutPayloadError(errors);
    }
    if(chekoutPayload.regionISOCode === ""){
      errors["stateError"] = "This field is required";
      isValid = false;
      setCheckoutPayloadError.stateError = "";
    }

    if (chekoutPayloadCopy.street1 === "") {
      errors["street1Error"] = "This field is required";
      isValid = false;
      setCheckoutPayloadError(errors);
    }

    if (chekoutPayloadCopy.zip === "") {
      errors["zipError"] = "This field is required";
      isValid = false;
      setCheckoutPayloadError(errors);
    }

    if (
      chekoutPayloadCopy.zip &&
      chekoutPayloadCopy.zip.length > 0 &&
      chekoutPayloadCopy.zip.length < 6
    ) {
      errors["zipError"] = "Pincode must be atleast 6 digits";
      isValid = false;
      setCheckoutPayloadError(errors);
    }

    if (
      chekoutPayloadCopy.phoneNumber &&
      chekoutPayloadCopy.phoneNumber.length > 0 &&
      chekoutPayloadCopy.phoneNumber.length < 10
    ) {
      errors["phoneError"] = "Phone number must be atleast 10 digits";
      isValid = false;
      setCheckoutPayloadError(errors);
    }

    setCheckoutPayloadError(errors);
    // setError(isValid)
    return isValid;
  };

 // =======================save shipping details api on click of checkout==========================
  const onSubmitCheckoutHandler = async(e) => {
    if(e){
      e.preventDefault();
    }      
    if (userInfo == undefined) {
      let guestAccountPayload = {};
      guestAccountPayload["companyId"] = companyId;
      guestAccountPayload.fullName = chekoutPayload.name;
      guestAccountPayload.email = chekoutPayload.emailAddress;
      if (validateFormFields()) {
        setLoading(true)
        dispatch(ACTIONS.guestCheckoutHandler(guestAccountPayload, cartId));
      }
    } else {
      if(userInfo && chekoutPayload && chekoutPayload.id > 0) {      
       if(cartId){
        let addressId = await chekoutPayload.id; 
         delete chekoutPayload.id
        chekoutPayload.addressId = addressId;
        setLoading(true)
        dispatch(ACTIONS.saveShippingDetails(chekoutPayload, userInfo.userId, cartId, addressId));
        }
      }
      else if (validateFormFields()) {
        setLoading(true)
        let addressId = 0;
        delete chekoutPayload.emailAddress;
        dispatch(ACTIONS.saveShippingDetails(chekoutPayload, userInfo.userId, cartId, addressId));
    
      }
    }
  };

  // ===========================Success Response of Guest CHeckout ============================
  useEffect(() => {
    if (state && state.guestCheckoutSuccess && state.guestCheckoutSuccess.guest_account_data) {
      // setShowCheckout(true)
      setGuestUserId(state.guestCheckoutSuccess.guest_account_data.userId);
      setGuestAccountId(state.guestCheckoutSuccess.guest_account_data.accountId)
      let GuestuserId = state.guestCheckoutSuccess.guest_account_data.userId;
      setAccountId(state.guestCheckoutSuccess.guest_account_data.accountId);
       delete chekoutPayload.emailAddress;
      let addressId = 0;
      dispatch(
        ACTIONS.saveShippingDetails(chekoutPayload, GuestuserId, cartId, addressId)
      );
    }
  }, [state.guestCheckoutSuccess]);

  let closeModal = () => {
    setShowLoginModal(false);
    setLoading(false);
    let body = document.getElementById("body");
    body.classList.remove("position-relative");
    body.classList.remove("random");
  };

  let getDefaultAddress = (item, index, addId) => {      
    setCheckoutPayloadError() 
    delete item.description;
    delete item.externalReferenceCode;
    delete item.id;
    delete item.latitude;
    delete item.longitude;
    delete item.type;
    item.id = addId;   
    let defaultAdd = { ...item };
    delete defaultAdd.countryName;
    delete defaultAdd.regionName;
    setCheckoutPayload(defaultAdd); 
    
   
  };



  //=========== exitingAddress ======================
  const addNewAddAddressHandler = () => {
    let checkoutPayloadCopy = {    
    name : userInfo.firstName.trim() + " " + userInfo.lastName,
    phoneNumber: userData.mobileNumber,
    street1: "",
    emailAddress: userInfo.emailAddress,
    city: "",
    street2: "",
    zip: "",
    regionISOCode: "",
    countryISOCode: "IN",
    defaultBilling: true,
    defaultShipping: true,
    }
    setIsChecked(undefined)
    setCheckoutPayload(checkoutPayloadCopy)
    // setShowNewAddress(true)   commoneted as it was not getting use
    window.scrollTo(0, 0);
    document.getElementById("nav-profile-tab").click();
  };


  return (
    <>   
      <>
      <Loader loading={loading} />      
      <section className="checkout-page">
        <div className="container">
          <form
            onSubmit={(e) => onSubmitCheckoutHandler(e)}
            className="g-3 needs-validation"
            noValidate
          >
            <div className="row">
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-12">
                    <h1>Personal Details</h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 col-lg-4 col-6">
                  <label htmlFor="name" className="asterisk">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={chekoutPayload && chekoutPayload.name}
                      // disabled={accountId !== "-1"}
                      id="name"
                      required
                      onChange={(e) => onChangeHandler(e)}
                    />
                    {checkoutPayloadError && checkoutPayloadError.nameError && (
                      <span className="text-danger">
                        {checkoutPayloadError.nameError}
                      </span>
                    )}
                  </div>
                  <div className="col-md-3 col-lg-4 col-6">
                    <label htmlFor="emailAddress" className="asterisk">
                      Email address
                    </label>
                    <input
                      type="emailAddress"
                      value={chekoutPayload && chekoutPayload.emailAddress}
                      disabled={accountId !== "-1"}
                      id="emailAddress"
                      required
                      onChange={(e) => onChangeHandler(e)}
                    />
                    {checkoutPayloadError &&
                      checkoutPayloadError.emailError && (
                        <span className="text-danger">
                          {checkoutPayloadError.emailError}
                        </span>
                      )}
                  </div>

                  <div className="col-md-3 col-lg-4 col-6">
                    <label htmlFor="phoneNumber">Phone number</label>
                    <input
                      type="number"
                      id="phoneNumber"
                      value={chekoutPayload && chekoutPayload.phoneNumber}
                      required
                      onChange={(e) => onChangeHandler(e)}
                      onInput={(e) => {
                        if (e.target.value.length > e.target.maxLength)
                          e.target.value = e.target.value.slice(
                            0,
                            e.target.maxLength
                          );
                      }}
                      maxLength={12}
                    />
                    {checkoutPayloadError &&
                      checkoutPayloadError.phoneError && (
                        <p className="text-danger">
                          {checkoutPayloadError.phoneError}
                        </p>
                      )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h2>Shipping Details</h2>
                  </div>
                </div>

                {/* shipping-address-tabs-starts */}
                <div className="row">
                  <div className="col-md-12">
                    <nav className="exist-address">
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">                       
                        {userInfo && userAddress && (
                          <button
                          className="nav-link active"
                          id="nav-home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-home"
                          type="button"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected={userInfo != undefined ? "true" : "false"}
                          >
                            Existing Address
                          </button>
                        ) } 
                         
                        <button                          
                          className={userInfo == undefined ? "nav-link active" : "nav-link"}
                          id="nav-profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-profile"
                          type="button"
                          role="tab"
                          aria-controls="nav-profile"
                          aria-selected={userInfo == undefined ? "true" : "false"}
                          onClick={() => addNewAddAddressHandler()}
                        >
                          New Address
                        </button>    
                              
                      </div>
                    </nav>
                  
                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                      >
                         <div className="row">
                          {userAddress &&
                            userAddress.length > 0 &&
                            userAddress.map((item, index) => {                              
                              return (
                              <div className="col-md-4 col-6" key={index}>
                                    <div
                                      className="card"
                                      onClick={() =>{
                                        setIsChecked(index);                                      
                                        getDefaultAddress(item, index, item.id)
                                      }
                                      }
                                    >
                                      <div className="save-address">
                                        <div className="default-add">
                                          <span className="default-address">
                                            <b>Address: </b>
                                          </span>
                                          <span className="address-logo">
                                            <b>{index + 1}</b>
                                          </span>
                                        </div>
                                        <div className="full-address">
                                          <div className="address-selection">
                                            <p className="full-add-name">
                                              {" "}
                                              {item.name}
                                            </p>
                                            <div className="form-check address-selection-choice">
                                              <input
                                                className="form-check-input w-0"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id={index}
                                                checked={isChecked === index}
                                              />
                                            </div>
                                          </div>

                                          <p className="full-address-1">
                                            {" "}
                                            {item.street1} <br />
                                            {item.city} {item.zip} <br />                                            
                                            {item.regionISOCode}{" "}
                                            {item.countryISOCode == "IN" ? "India" : ""}
                                          </p>
                                          <p className="full-add-phn">
                                            Phone number : {item.phoneNumber}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                              );
                            })}
                          { userInfo && <div
                            className="col-md-4 col-6"
                            onClick={() => addNewAddAddressHandler()}
                          >
                            <div className="add-address">
                              <BsPlusLg />
                              <p>Add address</p>
                            </div>
                          </div>}
                        </div>
                       
                      </div>
                      
                      <div
                        className={userInfo == undefined ? "show active" : "tab-pane fade" }
                        id="nav-profile"
                        role="tabpanel"
                        aria-labelledby="nav-profile-tab"
                      >
                         <div className="row">
                          <div className="col-md-6 my-2">
                            <label htmlFor="street1" className="asterisk">
                              Address Line 1
                            </label>
                            <input
                              type="text"
                              id="street1"
                              value={chekoutPayload && chekoutPayload.street1}
                              required
                              onChange={(e) => onChangeHandler(e)}
                            />
                            {checkoutPayloadError &&
                              checkoutPayloadError.street1Error && (
                                <span className="text-danger">
                                  {checkoutPayloadError.street1Error}
                                </span>
                              )}
                          </div>

                          <div className="col-md-6 my-2">
                            <label htmlFor="street2">Address Line 2</label>
                            <input
                              type="text"
                              id="street2"
                              value={chekoutPayload && chekoutPayload.street2}
                              required
                              onChange={(e) => onChangeHandler(e)}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 my-2">
                            <label htmlFor="country" className="asterisk">Country</label>
                            <select
                              id="country"
                              onChange={(e) => onChangeHandler(e)}
                              className="form-control custom-select checkout-country-state"
                            >
                              {countries && (
                                <option value="20567">India</option>
                              )}    
                            </select>
                          </div>

                          <div className="col-md-6 my-2">
                            <label htmlFor="regionISOCode" className="asterisk">State</label>
                            <select
                              id="regionISOCode"
                              onChange={(e) => onChangeHandler(e)}
                              className="form-select  checkout-country-state"
                              aria-label="Default select example"
                              required
                            >                             
                              <option hidden>Please select State</option>
                              {region &&
                                region.length > 0 &&
                                region.map((region, index) => {
                                  return (
                                      <option
                                        key={index}
                                        value={region.regionCode}
                                      >
                                        {region.name}
                                      </option>
                                  );
                                })}
                            </select>
                            {checkoutPayloadError && checkoutPayloadError.stateError && (
                      <p className="text-danger">
                        {checkoutPayloadError.stateError}
                      </p>
                    )}
                          </div>
                          <div className="col-md-6 my-2">
                            <label className="asterisk" htmlFor="city">
                              City
                            </label>
                            <input
                              type="text"
                              id="city"
                              value={chekoutPayload && chekoutPayload.city}
                              required
                              onChange={(e) => onChangeHandler(e)}
                            />
                            {checkoutPayloadError &&
                              checkoutPayloadError.cityError && (
                                <p className="text-danger">
                                  {checkoutPayloadError.cityError}
                                </p>
                              )}
                          </div>

                          <div className="col-md-6 my-2">
                            <label htmlFor="zip" className="asterisk">
                              Pin code
                            </label>
                            <input
                              type="number"
                              id="zip"
                              value={chekoutPayload && chekoutPayload.zip}
                              required
                              onChange={(e) => onChangeHandler(e)}
                              onInput={(e) => {
                                if (e.target.value.length > e.target.maxLength)
                                  e.target.value = e.target.value.slice(
                                    0,
                                    e.target.maxLength
                                  );
                              }}
                              maxLength={6}
                            />
                            {checkoutPayloadError &&
                              checkoutPayloadError.zipError && (
                                <p className="text-danger">
                                  {checkoutPayloadError.zipError}
                                </p>
                              )}
                          </div>
                        </div>
                       
                      </div>
                    </div>
                  </div>
                </div>

                {/* shipping-address-tabs-ends */}
              </div>
              <div className="col-md-3">
                <div className="right-side-details">
                  <div className="order-summary-wrapper">
                    <div className="order-wrap">
                      <h3 className="order-price-detail mb-4">PRICE DETAILS</h3>
                      <p className="order-total-price mb-2">
                        <span>Total MRP</span>
                        <span>&#x20b9; {totalPrice} </span>
                      </p>
                      <p className="order-delivery-price mb-2">
                        <span>Delivery</span>
                        <span>Free</span>
                      </p>
                      <div className="order-total-amount">
                        <span>Total Amount </span>
                        <span>&#x20b9; {Math.round(totalPrice)} </span>
                      </div>
                      <button type="submit" className="order-summary-btn">
                        Checkout
                        
                       </button>  
                       {checkoutPayloadError &&
                               (checkoutPayloadError.cityError ||  checkoutPayloadError.zipError || checkoutPayloadError.street1Error) && (
                                <p className="text-danger mb-0 mt-3 text-center">Please select the address!</p>
                              )}
                  </div>
                </div>
              </div>
            </div>
            </div>
          </form>
        </div>
      </section>
      </>
      
      <section>
        <Modal open={showLoginModal} onClose={() => closeModal()}>
          <LoginPage />
        </Modal>
      </section>
      <Footer />
    </>
  );
}
export default CheckOut;
