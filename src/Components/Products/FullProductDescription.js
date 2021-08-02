import React, { useEffect, useState, useRef, useReducer } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';

const myorgvalue = 999999999999999999999;
const startValue = {
    viewingProduct: {},
    viewingProductQuantity: 0
}
function FullProductDescription(props, startValue) {
   
    let productsInCartFromLocalStorage = JSON.parse(localStorage.getItem('cartItems')) || [];
    const [viewingProductQuantity, setViewingProductQuantity] = useState(0);
    const [viewingProduct, setViewingProduct] = useState({});

    const [sideEffect, handleSideEffect] = useState(0);
    let { url, match } = useRouteMatch();
    let choosenProductId = parseInt(props.match.params.id);
    let kiekis;
    
    useEffect(()=> {
        handleChanges(props)
    }, [props.productsInCart, viewingProductQuantity]);
    
    function handleChanges(props) {

        let allProductsFromDB = Object.values(props.products);
        let productsLength = Object.keys(allProductsFromDB).length;

        if (productsLength > 0) {
            
            if (productsInCartFromLocalStorage.find(product => product.id == choosenProductId)) {
                kiekis = productsInCartFromLocalStorage.find(product => product.id == choosenProductId).quantity;
            }
            let myProduct = allProductsFromDB.find(product => product.id == choosenProductId)
            setViewingProduct(myProduct);
            setViewingProductQuantity(kiekis || 0)
        }
    }

    return (viewingProduct?
        <div className="fullDescription">
            <div className="gridLayout">
                <div>
                    <img className="fullDescriptionImage" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product picture" />
                </div>
                <div className="mainProductInfo">
                    <h1>{viewingProduct.name}</h1>
                    <h3>{viewingProduct.category}</h3>
                    <h3>€ {viewingProduct.price}</h3>
                    <h3>{viewingProduct.description}</h3> 
                    <div className="smallerGap">
                        <p>Kiekis</p>
                        <p>porciju skaicius</p> {props.clicked}
                    </div>
                    <div>
                        {viewingProductQuantity < 1 ?
                            <button className="orderbutton" onClick={() => props.changeQuantities(viewingProduct, 100)}>Į krepšelį</button>    
                           :<div>
                               <p style={{ display: "inline-block" }}>Kiekis</p>
                                <button className="incDec, orderbutton" onClick={() => props.changeQuantities(viewingProduct, -1)}>-</button>
                                {viewingProductQuantity}
                                <button className="incDec, orderbutton" onClick={() => props.changeQuantities(viewingProduct, +1)}>+</button><br />
                                <button className="deleteProduct, orderbutton" onClick={() => props.changeQuantities(viewingProduct, -100)}>Pašalinti prekę</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into 
                 electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                 and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        </div>
        :null
    )
}

export default FullProductDescription;
