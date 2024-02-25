import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import axios from "axios";
import { GetHeaders, appUrl, channelId } from "../../../utils";

export function* getOrderIds(action) {
  let url = `${appUrl}o/mha-headless/commerce/getOrders/${action.accountId}/${channelId}/${action.pageSize}`;
  // let url = `http://admin.modernhouseofantiques.com:8282/o/headless-commerce-delivery-cart/v1.0/carts/43701`
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({
      type: CONSTANTS.GET_MY_ORDER_IDS_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_MY_ORDER_IDS_FAILURE,
      error: error.response,
    });
  }
}

export default function* MyOrdersSaga() {
  yield takeLatest(CONSTANTS.GET_MY_ORDER_IDS, getOrderIds);
}
