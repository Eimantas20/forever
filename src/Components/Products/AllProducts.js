import { render } from '@testing-library/react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    withRouter,
    useHistory
} from "react-router-dom";
import React, { Component, useState, useEffect } from 'react';
import './AllProducts.css';
import ObjectPage from './ObjectPage.js'
import Pagination from '../Pagination/Pagination.js';
import OneProductCard from './OneProductCard.js';
import AboutProducts from './AboutProducts.js'
import FullProductDescription from './FullProductDescription.js';

class AllProducts extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            products: [],
            currentProducts: [],
            currentPage: null,
            totalPages: null,
            filteredProducts: "no filtered products",
            productsInCategory: null,
            key: 0,
            view: true,
            fullDescription: "",
            selectedCategory: this.props.match.params.category
        };
    }

    componentDidMount = (props) => {
        console.log('pasileidzia')
        this.setState({ products: this.props.products }, () => this.pickCategory());
    }
    
    change=()=>this.setState({ selectedCategory: this.props.selectedCategory});

    pickCategory = () => {
        let { products, selectedCategory} = this.state;
        products = Object.values(products)

        let filteredProducts = products.filter((filteringProduct) => {
            if (filteringProduct.url === selectedCategory) { return filteringProduct }
        });
        const currentProducts = filteredProducts.slice(0, 9);
        const productsInCategory = filteredProducts.length;
        this.setState({ filteredProducts, currentProducts, productsInCategory, key: Math.random() });
    }

    onPageChanged = (data) => {
        const { filteredProducts } = this.state;
        // console.log(filteredProducts)
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const currentProducts = filteredProducts.slice(offset, offset + pageLimit);
        this.setState({ currentPage, currentProducts, totalPages });
    }

    changeView = (singleProduct) => {
        // console.log(properciai)
        this.setState({ view: false, fullDescription: singleProduct })
    }

    goBack = () => {
        this.setState({ view: true })
    }
    testvalue =()=> {
        const sort = document.getElementById('sortBy').value
        if (sort == 'priceUp') {
           const newList = this.state.currentProducts.sort(function(a, b) {
            return a.price - b.price
        })
            this.setState({ currentProducts: newList })

        }else if (sort == 'priceDown') {
            const newList = this.state.currentProducts.sort(function (a, b) {
                return b.price - a.price
            })
            this.setState({ currentProducts: newList})


        }
    }

    
        

    render() {

    //    console.log(this.props)
        // const view = this.state.view;
        const { currentProducts, currentPage, totalPages, filteredProducts, productsInCategory, view } = this.state;
        const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
        return (  
            !(currentProducts.length > 0) ?
            <div>
                <h1>Atsiprašome, šiuo metu šių prekių neturime</h1>
                    <p>Norint pasiteirauti apie prekę, prašome kreiptis elektroninių paštu: <a href="daivagusevaite@gmail.com">daivagusevaite@gmail.com</a> </p>
            </div>
            :<div>
                <div className="sorting">
                    <label>Pasirinkite rūšiavimą</label><br />
                        <select id="sortBy" name="price" size="1" onChange={()=>this.testvalue()}>
                            <option value="">pasirinkite</option>
                            <option value="priceUp">Kaina didėjanti</option>
                            <option value="priceDown">Kaina mažėjanti</option>
                        </select>
                        <br />
                </div>
                    <div className="productsContainer">
                        <div className="isdeliojimas">
                            {currentProducts.map(singleProduct => <OneProductCard singleProduct={singleProduct} changeQuantities={this.props.changeQuantities} key={singleProduct.id} changeViewButton={this.changeView} />)}
                        </div>
                    </div>
                        <div className="paginationBrowser">
                            <div>
                                <h2 className={headerClass}>
                                    <strong className="text-secondary">{productsInCategory}</strong> Prekės
                                </h2>
                            </div>
                            <div>
                                {currentPage && (
                                    <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                        Puslapis <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
                                    </span>
                                 )}  
                            </div>
                            <div>
                                <Pagination key={this.state.key} totalRecords={this.state.productsInCategory} pageLimit={9} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                            </div>
                        </div>

          </div>
        )
    }
}

export default withRouter(AllProducts)  ;







// import { render } from '@testing-library/react';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     useParams
// } from "react-router-dom";
// import React, {Component} from 'react';
// import './AllProducts.css';
// import ObjectPage from './ObjectPage.js'
// import Pagination from '../Pagination/Pagination.js';
// import OneProductCard from './OneProductCard.js';
// import AboutProducts from './AboutProducts.js'
// import FullProductDescription from './FullProductDescription.js';

