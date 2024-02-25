import * as CONSTANTS from './constants'

export let getProductDetails = (productId) => {
    return {
        type: CONSTANTS.GET_PRODUCTS_DETAILS,
        productId
    }
}


export let addProductToCart = (payload, cartId) => {
    return {
        type: CONSTANTS.ADD_PRODUCT_TO_CART,
        payload,
        cartId
    }
}

export let addProductQuantityToCart = (productQuantity) => {
    return {
        type: CONSTANTS.ADD_PRODUCT_QUANTITY_TO_CART,
        productQuantity,
    }
}

export function resetToInitialState() {
    return {
        type: CONSTANTS.RESET_TO_INITIAL_STATE,
    };
}

// ==============Get Multiple Images===============
 export function getProductMultipleImages(productId) {
    return {
        type : CONSTANTS.GET_PRODUCT_MULTIPLE_IMAGES,
        productId
    }
 }

 //==================Get Similar Product List===================
 export let getSimilarProductsList = (productId) => {
    return {
        type : CONSTANTS.GET_SIMILAR_PRODUCTS_LIST,
        productId
    }
}

export let getSimilarProductsListById = (productId) => {
    return {
        type : CONSTANTS.GET_SIMILAR_PRODUCT_BY_ID,
        productId
    }
}