import {ACTION_TYPE} from "./action-type.js";

export const decrementFromCart = (id) => ({
    type: ACTION_TYPE.DECREMENT_FROM_CART,
    payload: {id}
})