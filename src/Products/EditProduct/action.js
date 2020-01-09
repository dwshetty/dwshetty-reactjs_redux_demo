import {
    UPDATE_PRODUCT_INFO,
    UPDATE_PRODUCT_INFO_COMPLETED,
} from './actionTypes';

export const updateProductInfo = (product = {}) => ({
    type: UPDATE_PRODUCT_INFO,
    payload: product,
});

export const resetUpdateProductInfo = (product = {}) => ({
    type: UPDATE_PRODUCT_INFO_COMPLETED,
});