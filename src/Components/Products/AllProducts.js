import { withRouter } from "react-router-dom";
import React, { Component } from 'react';
import './AllProducts.css';
import Pagination from '../Pagination/Pagination.js';
import OneProductCard from '../OneProductCard/OneProductCard.js';

class AllProducts extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            products: [],
            list: this.props.products,
            currentProducts: [],
            currentPage: null,
            totalPages: null,
            filteredProducts: "no filtered products",
            productsInCategory: null,
            key: 0,
            fullDescription: "",
            selectedCategory: this.props.match.params.category
        };
    }

    componentDidMount = (props) => {
        this.setState({ products: this.props.products }, () => this.pickCategory());
    }
    
    change=()=>this.setState({ selectedCategory: this.props.selectedCategory});

    pickCategory = () => {
        let { products, selectedCategory} = this.state;
        products = Object.values(products)
        // let filteredProducts = products.filter((filteringProduct) => {
        //     if (filteringProduct.url === selectedCategory) { return filteringProduct }
        // });
        let filteredProducts = products.filter(filteringProduct => 
           filteringProduct.url.includes(selectedCategory) 
        );
        const currentProducts = filteredProducts.slice(0, 9);
        const productsInCategory = filteredProducts.length;
        this.setState({ filteredProducts, currentProducts, productsInCategory, key: Math.random() });
    }

    onPageChanged = (data) => {
        const { filteredProducts } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const currentProducts = filteredProducts.slice(offset, offset + pageLimit);
        this.setState({ currentPage, currentProducts, totalPages });
    }

    testvalue = () => {
        const sort = document.getElementById('sortBy').value
        if (sort === 'priceUp') {
           const newList = this.state.filteredProducts.sort(function(a, b) {
            return a.price - b.price
        })
            this.setState({ filteredProducts: newList }, this.pickCategory())

        }else if (sort === 'priceDown') {
            const newList = this.state.filteredProducts.sort(function (a, b) {
                return b.price - a.price
            })
            this.setState({ filteredProducts: newList }, this.pickCategory())
        }
    }

    render() {
        const { currentProducts, currentPage, totalPages, productsInCategory } = this.state;
        const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
        return (  
            !(currentProducts.length > 0) ?
            <div>
                <h1>Atsiprašome, šiuo metu šių prekių neturime</h1>
                    <p>Norint pasiteirauti apie prekes, prašome kreiptis elektroninių paštu: <a href="daivagusevaite@gmail.com">daivagusevaite@gmail.com</a> </p>
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
                        {currentProducts.map(singleProduct => <OneProductCard singleProduct={singleProduct} changeQuantities={this.props.changeQuantities} key={singleProduct.id} />)}
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
