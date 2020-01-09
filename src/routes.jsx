import React from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';

import EditProductContainer from './Products/EditProduct/container';
import ProductsContainer from './Products/container';

const Routes = () => (
    <Switch>
        <Route path="/edit-product" exact component={EditProductContainer} />
        <Route path="/" component={ProductsContainer} />
    </Switch>
);

export default Routes;