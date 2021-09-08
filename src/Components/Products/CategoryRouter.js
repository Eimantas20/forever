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

    const categories = [
        { 
            url: "biciu_produktai", 
            name: "Bičių produktai"
        },
        {
            url: "eteriniai_aliejai",
            name: "Eteriniai aliejai"
        },
        {
            url: "odos_prieziura",
            name: "Odos priežiūros"
        },
        {
            url: "svorio_reguliavimas",
            name: "Svorio reguliavimas"
        },
        {
            url: "maisto_papildai",
            name: "Maisto papildai"
        }, 
        {
            url: "gerimai",
            name: "Gėrimai"
        },
        {
            url: "higienos_priemones",
            name: "Higienos priemonės"
        }
    ]
   
    return (
        <div>
            <nav className="categoryNav">
                <ul className="productNav" >
                    {categories.map((category) => {
                        let isActive = `/categories/${category.url}` === window.location.pathname;
                        let buttonClass = isActive ? "activeCategory" : "inactiveCategory";
                        return <Link to={`/categories/${category.url}`} key={category.url}><li className={buttonClass}>{category.name}</li></Link>
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default withRouter(CategoryRouter);