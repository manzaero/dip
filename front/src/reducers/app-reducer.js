import {ACTION_TYPE} from "../action/index.js";

const initialState = {
    wasLogout: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE.LOGOUT:
            return {
                ...state,
                wasLogout: !state.wasLogout
            }
        default:
            return state;
    }
}