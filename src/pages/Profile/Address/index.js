import React, { useState, useEffect } from "react";
import axios from "axios";
import { GetHeaders, appUrl } from "../../../utils";
import * as ACTIONS from "../../CheckOut/action";
import "./address.css";
import "../../../css/checkout.css";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

const Address = () => {

  let intialPayload = {
    name: "",
    street1: "",
    city: "",
    street2: "",
    zip: "",
    regionISOCode: "",
    countryISOCode: "IN",
    defaultBilling: true,
    defaultShipping: true,
  }

  let { addToast } = useToasts();

  let [chekoutPayload, setCheckoutPayload] = useState(intialPayload);
  const [checkoutPayloadError, setCheckoutPayloadError] = useState();
  const [countries, setCountries] = useState();
  const [region, setRegion] = useState();
  const [userInfo, setUserInfo] = useState();
  let [userAddress, setUserAddress] = useState();
  let [savedAddress, setSavedAddress] = useState()
  const [showAddAddressForm, setShowAddressForm] = useState(false);
  const [showButton, setShowButton] = useState(undefined);
  let dispatch = useDispatch();
  const state = useSelector((state) => state.ProceedCheckoutReducer);
  

  useEffect(() => {
    getCountries();
    getRegion("20567");
  }, []);

  // =================Setting User Info from Local storage====================
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUserInfo(userInfo);
      getUserAddress(userInfo);
    }
  }, []);

  // ============= User Address=========================================
  let getUserAddress = (userInfo) => {
    dispatch(ACTIONS.getShippingDetails(userInfo.accountId));
    
  };

  // ================== Get Address Response==================================
  useEffect(() => {
    if (state.getShippingDetailsSuccess && state.getShippingDetailsSuccess.items.length > 0) {
      setRegionName(state.getShippingDetailsSuccess.items);
    }
    else{
      setSavedAddress()
    }
  }, [state.getShippingDetailsSuccess, region]);

  let setRegionName = (address) => {
    if (region) {
      address.length > 0 && address.map((item) => {
        for (let el of region) {
          if (el.regionCode === item.regionISOCode) {
            item["regionName"] = el.title;
            item["countryName"] = "India";
            break;
          }
        }
        setSavedAddress(address)
        // setUserAddress(address);
      });
    }
  };

  // ===================Get Countries API=================================
  let getCountries = async () => {
    let url =
      `${appUrl}api/jsonws/country/get-countries`;
    try {
      let countriesResponse = await axios.get(url, GetHeaders());
      if (countriesResponse) {
        setCountries(countriesResponse.data);
      }
    } catch (error) {}
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

  const onChangeHandler = (e) => {
    let chekoutPayloadCopy = { ...chekoutPayload };
    let checkoutPayloadErrorCopy = { ...checkoutPayloadError };
    let regName = /^[a-zA-Z ]+$/;
    if (e.target.id === "country") {
      getRegion("20567");
      let res = countries.find((item) => item.countryId === e.target.value);
      chekoutPayloadCopy.countryISOCode = res.a2;
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
      if(e.target.id === 'phoneNumber') {
        checkoutPayloadErrorCopy.phoneError = ""
      }

      setCheckoutPayloadError(checkoutPayloadErrorCopy);
    }

    setCheckoutPayload(chekoutPayloadCopy);
  };

  let editDefaultAddress = (item) => {
    setShowAddressForm(true);
    setUserAddress(item);
    setCheckoutPayload(item);
    setShowButton("update");
  };

  // =======================save shipping details api==========================
  const handleSubmit = (e) => {
    e.preventDefault();
    if (showButton === undefined) {
      onSubmitSaveAddress(chekoutPayload);

    } else {
      updateShippingAddress(chekoutPayload);
    }
  };

  const onSubmitSaveAddress = (chekoutPayload) => {   
    if (validateFormFields()) {      
      // delete chekoutPayload.emailAddress;
      dispatch(ACTIONS.saveUserAddress(chekoutPayload, userInfo.accountId));
    }
  };

  // ======================Response of save address ============================
  useEffect(() => {
    if (state.saveUserAddressSuccess) {
      setShowAddressForm(false);
      addToast("Success!", {
        appearance: "success",
        content: `Address Added Successfully`,
      });
      dispatch(ACTIONS.getShippingDetails(userInfo.accountId));
      dispatch(ACTIONS.resetAddressToInitialState());
      // resetAddressToInitialState
    }
  }, [state.saveUserAddressSuccess]);

  // ========================Form validation===========================================

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

    if (chekoutPayload.name && !regName.test(chekoutPayload.name)){
      errors["nameError"] = "Please enter the valid name";
       isValid = false;
       setCheckoutPayloadError(errors);
    }

    // if (chekoutPayload.emailAddress === "") {
    //   errors["emailError"] = "This field is required";
    //   isValid = false;
    //   setCheckoutPayloadError(errors);
    // }
    // let regEmail =
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if (
    //   chekoutPayload.emailAddress &&
    //   chekoutPayload.emailAddress.length > 0 &&
    //   !regEmail.test(chekoutPayload.emailAddress)
    // ) {
    //   errors["emailError"] = "Please enter the valid email";
    //   isValid = false;
    //   setCheckoutPayloadError(errors);
    // }

    if (chekoutPayload.city === "") {
      errors["cityError"] = "This field is required";
      isValid = false;
      setCheckoutPayloadError(errors);
    }
    if (chekoutPayload.regionISOCode === "") {
      errors["stateError"] = "This field is required";
      isValid = false;
      setCheckoutPayloadError(errors);
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
      chekoutPayloadCopy.zip.length > 0 &&
      chekoutPayloadCopy.zip.length < 6
    ) {
      errors["zipError"] = "Pincode must be atleast 6 digits";
      isValid = false;
      setCheckoutPayloadError(errors);
    }
    if (chekoutPayload.phoneNumber &&  chekoutPayload.phoneNumber.length < 10) {
      errors["phoneError"] = "Phone number should be atleast 10 digits";
      isValid = false;
      setCheckoutPayloadError(errors);
    }

    setCheckoutPayloadError(errors);
    return isValid;
  };

  //=====================Update Shipping Address =================================

  const updateShippingAddress = async (e) => {
    if (showButton == "update") {
      delete chekoutPayload.regionName;
      delete chekoutPayload.countryName
      if (validateFormFields()) {
        let url = `${appUrl}o/headless-commerce-admin-account/v1.0/accountAddresses/${chekoutPayload.id}`;
        try {
          let response = await axios.patch(url, chekoutPayload, GetHeaders());
          if (response) {
            addToast("Success!", {
              appearance: "success",
              content: `Address updated Successfully`,
            });
            setShowAddressForm(false);            
            getUserAddress(userInfo)
            setShowButton(undefined)
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  // ========================Delete Address =-=======================================
  const removeAddress = async (addressId) => {
    let url = `${appUrl}o/headless-commerce-admin-account/v1.0/accountAddresses/${addressId}`;
    try {
      let response = await axios.delete(url, GetHeaders());
      if (response) {
        getUserAddress(userInfo);
        addToast("Success!", {
          appearance: "success",
          content: `Address Removed Successfully`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      {showAddAddressForm == false && (
        <section className="your-address">
          <div className="container p-0">
            <div className="row">
              <div className="col-md-12 ">
                <h5>Your Address</h5>
              </div>
            </div>
            <div className="row adress-boxes-2"           
              >
              <div className="col-md-6 col-lg-4 col-sm-6">
                <div className="add-address " onClick={() =>
              {
                setShowAddressForm(true);
                setUserAddress();
                setShowButton(undefined)
                setCheckoutPayload(intialPayload)
              }}>
                  <div>
                  <BsPlusLg  /> 
                  </div>
                 
                  <div>
                  <p>Add address</p>
                  </div>
                </div>
              </div>

              {savedAddress &&
                savedAddress.length >= 1  &&
                savedAddress.map((item, index) => {
                  return (
                    <>
                      <div className="col-md-6 col-lg-4 col-sm-6" key={index}>
                        <div className="save-address">
                          <div className="default-add">
                            <span className="default-address">
                              <b>Address: </b>
                            </span>
                            <span className="address-logo">
                              <b>{index + 1}</b>
                            </span>
                          </div>
                          <div className="full-address ">
                            <p className="full-add-name"> {item.name}</p>
                            <p className="full-address-1">
                              {" "}
                              {item.street1} <br />
                              {item.city} {item.zip} <br />
                              {item.regionName} <br />
                              {item.countryName}
                            </p>
                            <p className="full-add-phn">
                              Ph no : {item.phoneNumber}
                            </p>
                            <div className="full-editing-of-add">
                              <div
                                onClick={() => editDefaultAddress(item)}
                                className="full-add-edit"
                              >
                                Edit
                              </div>
                              <span className="custom-edit-bar">
                                &nbsp; | &nbsp;
                              </span>
                              <a target="_self" className="full-add-remove" onClick={()=>removeAddress(item.id)}>
                                Remove
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
             
            </div>
          </div>
        </section>
      )}

      {showAddAddressForm && (
        <section className="checkout-page">
          <div className="container">
            <form
              onSubmit={handleSubmit}
              className="g-3 needs-validation"
              noValidate
            >
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-12">
                      <h1>Personal Details</h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="name" className="asterisk">
                        Full name
                      </label>
                      <input
                        type="text"
                        defaultValue={
                          userAddress && userAddress.name && userAddress.name
                        }
                        id="name"
                        required
                        onChange={(e) => onChangeHandler(e)}
                      />
                      {checkoutPayloadError &&
                        checkoutPayloadError.nameError && (
                          <span className="text-danger">
                            {checkoutPayloadError.nameError}
                          </span>
                        )}
                    </div>


                    <div className="col-md-6">
                      <label htmlFor="phoneNumber">Phone number</label>
                      <input
                        type="number"
                        id="phoneNumber"
                        className=""
                        defaultValue={userAddress && userAddress.phoneNumber}
                        required
                        onChange={(e) => onChangeHandler(e)}
                        onInput={(e) => {
                          if (e.target.value.length > e.target.maxLength) {
                            e.target.value = e.target.value.slice(
                              0,
                              e.target.maxLength
                            );
                          }
                        }}
                        maxLength={12}
                      />
                      {checkoutPayloadError &&
                        checkoutPayloadError.phoneError && (
                          <span className="text-danger">
                            {checkoutPayloadError.phoneError}
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h2>Shipping Details</h2>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 py-2">
                      <label htmlFor="street1" className="asterisk">
                        Address Line 
                      </label>
                      <input
                        type="text"
                        defaultValue={userAddress && userAddress.street1}
                        id="street1"
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

                    <div className="col-md-6 py-2">
                      <label htmlFor="street2">Address Line 2</label>
                      <input
                        type="text"
                        id="street2"
                        defaultValue={userAddress && userAddress.street2}
                        required
                        onChange={(e) => onChangeHandler(e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 py-2">
                      <label htmlFor="country">Country</label>
                      <select
                        id="country"
                        onChange={(e) => onChangeHandler(e)}
                        className="form-control custom-select checkout-country-state"
                      >
                        {countries && (
                          <option defaultValue="37053">India</option>
                        )}
                        {/* {countries &&
                          countries.length > 0 &&
                          countries.map((countries) => {
                            return (
                              <>
                                <option
                                  key={countries.a2}
                                  value={countries.countryId}
                                >
                                  {countries.name}
                                </option>
                              </>
                            );
                          })} */}
                      </select>
                    </div>

                    <div className="col-md-6 py-2">
                      <label htmlFor="regionISOCode" className="asterisk">State</label>
                      <select
                        id="regionISOCode"
                        onChange={(e) => onChangeHandler(e)}
                        className="form-select checkout-country-state"
                        aria-label="Default select example"
                        defaultValue={userAddress && userAddress.regionISOCode}
                        //disabled={defaultAddress && defaultAddress.regionName}
                      >
                        <option hidden>Please select State</option>
                        {region &&
                          region.length > 0 &&
                          region.map((region, index) => {
                            return (
                              <>
                                <option
                                  key={index}
                                  value={region.regionCode}
                                >
                                  {region.name}
                                </option>
                              </>
                            );
                          })}
                      </select>
                      {checkoutPayloadError && checkoutPayloadError.stateError && (
                      <p className="text-danger">
                        {checkoutPayloadError.stateError}
                      </p>
                    )}
                    </div>
                    <div className="col-md-6 py-2">
                      <label className="asterisk" htmlFor="city">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        defaultValue={userAddress && userAddress.city}
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

                    <div className="col-md-6 py-2">
                      <label htmlFor="zip" className="asterisk">
                        Pin code
                      </label>
                      <input
                        type="number"
                        id="zip"
                        defaultValue={userAddress && userAddress.zip}
                        required
                        onChange={(e) => onChangeHandler(e)}
                        onInput={(e) => {
                          if (e.target.value.length > e.target.maxLength)
                            e.target.value = e.target.value.slice(
                              0,
                              e.target.maxLength
                            );
                        }}
                        maxlength={6}
                      />
                      {checkoutPayloadError &&
                        checkoutPayloadError.zipError && (
                          <p className="text-danger">
                            {checkoutPayloadError.zipError}
                          </p>
                        )}
                    </div>
                    

                    <div className="mt-3">
                    <button className="full-address-btn me-3" type="button" onClick={()=>setShowAddressForm(false)}>
                          Back
                        </button>
                      {showButton === undefined ? (
                        <button className="full-address-btn" type="submit" >
                          Save Address
                        </button>
                      ) : (
                        <button className="full-address-btn" type="submit" > 
                          Update Address
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Address;
