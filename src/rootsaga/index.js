import {fork, all} from "redux-saga/effects";
import userRegistrationSaga from '../pages/userregister/saga';
import LoginSaga from '../pages/login/saga';
import getProductListSaga from "../pages/home/saga";
import getProductDetailsSaga from '../pages/productdetailspage/saga';
import getProductsByCategoriesSaga from '../pages/allCategories/saga';
import UserWishListSaga from "../utils/CommonWishlistService/saga";
import CartSaga from "../pages/cart/saga"
import AllCategoriesSaga from "../Components/Header/saga"
import checkoutSaga from "../pages/CheckOut/saga";
import MyOrdersSaga from "../pages/Profile/MyOrdersList/saga"
export function* rootSaga () {
    yield all([
        fork(userRegistrationSaga),
        fork(LoginSaga),
        fork(getProductListSaga),
        fork(getProductDetailsSaga),
        fork(getProductsByCategoriesSaga),
        fork(UserWishListSaga),
        fork(CartSaga),
        fork(AllCategoriesSaga),
        fork(checkoutSaga),
        fork(MyOrdersSaga)
    ]);
}