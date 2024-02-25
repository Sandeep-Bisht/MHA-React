import * as CONSTANTS from './constant'

export let getCartDetails = (cartId) => {
    return {
        type:CONSTANTS.GET_CART_DETAILS,
        cartId
    }
}
export let resetCartToInitialState = () => {
    return {
      type : CONSTANTS.RESET_CART_TO_INITIAL_STATE
    }
  }

