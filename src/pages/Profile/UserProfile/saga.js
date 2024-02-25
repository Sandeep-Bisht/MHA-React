import {call ,takeLatest, put } from "react-saga/effects";
import * as CONSTANTS from "./constant";
import axios from "axios";
import { GetHeaders, middlewareBaseUrl } from "../../utils";

export function* UserProfileSaga(action) {
  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.USER_PROFILE_SUCCESS,
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.USER_PROFILE_FAILURE,
      error: error.response,
    });
  }
}

// export function* getShippingDetails (action) {
    
//     let url = `${apiBaseUrl}products`;
//     try {
//         const response = yield call(axios.get, url, GetHeaders());
//         yield put({
//           type: CONSTANTS.GET_SHIPPING_DETAILS_SUCCESS,
//           response: response.data,
//         });
//       } catch (error) {
    
//         yield put({
//           type: CONSTANTS.GET_SHIPPING_DETAILS_FAILURE,
//           error: error.response.data,
//         });
//       }
// }

export default function* UserProfileSaga() {
    yield takeLatest(CONSTANTS.USER_PROFILE, userProfileHandler);
    // yield takeLatest(CONSTANTS.GET_SHIPPING_DETAILS, getShippingDetails)
  }