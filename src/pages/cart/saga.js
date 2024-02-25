import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import axios from "axios";
import { GetHeaders, appUrl } from "../../utils";

export function* getCartInfo(action) {
     let url = `${appUrl}o/headless-commerce-delivery-cart/v1.0/carts/${action.cartId}/items`
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_CART_DETAILS_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_CART_DETAILS_FAILURE,
      error: error.response,
    });
  }
}


export default function* CartSaga() {
  yield takeLatest(CONSTANTS.GET_CART_DETAILS, getCartInfo);
  
}
