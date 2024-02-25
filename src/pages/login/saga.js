import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import axios from "axios";
import { GetHeaders, middlewareBaseUrl, companyId } from "../../utils";

export function* appLoginHandler(action) {
  let url ;
  if(action.wishListProductId && action.wishListSKUId){
    url = `${middlewareBaseUrl}login/users/${action.payload.email}?password=${action.payload.password}&companyId=${companyId}&orderId=${action.payload.orderId}&wishListProductId=${action.wishListProductId}&wishListSKUId=${action.wishListSKUId}&groupId=${action.groupId}`
  } else {
    url= `${middlewareBaseUrl}login/users/${action.payload.email}?password=${action.payload.password}&companyId=${companyId}&orderId=${action.payload.orderId}`
  }     
  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders(false));
    yield put({ type: CONSTANTS.APP_LOGIN_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.APP_LOGIN_FAILURE,
      error: error.response,
    });
  }
}

export default function* LoginSaga() {
  yield takeLatest(CONSTANTS.APP_LOGIN, appLoginHandler);
}
