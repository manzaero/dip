import {ACTION_TYPE} from "./action-type.js";

export const loadCategories = (categories) => ({
    type: ACTION_TYPE.LOAD_CATEGORIES,
    payload: categories
})