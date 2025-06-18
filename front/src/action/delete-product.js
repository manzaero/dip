import { ACTION_TYPE } from '../action/index.js';

export const deleteProduct = (id) => ({
    type: ACTION_TYPE.DELETE_PRODUCT,
    payload: id,
});
