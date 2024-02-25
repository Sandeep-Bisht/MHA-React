import * as CONSTANT from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONSTANT.APP_REGISTRATION_SUCCESS:
            return {
                ...state,
                userRegisterSuccess: action.response,
            };

        case CONSTANT.APP_REGISTRATION_FAILURE:
            return {
                ...state,
                userRegisterFailure: action.error,
            };
        case CONSTANT.RESET_TO_INITIAL_STATE:
            return {
                userRegisterSuccess: "",
            };
        default:
            return state;
    }
};
