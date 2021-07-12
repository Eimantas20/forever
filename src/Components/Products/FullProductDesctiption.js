import React, { useState } from 'react';

function FullProductDesctiption(props) {
    const goBack = () => {
        props.goBack()
    }
    function showme() {
        console.log('works?')
    }
   
    return (
        <div className="fullDescription">
            <button onClick={goBack}>Grįžti atgal</button>
            <img className="fullDescriptionImage" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product picture" />
            <div>
                <h3>{props.fullDescription.name}</h3>  
                <h4>€ {props.fullDescription.price}</h4>
                <h4>{props.fullDescription.category}</h4>
                <h4>{props.fullDescription.description}</h4>
            </div>
        </div>
    )
}

export default FullProductDesctiption;