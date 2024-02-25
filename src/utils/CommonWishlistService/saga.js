import * as CONSTANTS from "./constant";
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { GetHeaders, appUrl } from "../../utils";

export function* addUserWishListHandler(action) {
    let url = `${appUrl}o/mha-headless/commerce/wishlist/${action.payload.accountId}?productId=${action.payload.productId}&skuId=${action.payload.skuId}&userId=${action.payload.userId}&groupId=${action.payload.groupId}`

    try {
        const response = yield call(axios.post, url, {}, GetHeaders())
        yield put({
            type: CONSTANTS.ADD_USER_WISHLIST_SUCCESS,
            response: response.data
        })
    } catch (error) {
        yield put({
            type: CONSTANTS.ADD_USER_WISHLIST_FAILURE,
            error: error.response
        })
    }
}

export function* getUserWishListHandler(action) {
    let url =`${appUrl}o/mha-headless/commerce/get-wishlist/${action.payload.groupId}?userId=${action.payload.userId}`
    try {
        const response = yield call(axios.get, url, GetHeaders())
        yield put({
            type: CONSTANTS.GET_USER_WISHLIST_SUCCESS,
            response: response.data
        })
    } catch (error) {
        yield put({
            type: CONSTANTS.GET_USER_WISHLIST_FAILURE,
            error: error.response
        })
    }
}

export function* removeUserWishListHandler(action) {
     let url = `${appUrl}o/mha-headless/commerce/delete-wishlistItems/${action.payload}`

    try {
        const response = yield call(axios.delete, url, GetHeaders())
        yield put({
            type: CONSTANTS.REMOVE_USER_WISHLIST_SUCCESS,
            response: response.data
        })
    } catch (error) {
        yield put({
            type: CONSTANTS.REMOVE_USER_WISHLIST_FAILURE,
            error: error.response
        })
    }
}

export default function* UserWishListSaga() {
    yield takeLatest(CONSTANTS.ADD_USER_WISHLIST, addUserWishListHandler);
    yield takeLatest(CONSTANTS.GET_USER_WISHLIST, getUserWishListHandler);
    yield takeLatest(CONSTANTS.REMOVE_USER_WISHLIST, removeUserWishListHandler)
}