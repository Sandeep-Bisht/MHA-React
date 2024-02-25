import * as CONSTANT from "./constants";

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANT.GET_PRODUCTS_DETAILS_SUCCESS:
      return {
        ...state,
        productDetailsSuccess: action.response,
      };

    case CONSTANT.GET_PRODUCTS_DETAILS_FAILURE:
      return {
        ...state,
        productDetailsFailure: action.error,
      };

    case CONSTANT.ADD_PRODUCT_TO_CART_SUCCESS:
      return {
        ...state,
        addProductToCartSuccess: action.response,
      };

    case CONSTANT.ADD_PRODUCT_TO_CART_FAILURE:
      return {
        ...state,
        addProductToCartFailure: action.error,
      };
    case CONSTANT.GET_SIMILAR_PRODUCTS_LIST_SUCCESS:
      return {
        ...state,
        getSimilarProductsListSuccess: action.response,
      };
    case CONSTANT.GET_SIMILAR_PRODUCTS_LIST_FAILURE:
      return {
        ...state,
        getSimilarProductsListFailure: action.error,
      };

    case CONSTANT.GET_PRODUCT_MULTIPLE_IMAGES_SUCCESS:
      return {
        ...state,
        getProductMultipleImageSuccess: action.response,
      };

    case CONSTANT.GET_PRODUCT_MULTIPLE_IMAGES_FAILURE:
      return {
        ...state,
        getProductMultipleImageFailure: action.error,
      };

    case CONSTANT.ADD_PRODUCT_QUANTITY_TO_CART:
      return {
        ...state,
        productQuantity: action.productQuantity,
      };
    case CONSTANT.RESET_TO_INITIAL_STATE:
      return {
        addProductToCartSuccess: "",
        productDetailsSuccess:"",
      };
    default:
      return state;
  }
};
