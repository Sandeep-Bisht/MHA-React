import * as CONSTANT from "./constants";

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANT.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productListSuccess: action.response,
      };

    case CONSTANT.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        productListFailure: action.error,
      };

    case CONSTANT.GET_USER_CART_ID_FAILURE:
      return {
        ...state,
        getMyOrdersFailure: action.error,
      };

    case CONSTANT.PRODUCT_COUNT_IN_CART:
      return {
        ...state,
        cartItems: action.productQuantityCount,
      };

    case CONSTANT.GET_NEW_ARRIVALS_PRODUCT_SUCCESS:
      return {
        ...state,
        newArrivalsProductSuccess: action.response,
      };

    case CONSTANT.GET_NEW_ARRIVALS_PRODUCT_FAILURE:
      return {
        ...state,
        newArrivalsProductFailure: action.error,
      };

    case CONSTANT.GET_BLOG_LIST_SUCCESS:
      return {
        ...state,
        getBlogsSuccess: action.response,
      };

    case CONSTANT.GET_BLOG_LIST_FAILURE:
      return {
        ...state,
        getBlogsFailure: action.error,
      };

    case CONSTANT.GET_STRUCTURED_CONTENT_SUCCESS:
      return {
        ...state,
        getStructuredContentSuccess: action.response,
      };
    case CONSTANT.GET_STRUCTURED_CONTENT_FAILURE:
      return {
        ...state,
        getStructuredContentFailure: action.error,
      };
      case CONSTANT.GET_USER_CART_ID_SUCCESS:
      return {
        ...state,
        cartIdSuccess: action.response,
      };

    case CONSTANT.GET_USER_CART_ID_FAILURE:
      return {
        ...state,
        cartIdFailure: action.error,
      };

      case CONSTANT.RESET_USER_CART_ID:
        return {
          ...state,
          cartIdSuccess: "",
        };

    default:
      return state;
  }
};
