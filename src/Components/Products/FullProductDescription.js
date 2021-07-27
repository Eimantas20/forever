import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';


function FullProductDescription(props) {
    let { url, match } = useRouteMatch();
    const [viewingProduct, setProduct] = useState({});
    const [viewingProductQuantity, viewProductQuantity] = useState(0);
    const [bgColor, changeColor] = useState("");
    const [newQuantity, setQuantity] = useState(0);
    let allProductsFromDB = Object.values(props.products);
    let choosenProductId = parseInt(props.match.params.id);
    // console.log(parseInt(props.match.params.id))

    useEffect(()=> {
        callMe(props);
    })

 

    const callMe = (props) =>  {
        let productsLength = Object.keys(allProductsFromDB).length;
        if (productsLength > 0) {
            let productsInCartFromLocalStorage = props.productsInCart;
            let kiekis = 0;
            if (productsInCartFromLocalStorage.find(product => product.id == choosenProductId)) {
                console.log('yra')
                kiekis = productsInCartFromLocalStorage.find(product => product.id == choosenProductId).quantity
                console.log(kiekis)
                console.log(productsInCartFromLocalStorage.find(product => product.id == choosenProductId).quantity)
            }
            viewProductQuantity(kiekis);
            let myProduct = allProductsFromDB.find(product => product.id == choosenProductId)
        
            
            // setQuantity(myFuckingProductQuantity)
            // console.log(myFuckingProduct)
            // console.log(myProductQuantity)
            // setQuantity(myProductQuantity)
        setProduct(myProduct);
        // viewProductQuantity(myProduct.quantity)
            // let quantity = () => {
            //     if (props.productsInCart[props.productsInCart.findIndex(item => item.id === viewingProduct.id)] == undefined ) {
            //         return 0
            //     } else {
            //         props.productsInCart[props.productsInCart.findIndex(item => item.id === viewingProduct.id)]
            //     }
            // }
                // console.log(quantity)
        // viewProductQuantity(quantity)
        }
        // console.log
      
        // console.log(viewingProduct);
        // findProduct(myProduct)
        // console.log(props.match.params);
        // console.log(products);
        // console.log(choosenProductId);
        // let viewingProduct = products.find(product => product.id == choosenProductId);
        // console.log(foundThisBastard)
    }

   

    // const addNCount = (props)=> {
        // console.log(props)
        // props.addNCount(viewingProduct);
        // props.addToBasket(viewingProduct)
        // console.log(props.addToBasket)
        // console.log(props, viewingProduct);
        // changeColor(('red'));
    // }
//    console.log(viewingProduct)
    // let {userId} = useParams();
    // console.log("fullprods got rerendered")
    // console.log(props.productsInCart[props.productsInCart.findIndex(item => item.id === viewingProduct.id)] || 0)
    // console.log(viewingProduct)


    return viewingProduct ? (
        
        <div className="fullDescription">
            <div className="gridLayout">
                <div>
                    <img className="fullDescriptionImage" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product picture" />
                </div>
                <div className="mainProductInfo">
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
                        <div>
                            <p style={{ display: "inline-block" }}>Kiekis</p>
                            <button className="incDec" onClick={() => props.changeQuantities(viewingProduct, -1)}>-</button>
                            {viewingProductQuantity}
                            <button className="incDec" onClick={() => props.changeQuantities(viewingProduct, +1)}>+</button>
                        </div>
                        <button className="deleteProduct" onClick={() => props.changeQuantities(viewingProduct, 100)}>Pašalinti prekę</button>
                    </div>
                    <button onClick={() => props.changeQuantities(viewingProduct, -100)}>order ME</button>

                    {/* <button onClick={() => addNCount(props, viewingProduct)}>order ME</button> */}

                    {/* <button onClick={() => addNCount(props, viewingProduct)}>order ME</button> */}
                    {/* <button onClick={() => props.addNCount()}>order ME</button> */}
                    {/* <div>
                        <p style={{ display: "inline-block" }}>Kiekis</p>
                        <button className="incDec" onClick={() => this.addToCart(viewingProduct, -1)}>-</button>
                        {viewingProduct.quantity}
                        <button className="incDec" onClick={() => this.addToCart(viewingProduct, +1)}>+</button>
                    </div>
                    <button className="deleteProduct" onClick={() => this.addToCart(viewingProduct, 100)}>Pašalinti prekę</button> */}


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
    :'loading'
}

export default FullProductDescription;

// import React, { useState } from 'react';

// function FullProductDescription(props) {
//     const goBack = () => {
//         props.goBack()
//     }
//     function showme() {
//         console.log('works?')
//     }
   
//     return (
//         <div className="fullDescription">
//             <button onClick={goBack}>Grįžti atgal</button>
//             <img className="fullDescriptionImage" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product picture" />
//             <div>
//                 <h3>{props.fullDescription.name}</h3>  
//                 <h4>€ {props.fullDescription.price}</h4>
//                 <h4>{props.fullDescription.category}</h4>
//                 <h4>{props.fullDescription.description}</h4>
//             </div>
//         </div>
//     )
// }

// export default FullProductDescription;