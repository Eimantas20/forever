import React, { useEffect, useState, useRef, useReducer } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';

const myorgvalue = 999999999999999999999;
const startValue = {
    viewingProduct: {},
    viewingProductQuantity: 500
}

function TestingFuckingFlickeringProduct(props) {
  
  
    const [skaicius, paskaiciuok] = useState(0);
 
    const pasiskaiciuok = () => paskaiciuok(skaicius + 1)


    return (
        <div className="fullDescription">
           
                <div>
                <button onClick={pasiskaiciuok}>vietine skaiciuokle</button>
                <p>{skaicius}</p>
                </div>
               
            
          
            <div>
            
                <button onClick={props.skaiciuok}>skaiciuokle is appso</button>
                <p>{props.count}</p>
            </div>
            
        </div>
      
    )
    
}

export default TestingFuckingFlickeringProduct;
