import { render } from '@testing-library/react';
import React, {Component} from 'react';
import './ProductCard.css';
import ObjectPage from './ObjectPage.js'
// import Countries from 'countries-api';
import Pagination from '../Pagination/Pagination.js';
import OneProductCard from '../OneProductCard.js';
import AboutProducts from './AboutProducts.js'


class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            category: '',
            pages: null,
            goods: [],
            currentProducts: [],
            currentPage: null,
            totalPages: null,
            selectedProducts: '',
            filteredProducts: 0,
            productsInCategory: null,
            key: 0
        };
    }

    componentDidMount = () => {
        fetch('http://localhost:3000/products')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ products: data.data })
            })
    }


    justDoit = (selectedCategory) => {
        let { products } = this.state;
        let filteredProducts =  products.filter((filteringProduct) => {
            if (filteringProduct.category === selectedCategory) { return filteringProduct }
            });
        const currentProducts = filteredProducts.slice(0, 9);
        const productsInCategory = filteredProducts.length;
        this.setState({ filteredProducts, currentProducts, productsInCategory, key: Math.random() });

    }

    onPageChanged = (data) => {
        const { filteredProducts} = this.state;
        const { currentPage, totalPages, pageLimit } = data;
        console.log(data)
        const offset = (currentPage - 1) * pageLimit;
        const currentProducts = filteredProducts.slice(offset, offset + pageLimit);
        
        this.setState({ currentPage, currentProducts, totalPages});
    }


    render() {    
        const { currentProducts, currentPage, totalPages, filteredProducts, productsInCategory} = this.state;
        //Set this if if there is no products ? 
        // if (productsInCategory === 0) return null;
        // console.log(products, pages, goods, currentProducts, currentPage, totalPages, category)
        const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
        console.log(productsInCategory + " wtf");
        return (
            <div>
                <nav>
                    <ul className="productNav">
                        <li onClick={() => { this.justDoit("bičių produktai") }}>Bičių produktai</li>
                        <li onClick={() => { this.justDoit("eteriniai aliejai") }}>Eteriniai aliejai</li>
                        <li onClick={() => { this.justDoit("odos priežiūra") }}>Odos priežiūros</li>
                        <li onClick={() => { this.justDoit("svorio reguliavimas") }}>Svorio reguliavimas</li>
                        <li onClick={() => { this.justDoit("maisto papildai") }}>Maisto papildai</li>
                        <li onClick={() => { this.justDoit("gėrimai") }}>Gėrimai</li>
                        <li onClick={() => { this.justDoit("higienos priemonės") }}>Higienos priemonės</li>
                    </ul>
                </nav> 
                <div>
                {/*Add another if (selectedProducts === 0) return "noproducts found"*/}
                    {filteredProducts === 0 ? (
                        <AboutProducts />
                    ) : (
                        <div>
                            
                            <div className="container mb-5">
                                <div className="row d-flex flex-row py-5">
                                    <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <h2 className={headerClass}>
                                                    <strong className="text-secondary">{productsInCategory}</strong> Prekės
                                            </h2>
                                            {currentPage && (
                                                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                                    Puslapis <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
                                                </span>
                                            )}
                                        </div>
                                        <div className="d-flex flex-row py-4 align-items-center">
                                                <Pagination key={this.state.key} totalRecords={this.state.productsInCategory} pageLimit={9} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                                        </div>
                                        <div>
                                                {currentProducts.map(singleProduct => <OneProductCard key={singleProduct.cca3} singleProduct={singleProduct}/>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default AllProducts;