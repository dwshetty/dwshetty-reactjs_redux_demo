import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Products from './index';
import {
  fetchProductsList,
  initiateProductEdit
} from './action';

const mapStateToProps = ({
  products: {
    productsList = [],
  },
}) => ({
    productsList,
    productsListCount: productsList.length,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchProductsList,
  initiateProductEdit
}, dispatch);

const ProductsContainer = connect(mapStateToProps, mapDispatchToProps)(Products);

export default ProductsContainer;