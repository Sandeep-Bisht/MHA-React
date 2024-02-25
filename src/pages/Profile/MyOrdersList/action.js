import * as CONSTANTS from "./constant"

export function getOrderIds(accountId, pageSize){
    return{
        type : CONSTANTS.GET_MY_ORDER_IDS,
        accountId,
        pageSize
    }
}