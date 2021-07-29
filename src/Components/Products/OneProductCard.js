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

    return (
        <div className="productBox">
            <div>
                <div>
                    <Link to={`${url}/${props.singleProduct.id}`}>
                        <img className="productImage" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product picture" />
                    </Link>
                    <h1 style={{ fontSize: "2rem" }}>{props.singleProduct.name}</h1>
                    <h3 style={{ fontSize: "1rem" }}>{props.singleProduct.description}</h3>
                    <p style={{ margin: "0.2rem" }}>€ {props.singleProduct.price}</p>
                </div>
            </div>
            <div> 
                <button onClick={() => props.changeQuantities(props.singleProduct, 100)}>order ME</button>
            </div>  
        </div>
    )
}

export default OneProductCard;