import * as CONSTANTS from './constant'

export function appRegistration(payload) {
  return {
    type: CONSTANTS.APP_REGISTRATION,
    payload
  };
}

export function resetToInitialState() {
  return {
    type: CONSTANTS.RESET_TO_INITIAL_STATE,
  };
}