import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useParams,
    useRouteMatch
} from "react-router-dom";
import PropTypes from 'prop-types';
import './AllProducts.css';
import FullProductDescription from './FullProductDescription.js';


function OneProductCard(props) {

    let {path, url} = useRouteMatch();
    const [ bgColor, changeColor ] = useState("");


    const addNCount = (props) => {
        addToCart(props);
        props.updateCartItemsCount()
    }
    const addToCart = (props) => {
        let oldItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        // console.log(oldItems)

        if (!oldItems.find(product => product.id == props.singleProduct.id)) {
            let newItem = {
                'id': props.singleProduct.id,
                'quantity': 1
            };
            oldItems.push(newItem);
           
        } else if (oldItems.find(product=>product.id == props.singleProduct.id && product.quantity < 10)) {
            let currentQuantity = oldItems.find(product=>product.id == props.singleProduct.id).quantity;
            oldItems.find(product => product.id == props.singleProduct.id).quantity = currentQuantity + 1
           
        }
        localStorage.setItem('cartItems', JSON.stringify(oldItems))
    }
    return (
        <div className="productBox">
            <div>
                <div>
                    <Link to={`${url}/${props.singleProduct.id}`}>
                        {/* <button>asjdnas</button> */}
                        {/* <img onClick={() => props.changeViewButton(props.singleProduct)} className="productImage" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product picture" /> */}
                        <img className="productImage" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product picture" />
                    </Link>

                    <h1 style={{ fontSize: "2rem" }}>{props.singleProduct.name}</h1>
                    <h3 style={{ fontSize: "1rem" }}>{props.singleProduct.description}</h3>
                    <p style={{ margin: "0.2rem" }}>€ {props.singleProduct.price}</p>
                    {/* <button className="orderButton" style={{backgroundColor: bgColor}} onClick={()=>joined(props)}>Užsakyti</button> */}
                </div>
            </div>
            <div> 
                {/* <input type="text" onChange={onChange} /> */}
                <button onClick={() => props.changeQuantities(props.singleProduct, -100)}>order ME</button>
                
            </div>  
        </div>
    )
}

export default OneProductCard;