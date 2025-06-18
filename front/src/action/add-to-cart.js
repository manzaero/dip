import {ACTION_TYPE} from "./action-type.js";

export const addToCart = (product) => ({
    type: ACTION_TYPE.ADD_TO_CART,
    payload: product
})