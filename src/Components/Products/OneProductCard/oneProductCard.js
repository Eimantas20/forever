import React from 'react';
import {
    Link,
    useRouteMatch
} from "react-router-dom";
import './oneProductCard.css';

function OneProductCard(props) {
    let { url } = useRouteMatch();
    const {picture, name, category, price, short_description} = props.singleProduct;
    return (
        <div className="card">
            <div className="card__content">
                <div className="card__front">
                        <Link to={`${url}/${props.singleProduct.id}`}>
                            <img className="productImage" src={picture} alt="Product" />
                        </Link>
                        <h5 className="card__name">{name}</h5>
                        <p className="card__category">{category}</p>
                        <p className="card__price" style={{ margin: "0.2rem" }}>€ {price}</p>
                        <div className="hideOnWide">
                            <button className="deleteOrderButton" onClick={() => props.changeQuantities(props.singleProduct, 100)}>Į krepšelį</button>
                        </div>
                </div>
                <div className="card__back">
                    <Link to={`${url}/${props.singleProduct.id}`}>
                        <img className="productImage" src={picture} alt="Product" />
                        <p className="card__back__description">{short_description}</p>
                        <div>
                            <button className="deleteOrderButton card__body" >Užsakyti</button>
                        </div>
                    </Link>
                </div>  
            </div>
        </div>
    )
}

export default OneProductCard;
