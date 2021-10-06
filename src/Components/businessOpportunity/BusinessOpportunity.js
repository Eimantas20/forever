import React, { Component, useEffect } from 'react';
import './businessOpportunity.css'; 
import businessWomanImg from '../../img/business-woman.jpg';
import silverPenImg from '../../img/silver-pen.jpg';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from 'react-router-dom';


import { render } from '@testing-library/react';


const BusinessOpportunity = (props) => {
    console.log(props)
    return (    
        <div className="businessOpLayout">
            <h2>{'Verslo galimybė'}</h2>
            <div>
                <img className="businessWomanImg" src={businessWomanImg} />
                <p>{props.paragraphs.businessOpportunity}</p>
            </div>
            <div>
                <img className="silverPenImg" src={silverPenImg} />
                <p>{props.paragraphs.businessOpportunity2}</p>
            </div>
            
          
        </div>
    )
}

export default BusinessOpportunity;