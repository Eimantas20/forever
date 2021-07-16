import { render } from '@testing-library/react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    withRouter,
    useLocation
} from "react-router-dom";
import React, { Component, useState, useEffect } from 'react';
import AllProducts from './AllProducts';
import './AllProducts.css';

const CategoryRouter = ({ match }) => {
    useEffect(() => {
        fetchItems();
        
        // console.log(`${match} - This comes from Category Router`)
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch(
            'http://localhost:3000/products'
        );
        const items = await data.json();
        setItems(items.data);
        // console.log(items)
    }

    // const commingFrom = () => console.log('CategoryRouter');
    // console.log(items)
    const kategorija = "biciu_produktai"

    return (
       
        <div>
            
                <nav>
                    <ul className="productNav">
                        <li>
                            <Link to={`/categories/${kategorija}`}>Bičių produktai</Link>
                        </li>
                        <li>
                            <Link to="/categories/eteriniai_aliejai">Eteriniai aliejai</Link>
                        </li>
                        <li><Link to={`/categories/odos_prieziuros`}>Odos priežiūros </Link></li>
                        <li><Link to="/categories/svorio_reguliavimas">Svorio reguliavimas</Link></li>
                        <li><Link to="/categories/maisto_papildai">Maisto papildai </Link></li>
                        <li><Link to="/categories/gerimai">Gėrimai</Link></li>
                        <li><Link to="/categories/higienos_priemones">Higienos priemonės</Link></li>
                    </ul>
                </nav>
                {/* <Switch>
 
                    <Route path='/categories/:category' exact component={(props) => <AllProducts {...props} key={window.location.pathname} products={items}/>}/>
                   

                       
                    <Route path="/categories/:category" component={AllProducts} key={window.location.pathname}/>
                       
                    <Route path="/categories/eteriniai_aliejai" >
                        <AllProducts selectedCategory="eteriniai aliejai" />
                    </Route>
                    <Route path="/categories/odos_prieziuros">
                        <AllProducts selectedCategory="odos priežiūros" />
                    </Route>
                    <Route path="/categories/svorio_reguliavimas" >
                        <AllProducts selectedCategory="svorio reguliavimas" />
                    </Route>
                    <Route path="/categories/maisto_papildai" >
                        <AllProducts selectedCategory="maisto papildai" />
                    </Route>
                    <Route path="/categories/gerimai" >
                        <AllProducts selectedCategory="gėrimai" />
                    </Route>
                    <Route path="/categories/higienos_priemones" >
                        <AllProducts selectedCategory="higienos priemonės" />
                    </Route>
                </Switch> */}
           
        </div>
        
    )
}

export default withRouter(CategoryRouter);