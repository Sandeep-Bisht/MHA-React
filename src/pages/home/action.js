import * as CONSTANTS from './constants';

export let getProductList = (pageSize) => {
    return {
        type:CONSTANTS.GET_PRODUCTS,
        pageSize
    }
}


export let getUserCartId = (accountId) => {
    return {
        type : CONSTANTS.GET_USER_CART_ID,
        accountId
    }
}

export let resetUserCartIdToInitialState = () => {
    return {
        type : CONSTANTS.RESET_USER_CART_ID,
        
    }
}

export let addProductQuantityCount = (productQuantityCount) => {
    return {
        type : CONSTANTS.PRODUCT_COUNT_IN_CART,
        productQuantityCount
    }
}

export let getNewArrivalsProduct = (pageSize) => {
    return {
        type : CONSTANTS.GET_NEW_ARRIVALS_PRODUCT,
        pageSize
    }
}

export let getBlogs = (pageSize) => {
    return {
        type : CONSTANTS.GET_BLOG_LIST,
        pageSize
    }
}

export let getStructuredContent = (payload) => {
    return {
        type : CONSTANTS.GET_STRUCTURED_CONTENT,
        payload
    }
}


