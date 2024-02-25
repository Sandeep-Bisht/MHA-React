import * as CONSTANT from './constants';

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONSTANT.GET_PRODUCTS_BY_CATEGORIES_SUCCESS :
            return {
                ...state,
                productByCategoriesSuccess : action.response
            }

            case CONSTANT.GET_PRODUCTS_BY_CATEGORIES_FAILURE :
                return {
                    ...state,
                    productByCategoriesFailure : action.error
                }
        case CONSTANT.RESET_PRODUCT_LIST_TO_INITIAL_STATE :
            return {
                productByCategoriesSuccess : ""
            }
                

        default:
            return state;
    }
};
