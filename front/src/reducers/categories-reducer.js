import {ACTION_TYPE} from "../action/index.js";

const initialCategoriesState = []

export const categoriesReducer = (state = initialCategoriesState, action) => {
    switch (action.type) {
        case ACTION_TYPE.LOAD_CATEGORIES:
            return Array.isArray(action.payload) ? action.payload : state
        default:
            return state
    }
}