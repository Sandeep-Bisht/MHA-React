import * as CONSTANTS from "./constant";

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case CONSTANTS.GET_SHIPPING_DETAILS_SUCCESS:
              return {
        ...state,
        getShippingDetailsSuccess: action.response,
      };
    case CONSTANTS.GET_SHIPPING_DETAILS_FAILURE:
      return {
        ...state,
        getShippingDetailsFailure: action.error,
      };
   
   

    default:
      return state;
  }
};
