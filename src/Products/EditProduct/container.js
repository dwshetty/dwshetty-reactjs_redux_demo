import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

import EditProduct from './index';
import {
  resetUpdateProductInfo,
  updateProductInfo,
} from './action';
import { initiateProductEdit } from '../action';

const validate = ({
  name = '',
  weight = '',
  productUrl = '',
  pricingTier = '',
  priceRange = '',
}) => {
  const errors = {};

  if(!name) {
      errors.name = 'Please specify a name';
  }
  if(!weight) {
      errors.weight = 'Please specify a weight';
  }
  if(!productUrl) {
      errors.productUrl = 'Please specify a product URL';
  }
  if(!pricingTier) {
      errors.pricingTier = 'Please specify a pricing tier';
  }
  if(!priceRange) {
      errors.priceRange = 'Please specify a price range';
  }

  return errors;
}

const mapStateToProps = ({
  form: {
    EditProduct: {
      values: {
        pricingTier = '',
      } = {},
    } = {},
  },
  products: {
    pricingInfo = {},
    productIndex = -1,
    productsList = [],
    updateProductInfoFlag = false,
  },
}) => ({
  pricingInfo,
  pricingTier,
  productToBeEdited: productsList[productIndex] || {},
  updateProductInfoFlag,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  initiateProductEdit,
  resetUpdateProductInfo,
  updateProductInfo,
}, dispatch);

const EditProductContainer = connect(mapStateToProps, mapDispatchToProps)(EditProduct);

export default reduxForm({
  form: 'EditProduct',
  validate,
})(EditProductContainer);