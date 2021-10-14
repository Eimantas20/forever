import React, { useEffect, useState } from 'react';
import './fullProductDescription.css';

function FullProductDescription(props) {
    let productsInCartFromLocalStorage = JSON.parse(localStorage.getItem('cartItems')) || [];
    const [viewingProductQuantity, setViewingProductQuantity] = useState(0);
    const [viewingProduct, setViewingProduct] = useState({});
    const [flavors, setFlavors] = useState([]);
    const [nutritionClassName, setNutritionClassName] = useState('detailedInfo')
    let choosenProductId = parseInt(props.match.params.id);
    let kiekis;
    
    useEffect(()=> {
        handleChanges(props)
        //Need to have these dependencies on which change the screen will rerender (props.products for page reload with selected product)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.productsInCart, props.products]);

    function handleChanges(props) {
        let neededFlavor = '';
        let allProductsFromDB = Object.values(props.products);
        let productsLength = Object.keys(allProductsFromDB).length;

        if (productsLength > 0) {
            let foundProduct = allProductsFromDB.find(product => product.id === choosenProductId);
            setViewingProduct(foundProduct);
            if( foundProduct.flavor !== null ) {
                setFlavors(foundProduct.flavor.split('\n'))
                if (document.getElementById('flavors') == null) {
                    neededFlavor = foundProduct.flavor.split('\n')[0]
                } else {
                    neededFlavor = document.getElementById('flavors').value
                }
            } 
            
            // ON INITIAL LOAD - NO FLAVOR
            if (foundProduct.flavor === null && productsInCartFromLocalStorage.find(product => product.id === choosenProductId)) {
                kiekis = productsInCartFromLocalStorage.find(product => product.id === choosenProductId).quantity;
            }
            //HAS A FLAVOR
            if (foundProduct.flavor !== null && productsInCartFromLocalStorage.find(product => product.id === choosenProductId && neededFlavor === product.desiredFlavor)) {
                kiekis = productsInCartFromLocalStorage.find(product => product.id === choosenProductId && neededFlavor ===  product.desiredFlavor).quantity;
            }

            if (foundProduct.flavor !== null) {
                setFlavors(foundProduct.flavor.split('\n'))
                neededFlavor = foundProduct.flavor.split('\n')[0]
            } else if (productsInCartFromLocalStorage.find(product => product.id === choosenProductId)) {
                kiekis = productsInCartFromLocalStorage.find(product => product.id === choosenProductId).quantity;
            }
            setViewingProductQuantity(kiekis || 0)
            return !foundProduct.nutrition_info ? setNutritionClassName('displayNone')
                : !foundProduct.nutrition_percentage ? (setNutritionClassName('detailedInfoNameAmount'))
                    : !foundProduct.nutrition_amount ? (setNutritionClassName('detailedInfoNamePerc'))
                        
            :null
        }
    }

    const pickFlavor = () => {
        let flavor = document.getElementById('flavors').value
        // console.log('paleido')
        kiekis = 0;
        if (productsInCartFromLocalStorage.find(product => product.id === choosenProductId && product.desiredFlavor === flavor)) {
            kiekis = productsInCartFromLocalStorage.find(product => product.id === choosenProductId && product.desiredFlavor === flavor).quantity;
        }
        setViewingProductQuantity(kiekis)
    }

    return (viewingProduct ?
        <div className="fullDescription">
            <div className="gridLayout">
                <div>
                    <img className="fullDescriptionImage" src={viewingProduct.picture} alt="Product" />
                </div>
                <div className="mainProductInfo">
                    <h1>{viewingProduct.name}</h1>
                    <h3>{viewingProduct.category} | {viewingProduct.product_code}</h3>
                    <p>{viewingProduct.short_description}</p>
                    {flavors.length > 1 ? 
                        <select name='flavors' id='flavors' onChange={() => pickFlavor()}>
                            {flavors.map((flavor) => {
                               return  <option key={flavor} value={flavor}>{flavor}</option>
                            })}
                        </select>
                    : null}
                    <p>Kiekis: <br />{viewingProduct.amount}</p>
                    <div className="smallerGap">
                        <h3>€ {viewingProduct.price}</h3>
                    </div>
                    <div>
                        {viewingProductQuantity === 0 ?
                            <button className="deleteOrderButton" onClick={() => props.changeQuantities(viewingProduct, 100)}>Į krepšelį</button>
                           :<div>
                                <button className="incDec" onClick={() => props.changeQuantities(viewingProduct, -1)}>-</button>
                                {viewingProductQuantity}
                                <button className="incDec" onClick={() => props.changeQuantities(viewingProduct, +1)}>+</button><br />
                                <button className="deleteOrderButton" onClick={() => props.changeQuantities(viewingProduct, -100)}>Pašalinti prekę</button>
                            </div>
                        }
                    </div>
                </div>
                    <h4>Aprašymas:</h4>
                    <p className="aboutProduct">{viewingProduct.description}</p>
                    <p className="aboutProduct">{viewingProduct.daily_recommendation}</p>
                    <p className="aboutProduct">{viewingProduct.other_ingredients}</p>
                </div>
                <div className={nutritionClassName}>
                    <p>{viewingProduct.nutrition_info}</p>
                    <p className="alignRight">{viewingProduct.nutrition_amount}</p>
                    <p className="alignRight">{viewingProduct.nutrition_percentage}</p>
                </div>
                <p>{viewingProduct.explanations}</p>
        </div>
        :null
    )
}

export default FullProductDescription;
