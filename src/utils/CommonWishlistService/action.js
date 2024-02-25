import * as CONSTANTS from "./constant";

export function addUserWishlist(payload) {return {
        type : CONSTANTS.ADD_USER_WISHLIST ,
        payload
    }
}

export function getUserWishList(payload) {
    return {
        type: CONSTANTS.GET_USER_WISHLIST ,
        payload
    }
} 

export function removeUserWishListItem(payload) {
    return {
        type: CONSTANTS.REMOVE_USER_WISHLIST ,
        payload
    }
}

export function resetToInitialState() {
    return {
      type: CONSTANTS.RESET_TO_INITIAL_STATE,
    };
  }