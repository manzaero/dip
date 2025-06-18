import {ACTION_TYPE} from "./action-type.js";

export const incrementFromCart = (id) => ({
    type: ACTION_TYPE.INCREMENT_FROM_CART,
    payload: {id}
})