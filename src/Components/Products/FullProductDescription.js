import React, { useEffect, useState, useRef, useReducer } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
//Initial state for reducer
// const initialStates = { viewingProduct: {}, viewingProductQuantity: 0 };


// const reducer = (initialStates, action) => {
//     console.log('TRIGERED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
//     console.log(initialStates, action)
//     let initialStatesProducts = initialStates.viewingProduct;
//     if (action.type == 'work') {
//         // return { count: state.count + 1 };
//         return { initialStatesProducts: action.myProduct}


//             // initialStates.viewingProductQuantity: action.kiekis
//         // } 
        

//     }
// }


function FullProductDescription(props) {
    // const [state, dispatch] = useReducer(reducer, initialStates)


    let { url, match } = useRouteMatch();
    // const [ myProduct, kiekis] = useReducer(reducer, { viewingProduct: {}, viewingProductQuantity: 0});
    const [viewingProduct, setProduct] = useState({});
    const [viewingProductQuantity, viewProductQuantity] = useState(0);
    let allProductsFromDB = Object.values(props.products);
    let choosenProductId = parseInt(props.match.params.id);

    useEffect(()=> {
        console.log('mounted');
        callMe(props)
        return () => {
            console.log('unmounted')
        }
    })

    const callMe = (props) =>  {
        console.log(props)
        let productsLength = Object.keys(allProductsFromDB).length;
        if (productsLength > 0) {
            let productsInCartFromLocalStorage = props.productsInCart;
            let kiekis = 0;
            if (productsInCartFromLocalStorage.find(product => product.id == choosenProductId)) {
                kiekis = productsInCartFromLocalStorage.find(product => product.id == choosenProductId).quantity;
            }
            let myProduct = allProductsFromDB.find(product => product.id == choosenProductId)
            // dispatch({ type: 'work', kiekis, myProduct})
            viewProductQuantity(kiekis);
            setProduct(myProduct);
            // function reducer(viewingProductNQuantity) {
            //     return ({ viewingProduct: myProduct, viewingProductQuantity: kiekis });
               
            // }
        }
    }


  

console.log('rerender fullProductDescription')
// console.log(initialStates)
// console.log(viewingProduct)
    // const { viewingProduct, viewingProductQuantity } = viewingProductNQuantity;
    return  (
        <div className="fullDescription">
            <div className="gridLayout">
                <div>
                    <img className="fullDescriptionImage" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product picture" />
                </div>
                <div className="mainProductInfo">
                    {/* <h1>{initialStates.viewingProduct.name}</h1> */}

                    <h1>{viewingProduct.name}</h1>
                    <h2>{viewingProduct.id}</h2>
                    <h3>{viewingProduct.category}</h3>
                    <h3>€ {viewingProduct.price}</h3>
                    <h3>{viewingProduct.description}</h3> 
                    <div className="smallerGap">
                        <p>Kiekis</p>
                        <p>porciju skaicius</p>
                    </div>
                    <div>
                        {viewingProductQuantity == 0 ? 
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
    )
    
}

export default FullProductDescription;
