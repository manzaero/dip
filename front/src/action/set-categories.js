import {ACTION_TYPE as ACTION_TYPES} from "./action-type.js";

export const setCategories = (categories) => ({
    type: ACTION_TYPES.SET_CATEGORIES,
    payload: categories,
})