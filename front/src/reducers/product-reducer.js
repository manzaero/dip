import { ACTION_TYPE } from "../action/index.js";

const initialState = {
    selectedProduct: null,
    notFound: false,
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SELECT_PRODUCT:
            return {
                selectedProduct: action.payload,
                notFound: false,
            };
        case ACTION_TYPE.PRODUCT_NOT_FOUND:
            return {
                selectedProduct: null,
                notFound: true,
            };
        default:
            return state;
    }
};
