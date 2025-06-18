import {ACTION_TYPE} from "./action-type.js";

export const selectedProducts = (product) => ({
    type: ACTION_TYPE.SELECT_PRODUCT,
    payload: product
})