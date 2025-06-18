import {ACTION_TYPE} from "./action-type.js";

export const setCart = (cartData) => ({
    type: ACTION_TYPE.SET_CART,
    payload: cartData,
})