import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import productsReducer from './Products/reducer';

const rootReducer = combineReducers({
    products: productsReducer,
    form: formReducer,
});

export default rootReducer;