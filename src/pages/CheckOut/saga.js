import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { GetHeaders, appUrl, companyId } from "../../utils";
import * as CONSTANTS from "./constant";

export function* saveShippingDetails(action) {
    //let url = `${appUrl}o/headless-commerce-admin-account/v1.0/accounts/${action.accountId}/accountAddresses`;
    let url = `${appUrl}o/mha-headless/commerce/add-user-order-address?userId=${action.userId}&companyId=${companyId}&orderId=${action.orderId}&addressId=${action.addressId}`
    try {
       const response = yield call(axios.post, url, action.payload, GetHeaders());
        yield put({
          type: CONSTANTS.SAVE_SHIPPING_DETAILS_SUCCESS,
          response: response.data,       
         });
      } catch (error) {    
        console.log(error, 'error')
        yield put({
          type: CONSTANTS.SAVE_SHIPPING_DETAILS_FAILURE,
          error: error.response,
        });
      }
}

export function* saveUserAddress(action) {
    let url = `${appUrl}o/headless-commerce-admin-account/v1.0/accounts/${action.accountId}/accountAddresses`;
    try {
       const response = yield call(axios.post, url, action.payload, GetHeaders());
        yield put({
          type: CONSTANTS.SAVE_USER_ADDRESS_SUCCESS,
          response: response.data,       
         });
      } catch (error) {    
        console.log(error, 'error')
        yield put({
          type: CONSTANTS.SAVE_USER_ADDRESS_FAILURE,
          error: error.response,
        });
      }
}

export function* guestCheckoutHandler(action) {  

  let url = `${appUrl}o/mha-headless/commerce/guest-user-account/?fullname=${action.guestAccountPayload.fullName}&emailAddress=${action.guestAccountPayload.email}&companyId=${companyId}`
  try {
    const response = yield call(axios.post, url, {}, GetHeaders());
    yield put ({
      type : CONSTANTS.GUEST_CHECKOUT_SUCCESS,
      response : response.data
    })
  } catch (error) {
    yield put({
      type : CONSTANTS.GUEST_CHECKOUT_FAILURE,
      error : error.response
    })
  }
}

export function* getShippingDetails (action) {
    
  let url = `${appUrl}o/headless-commerce-admin-account/v1.0/accounts/${action.accountId}/accountAddresses`;

    try {
        const response = yield call(axios.get, url, GetHeaders());
        yield put({
          type: CONSTANTS.GET_SHIPPING_DETAILS_SUCCESS,
          response: response.data,
        });
      } catch (error) {
    
        yield put({
          type: CONSTANTS.GET_SHIPPING_DETAILS_FAILURE,
          error: error.response.data,
        });
      }
}

export default function* checkoutSaga() {
    yield takeLatest(CONSTANTS.SAVE_SHIPPING_DETAILS, saveShippingDetails)
    yield takeLatest(CONSTANTS.SAVE_USER_ADDRESS, saveUserAddress)
    yield takeLatest(CONSTANTS.GUEST_CHECKOUT , guestCheckoutHandler)
   yield takeLatest(CONSTANTS.GET_SHIPPING_DETAILS, getShippingDetails)
  }