import {ACTION_TYPE} from "./action-type.js";

export const addProduct = (product) => ({
    type: ACTION_TYPE.ADD_PRODUCT,
    payload: product
})