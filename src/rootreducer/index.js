import { combineReducers } from "redux";
import ProductListReducer from '../pages/home/reducer'
import ProductDetailsReducer from "../pages/productdetailspage/reducer"
import RegisterReducer from "../pages/userregister/reducer"
import LoginReducer from '../pages/login/reducer'
import ProductListByCategoriesReducer from '../pages/allCategories/reducer'
import CartDetailsReducer from '../pages/cart/reducer'
import WishlistReducer from '../utils/CommonWishlistService/reducer'
import GetAllCategoriesNameReducer from '../Components/Header/reducer'
import ProceedCheckoutReducer from '../pages/CheckOut/reducer'
import GetMyOrderListReducer from '../pages/Profile/MyOrdersList/reducer'

const rootReducer = combineReducers({
    RegisterReducer,
    LoginReducer,
    ProductListReducer,
    ProductListByCategoriesReducer,
    ProductDetailsReducer,
    CartDetailsReducer,
    WishlistReducer,
    GetAllCategoriesNameReducer,
    ProceedCheckoutReducer,
    GetMyOrderListReducer
});
export default rootReducer;