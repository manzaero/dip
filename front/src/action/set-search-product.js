import {ACTION_TYPE} from "./action-type.js";

export const setSearchProduct = (item) => ({
    type: ACTION_TYPE.SEARCH_PRODUCT,
    payload: item
})