import * as CONSTANTS from "./constant";

export function appLogin(payload, wishListProductId, wishListSKUId, groupId) {
  return {
    type: CONSTANTS.APP_LOGIN,
    payload,
    wishListProductId,
    wishListSKUId,
    groupId
  };
}

export function resetToInitialState() {
  return {
    type: CONSTANTS.RESET_TO_INITIAL_STATE,
  };
}
