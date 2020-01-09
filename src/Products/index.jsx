import React, { useEffect } from 'react';
import {
    arrayOf,
    func,
    shape
} from 'prop-types';
import { Link } from 'react-router-dom';

const Products = ({
    fetchProductsList,
    initiateProductEdit,
    productsList = [],
    productsListCount = -1,
}) => {
    useEffect(() => {
        if (productsListCount === 0) {
            fetchProductsList();
        }
    }, [fetchProductsList, productsListCount]);

    const handleEditClick = ({
        target: {
            dataset: {
                index = -1,
            } = {}
        } = {}
    }) => {
        initiateProductEdit(parseInt(index));
    };

    return (
        <div className="container">
            <div className="row table-responsive-md">
                {
                    productsListCount > 0
                    ? (
                        <table className="table table-hover">
                            <caption className="text-center">List of Products</caption>
                            <thead className="thead-dark">
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Weight</th>
                                    <th className="text-center">Availability</th>
                                    <th className="text-center">isEditable</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productsList.map(({
                                        name = '',
                                        weight = '',
                                        availability = '',
                                        isEditable = false
                                    }, index) => (
                                        <tr key={`product_${index}`}>
                                            <td className="text-center">{ name }</td>
                                            <td className="text-center">{ weight }</td>
                                            <td className="text-center">{ availability }</td>
                                            <td className="text-center">
                                                { 
                                                    isEditable
                                                    && (
                                                        <Link to="edit-product">
                                                            <button
                                                                data-index={index}
                                                                onClick={handleEditClick}
                                                            >
                                                                Edit
                                                            </button>
                                                        </Link>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                    : (
                        (
                            productsListCount === -1
                            && "Loading . . ."
                        )
                        || (
                            productsListCount === 0
                            && "Generic error message and/or remedial instructions."
                        ) 
                    )
                }
            </div>
        </div>
    );
};

Products.propTypes = {
    fetchProductsList: func,
    initiateProductEdit: func,
    productsList: arrayOf(shape()),
};

export default Products;