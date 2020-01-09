import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { enableBatching } from 'redux-batched-actions';

import rootReducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk))(createStore);
const store = createStoreWithMiddleware(enableBatching(persistedReducer));
const persistor = persistStore(store);

export {
  store,
  persistor,
};