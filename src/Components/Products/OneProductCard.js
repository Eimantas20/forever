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
import './oneProductCard.css';
import PropTypes from 'prop-types';
import './AllProducts.css';
import FullProductDescription from './FullProductDescription.js';

function OneProductCard(props) {
   
    let {path, url} = useRouteMatch();
    const [ bgColor, changeColor ] = useState("");
    let sampleText = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical 
        Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in 
        Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the 
        word in classical literature, discovered the undoubtable source.`
    console.log(props.singleProduct)
    return (
        <div className="card">
            <div className="card__content">
                <div className="card__front">
                   
                        <Link to={`${url}/${props.singleProduct.id}`}>
                            <img className="productImage" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product" />
                        </Link>
                        <h5 className="card__title">{props.singleProduct.name}</h5>
                        <p className="card__category">{props.singleProduct.description}</p>
                        <p className="card__subtitle" style={{ margin: "0.2rem" }}>€ {props.singleProduct.price}</p>
                    
                </div>
                <div className="card__back">
                    <div>
                        <p className="card__back__description">{sampleText}</p>

                    </div>
                    <Link to={`${url}/${props.singleProduct.id}`}>
                        <img className="productImage" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product" />
                    </Link>
                    <button className="deleteOrderButton card__body" onClick={() => props.changeQuantities(props.singleProduct, 100)}>Į krepšelį</button>
                </div>  
            </div>
        </div>
    )
}

export default OneProductCard;





// import React, { useEffect, useState } from 'react';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     NavLink,
//     useParams,
//     useRouteMatch
// } from "react-router-dom";
// import PropTypes from 'prop-types';
// import './AllProducts.css';
// import FullProductDescription from './FullProductDescription.js';

// function OneProductCard(props) {

//     let { path, url } = useRouteMatch();
//     const [bgColor, changeColor] = useState("");

//     return (
//         <div className="productBox">
//             <div>
//                 <div>
//                     <Link to={`${url}/${props.singleProduct.id}`}>
//                         <img className="productImage" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product" />
//                     </Link>
//                     <h5>{props.singleProduct.name}</h5>
//                     <p>{props.singleProduct.description}</p>
//                     <p style={{ margin: "0.2rem" }}>€ {props.singleProduct.price}</p>
//                 </div>
//             </div>
//             <div>
//                 <button className="deleteOrderButton" onClick={() => props.changeQuantities(props.singleProduct, 100)}>Į krepšelį</button>
//             </div>
//         </div>
//     )
// }

// export default OneProductCard;