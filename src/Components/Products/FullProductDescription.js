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
    const [flavors, setFlavors] = useState([]);
    const [defaultFlavor, setDefaultFlavor] = useState('');
    const [sideEffect, handleSideEffect] = useState(0);
    const [nutritionClassName, setNutritionClassName] = useState('detailedInfo')
    let { url, match } = useRouteMatch();
    let choosenProductId = parseInt(props.match.params.id);
    let kiekis;
    
    useEffect(()=> {
        handleChanges(props)
        // blet reik perdaryt ta handle chagnes taip kad butu su flavors ir tada paziurek tiksliau kada reik rerenderingo - pagal kuriuos var.
    // }, [props.productsInCart, viewingProductQuantity]);
    }, [props.productsInCart]);

    function handleChanges(props, e) {
 
        let neededFlavor = '';
        let allProductsFromDB = Object.values(props.products);
        let productsLength = Object.keys(allProductsFromDB).length;

        if (productsLength > 0) {
            let foundProduct = allProductsFromDB.find(product => product.id == choosenProductId);
            let checking = foundProduct.hasOwnProperty('flavor')
            setViewingProduct(foundProduct);
            if( foundProduct.flavor !== null ) {
                setFlavors(foundProduct.flavor.split('\n'))
                setDefaultFlavor(foundProduct.flavor.split('\n')[0])
                if (document.getElementById('flavors') == null) {
                    neededFlavor = foundProduct.flavor.split('\n')[0]
                } else {
                    neededFlavor = document.getElementById('flavors').value
                }

            } 
            
            // ON INITIAL LOAD - NO FLAVOR
            if (foundProduct.flavor == null && productsInCartFromLocalStorage.find(product => product.id == choosenProductId)) {
                kiekis = productsInCartFromLocalStorage.find(product => product.id == choosenProductId).quantity;
            }
            //HAS A FLAVOR
            if (foundProduct.flavor !== null && productsInCartFromLocalStorage.find(product => product.id == choosenProductId && neededFlavor == product.desiredFlavor)) {
                // console.log('pataikei?')
                // setFlavors(foundProduct.flavor.split('\n'))
                // setDefaultFlavor(foundProduct.flavor.split('\n')[0])
                // if (document.getElementById('flavors') == null) {
                //     neededFlavor = foundProduct.flavor.split('\n')[0]
                // } else {
                //     neededFlavor = document.getElementById('flavors').value
                // }
                // console.log(kiekis)

                kiekis = productsInCartFromLocalStorage.find(product => product.id == choosenProductId && neededFlavor ==  product.desiredFlavor).quantity;
            }

            if (foundProduct.flavor !== null) {
                // if (foundProduct.hasOwnProperty('flavor')) {

                setFlavors(foundProduct.flavor.split('\n'))
                setDefaultFlavor(foundProduct.flavor.split('\n')[0])
                neededFlavor = foundProduct.flavor.split('\n')[0]
                // if ( null !== kebybys && productsInCartFromLocalStorage.find(product => product.id == choosenProductId && product.desiredFlavor == document.getElementById('flavors').value)) {
                if (productsInCartFromLocalStorage.find(product => product.id == choosenProductId && product.desiredFlavor == neededFlavor)) {
                // if (productsInCartFromLocalStorage.find(product => product.id == choosenProductId && document.getElementById('flavors').value ? product.desiredFlavor == document.getElementById('flavors').value: null)) {
                    // kiekis = productsInCartFromLocalStorage.find(product => product.id == choosenProductId && product.desiredFlavor == document.getElementById('flavors').value).quantity;
                }
            } else if (productsInCartFromLocalStorage.find(product => product.id == choosenProductId)) {

                    // if (productsInCartFromLocalStorage.find(product => product.id == choosenProductId && document.getElementById('flavors').value ? product.desiredFlavor == document.getElementById('flavors').value: null)) {
                    kiekis = productsInCartFromLocalStorage.find(product => product.id == choosenProductId).quantity;
            }
            setViewingProductQuantity(kiekis || 0)
            return !foundProduct.nutrition_info ? setNutritionClassName('displayNone')
                : !foundProduct.nutrition_percentage ? (setNutritionClassName('detailedInfoNameAmount'), console.log('detailedInfo2OutOf3 pirmas'))
                    : !foundProduct.nutrition_amount ? (setNutritionClassName('detailedInfoNamePerc'), console.log('detailedInfo2OutOf3 antras'))
                        
            :null

        }
       
    }


    const pickFlavor = () => {
        let flavor = document.getElementById('flavors').value
        // console.log('paleido')
        kiekis = 0;
        if (productsInCartFromLocalStorage.find(product => product.id == choosenProductId && product.desiredFlavor == flavor)) {
            kiekis = productsInCartFromLocalStorage.find(product => product.id == choosenProductId && product.desiredFlavor == flavor).quantity;
        }
        setViewingProductQuantity(kiekis)
        // console.log(kiekis)
        // viewingProduct.desiredFlavor = flavor
        // console.log(flavor.target.value)
    }

    // let flavorValue = document.getElementById('flavors').value;
    
    // const testas = (e) => console.log(e.target.value)


    return (viewingProduct ?
        <div className="fullDescription">
        { console.log(viewingProductQuantity)}
            <div className="gridLayout">
                <div>
                    <img className="fullDescriptionImage" src={viewingProduct.picture} alt="Product picture" />
                </div>
                <div className="mainProductInfo">
                    <h1>{viewingProduct.name}</h1>
                    <h3>{viewingProduct.category} | {viewingProduct.product_code}</h3>
                    <p>{viewingProduct.short_description}</p>
                    {flavors.length > 1 ? 
                        <select name='flavors' id='flavors' onChange={() => pickFlavor()}>
                            {flavors.map((flavor) => {
                                {/* return <option key={flavor} value={flavor} onClick={() => { console.log(document.getElementById('flavors').value)}}>{flavor}</option> */}
                               return  <option key={flavor} value={flavor}>{flavor}</option>
                            })}
                        </select>
                    : null}
                    <p>Kiekis: <br />{viewingProduct.amount}</p>
                    <div className="smallerGap">
                        <h3 style={{fontWeight:'bold'}}>€ {viewingProduct.price}</h3>
                    </div>
                    <div className="oderSection">
                        {viewingProductQuantity == 0 ?
                            <button className="deleteOrderButton" onClick={() => props.changeQuantities(viewingProduct, 100)}>Į krepšelį</button>
                           :<div>
                               <p style={{ display: "inline-block" }}>Kiekis</p>
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
