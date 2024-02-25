import * as CONSTANTS from "./constant";

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.SAVE_SHIPPING_DETAILS_SUCCESS:
      return {
        ...state,
        saveShippingDetailSuccess: action.response,
      };
    case CONSTANTS.SAVE_SHIPPING_DETAILS_FAILURE:
      return {
        ...state,
        saveShippingDetailFailure: action.error,
      };
      case CONSTANTS.SAVE_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        saveUserAddressSuccess: action.response,
      };
    case CONSTANTS.SAVE_USER_ADDRESS_FAILURE:
      return {
        ...state,
        saveUserAddressFailure: action.error,
      };
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

    case CONSTANTS.GUEST_CHECKOUT_SUCCESS:
      return {
        ...state,
        guestCheckoutSuccess: action.response,
      };
    case CONSTANTS.GUEST_CHECKOUT_FAILURE:
      return {
        ...state,
        guestCheckoutFailure: action.error,
      };

    case CONSTANTS.RESET_CHECKOUT_MODAL_TO_INITIAL_STATE:
      return {
        ...state,
        proceedToCheckoutSuccess: "",
        guestCheckoutSuccess: "",
      };

      case CONSTANTS.RESET_ADDRESS_TO_INITIAL_STATE :
        return {
          // ...state,    commented coz we were getting error on profile address page
          getShippingDetailsSuccess: ""         
        };

    default:
      return state;
  }
};
