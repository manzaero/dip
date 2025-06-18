import {ACTION_TYPE} from "../action/index.js";

const loadCartFromStorage = () => {
    try {
        const storeCart = JSON.parse(localStorage.getItem("cart"));
        if (
            storeCart &&
            Array.isArray(storeCart.items) &&
            typeof storeCart.sum === 'number'
        ) {
            return storeCart;
        }
    } catch (e) {
        console.warn('Failed to parse', e);
    }
    return {
        items: [],
        sum: 0
    };
}


const initialState = loadCartFromStorage();

export const cartReducer = (state = initialState, action) => {
    let newState;
    if (!state || !Array.isArray(state.items)) {
        console.error('Invalid cart state:', state);
        return {
            items: [],
            sum: 0,
        };
    }

    switch (action.type) {
        case ACTION_TYPE.ADD_TO_CART:
            if (!action.payload || (!action.payload.id && !action.payload._id)) {
                console.error('Invalid payload', action.payload);
                return state;
            }
            const itemId = action.payload.id || action.payload._id;
            if (state.items.find(item => item.id === itemId)) {
                newState = {
                    ...state,
                    items: state.items.map(item =>
                        item.id === itemId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                    sum: state.sum + action.payload.price,
                };
            } else {
                newState = {
                    ...state,
                    items: [
                        ...state.items,
                        {
                            ...action.payload,
                            id: itemId,
                            quantity: 1,
                        },
                    ],
                    sum: state.sum + action.payload.price,
                };
            }
            break;

        case ACTION_TYPE.REMOVE_TO_CART: {
            const removed = state.items.find(item => item.id === action.payload.id);
            newState = {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
                sum: removed ? state.sum - removed.price * removed.quantity : state.sum,
            };
            break;
        }

        case ACTION_TYPE.DECREMENT_FROM_CART: {
            const targetCart = state.items.find(item => item.id === action.payload.id);
            if (!targetCart) {
                return state;
            }
            if (targetCart.quantity === 1) {
                newState = {
                    ...state,
                    items: state.items.filter(item => item.id !== action.payload.id),
                    sum: state.sum - targetCart.price,
                };
            } else {
                newState = {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ),
                    sum: state.sum - targetCart.price,
                };
            }
            break;
        }

        case ACTION_TYPE.SET_CART:
            newState = {
                items: action.payload.items,
                sum: action.payload.sum,
            };
            break;

        case ACTION_TYPE.INCREMENT_FROM_CART: {
            const targetCart = state.items.find(item => item.id === action.payload.id);
            if (!targetCart) {
                return state;
            }
            newState = {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
                sum: state.sum + targetCart.price,
            };
            break;
        }

        case ACTION_TYPE.CLEAR_CART:
            newState = {
                items: [],
                sum: 0,
            };
            break;

        default:
            return state;
    }

    localStorage.setItem('cart', JSON.stringify(newState));
    return newState;
};