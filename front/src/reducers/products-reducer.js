import {ACTION_TYPE} from "../action/index.js";

const initialProductsState = {
    items: [], lastPage: 1
}

export const productsReducer = (state = initialProductsState, action) => {
    switch (action.type) {
        case ACTION_TYPE.LOAD_PRODUCTS :
            return {
                ...state,
                items: Array.isArray(action.payload.products) ? action.payload.products : [],
                lastPage: action.payload.lastPage || 1
            }
        case ACTION_TYPE.ADD_PRODUCT:
            return {
                ...state,
                items: [...state.items, action.payload],
            }
        case ACTION_TYPE.DELETE_PRODUCT:
            return {
                ...state,
                items: state.items.filter(product => product.id !== action.payload)
            }
        default:
            return state
    }
}