import * as CONSTANTS from "./constant";

export let saveShippingDetails = (payload, userId, orderId, addressId) => {
  return {
    type: CONSTANTS.SAVE_SHIPPING_DETAILS,
    payload,
    userId,
    orderId,
    addressId
  };
};

export let saveUserAddress = (payload, accountId) => {
  return {
    type: CONSTANTS.SAVE_USER_ADDRESS,
    payload,
    accountId
  };
};

export let getShippingDetails = (accountId) => {
  return {
    type: CONSTANTS.GET_SHIPPING_DETAILS,
    accountId
  };
};

export let guestCheckoutHandler = (guestAccountPayload) => {
    return {
        type : CONSTANTS.GUEST_CHECKOUT,
        guestAccountPayload
    }
}

export let resetCheckoutModalToInitialState = () => {
  return {
    type : CONSTANTS.RESET_CHECKOUT_MODAL_TO_INITIAL_STATE
  }
}

export let resetAddressToInitialState = () => {
  return {
    type : CONSTANTS.RESET_ADDRESS_TO_INITIAL_STATE
  }
}