import * as CONSTANTS from "./constants";
export const getProductByCategories = (payload) => {
  return {
    type: CONSTANTS.GET_PRODUCTS_BY_CATEGORIES,
    payload,
  };
};

export const resetProductToInitialState = () => {
  return {
    type: CONSTANTS.RESET_PRODUCT_LIST_TO_INITIAL_STATE,
  };
};
