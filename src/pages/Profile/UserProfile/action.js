import * as CONSTANTS from "./constant";

export function userProfile(payload) {
    return {
        type : CONSTANTS.USER_PROFILE,
        payload
    }
}

export let getShippingDetails = () => {
    return {
      type: CONSTANTS.GET_SHIPPING_DETAILS,
    };
  };