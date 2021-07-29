import { render } from '@testing-library/react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    withRouter,
    useLocation, 
    useRouteMatch
} from "react-router-dom";
import React, { Component, useState, useEffect } from 'react';
import AllProducts from './AllProducts';
import './AllProducts.css';

const CategoryRouter = ({ match }) => {
    // let routeMatch = useRouteMatch('/categories/:category/:id');

    const kategorija = "biciu_produktai"

    // return !routeMatch ? (
    return (
        <div>
            <nav>
                <ul className="productNav">
                    <li><Link to={`/categories/${kategorija}`}>Bičių produktai</Link></li>
                    <li><Link to="/categories/eteriniai_aliejai">Eteriniai aliejai</Link></li>
                    <li><Link to={`/categories/odos_prieziuros`}>Odos priežiūros </Link></li>
                    <li><Link to="/categories/svorio_reguliavimas">Svorio reguliavimas</Link></li>
                    <li><Link to="/categories/maisto_papildai">Maisto papildai </Link></li>
                    <li><Link to="/categories/gerimai">Gėrimai</Link></li>
                    <li><Link to="/categories/higienos_priemones">Higienos priemonės</Link></li>
                </ul>
            </nav>
        </div>
    )
    //  :null
}

export default withRouter(CategoryRouter);