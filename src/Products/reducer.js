import {
    SET_PRICING_INFO,
    SET_PRODUCTS_LIST,
    SET_PRODUCT_INDEX_TO_BE_EDITED,
} from './actionTypes';
import {
    UPDATE_PRODUCT_INFO,
    UPDATE_PRODUCT_INFO_COMPLETED,
} from './EditProduct/actionTypes';

const updateProductsList = (productsList = [], productIndex = -1, updatedProduct = {}) => {
    productsList[productIndex] = updatedProduct;
    return productsList;
};

const productsReducer = (state = {}, { type = '', payload = {} } = {}) => {
    switch(type) {
        case SET_PRICING_INFO:
            return {
                ...state,
                pricingInfo: payload,
            };
        case SET_PRODUCTS_LIST:
            return {
                ...state,
                productsList: payload,
            };
        case SET_PRODUCT_INDEX_TO_BE_EDITED:
            return {
                ...state,
                productIndex: payload,
            };
        case UPDATE_PRODUCT_INFO:
            return {
                ...state,
                productsList: updateProductsList(state.productsList, state.productIndex, payload),
                updateProductInfoFlag: true,
            };
        case UPDATE_PRODUCT_INFO_COMPLETED:
            return {
                ...state,
                updateProductInfoFlag: false,
            };
        default:
            return state;
    }
};

export default productsReducer;