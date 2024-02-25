import * as CONSTANTS from "./constant";

export const getAllCategoriesName = (payload) => {
    return{
        type : CONSTANTS.GET_ALL_CATEGORIES,
        payload
    }
}


