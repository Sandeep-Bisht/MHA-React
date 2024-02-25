import * as CONSTANTS from "./constants";
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { GetHeaders, apiBaseUrl, channelId, middlewareBaseUrl, companyId } from "../../utils";

export function* getProductByCategories(action) {  
 let url;
  if(action.payload === "all-categories" ){
    url = `${apiBaseUrl}products`

  }
  else {
    let pageSize = 20;
    let selectedPagepageNumber = 1;
    url = `${middlewareBaseUrl}commerce/category/products/${channelId}/${companyId}?page=${selectedPagepageNumber}&pageSize=${pageSize}&categoryId=${action.payload}`
   
  }
 

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put ({
      type : CONSTANTS.GET_PRODUCTS_BY_CATEGORIES_SUCCESS,
      response : response.data
    })
  } catch (error) {
    yield put ({
      type : CONSTANTS.GET_PRODUCTS_BY_CATEGORIES_FAILURE,
      error : error.response.data

    })
  }
}


export default function* getProductsByCategoriesSaga() {
  yield takeLatest(CONSTANTS.GET_PRODUCTS_BY_CATEGORIES, getProductByCategories)
}
