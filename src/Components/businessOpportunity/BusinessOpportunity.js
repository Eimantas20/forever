import React, { Component, useEffect } from 'react';
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
        <div>
            
            <h2>{'Verslo galimybė'}</h2>
            <p>{props.businessOpportunity}</p>
        </div>
    )
}

export default BusinessOpportunity;