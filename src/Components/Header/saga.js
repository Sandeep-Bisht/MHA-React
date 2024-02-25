import * as CONSTANTS from "./constant";
import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetHeaders, apiBaseUrl, appUrl, vocabId } from "../../utils";

export function* getAllCategoriesName(action) {
  let url;
  if (action.payload == "all-categories") {
    url = `${apiBaseUrl}products`;
  } else {
    url = `${appUrl}o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${vocabId}/taxonomy-categories`;
  }
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({
      type: CONSTANTS.GET_ALL_CATEGORIES_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_ALL_CATEGORIES_FAILURE,
      error: error.response,
    });
  }
}


export default function* AllCategoriesSaga() {
  yield takeLatest(CONSTANTS.GET_ALL_CATEGORIES, getAllCategoriesName);
}
