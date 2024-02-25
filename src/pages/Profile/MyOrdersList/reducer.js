import * as CONSTANTS from './constant';

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONSTANTS.GET_MY_ORDER_IDS_SUCCESS :
            return {
                ...state,
                getMyOrderIdSuccess: action.response,
            };

        case CONSTANTS.GET_MY_ORDER_IDS_FAILURE :
            return {
                ...state,
                getMyOrderIdSuccess: action.error,
            };        
    

        default:
            return state;
    }
};
