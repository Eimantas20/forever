import React from 'react';
import PropTypes from 'prop-types';
import Cart from './Cart/Cart.js';
// import Cart, { addToCart } from './Cart/Cart.js';
// import AllProducts, { addToCart } from './Products/AllProducts.js';

// this.addToCart();
const OneProductCard = props => {
    const {
        cca2: 
            code2 = '', 
            region = null, 
            name = {}, 
            description = '', 
            id = null, 
            price = null
    } = props.singleProduct || {};

 

    return (
        <div className="productBox">
            <div>
                <p>{id}</p>
                <h1>{name}</h1>
                <p>€ {price}</p>
                <h3>{description}</h3>
                <button onClick={window.OneProductCard.addToCart()}>Uzsakyti</button>
            </div>
        </div>
    )
}
//
OneProductCard.propTypes = {
    country: PropTypes.shape({
        cca2: PropTypes.string.isRequired,
        region: PropTypes.string.isRequired,
        name: PropTypes.shape({
            common: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default OneProductCard;