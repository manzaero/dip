import {ROLE} from "../constants/index.js";
import {ACTION_TYPE} from "../action/index.js";

const initialUserState = {
    id: null,
    email: null,
    login: null,
    roleId: ROLE.GUEST,
    session: null,
}

export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_USER: {
            return {
                ...state,
                id: action.payload.id,
                login: action.payload.login,
                email: action.payload.email,
                roleId: action.payload.roleId,
            }
        }
        case ACTION_TYPE.LOGOUT: {
            return initialUserState;
        }
        default:
            return state
    }
}