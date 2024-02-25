import { call, put, takeLatest } from "redux-saga/effects";
import { GetHeaders, middlewareBaseUrl, companyId } from "../../utils";
import * as CONSTANT from "./constant";
import axios from "axios";

export function* appRegistrationHandler(action) {
  let url = `${middlewareBaseUrl}register/users/${action.payload.email}?firstName=${action.payload.firstName}&lastName=${action.payload.lastName}&externalReferenceCode=${action.payload.externalReferenceCode}&password=${action.payload.password}&companyId=${companyId}`;
        try {
          const response = yield call(axios.post, url, action.payload, GetHeaders());
          yield put({
            type: CONSTANT.APP_REGISTRATION_SUCCESS,
            response: response.data,
          });
        } catch (error) {
          yield put({
            type: CONSTANT.APP_REGISTRATION_FAILURE,
            error: error.response,
          });
        }
}

export default function* userRegistrationSaga() {
  yield takeLatest(CONSTANT.APP_REGISTRATION, appRegistrationHandler);
}
