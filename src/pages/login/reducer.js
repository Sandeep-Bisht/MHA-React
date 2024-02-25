import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.APP_LOGIN_SUCCESS:
      return {
        ...state,
        userLoginSuccess: action.response,
      };

    case CONSTANTS.APP_LOGIN_FAILURE:
      return {
        ...state,
        userLoginFailure: action.error,
      };

    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {
        userLoginSuccess: "",
      };
    
    default:
      return state;
  }
};
