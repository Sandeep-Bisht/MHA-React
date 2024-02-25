import * as CONSTANTS from "./constant";

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_USER_WISHLIST_SUCCESS:
      return {
        ...state,
        addWishlistSuccess: action.response,
      };
    case CONSTANTS.ADD_USER_WISHLIST_FAILURE:
      return {
        ...state,
        addWishlistFailure: action.error,
      };

    case CONSTANTS.GET_USER_WISHLIST_SUCCESS:
      return {
        ...state,
        getWishlistSuccess: action.response,
      };

    case CONSTANTS.GET_USER_WISHLIST_FAILURE:
      return {
        ...state,
        getWishlistFailure: action.error,
      };

      case CONSTANTS.REMOVE_USER_WISHLIST_SUCCESS :
      return {
        ...state,
        removeWishlistItemSuccess : action.response
      }

      case CONSTANTS.REMOVE_USER_WISHLIST_FAILURE :
        return {
          ...state,
          removeWishlistItemFailure : action.error
        }
      case CONSTANTS.RESET_TO_INITIAL_STATE:
          return {
            addWishlistSuccess: "",
          };

    default:
      return state;
  }
};
