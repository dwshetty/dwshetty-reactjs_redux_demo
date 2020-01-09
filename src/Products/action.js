import { batchActions } from 'redux-batched-actions';

import {
    SET_PRICING_INFO,
    SET_PRODUCTS_LIST,
    SET_PRODUCT_INDEX_TO_BE_EDITED,
} from './actionTypes';

export const fetchProductsList = () => (dispatch) => {
    fetch('products.json')
        .then(res => res.json())
        .then(({
            products = [],
            pricingInfo = {},
        }) => {
                dispatch(batchActions(
                    [
                        {
                            type: SET_PRICING_INFO,
                            payload: pricingInfo,
                        },
                        {
                            type: SET_PRODUCTS_LIST,
                            payload: products,
                        },
                    ]
                ));
            }
        )
        .catch(e => console.error(e));
};

export const initiateProductEdit = (payload = -1) => ({
    type: SET_PRODUCT_INDEX_TO_BE_EDITED,
    payload,
});