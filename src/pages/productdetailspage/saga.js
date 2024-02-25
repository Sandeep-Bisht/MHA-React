import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { GetHeaders, apiBaseUrl, cartBaseUrl, appUrl, channelId, middlewareBaseUrl} from "../../utils";
import * as CONSTANT from "./constants";


let count = 0
export function* getProductDetails(action) {
  let url = `${middlewareBaseUrl}commerce/products/slug/${channelId}/${action.productId}`; 
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({
      type: CONSTANT.GET_PRODUCTS_DETAILS_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({
      type: CONSTANT.GET_PRODUCTS_DETAILS_FAILURE,
      error: error.response.data,
    });
  }
}

export  function* addItemsToCart(action, cartId) {
  count = count + 1
  let payload;
  let url; 
    if (JSON.stringify(localStorage.getItem("userinfo")) && action.cartId) {
    payload = action.payload.cartItems[0]
   url = `${appUrl}o/headless-commerce-delivery-cart/v1.0/carts/${action.cartId}/items`
   
 } else if(localStorage.getItem("cartId") && (parseInt(localStorage.getItem('cartItems')) > 0 )){
  payload = action.payload.cartItems[0]
  url = `${appUrl}o/headless-commerce-delivery-cart/v1.0/carts/${localStorage.getItem("cartId")}/items`
 }
  else {
    url = `${cartBaseUrl}carts?nestedFields=cartItems`;
    payload = action.payload
  }
  try {
    if (count === 1) {
      let userLogged = localStorage.getItem("userInfo") ? false : true
      const response = yield call(axios.post, url, JSON.stringify(payload), GetHeaders(userLogged));
      count = 0; // if response 
      yield put({
        type: CONSTANT.ADD_PRODUCT_TO_CART_SUCCESS,
        response: response.data,
      });
    }
  }
  catch (error) {
    count = 0; // if error
    yield put({
      type: CONSTANT.ADD_PRODUCT_TO_CART_FAILURE,
      error: error.response,
    });
  }


}

export function* getProductMultipleImages(action) {
  let url =`${apiBaseUrl}products/${action.productId}/images`

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({
      type: CONSTANT.GET_PRODUCT_MULTIPLE_IMAGES_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({
      type: CONSTANT.GET_PRODUCT_MULTIPLE_IMAGES_FAILURE,
      error: error.response.data,
    });
  }

}

export function* getSimilarProductsList(action) {
  let url = `${apiBaseUrl}products/${action.productId}/related-products`
  try {
    const response = yield call(axios.get, url,GetHeaders());
    yield put({ 
      type : CONSTANT.GET_SIMILAR_PRODUCTS_LIST_SUCCESS,
    response : response.data })
  } catch (error) {
    yield put({
      type : CONSTANT.GET_SIMILAR_PRODUCTS_LIST_FAILURE,
      error : error.response
    })
  }
}

export function* getSimilarProductsListBYId(action) {
  let url = `${apiBaseUrl}products/${action.productId}`;
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({
      type: CONSTANT.GET_SIMILAR_PRODUCTS_LIST_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({
      type: CONSTANT.GET_SIMILAR_PRODUCTS_LIST_FAILURE,
      error: error.response.data,
    });
  }
}




export default function* getProductDetailsSaga() {
  yield takeLatest(CONSTANT.GET_PRODUCTS_DETAILS, getProductDetails);
  yield takeLatest(CONSTANT.ADD_PRODUCT_TO_CART, addItemsToCart);
  yield takeLatest(CONSTANT.GET_PRODUCT_MULTIPLE_IMAGES, getProductMultipleImages)
  yield takeLatest(CONSTANT.GET_SIMILAR_PRODUCTS_LIST, getSimilarProductsList)
  yield takeLatest(CONSTANT.GET_SIMILAR_PRODUCT_BY_ID, getSimilarProductsListBYId)
}