// class AllProducts extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             products: [],
//             currentProducts: [],
//             currentPage: null,
//             totalPages: null,
//             filteredProducts: 0,
//             productsInCategory: null,
//             key: 0,
//             view: true,
//             fullDescription: ""
//         };
//     }

//     componentDidMount = () => {
//         fetch('http://localhost:3000/products')
//             .then((response) => response.json())
//             .then((data) => {
//                 this.setState({ products: data.data })
//             })
//     }

//     pickCategory = (selectedCategory) => {
//         let { products } = this.state;
//         let filteredProducts =  products.filter((filteringProduct) => {
//             if (filteringProduct.category === selectedCategory) { return filteringProduct }
//             });
//         const currentProducts = filteredProducts.slice(0, 9);
//         const productsInCategory = filteredProducts.length;
//         this.setState({ filteredProducts, currentProducts, productsInCategory, key: Math.random() }); 
//     }

//     onPageChanged = (data) => {
//         const { filteredProducts} = this.state;
//         const { currentPage, totalPages, pageLimit } = data;
//         const offset = (currentPage - 1) * pageLimit;
//         const currentProducts = filteredProducts.slice(offset, offset + pageLimit);
//         this.setState({ currentPage, currentProducts, totalPages});
//     }

//     changeView = (singleProduct) => {
//         // console.log(properciai)
//         this.setState({ view: false, fullDescription: singleProduct})
//     }

//     goBack = () => {
//         this.setState({view: true})
//     }
    
//     render() {    
//         const view = this.state.view;
//         const { currentProducts, currentPage, totalPages, filteredProducts, productsInCategory} = this.state;
//         const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
//         return (
//             <Route>
//             <div>
//                 {view
//                     ? <div>
//                         <nav>
//                             <ul className="productNav">
//                                 <li onClick={() => { this.pickCategory("bičių produktai") }}>
//                                     <Link to="/AllProducts/biciu_produktai">Bičių produktai</Link> 
//                                 </li>
//                                 <li onClick={() => { this.pickCategory("eteriniai aliejai") }}>
//                                     <Link to="/AllProducts/eteriniai_aliejai">Eteriniai aliejai</Link>
//                                 </li>
//                                 <li onClick={() => { this.pickCategory("odos priežiūra") }}><Link to="/AllProducts/odos_prieziuros">Odos priežiūros </Link></li>
//                                 <li onClick={() => { this.pickCategory("svorio reguliavimas") }}><Link to="/AllProducts/svorio_reguliavimas">Svorio reguliavimas</Link></li>
//                                 <li onClick={() => { this.pickCategory("maisto papildai") }}><Link to="/AllProducts/maisto_papildai">Maisto papildai </Link></li>
//                                 <li onClick={() => { this.pickCategory("gėrimai") }}><Link to="/AllProducts/gerimai">Gėrimai</Link></li>
//                                 <li onClick={() => { this.pickCategory("higienos priemonės") }}><Link to="/AllProducts/higienos_priemones">Higienos priemonės</Link></li>
//                             </ul>
//                         </nav>
//                         <div>

//                             {filteredProducts === 0 ? (
//                                 <AboutProducts />
//                             ) : (
//                                 <div>
//                                     <div className="container mb-5">
//                                         <div className="row d-flex flex-row py-5">
//                                             <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
//                                                 <div>
//                                                     {currentProducts.map(singleProduct => <OneProductCard singleProduct={singleProduct} key={singleProduct.id} addToBasket={this.props.addToBasket} changeViewButton={this.changeView}/>)}
//                                                 </div>
//                                                 <div className="d-flex flex-row align-items-center">
//                                                     <h2 className={headerClass}>
//                                                         <strong className="text-secondary">{productsInCategory}</strong> Prekės
//                                                     </h2>
//                                                     {currentPage && (
//                                                         <span className="current-page d-inline-block h-100 pl-4 text-secondary">
//                                                             Puslapis <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
//                                                         </span>
//                                                     )}
//                                                 </div>
//                                                 <div className="d-flex flex-row py-4 align-items-center">
//                                                     <Pagination key={this.state.key} totalRecords={this.state.productsInCategory} pageLimit={9} pageNeighbours={1} onPageChanged={this.onPageChanged} />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 :<FullProductDescription fullDescription={this.state.fullDescription} goBack={this.goBack} view={this.state.view}/>}
//             </div>
//             </Route>
//         )
//     }
// }

// export default AllProducts;