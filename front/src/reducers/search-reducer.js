import {ACTION_TYPE, ACTION_TYPE as ACTIONS} from "../action/index.js";

const initialState = {
    searchProduct: "",
    setCategory: null
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SEARCH_PRODUCT:
            return {...state, searchProduct: action.payload}
        case ACTION_TYPE.SET_CATEGORIES:
            return {...state, setCategory: action.payload}
        default:
            return state
    }
}