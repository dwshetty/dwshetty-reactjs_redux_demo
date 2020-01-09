import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

import {
    store,
    persistor,
} from './store';
import Routes from './routes'; 

const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
