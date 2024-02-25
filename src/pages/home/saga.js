import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { GetHeaders, apiBaseUrl, channelId, appUrl, sites } from "../../utils";
import * as CONSTANT from "./constants";

export function* getAllProducts() {
  let url = `${apiBaseUrl}products?pageSize=5&sort=modifiedDate:asc`;
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({
      type: CONSTANT.GET_PRODUCTS_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({
      type: CONSTANT.GET_PRODUCTS_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getUserCartId(action) {
  let url = `${appUrl}o/headless-commerce-delivery-cart/v1.0/channels/${channelId}/account/${action.accountId}/carts`;
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({
      type: CONSTANT.GET_USER_CART_ID_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({
      type: CONSTANT.GET_USER_CART_ID_FAILURE,
      error: error.response,
    });
  }
}

export function* getNewArrivalsProducts(action) {
 let url = `${appUrl}o/mha-headless/commerce/getTaggedProducts/featured/${channelId}/`
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({
      type: CONSTANT.GET_NEW_ARRIVALS_PRODUCT_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({
      type: CONSTANT.GET_NEW_ARRIVALS_PRODUCT_FAILURE,
      error: error.response,
    });
  }
}


export function* getAllBlogs(action) {
  let url = `${appUrl}o/headless-delivery/v1.0/sites/${sites}/blog-postings?pageSize=${action.pageSize}`;
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({
      type: CONSTANT.GET_BLOG_LIST_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({
      type: CONSTANT.GET_BLOG_LIST_FAILURE,
      error: error.response,
    });
  }
}

export function* getStructuredContent(action) {
  let url = `${appUrl}o/headless-delivery/v1.0/content-structures/${action.payload}/structured-contents?nestedFields=categories`;
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({
      type: CONSTANT.GET_STRUCTURED_CONTENT_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({
      type: CONSTANT.GET_STRUCTURED_CONTENT_FAILURE,
      error: error.response,
    });
  }
}

export default function* getProductListSaga() {
  yield takeLatest(CONSTANT.GET_PRODUCTS, getAllProducts);
  yield takeLatest(CONSTANT.GET_USER_CART_ID, getUserCartId);
  yield takeLatest(CONSTANT.GET_NEW_ARRIVALS_PRODUCT, getNewArrivalsProducts);
  yield takeLatest(CONSTANT.GET_BLOG_LIST, getAllBlogs);
  yield takeLatest(CONSTANT.GET_STRUCTURED_CONTENT, getStructuredContent);
}
