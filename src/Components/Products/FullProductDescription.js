import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function FullProductDescription(props) {
    // console.log(props);
    // let bybis = props;
    // let pirmas = "pirmas";
    // let antras = "antras"
    // console.log(bybis);
    useEffect(()=> {
        callMe(props);
        // console.log(arguments)
    })

    const callMe = () => {
        console.log(props)
    }

    const goBack = () => {
        props.goBack()
    }
   
    let {userId} = useParams();
    console.log("FULL")
    return (
        <div className="fullDescription">
            <h1>It fuckin woooorks Mateyyyy</h1>
            <h3>{props.singleProduct.name}</h3>
            <h3>{props.singleProduct.category}</h3>
            <h3>{props.singleProduct.price}</h3>
            <h3>{props.singleProduct.description}</h3>
        </div>
    )
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