import React, { Component } from 'react';
import {
    bool,
    func,
    shape,
    string,
} from 'prop-types';
import { Field } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { isEmpty } from 'lodash';

import './style.scss';

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.fields = [
            {
                myLabel: 'Name',
                name: 'name',
                type: 'text',
            },
            {
                myLabel: 'Weight',
                name: 'weight',
                type: 'text',
            },
            {
                myLabel: 'Availability',
                name: 'availability',
                type: 'number',
            },
            {
                myLabel: 'Product URL',
                name: 'productUrl',
                type: 'text',
            },
            {
                myLabel: 'Price Tier',
                name: 'pricingTier',
                type: 'radio',
            },
            {
                myLabel: 'Price Range',
                name: 'priceRange',
                type: 'select',
            },
            {
                myLabel: 'Is Editable',
                name: 'isEditable',
                type: 'checkbox',
            }
        ];
    }

    componentDidMount() {
        const {
            autofill,
            productToBeEdited: {
                name = '',
                weight = '',
                availability = 0,
                productUrl = '',
                pricingTier = '',
                priceRange = '',
                isEditable = false,
            } = {},
        } = this.props;
        autofill('name', name);
        autofill('weight', weight);
        autofill('availability', availability);
        autofill('productUrl', productUrl);
        autofill('pricingTier', pricingTier);
        autofill('priceRange', priceRange);
        autofill('isEditable', isEditable);
    }

    componentWillUnmount() {
        const { 
            initiateProductEdit,
            resetUpdateProductInfo,
        } = this.props;
        resetUpdateProductInfo();
        initiateProductEdit(-1);
    }

    renderInputField = ({
        input = {},
        meta: {
            touched = false,
            error = '',
        } = {},
        myLabel = '',
        type = '',
    } = {}) => {
        const {
            pricingInfo = {},
            pricingTier = '',
        } = this.props;
        const showError = touched && error;
        const showVerified = touched && !error;
        const className = `form-input mt-0 ${showError && 'has-error'} ${showVerified && 'has-no-error'}`;
        return (
            <div className={className}>
                <label>{myLabel}</label>
                {
                    type === 'radio'
                    && Object.keys(pricingInfo).map((radioLabel, index) => {
                        return (
                            <label key={`pricingTier${index}`}>
                                <input className="m-2" type={type} data-toggle="tooltip" data-placement="auto" title={`${myLabel} to be chosen here`} {...input} checked={pricingTier === radioLabel} value={radioLabel} />
                                { radioLabel }
                            </label>
                        );
                    })
                }
                {
                    ['checkbox', 'number', 'text'].includes(type)
                    && <input type={type} data-toggle="tooltip" data-placement="auto" title={`${myLabel} to be provided here`} {...input} />
                }
                {
                    type === 'select'
                    && (
                        <select data-toggle="tooltip" data-placement="auto" title={`${myLabel} to be selected here`} {...input}>
                        {
                            pricingInfo[pricingTier].map((pricingTierValue, index) => (
                                <option key={`pricingInfo_${pricingTier}${index}`} value={pricingTierValue}>{ pricingTierValue }</option>
                            ))
                        }
                        </select>
                    )
                }
                {
                    showError
                    && <div className="error">{error}</div>
                }
            </div>
        )
    }

    onSubmit = (values = {}) => {
        const {
            updateProductInfo,
        } = this.props;
        updateProductInfo(values);
    }
    
    render() {
        const {
            handleSubmit,
            invalid = true,
            pricingTier = '',
            productToBeEdited = {},
            updateProductInfoFlag = false,
        } = this.props;

        return (
            <div className="container">
                <div className="row">
                    {
                        pricingTier
                        && (
                            <form className="edit-product-form" onSubmit={handleSubmit(this.onSubmit)}>
                                <br />
                                <fieldset className="border p-4">
                                    <legend className="w-auto mb-0">Edit Product</legend>
                                    {
                                        this.fields.map(({
                                            myLabel = '',
                                            name = '',
                                            type = '',
                                        }, index) => (
                                            <Field
                                                key={`${pricingTier}${index}`}
                                                myLabel={myLabel}
                                                name={name}
                                                type={type}
                                                component={this.renderInputField}
                                            />
                                        ))
                                    }
                                </fieldset>
                                <br />
                                <input className="d-block m-auto" type="submit" value="Submit" disabled={invalid} />
                                <br />
                            </form>
                        )
                    }
                    {
                        updateProductInfoFlag && <Redirect to="/" />
                    }
                    {
                        !pricingTier
                        && isEmpty(productToBeEdited)
                        && "Generic error message and/or remedial instructions."
                    }
                </div>
            </div>
        );
    }
}

EditProduct.propTypes = {
    handleSubmit: func,
    initiateProductEdit: func,
    invalid: bool,
    pricingInfo: shape(),
    pricingTier: string,
    productToBeEdited: shape(),
    updateProductInfo: func,
    updateProductInfoFlag: bool,
};

export default EditProduct;